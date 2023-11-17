import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ParticipanteService } from 'src/app/users/participante.services';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/users/socket.service';
@Component({
  selector: 'app-integrales',
  templateUrl: './integrales.component.html',
  styleUrls: ['./integrales.component.scss']
})
export class IntegralesComponent implements OnInit{
  @ViewChild('stepper') stepper:any; 
  public respuestaSeleccionada = 0;
  public integralActual = 0;
  public integrales:any = {integrales:[]}
  public iniciarPrueba = false;
  public mensajeLoading = "";
  public countDown:any;
  public segundos = 4;
  public pruebaFinalizada = false;
  public cronometroTimer:any;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  constructor(
    private participanteService:ParticipanteService,
    private userService:UsersService,
    private toastrService:NbToastrService,
    private router:Router,
    private socket:SocketService,
  ){
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        
      } else {
        this.toastrService.show(`Has cambiado la pestaña`, "Prueba finalizada", { status: "warning", destroyByClick: true, icon: "checkmark-circle-2-outline" });
        window.location.href = "./";
      }
    });
  }
  ngOnInit(): void {
    this.mensajeLoading = "Cargando prueba..."
    this.participanteService.getIntegralesClasificaciones().subscribe(res =>{
      this.mensajeLoading = "Recopilando información..."
      this.participanteService.getTimerClasificaciones().subscribe((res2:any) =>{
        this.mensajeLoading = "Iniciando prueba..."
        res2.mill = 0;
        this.tiempoOriginal = res2;
        this.integrales = res;
        this.cronometroFront = this.tiempoOriginal;
        this.countDown = this.countDownSeconds();
        this.socket.setIntegral(1);
      })
      
    })
  }
  countDownSeconds(){
    return setInterval(()=>{
      if(this.segundos == 0){
        clearInterval(this.countDown);
        this.iniciarPrueba = true;
        this.cronometroTimer = this.cronometro();
      }
      this.segundos--;
    }, 1000)
  }
  cronometro(){
    return setInterval(()=>{
      let {minutos, segundos, mill} = this.cronometroFront
      if(mill == 0){
        segundos = segundos==0?59:segundos-1;
        if(segundos == 59)
          minutos--;
      }
      mill = mill==0?99:mill-1;
      this.cronometroFront = {minutos, segundos, mill}
      if(minutos==0 && segundos==0 && mill==0){
        this.integralActual++;
        this.guardarSeleccion()
        clearInterval(this.cronometroTimer);
      }
    }, 10)
  }
  seleccionarRespuesta(resp:any, integral:number){
    this.respuestaSeleccionada = resp;
    this.integralActual = integral + 1;
  }
  salirPrueba(){
    this.router.navigate(["/"])
  }
  guardarSeleccion(){
    clearInterval(this.cronometroTimer);
    const tiempo = ((this.cronometroFront.mill) + (this.cronometroFront.segundos * 100) + (this.cronometroFront.minutos * 6000))
    let tiempoFinal = {segundos:this.cronometroFront.segundos, minutos:this.cronometroFront.minutos, mill: this.cronometroFront.mill};
    if(tiempoFinal.segundos > this.tiempoOriginal.segundos){
      
      tiempoFinal.minutos = this.tiempoOriginal.minutos - tiempoFinal.minutos - 1;
      tiempoFinal.segundos = this.tiempoOriginal.segundos - tiempoFinal.segundos;
    }else{
      
      tiempoFinal.minutos = this.tiempoOriginal.minutos - tiempoFinal.minutos;
      tiempoFinal.segundos = this.tiempoOriginal.segundos - tiempoFinal.segundos;
    }
    tiempoFinal.mill = 99 - tiempoFinal.mill;
    if(this.tiempoOriginal.segundos == 0)
      tiempoFinal.segundos = 60 - this.cronometroFront.segundos;
    
    if(tiempoFinal.segundos < 0)tiempoFinal.segundos=tiempoFinal.segundos*-1;
    if(tiempoFinal.mill < 0)tiempoFinal.mill=tiempoFinal.mill*-1;
    const data = {
      idParticipante:this.userService.getUserInfo().data.idParticipante,
      numeroIntegral: this.integralActual,
      numeroRespuesta: this.respuestaSeleccionada,
      tiempo:tiempo,
      tiempoCompleto: JSON.stringify(tiempoFinal)
    }
    this.participanteService.guardarRespuestaParticipante(data).subscribe(res =>{
      this.toastrService.show(`Se ha guardado la integral ${this.integralActual}`, "Respuesta guardada", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
      this.stepper.next();
      this.socket.setIntegral(this.integralActual + 1);
      this.respuestaSeleccionada = 0;
      this.cronometroFront = this.tiempoOriginal;
      
      if(this.integrales.integrales.length == this.integralActual){
        const dataSet = {
          idParticipante:this.userService.getUserInfo().data.idParticipante
        }
        // this.participanteService.calcularPuntaje(dataSet).subscribe()
        this.pruebaFinalizada = true;
      }else{
        this.cronometroTimer = this.cronometro();
      }
    },()=>{
    })
  }
}
