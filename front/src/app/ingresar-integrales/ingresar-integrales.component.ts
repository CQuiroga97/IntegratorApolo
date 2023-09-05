import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-ingresar-integrales',
  templateUrl: './ingresar-integrales.component.html',
  styleUrls: ['./ingresar-integrales.component.scss']
})
export class IngresarIntegralesComponent {
  integrales: any[] = [];




  constructor(
    private user: UsersService,
    private toastrService: NbToastrService
  ) {
    this.integrales = [
      { selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: null },
    ];
  }


  selectedImage: any;

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


  guardarIntegrales() {

    const data = {
      imagenes: this.integrales
    }

    console.log(this.integrales)



    this.user.ingresarIntegrales(data).subscribe(res=> {
      this.toastrService.show(`integrales ingresadas con éxito`, "Guardado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
    })


    this.cerrarConfirmacion();
  }




}
