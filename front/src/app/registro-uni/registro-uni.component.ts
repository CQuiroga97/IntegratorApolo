import { Component, OnInit, ViewChild } from '@angular/core';
import { ListasUniversidadesComponent } from './listas-universidades/listas-universidades.component';

@Component({
  selector: 'app-registro-uni',
  templateUrl: './registro-uni.component.html',
  styleUrls: ['./registro-uni.component.scss'],
  
})
export class RegistroUniComponent {
  setActiveReg:boolean = false;
  @ViewChild('listasUniversidades') listaUni:ListasUniversidadesComponent;
  public setActiveUni:boolean
  public setActiveUni2:boolean
  public selectedTab = 0;
  constructor(
  ){

  }

  setActiveUniFunc(){
    this.setActiveUni = true;
    this.setActiveUni2 = false;
  }
  restoreActive(e:any){
    if(e.tabTitle == "Registro de universidades"){
      this.setActiveUni2 = true;
      this.setActiveUni = false;
    }
  }
  onTabChanged(ev:any){
    if(ev.index == 1){
      this.listaUni.traerUniversidades();
    }
  }
}



/* import { Component, OnInit } from '@angular/core'; */



