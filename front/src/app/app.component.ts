import { Component, OnInit } from '@angular/core';
import { UsersService } from './users/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  iconoN = "";
  tituloN = "";
  textoN = "";
  title = 'front';
  isLog = false;
  constructor(
    public userService:UsersService
  ){
  }
  ngOnInit(): void {
    /* this.isLog = this.userService.isLoggedIn(); */
  }
  getLog(){
    return this.isLog;
  }
  setLog(val:boolean){
    this.isLog = val;
  }
  setIcono(icono:string){
    this.iconoN = icono;
  }
  mostrarAlerta(datos:any){
    this.iconoN = datos.icono;
    this.tituloN = datos.titulo;
    this.textoN = datos.texto;
    document.getElementsByClassName("notificacionAbajo")[0].classList.add("activo");
    setTimeout(function(){
      document.getElementsByClassName("notificacionAbajo")[0].classList.remove("activo");
    }, 7000)
  }
  cerrarModalNotificacion(){
    document.getElementsByClassName("notificacionAbajo")[0].classList.remove("activo");
  }
}
