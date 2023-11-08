import { Component, ViewChild, OnInit } from '@angular/core';
import { SocketService } from '../users/socket.service';
import { UsersService } from '../users/users.service';
import { Peer } from "peerjs";
import { enc } from 'crypto-js';
interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
}
@Component({
  selector: 'app-stream-segunda-ronda',
  templateUrl: './stream-segunda-ronda.component.html',
  styleUrls: ['./stream-segunda-ronda.component.scss']
})
export class StreamSegundaRondaComponent  implements OnInit{
  public participantes:any;
  public participantesRespuestas:any;
  public primeraEntrada = true;
  public cronometroTimer:any;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  public tiempoRespuestas:{minutos:number, segundos:number, mill:number, respuesta:boolean}[] = [];
  public segundos = 3;
  public estado = 0;
  public countDown:any;
  public integral:any = null;
  public enCompetencia = false;
  public imagenDefault:any = '../../assets/img/streaming/Group 70.png';
  MQ:any = null;
  public video_1:VideoElement;
  public video_2:VideoElement;
  mathFieldSpan:any;
  fillInTheBlank:any;
  mathField:any = [];
  removeCharPressed = false;
  imagenUni_1: string = '../../assets/img/streaming/image 8.png';
  numeroUniversidad_1: number = 0;
  nombreUni_1: string = 'Nombre Universidad';

  imagenUni_2: string = '../../assets/img/streaming/image 8.png';
  numeroUniversidad_2: number = 0;
  nombreUni_2: string = 'Nombre Universidad_2';
  public peer:any;

  imgIntegralActual: string = '../../assets/img/streaming/Group 70.png';
  constructor(
    private user:UsersService,
    private socket:SocketService
  ){
    this.pausarCronometroStream()
    this.llamarEliminatorias()
    this.iniciarCronometroParticipante()
    this.sumarPuntajeParticipante()
    this.iniciarIntegralParticipante()
    this.finalizar()
  }
  ngOnInit(): void {
    this.tiempoRespuestas.push({minutos:0, segundos:0,mill:0,respuesta:false})
    this.tiempoRespuestas.push({minutos:0, segundos:0,mill:0,respuesta:false})
    this.cronometroFront = {minutos:5,segundos:0, mill:0}
    this.tiempoOriginal = this.cronometroFront
    this.peer = new Peer("integrator-call-1");
    this.socket.volverALlamar().subscribe((res)=>{
      this.crearPeer(res);
    })
  }
  pausarCronometroStream(){
    console.log(this.enCompetencia)
    
    this.socket.pausarCronometroStream().subscribe((res)=>{
      if(this.enCompetencia){

        console.log(res)
        let index = 0;
        this.participantes.forEach((el:any)=>{
          if(res == el.idParticipante[0]){
            this.tiempoRespuestas[index] = {
              minutos:this.cronometroFront.minutos, 
              segundos:this.cronometroFront.segundos,
              mill:this.cronometroFront.mill,
              respuesta:true}
            let buffCronometro = {
              minutos:this.cronometroFront.minutos, 
              segundos:this.cronometroFront.segundos,
              mill:this.cronometroFront.mill,
              idParticipante:res};
              this.socket.confirmarTiempo(buffCronometro)
          }
          index++
        })
      }
    })
  }
  
  cronometro(){
    console.log(this.tiempoRespuestas)
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
  iniciarIntegralParticipante(){
    this.socket.iniciarIntegralParticipante().subscribe(()=>{
      this.estado = 1;
      this.user.getIntegralesAdmin().subscribe((res:any)=>{
        console.log(res)
        res.forEach(async (el:any)=>{
          if(el[0].estado == 1){
            let blob = await fetch(`https://integratorapi.azurewebsites.net/integralesFinales/${res[1][0].idIntegral}.png?key=akjjyglc`).then(r => r.blob())
            const reader = new FileReader();
            reader.readAsDataURL(blob)
            reader.onloadend = async ()=>{
              this.integral = reader.result;
              
            }
          }
        })
      })
    })
  }
  iniciarCronometroParticipante(){
    this.socket.iniciarCronometroParticipante().subscribe(()=>{
      if(this.estado != 3){

        this.estado = 3
        clearInterval(this.countDown);
        this.countDown = this.countDownSeconds();
      }
    })
  }
  countDownSeconds(){
    this.segundos = 3
    return setInterval(()=>{
      console.log(this.estado)

      if(this.segundos == 0){
        clearInterval(this.countDown);
        this.enCompetencia = true;
        this.estado = 0
        this.cronometroTimer = this.cronometro();
      }
      this.segundos--;
    }, 1000)
  }
  sumarPuntajeParticipante(){
    this.socket.sumarPuntajeParticipante().subscribe(()=>{
      this.reiniciar();
    })
  }
  reiniciar(){
    console.log("d")
    clearInterval(this.cronometroTimer);
    this.cronometroFront = this.tiempoOriginal;
    let buffTiempo:any = this.tiempoOriginal;
    buffTiempo["respuesta"]=false;
    this.enCompetencia = false;
    this.tiempoRespuestas[0] = buffTiempo;
    this.tiempoRespuestas[1] = buffTiempo;
    this.estado = 0;
    this.mathField[0].latex("")
    this.mathField[1].latex("")
    this.integral = null;
    this.llamarEliminatorias();
  }
  crearPeer(participantes:any){
    participantes.forEach((el:any)=>{
        setTimeout(()=>{
          
          navigator.mediaDevices.getUserMedia(
            { video: true, audio: true }
          ).then((stream)=>{
            const call = this.peer.call("integrator-call-"+el.idParticipante, stream);
            call.on("stream", (remoteStream:any) => {
              let i = true;
              this.participantes.forEach((ele:any)=>{
                if(ele.idParticipante[0] == el.idParticipante){
                  if(i){
                    this.video_1 = {
                      muted: false,
                      srcObject: remoteStream
                    }
                  }
                  else{
                    this.video_2 = {
                      muted: false,
                      srcObject: remoteStream
                    }
                  }
                }
                i = false;
              })
              
              // Show stream in some <video> element.
            });
          });
        }, 1000)
    })
    
  }
  actualizarTeclado(){
    let index = 0;
    this.participantesRespuestas.forEach((el:any)=>{
      this.mathField[index].latex(el.texto_1)
      index++;
    })
  }
  llamarEliminatorias(){
    this.user.getEliminatoriaActiva().subscribe((res:any)=>{
      if(res){
        this.participantes = res
        let index = 0;
        this.participantes.forEach((ele:any)=>{
          ele["mq"]=index;
          index++;

        })
        this.llamarParticipantesOnline()
      }
    })
  }
  finalizar(){
    this.socket.finalizarParticipante().subscribe(()=>{
      // this.peer
      
      this.reiniciar();
    })
  }
  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
  llamarParticipantesOnline(){
    this.socket.getUsersOnlineSegunda().subscribe((res)=>{
      this.participantesRespuestas = res;
      if(this.primeraEntrada){
        this.crearPeer(res);
        this.primeraEntrada = false;
      }
      this.actualizarTeclado();
      this.participantes.forEach((ele:any)=>{
        this.participantesRespuestas.forEach((el:any)=>{
          if(el.idParticipante == ele.idParticipante[0]){
            this.mathField[ele.mq].latex(el.texto_1)
          }
        })

      })
    })
  }
  ngAfterViewInit() {
    this.mathFieldSpan = [];
    this.mathFieldSpan.push(document.getElementById('math-field_0'));
    this.mathFieldSpan.push(document.getElementById('math-field_1'));
    this.mathFieldSpan.forEach((el:any)=>{

      let latexSpan = document.getElementById('latex');
      this.MQ = (window as any).MathQuill.getInterface(2);
      this.mathField.push(

        this.MQ?.MathField(el, {
          spaceBehavesLikeTab: true, // configurable
          supSubsRequireOperand: true,
          maxDepth: 1,
          handlers: {
            edit: (mathField:any) => {
              if (this.removeCharPressed) {
                this.removeCharPressed = false;
              }
            },
          },
        })
      )
      this.fillInTheBlank = this.MQ.StaticMath(
        document.getElementById('fill-in-the-blank')
      );
    })
  }
}
