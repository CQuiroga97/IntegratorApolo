/* import { Component } from '@angular/core'; */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-uni',
  templateUrl: './formulario-uni.component.html',
  styleUrls: ['./formulario-uni.component.scss']


  
})
export class FormularioUniComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [''],
      pais: [''],
      ciudad: [''],
      estudiantes: [''],
      logo: ['']
    });
  }

  submit() {
    console.log(this.form.value);
  }


}



