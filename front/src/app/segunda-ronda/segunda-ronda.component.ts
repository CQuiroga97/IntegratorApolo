import { Component, OnInit } from '@angular/core';
import { ParticipanteService } from '../users/participante.services';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NbToastrService } from '@nebular/theme';
import { SocketService } from '../users/socket.service';
import { Peer } from "peerjs";

@Component({
  selector: 'app-segunda-ronda',
  templateUrl: './segunda-ronda.component.html',
  styleUrls: ['./segunda-ronda.component.scss'],
  template: `<ng-katex [equation]="equation"></ng-katex>`
})
export class SegundaRondaComponent{
  removeCharPressed = false;
  formulaRespuesta: string = '';
  public participante:any = null;
  public dataParticipante:any;
  public cantLlamadas = 0;
  public cronometroTimer:any;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  public segundos = 3;
  public countDown:any;
  public integral:any = null;
  public estado = 0;
  public respuestaEnviada = false
  public imagenDefault:any = '../../assets/img/streaming/Group 70.png';
  public enCompetencia = false;
  MQ:any = null;
  mathFieldSpan:any;
  fillInTheBlank:any;
  mathField:any;
  symbols: any[] = [
    {simbolo:"(", latex:["("]},
    {simbolo:"[", latex:["["]},
    {simbolo:"{", latex:["{"]},
    {simbolo:"^", latex:["^"]},
    {simbolo:"sin(■)", latex:["\\sin", "("]},
    {simbolo:"cos(■)", latex:["\\cos", "("]},
    {simbolo:"tan(■)", latex:["\\tan", "("]},
    {simbolo:"ln(■)", latex:["\\ln", "("]},
    {simbolo:"sec(■)", latex:["\\sec", "("]},
    {simbolo:"csc(■)", latex:["\\csc", "("]},
    {simbolo:"cot(■)", latex:["\\cot", "("]},
    {simbolo:"sinh(■)", latex:["\\sinh", "("]},
    {simbolo:"cosh(■)", latex:["\\cosh", "("]},
    {simbolo:"tanh(■)", latex:["\\tanh", "("]},
    {simbolo:"e", latex:["e", "^"]},
    {simbolo:"√", latex:["e", "\\sqrt"]},
    {simbolo:"arcsin(■)", latex:["\\arcsin", "("]},
    {simbolo:"arcos(■)", latex:["\\arcos", "("]},
    {simbolo:"arctan(■)", latex:["\\arctan", "("]},
    {simbolo:"arcsinh(■)", latex:["\\arcsinh", "("]},
    {simbolo:"arcosh(■)", latex:["\\arcosh", "("]},
    {simbolo:"arctanh(■)", latex:["\\arctanh", "("]},
    {simbolo:"arcsec(■)", latex:["\\arcsec", "("]},
    {simbolo:"arccsc(■)", latex:["\\arccsc", "("]},
    {simbolo:"arccot(■)", latex:["\\arccot", "("]},
    {simbolo:"/", latex:["\\dfrac", "("]},

    ];
  constructor(
    private participanteService:ParticipanteService,
    private userService:UsersService,
    private router:Router,
    private toast:NbToastrService,
    private socket:SocketService,
    private user:UsersService
  ){
    
    this.cronometroFront = {minutos:5,segundos:0, mill:0}
    this.tiempoOriginal = this.cronometroFront
    this.dataParticipante = userService.getUserInfo().data;
    const peer = new Peer("integrator-call-"+this.dataParticipante.idParticipante);
    this.finalizar()
    this.iniciarIntegralParticipante()

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: true }
      ).then((stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        
      }).catch((error:any)=>{
        console.log(error)
      });
    });
    this.getEliminatoriaParticipante();
    this.iniciarCronometroParticipante();
    this.confirmarTiempoParticipante();
    this.llamarEliminatorias();
    this.sumarPuntajeParticipante();
    setTimeout(()=>{

      socket.conectarCamara();
    }, 1000)
  }
  finalizar(){
    this.socket.finalizarParticipante().subscribe(()=>{
      window.location.href = "./"
    })
  }
  llamarEliminatorias(){
    this.user.getEliminatoriaActiva().subscribe((res:any)=>{
      if(res){
        res.forEach((el:any)=>{
          if(el.idParticipante[0] == this.dataParticipante.idParticipante)
            this.participante = el;
        })
        
      }
      setTimeout(()=>{

        this.socket.pedirLlamada();
      }, 1000)
    })
  }
  sumarPuntajeParticipante(){
    this.socket.sumarPuntajeParticipante().subscribe(()=>{
      this.reiniciar();
    })
  }
  countDownSeconds(){
    return setInterval(()=>{
      if(this.segundos == 0){
        clearInterval(this.countDown);
        this.enCompetencia = true;
        this.cronometroTimer = this.cronometro();
      }
      this.segundos--;
    }, 1000)
  }
  iniciarCronometroParticipante(){
    this.socket.iniciarCronometroParticipante().subscribe(()=>{
      this.estado = 3
      this.countDown = this.countDownSeconds();
    })
  }
  pausarCronometro(){
    this.guardarRespuesta()
    clearInterval(this.cronometroTimer);
    this.socket.pausarCronometro(this.dataParticipante.idParticipante)
  } 
  reiniciar(){
    if(!this.respuestaEnviada)
      this.guardarRespuesta()
    this.cronometroFront = this.tiempoOriginal;
    this.estado = 0;
    this.integral = null;
    this.enCompetencia = false;
    this.mathField.latex("")
    this.validate(null)
    this.llamarEliminatorias();
  }
  getEliminatoriaParticipante(){
    this.participanteService.getEliminatoriaParticipante(this.dataParticipante).subscribe((result:any)=>{
      if(result[0]){
        this.participanteService.getPosicionParticipante(this.dataParticipante).subscribe((res:any)=>{
          let clasificacion = 1;
          if(res[0])
            clasificacion += res.length
          this.dataParticipante["texto_1"] = "";
          this.socket.loginSegundaRonda(this.dataParticipante, clasificacion)
          this.socket.pedirLlamada();
        })
      }else{
        this.toast.warning("Tu usuario no se encuentra en ronda actualmente.", "Vuelve más tarde")
        this.router.navigate(["./"])
      }
    })
  }
  guardarRespuesta(){
    this.respuestaEnviada = true;
    this.enCompetencia = false;
    if(this.participante.texto_1 == "")
      this.participante.texto_1 = this.mathField.latex()
    else if(this.participante.texto_2 == "")
      this.participante.texto_2 = this.mathField.latex()
    else if(this.participante.texto_3 == "")
      this.participante.texto_3 = this.mathField.latex()
    if(this.participante.tiempo_1 == "")
      this.participante.tiempo_1 = `${this.cronometroFront.minutos}:${this.cronometroFront.segundos}:${this.cronometroFront.mill}`
    else if(this.participante.tiempo_2 == "")
      this.participante.tiempo_2 = `${this.cronometroFront.minutos}:${this.cronometroFront.segundos}:${this.cronometroFront.mill}`
    else if(this.participante.tiempo_3 == "")
      this.participante.tiempo_3 = `${this.cronometroFront.minutos}:${this.cronometroFront.segundos}:${this.cronometroFront.mill}`
    this.participanteService.updateTexto(this.participante).subscribe(res=>{
      console.log(res)
    })

  }
  confirmarTiempoParticipante(){
    this.socket.confirmarTiempoParticipante().subscribe((res)=>{
      if(this.dataParticipante.idParticipante == res.idParticipante){
        this.cronometroFront = {
          minutos:res.minutos,
          segundos:res.segundos,
          mill:res.mill,

        }
      }
    })
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
              if(this.integral){
                this.estado = 2
                this.socket.participantePreparado(true);
              }
            }
          }
        })
      })
    })
  }
  validate(evt:any) {
    this.socket.editarTexto(this.mathField.latex())
  }
  focus(){
    this.mathField.focus();
  }
  
  onClickMathButton(button:any) {
    button.forEach((el:any)=>{

      this.mathField.cmd(el);
    })
    this.mathField.focus();
  }
  ngAfterViewInit() {
    this.mathFieldSpan = document.getElementById('math-field');
    
    let latexSpan = document.getElementById('latex');
    this.MQ = (window as any).MathQuill.getInterface(2);
    this.mathField = this.MQ?.MathField(this.mathFieldSpan, {
      spaceBehavesLikeTab: true, // configurable
      supSubsRequireOperand: true,
      maxDepth: 1,
      handlers: {
        edit: (mathField:any) => {
          if (this.removeCharPressed) {
            this.removeCharPressed = false;
            this.tempFunc();
          }
        },
      },
    });
    // this.mathFieldSpan.getElementsByTagName('textarea')[0].setAttribute("(keypress)", "tempFunc()");
    this.fillInTheBlank = this.MQ.StaticMath(
      document.getElementById('fill-in-the-blank')
    );
  }
  onButtonClick(symbol: string) {

    this.formulaRespuesta += symbol;
  }
  tempFunc() {
    for (const elemnt of this.varSet)
      if (this.mathField.latex().includes(elemnt)) continue;
      else {
        this.varSet.delete(elemnt);
      }
  }
  imgIntegralActual: string = '../../assets/img/streaming/Group 70.png';
  varSet = new Set();
  hours: string =  "00";
  minuts: string = "00";
  seconds: string = "00";

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

 /*  mathequations = ['H = \\ sum_ {i = 1} ^ {m} p_ {i} log_ {2} (p_ {i})']

  equation: string = '\\sum_{i=1}^nx_i';
 */
}
