import { Component, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { CommonService } from 'src/app/users/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { saveAs } from 'file-saver';
import { RegistroUniComponent } from '../registro-uni.component';
import {MatDialog} from '@angular/material/dialog';
import { DialogBorrarUniversidadComponent } from 'src/app/dialogs/dialog-borrar-universidad/dialog-borrar-universidad.component';
import { DialogModificarUniversidadComponent } from 'src/app/dialogs/dialog-modificar-universidad/dialog-modificar-universidad.component';
import { NbToastrService } from '@nebular/theme';
import { DialogBorrarParticipanteComponent } from 'src/app/dialogs/dialog-borrar-participante/dialog-borrar-participante.component';
import { DialogParticipanteComponent } from 'src/app/dialogs/dialog-participante/dialog-participante.component';
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
      private toastrService: NbToastrService
      ) { 

      this.traerUniversidades();
        
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
      this.fileName = archivo.value.split("\\", 3 )[2];
      this.fileSize = `${archivo.files[0].size / 100000} Mb`
      this.file = archivo.files.item(0);
    }
    generateExcelParticipante(){
      this.user.generateExcelEstudiantes().subscribe(data=>{
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
        })
    }
    
    imagenUniversidad(event: any, index: number, indice: number): void {
      console.log(index)
      let i = 1;
      Array.from(event.target.files).forEach((file:any)=>{
  
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e: any) => {
            console.log(e.target.result)
            this.user.guardarLogoUniversidad({imagen:e.target.result, universidad:index}).subscribe((res:any)=>{
              console.log(res)
              this.traerUniversidades();
              // if(res[0]){
              //   if(i == event.target.files.length){
              //     this.llamarIntegrales()
  
              //   }
              //   i++;
              // }
            })
          };
    
          reader.readAsDataURL(file);
    
        }
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
      this.dialog.open(DialogBorrarUniversidadComponent, {
        data: {nombre:nombre},
        width: '400px',
      }).afterClosed().subscribe((res)=>{
        if(res)
          this.userService.borrarUniversidadesEstudiantes(idu).subscribe(res=>{
            if(res){
              this.toastrService.show(`La universidad ${nombre} ha sido eliminada con éxito`, "Registro eliminado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }else{
              this.toastrService.show(`La universidad no ha sido eliminada`, "Error", { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }
            this.traerUniversidades();
          })
      });
    }
    modificarUniversidad(universidad:any){
      this.dialog.open(DialogModificarUniversidadComponent, {
        data: {universidad: universidad.universidad, participantesTotal: universidad.participante.length},
        width: '1100px',
      }).afterClosed().subscribe(res=>{
        if(res){
          res["idUniversidad"] = universidad.universidad.idUniversidad;
          this.userService.modificarUniversidad(res).subscribe(res=>{
            if(res){
              this.toastrService.show(`La universidad ha sido modificada con exito`, "Registro modificado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }else{
              this.toastrService.show(`La universidad no ha sido modificada`, "Error", { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }
            this.traerUniversidades();
          })
        }
      })
    }
    borrarParticipante(idParticipante:any, nombre:any){
      this.dialog.open(DialogBorrarParticipanteComponent, {
        data: {nombreParticipante: nombre, idParticipante: idParticipante},
        width: '600px',
      }).afterClosed().subscribe((res)=>{
        if(res)
        this.userService.borrarParticipante(idParticipante).subscribe(res=>{
          if(res){
            this.toastrService.show(`Participante eliminado con éxito`, "Registro eliminado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
          }else{
            this.toastrService.show(`La universidad no ha sido modificada`, res["error"]["titulo"], { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
          }
          this.traerUniversidades();
        })
      });
    }
    crearParticipante(participante:any, universidad:any){
      this.dialog.open(DialogParticipanteComponent, {
        data: {participante: participante, universidad: universidad.nombre, opcion:"Crear nuevo "},
        width: '600px',
      }).afterClosed().subscribe(res=>{
        if(res){
          res["idUniversidad"] = universidad.idUniversidad;
          this.userService.insertarParticipante(res).subscribe(res2=>{
            if(res2){
              this.toastrService.show(`Participante creado con éxito`, "Registro creado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }else{
              this.toastrService.show(`La universidad no ha sido modificada`, res2["error"]["titulo"], { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }
            this.traerUniversidades();
          })
        }
      })
    }
    modificarParticipante(participante:any, universidad:any){
      this.dialog.open(DialogParticipanteComponent, {
        data: {participante: participante, universidad: universidad.nombre, opcion:"Crear nuevo "},
        width: '600px',
      }).afterClosed().subscribe(res=>{
        if(res){
          res["idUniversidad"] = universidad.idUniversidad;
          res["id"] = participante.idParticipante;
          res["pass"] = participante.pass;
          this.userService.modificarParticipante(res).subscribe(res2=>{
            if(res2){
              this.toastrService.show(`Participante modificado con éxito`, "Registro modificado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }else{
              this.toastrService.show(`La universidad no ha sido modificada`, res2["error"]["titulo"], { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            }
            this.traerUniversidades();
          })
        }
      })
    }
   
}



