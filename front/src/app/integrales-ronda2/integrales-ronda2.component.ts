import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ParticipanteService } from '../users/participante.services';

@Component({
  selector: 'app-integrales-ronda2',
  templateUrl: './integrales-ronda2.component.html',
  styleUrls: ['./integrales-ronda2.component.scss']
})
export class IntegralesRonda2Component {
  integrales: any[] = [];


  constructor(
    private user: UsersService,
    private toastrService: NbToastrService,
    private participante: ParticipanteService
  ){


    this.integrales = [
      { selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: null },
    ];
  }


  fileUpload(event: any, index: number, indice: number): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const selectedImageProperty = 'selectedImage' + indice;
        this.integrales[index][selectedImageProperty] = e.target.result;
      };

      reader.readAsDataURL(file);
    }

    console.log(this.integrales)

  }



  nuevaintegral() {
    this.integrales.push({ selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null })
  }

  deleteCard(index: number) {
    this.integrales.splice(index, 1);
  }


  /* Mensaje de confirmacion  */


  mostrarConfirmacion = false;


  abrirConfirmacion() {
    this.mostrarConfirmacion = true;
  }


  cerrarConfirmacion() {
    this.mostrarConfirmacion = false;
  }




  guardarIntegrales(num:number) {
    if(this.integrales[num]){

      const data = {
        imagenes: this.integrales[num],
        numIntegral: num
      }



      this.user.ingresarIntegralesSegundaRonda(data).subscribe(res=> {

        this.toastrService.show(`Integral ${num + 1} guardada con éxito`, "Guardado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
        this.guardarIntegrales(num+1)
      })
    }


    this.cerrarConfirmacion();
  }



}
