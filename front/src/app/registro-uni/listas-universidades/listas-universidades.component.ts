import { Component, OnDestroy } from '@angular/core';
import { NgModule } from '@angular/core';
import { NbAccordionModule } from '@nebular/theme';
import { UsersService } from 'src/app/users/users.service';
import { CommonService } from 'src/app/users/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { saveAs } from 'file-saver';
import { RegistroUniComponent } from '../registro-uni.component';
import {MatDialog} from '@angular/material/dialog';
import { DialogBorrarUniversidadComponent } from 'src/app/dialogs/dialog-borrar-universidad/dialog-borrar-universidad.component';
@Component({
  selector: 'app-listas-universidades',
  templateUrl: './listas-universidades.component.html',
  styleUrls: ['./listas-universidades.component.scss']
})





export class ListasUniversidadesComponent implements OnDestroy {
  mySubscription: any;
  private subscriptionName: Subscription;
  universidades:any = [];
  participantes = [];
  public show = true;
  file:any;
  public fileName:string = ""
  public fileSize:string = ""
  public cantUni = 0;
  constructor(
      private dialog: MatDialog,
      private user:UsersService,
      private common: CommonService,
      private router:Router,
      private route: ActivatedRoute,
      private regUni:RegistroUniComponent,
      private appCom: AppComponent,
      private userService: UsersService,
    ) { 

      this.traerUniversidades();
      /* this.subscriptionName= this.common.getUpdate().subscribe
        (message => {
            this.user.getUniversidades().subscribe((data) =>{
              
              appCom.mostrarAlerta(message)
              this.updateUniversidades(data)
              let el = document.getElementsByClassName("listas");
              document.querySelector(".uploadedFileDiv")?.classList.remove("active");

              setTimeout(function(){
                const y = el[0].getBoundingClientRect().top - 110;
                window.scrollTo({ behavior: 'smooth', top: y})
              }, 100)
            })
        }); */
        
    }
    traerUniversidades(){
      this.user.getUniversidades().subscribe((data) =>{
        this.updateUniversidades(data)
      })
    }
    ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
      if (this.mySubscription) {
        this.mySubscription.unsubscribe();
      }
    }
    updateUniversidades(data:any){
      this.universidades = [];
      console.log(data)
      var count = 0;
      var buff = [""];
      data.forEach((element: any) => {
        if(count%2 == 0){
          buff = element;
        }else{
          this.universidades.push({"universidad":element[0], "participante":buff})
        }
        count++;
      });
    }
    fileUpload(archivo:any){
      console.log(1)
      this.fileName = archivo.value.split("\\", 3 )[2];
      this.fileSize = `${archivo.files[0].size / 100000} Mb`
      this.file = archivo.files.item(0);
    }
    generateExcelParticipante(){
      console.log("asd")
      this.user.generateExcelEstudiantes().subscribe(data=>{
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
        })
    }
    registrarParticipantesExcel(){
      this.userService.registrarParticipantesExcel(this.file).subscribe((data)=>{
        this.regUni.setActiveUniFunc();
        this.common.sendUpdate(data)
        this.fileName = "";
        this.fileSize = ""
        this.file = null;
        this.traerUniversidades();
      });
    }
    deleteU(nombre:string, idu:any){
      console.log(idu)
      this.dialog.open(DialogBorrarUniversidadComponent, {
        data: {nombre:nombre},
        width: '400px',
      }).afterClosed().subscribe((res)=>{
        if(res)
          this.userService.borrarUniversidadesEstudiantes(idu).subscribe(res=>{
            console.log(res);
            this.traerUniversidades();
          })
      });
    }
   
}



