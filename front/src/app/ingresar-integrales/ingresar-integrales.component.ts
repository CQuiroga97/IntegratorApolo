import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ParticipanteService } from '../users/participante.services';

@Component({
  selector: 'app-ingresar-integrales',
  templateUrl: './ingresar-integrales.component.html',
  styleUrls: ['./ingresar-integrales.component.scss']
})
export class IngresarIntegralesComponent {
  integrales: any[] = [];




  constructor(
    private user: UsersService,
    private toastrService: NbToastrService,
    private participante: ParticipanteService
  ) {
    this.integrales = [
      { selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: null },
    ];
    participante.getRespuestasIntegrales().subscribe((res:any)=>{
      if(res.length > 0){

        this.integrales = [];
        res.forEach((el:any)=>{
          this.integrales.push({ selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: null })
        })
        let i = 0;
        res.forEach(async (el:any)=>{
          
          let buff:any = { selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: `${el.respuesta}`  }
          let blob = await fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/integral.png`).then(r => r.blob())
          const reader = new FileReader();
          reader.readAsDataURL(blob)
          reader.onloadend = async ()=>{
            buff.selectedImage0 = reader.result;
            blob = await fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/respuestas/respuesta1.png`).then(r => r.blob())
            reader.readAsDataURL(blob)
            reader.onloadend = async ()=>{
              buff.selectedImage1 = reader.result;
              blob = await fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/respuestas/respuesta2.png`).then(r => r.blob())
              reader.readAsDataURL(blob)
              reader.onloadend = async ()=>{
                buff.selectedImage2 = reader.result;
                blob = await fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/respuestas/respuesta3.png`).then(r => r.blob())
                reader.readAsDataURL(blob)
                reader.onloadend = async ()=>{
                  buff.selectedImage3 = reader.result;
                  blob = await fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/respuestas/respuesta4.png`).then(r => r.blob())
                  reader.readAsDataURL(blob)
                  reader.onloadend = async ()=>{
                    buff.selectedImage4 = reader.result;
                    this.integrales[i] = buff;
                    i++;
                  }
                }
              }
            }
          }
          
          // fetch(`https://integratorapi.azurewebsites.net/images/${el.nombreIntegral}/integral.png`).then(res2 => res2.blob()).then(blob=>{
          //   const reader = new FileReader();
          //   reader.readAsDataURL(blob)
          //   reader.onloadend = (res)=>{
          //     buff.selectedImage0 = reader.result;
  
          //     this.integrales.push(buff)
          //   }
          // })
        })
      }
    })
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
  
  
  
      this.user.ingresarIntegrales(data).subscribe(res=> {

        this.toastrService.show(`Integral ${num + 1} guardada con éxito`, "Guardado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
        this.guardarIntegrales(num+1)
      })
    }


    this.cerrarConfirmacion();
  }




}
