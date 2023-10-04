import { Component, ViewChild, OnInit } from '@angular/core';
import { SocketService } from '../users/socket.service';
import { UsersService } from '../users/users.service';
import { Peer } from "peerjs";
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
    socket.volverALlamar().subscribe(()=>{
    })
    this.llamarEliminatorias()
    
  }
  ngOnInit(): void {
    this.peer = new Peer("integrator-call-1");
    this.socket.volverALlamar().subscribe((res)=>{
      this.crearPeer(res);
    })
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
    this.participantes.forEach((el:any)=>{
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
