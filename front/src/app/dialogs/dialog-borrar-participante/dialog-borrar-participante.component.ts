import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-participante',
  templateUrl: './dialog-borrar-participante.component.html',
  styleUrls: ['./dialog-borrar-participante.component.scss']
})
export class DialogBorrarParticipanteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{
      idParticipante:0,
      nombreParticipante:""
    },
    ){

  }
}
