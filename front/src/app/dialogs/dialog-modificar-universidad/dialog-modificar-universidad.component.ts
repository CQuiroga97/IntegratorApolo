import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-dialog-modificar-universidad',
  templateUrl: './dialog-modificar-universidad.component.html',
  styleUrls: ['./dialog-modificar-universidad.component.scss']
})
export class DialogModificarUniversidadComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {universidad: {
    nombre: "",
    correo: "",
    sede: "",
    pais: "",
    cantParticipantes: "",
  }, participantesTotal:0}, 
  @Inject(MAT_DIALOG_DATA) public participantesTotal:any,
  public dialogRef: MatDialogRef<DialogModificarUniversidadComponent>,
  private toastrService: NbToastrService,
  private formBuilder:FormBuilder) { 
  }
 
  public dataUniversidad = this.formBuilder.group({
    nombre: [this.data.universidad.nombre, [Validators.required]],
    pais: [this.data.universidad.sede, [Validators.required]],
    ciudad: [this.data.universidad.pais, [Validators.required]],
    estudiantes: [this.data.universidad.cantParticipantes, [Validators.required, Validators.min(this.data.participantesTotal)]],
    correo: [this.data.universidad.correo, [Validators.required, Validators.email]],
  });
  modificar(){
    if (!this.dataUniversidad.valid) {
      if (!this.dataUniversidad.get('estudiantes')!.hasError('min')) {
        this.toastrService.show("Hay campos vacios", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      } else {
        this.toastrService.show("No se puede cambiar a un numero menor al registro de estudiantes actual", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      }
    } else
    this.dialogRef.close(this.dataUniversidad.value)
  }
}
