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
  
  public dataParticipante:any;
  public cantLlamadas = 0;
  public cronometroTimer:any;
  public cronometroFront:{minutos:number, segundos:number, mill:number};
  public tiempoOriginal:{minutos:number, segundos:number, mill:number};
  public segundos = 3;
  public countDown:any;
  public integral:any = null;
  public estado = 0;
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
    this.dataParticipante = userService.getUserInfo().data;
    const peer = new Peer("integrator-call-"+this.dataParticipante.idParticipante);

    this.iniciarIntegralParticipante()

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: true }
      ).then((stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        
      });
    });
    this.getEliminatoriaParticipante();
    this.iniciarCronometroParticipante();

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
  iniciarIntegralParticipante(){
    this.socket.iniciarIntegralParticipante().subscribe(()=>{
      this.estado = 1;
      this.user.getIntegralesAdmin().subscribe((res:any)=>{
        res.forEach(async (el:any)=>{
          if(el[0].estado == 1){
            let blob = await fetch(`http://localhost:3000/integralesFinales/${res[0][0].idIntegral}.png?key=akjjyglc`).then(r => r.blob())
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
