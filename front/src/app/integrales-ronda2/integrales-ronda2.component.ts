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
  public integralesCreadas:any = [];

  constructor(
    private user: UsersService,
    private toastrService: NbToastrService,
    private participante: ParticipanteService
  ){

    this.llamarIntegrales()
    this.integrales = [
      { selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null, correctOption: null },
    ];
  }


  fileUpload(event: any, index: number, indice: number): void {
    let i = 1;
    Array.from(event.target.files).forEach((file:any)=>{

      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          
          this.user.guardarIntegral({imagen:e.target.result}).subscribe((res:any)=>{
            if(res[0]){
              console.log(`Subiendo ${i} de ${event.target.files.length}`)
              if(i == event.target.files.length){
                this.llamarIntegrales()

              }
              i++;
            }
          })
        };
  
        reader.readAsDataURL(file);
  
      }
    })

    console.log(this.integrales)

  }



  nuevaintegral() {
    this.integrales.push({ selectedImage0: null, selectedImage1: null, selectedImage2: null, selectedImage3: null, selectedImage4: null })
  }

  deleteCard(index: number) {
    this.integrales.splice(index, 1);
  }
  borrar(id:any){
    const data = {idIntegral:id}
    this.user.borrarIntegral(data).subscribe(res=>{
      console.log(res);
      this.llamarIntegrales()
    })
  }
  llamarIntegrales(){
    
    this.user.llamarIntegrales().subscribe((result:any)=>{
      this.integralesCreadas = []
      result.forEach(async (el:any)=>{
        let blob = await fetch(`http://localhost:3000/integralesFinales/${el.idIntegral}.png?key=akjjyglc`).then(r => r.blob())
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = async ()=>{
          this.integralesCreadas.push({imagen:reader.result, id:el.idIntegral, estado:el.estado})
          console.log(this.integralesCreadas)
        }

      })
    })
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
