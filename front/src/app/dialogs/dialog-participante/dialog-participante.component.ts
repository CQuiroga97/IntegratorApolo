import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-dialog-participante',
  templateUrl: './dialog-participante.component.html',
  styleUrls: ['./dialog-participante.component.scss']
})
export class DialogParticipanteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {participante: {
    nombre: "",
    email: "",
    universidad: "",
  },
  opcion:"",
  universidad:""
},
public dialogRef: MatDialogRef<DialogParticipanteComponent>,
private toastrService: NbToastrService,
private formBuilder:FormBuilder) { 
}

public dataParticipante = this.formBuilder.group({
  nombre: [this.data.participante!=null?this.data.participante.nombre:null, [Validators.required]],
  correo: [this.data.participante!=null?this.data.participante.email:null, [Validators.required, Validators.email]],
});
modificar(){
  if (!this.dataParticipante.valid) {
    this.toastrService.show("Hay campos vacios o incorrectos", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });

  } else
  this.dialogRef.close(this.dataParticipante.value)
}
}
