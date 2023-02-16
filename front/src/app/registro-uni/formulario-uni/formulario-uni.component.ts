/* import { Component } from '@angular/core'; */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-formulario-uni',
  templateUrl: './formulario-uni.component.html',
  styleUrls: ['./formulario-uni.component.scss']


  
})
export class FormularioUniComponent {

  form!: FormGroup;
  nombre:string;
  pais:string;
  ciudad:string;
  cantEstudiantes:string;
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UsersService) { }

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
    const universidad = {nombre:this.nombre, pais:this.pais, ciudad:this.ciudad, cantEstudiantes:this.cantEstudiantes};
    console.log(universidad)
    this.userService.registrUniversidad(universidad).subscribe(()=>{
      console.log("Universidad registrada!")
    }, ()=>{
      console.log("Universidad no registrada!")

    })
  }


}



