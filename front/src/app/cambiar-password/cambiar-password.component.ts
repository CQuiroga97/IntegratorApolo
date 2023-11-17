import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { NbToastrService } from '@nebular/theme';
import * as CryptoJS from 'crypto-js';
import { UsersService } from '../users/users.service';  
import { Router } from '@angular/router';
@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})
export class CambiarPasswordComponent {
  public correo = "";
  constructor(
    private activateRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private userService:UsersService,
    private formBuilder:FormBuilder,
    private router:Router
    ){
    this.activateRoute.queryParams.subscribe(params => {
      this.correo = CryptoJS.AES.decrypt(params["user"], "key").toString(CryptoJS.enc.Utf8)
    });
  }
  public dataParticipante = this.formBuilder.group({
    pass1: ["", [Validators.required, Validators.minLength(8)]],
    pass2: ["", [Validators.required]],
  });
  submit(){
    if(this.dataParticipante.valid){
      if(this.dataParticipante.value.pass1 == this.dataParticipante.value.pass2){
        let data = {
          correo:this.correo,
          pass:this.dataParticipante.value.pass1
        }
        this.userService.modificarContrasenaParticipante(data).subscribe(res=>{
          if(res){
            this.toastrService.show(`Su contraseña ha sido cambiada con éxito`, "Registro modificado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
            this.router.navigate(["/"])
          }else{
            this.toastrService.show(`No se ha cambiado la contraseña`, "Error", { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
          }
        })
      }else{
        this.toastrService.show("Las contraseñas deben coincidir", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      }
    }else{
      if(this.dataParticipante.controls.pass1.errors!["minlength"]){
        this.toastrService.show("La contraseña debe tener al menos 8 caracteres", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      }else{
        this.toastrService.show("No pueden haber campos vacios", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      }
    }
  }
}
