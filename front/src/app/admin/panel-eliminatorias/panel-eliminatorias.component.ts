import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/users/socket.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-panel-eliminatorias',
  templateUrl: './panel-eliminatorias.component.html',
  styleUrls: ['./panel-eliminatorias.component.scss']
})
export class PanelEliminatoriasComponent implements OnInit{
  public enCompetencia = false;
  public siguienteIntegral:any = "";
  public siguienteIntegralNum:any = "";
  public integralActual:any = "";
  public integralActuallNum:any = "";
  public ronda = null;
  public encuentro = null;
  public cronometroTimer:any;
  public estado = 0;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  public segundos = 3;
  public countDown:any;
  public primerParticipante = null;
  public cantPausas = 0;
  public participante:any = [
    {online:false},
    {online:false}
  ]
  constructor(
    private user:UsersService,
    private socket:SocketService
  ){
    this.cronometroFront = {minutos:5,segundos:0, mill:0}
    socket.usuariosPreparados().subscribe((res)=>{
      let cant = 0; 
      res.forEach((el:any)=>{
        if(el.estado)
          cant++;
      })
      if(cant == 2){
        this.enCompetencia = true;
        socket.iniciarCronometro();
        clearInterval(this.countDown);
        this.countDown = this.countDownSeconds();
        this.estado = 3;
      }
    })
    this.getIntegralesAdmin()
    this.pausarCronometroStream()
    this.llamarUsuarioOnline()
  }
  updatePuntaje(puntaje:number, idParticipante:number){
    this.reiniciar();
    const data = {
      puntaje:puntaje,
      idParticipante:idParticipante,
      encuentro:this.encuentro,
      ronda:this.ronda
    }
    this.user.updatePuntaje(data).subscribe((res:any)=>{
      if(res[0]){
        if(this.integralActual != ""){

          const data2 = {
            idIntegral:this.integralActuallNum,
            estado:3
          }
          this.user.modificarIntegral(data2).subscribe(res=>{
            this.integralActual = "";
            this.getIntegralesAdmin()
            this.llamarEliminatorias()
            this.socket.sumarPuntaje();
          })
        }else{
          this.getIntegralesAdmin()
          this.llamarEliminatorias()
          this.socket.sumarPuntaje();
        }
      }
    }) 
  }
  quemarIntegral(){
    console.log(this.siguienteIntegralNum)
    this.user.modificarIntegral({idIntegral:this.siguienteIntegralNum, estado:3}).subscribe(res=>{
      this.getIntegralesAdmin()
    })
  }
  empate(){
    this.reiniciar();
    console.log(this.integralActual)
    if(this.integralActual != ""){

      const data2 = {
        idIntegral:this.integralActuallNum,
        estado:3
      }
      this.user.modificarIntegral(data2).subscribe(res=>{
        this.integralActual = "";
        this.getIntegralesAdmin()
        this.llamarEliminatorias()
        this.socket.sumarPuntaje();
      })
    }else{
      this.getIntegralesAdmin()
      this.llamarEliminatorias()
      this.socket.sumarPuntaje();
    }
  }
  finalizarRonda(idGanador:number, idPerdedor:number){
    let nuevaRonda = this.encuentro==this.ronda?(this.ronda!/2):this.ronda;
    let nuevoEncuentro = this.encuentro==this.ronda?1:this.encuentro+1;
    let encuentroPasar = (this.encuentro!%2)==0?this.encuentro!/2:((this.encuentro!/2)+0.5)
    let rondaPasar = this.ronda!/2;
    let tercerPuesto = 0;
    if(this.ronda == 2){
      tercerPuesto = 1;
    }
    if(this.ronda == 2 && this.encuentro == 2){
      nuevaRonda = 0;
    }
    if(this.ronda == 0){
      nuevaRonda = 1;
      nuevoEncuentro = 1;
      tercerPuesto = 2;
    }
    if(this.ronda == 1 && this.encuentro == 1){
      tercerPuesto = 2;
      nuevaRonda = 666
    }
    const data = {
      ronda:this.ronda,
      encuentro:this.encuentro,
      idGanador:idGanador,
      idPerdedor:idPerdedor,
      nuevaRonda:nuevaRonda,
      nuevoEncuentro:nuevoEncuentro,
      encuentroPasar:encuentroPasar,
      rondaPasar:rondaPasar,
      tercerPuesto:tercerPuesto
    }
    console.log(data)

      this.user.updateEncuentro(data).subscribe((res:any)=>{
        if(res[0]){
          if(this.ronda == 1 && this.encuentro == 1){
            console.log("Ganador!")
          }else{

            this.socket.finalizar();
            this.llamarEliminatorias();
          }
        }
      })
    
  }
  reiniciar(){
    this.enCompetencia = false;
    this.cronometroFront = {minutos:5,segundos:0, mill:0}
    this.cantPausas = 0;
  }
  countDownSeconds(){
    this.segundos = 3;
    return setInterval(()=>{
      if(this.segundos == 0){
        this.estado = 0;
        clearInterval(this.countDown);
        this.enCompetencia = true;
        this.cronometroTimer = this.cronometro();
      }
      this.segundos--;
    }, 1000)
  }
  pausarCronometroStream(){
    this.socket.pausarCronometroStream().subscribe((res)=>{
      let index = 0;
      console.log(this.cantPausas)
      this.cantPausas++;
      if(this.cantPausas == 2){
        this.cantPausas = 0;
        clearInterval(this.cronometroTimer);
      }
     
    })
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
        // 
        clearInterval(this.cronometroTimer);
      }
    }, 10)
  }
  llamarEliminatorias(){
    this.user.getEliminatoriaActiva().subscribe((res:any)=>{
      if(res){
        this.encuentro = res[0].encuentro;
        this.ronda = res[0].ronda;
        this.participante = res
        this.participante.forEach((el:any)=>{
          el.online = false;
        })
        
      }
      this.socket.pedirLlamada();
    })
  }
  llamarUsuarioOnline(){
    this.socket.getUsersOnlineSegunda().subscribe((result:any)=>{
      console.log(result)
      if(this.participante[0].idParticipante)
      this.participante.forEach((el:any)=>{
        el.online = false;
        result.forEach((element:any)=>{
          if(el.idParticipante[0] == element.idParticipante){
            el.online = true;
          }
        })
      })
    })
  }
  ngOnInit(): void {
    this.llamarEliminatorias()
  }
  enviarIntegral(){
    
    const data = {
      idIntegral:this.siguienteIntegralNum,
      estado:1
    }
    this.user.modificarIntegral(data).subscribe(res=>{

      if(this.integralActual != ""){
        const data2 = {
          idIntegral:this.integralActuallNum,
          estado:3 
        }
        this.user.modificarIntegral(data2).subscribe(res=>{
          this.socket.iniciarIntegral();
          this.getIntegralesAdmin()
    
        })
      }else{
        this.socket.iniciarIntegral();
        this.getIntegralesAdmin()
      }

    })
  }
  getIntegralesAdmin(){
    this.user.getIntegralesAdmin().subscribe((res:any)=>{
      res.forEach(async (el:any)=>{

        if(el[0]){

          let blob = await fetch(`https://integratorapi.azurewebsites.net/integralesFinales/${el[0].idIntegral}.png?key=akjjyglc`).then(r => r.blob())
          const reader = new FileReader();
          reader.readAsDataURL(blob)
          reader.onloadend = async ()=>{
            if(el[0].estado == 0){
  
              this.siguienteIntegralNum = el[0].idIntegral;
              this.siguienteIntegral = reader.result;
            }else{
  
              this.integralActuallNum = el[0].idIntegral;
              this.integralActual = reader.result;
            }
          }
        }
      })
    })
  }
}
