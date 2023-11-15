import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { SocketService } from 'src/app/users/socket.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NbToastrService } from '@nebular/theme';
import { ParticipanteService } from 'src/app/users/participante.services';
@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.component.html',
  styleUrls: ['./clasificaciones.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.5s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'inOutAnimationIntegrales', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.3s ease-in', 
                    style({ opacity: 0 }))
          ] 
        )
      ]
    )
  ]
})
export class ClasificacionesComponent implements OnInit{
  public bannerEspera = false;
  public bannerLobby = false;
  public inicioCompetencia = new Date("2023-11-16T08:15:00");
  public dias = 0;
  public loaded = false;
  public timerComienzo:any;
  public cantIntegrales = 0;
  public enPrueba = false;
  public timerInicio:{hora:number,minutos:number,segundos:number};
  public tiempo:any = {minutos:0, segundos:0};
  constructor(
    private router:Router,
    private user:UsersService,
    private socket:SocketService,
    private toastrService:NbToastrService,
    private participanteService: ParticipanteService,
  ){

  }
  ngOnInit(): void {

    this.participanteService.getIntegralesClasificaciones().subscribe((res:any)=>{
      this.cantIntegrales = res.integrales.length;
    })
    this.participanteService.getTimerClasificaciones().subscribe((res2:any) =>{
      this.tiempo = res2;
    })
    this.user.llamarEncuentros().subscribe((re2s:any)=>{
      if(re2s.length == 0){
        this.socket.getEstadoClasificatorias().subscribe(res =>{
          console.log(res)
          if(!res.estado){
            this.bannerLobby = !res.estado;
            setTimeout(()=>{
              this.bannerEspera = res.estado;
            }, 510)
            if(!this.loaded){
              this.loaded = true;
              if(this.inicioCompetencia>fechaActual){
                this.timerComienzo = this.timer();
              }else{
                this.bannerLobby = false;
                setTimeout(()=>{
                  this.bannerEspera = true;
                }, 510)
              }
            }
          }else{
            if(!this.loaded){
              this.loaded = true;
              if(res.estado){
                this.toastrService.show(`Las clasificatorias ya han empezado`, "Acceso inhabilitado", { status: "warning", destroyByClick: true, icon: "checkmark-circle-2-outline" });
                this.router.navigate(["/"])
                
              }
            }
            this.loaded = false;
            setTimeout(()=>{
              this.enPrueba = true;
            }, 510)
          }
        })
      }else{
        window.location.href = "./participante/segundaRonda"
      }
    })
    
    this.socket.getEstadoClasificatoriasEmit();
    const fechaActual = new Date();
    const diff = Math.abs(this.inicioCompetencia.getTime() - fechaActual.getTime())
    this.dias = Math.ceil(diff / (1000 * 3600 * 24))
    this.dias = isNaN(this.dias)?0:this.dias;
    const data = this.user.getUserInfo().data;
    this.socket.emitUser({id:data.idParticipante, nombre:data.nombreParticipante})
    
  }
  timer(){
    return setInterval(()=>{
      const fechaActual = new Date();
      if(this.inicioCompetencia <= fechaActual){
        clearInterval(this.timerComienzo);
        this.bannerLobby = false;
        setTimeout(()=>{
          this.bannerEspera = true;
        }, 510)
      }else{

        this.timerInicio = {
          hora:(this.inicioCompetencia.getHours() - fechaActual.getHours()),
          minutos:(this.inicioCompetencia.getMinutes() - fechaActual.getMinutes() - 1),
          segundos:(this.inicioCompetencia.getSeconds() - fechaActual.getSeconds() - 1)
        }
        this.timerInicio.hora = this.timerInicio.hora < 0 ? this.timerInicio.hora + 24 : this.timerInicio.hora;
        this.timerInicio.minutos = this.timerInicio.minutos < 0 ? this.timerInicio.minutos + 60 : this.timerInicio.minutos;
        this.timerInicio.segundos = this.timerInicio.segundos < 0 ? this.timerInicio.segundos + 60 : this.timerInicio.segundos;
        
      }
    }, 1000);
  }
  volver(){
    this.router.navigate(["/"])
  }
 
  
}
