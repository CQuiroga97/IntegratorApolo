import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-registro-uni',
  templateUrl: './registro-uni.component.html',
  styleUrls: ['./registro-uni.component.scss']
  
})
export class RegistroUniComponent {
  setActiveReg:boolean = false;
  
  public setActiveUni:boolean
  public setActiveUni2:boolean
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
}



/* import { Component, OnInit } from '@angular/core'; */



