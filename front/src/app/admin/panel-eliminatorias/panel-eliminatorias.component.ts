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
  public cronometroTimer:any;
  public estado = 0;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  public segundos = 3;
  public countDown:any;
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
        this.countDown = this.countDownSeconds();
        this.estado = 3;
      }
    })
    this.getIntegralesAdmin()
  }
  countDownSeconds(){
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
        this.participante = res
        this.participante.forEach((el:any)=>{
          el.online = false;
        })
        this.llamarUsuarioOnline()
      }
    })
  }
  llamarUsuarioOnline(){
    this.socket.getUsersOnlineSegunda().subscribe((result:any)=>{
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
    this.socket.iniciarIntegral();
    // const data = {
    //   idIntegral:this.siguienteIntegralNum,
    //   estado:1
    // }
    // this.user.modificarIntegral(data).subscribe(res=>{
    //   if(this.integralActual != ""){
    //     const data2 = {
    //       idIntegral:this.integralActuallNum,
    //       estado:3
    //     }
    //     this.user.modificarIntegral(data2).subscribe(res=>{
          
    //       this.getIntegralesAdmin()
    
    //     })
    //   }else
    //     this.getIntegralesAdmin()

    // })
  }
  getIntegralesAdmin(){
    this.user.getIntegralesAdmin().subscribe((res:any)=>{
      res.forEach(async (el:any)=>{

        if(el[0]){

          let blob = await fetch(`http://localhost:3000/integralesFinales/${el[0].idIntegral}.png?key=akjjyglc`).then(r => r.blob())
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
