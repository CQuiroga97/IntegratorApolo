import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-universidad',
  templateUrl: './dialog-borrar-universidad.component.html',
  styleUrls: ['./dialog-borrar-universidad.component.scss']
})
export class DialogBorrarUniversidadComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {nombre: string}) { }
}
