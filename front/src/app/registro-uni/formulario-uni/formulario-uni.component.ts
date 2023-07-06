/* import { Component } from '@angular/core'; */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/users/common.service';
import { RegistroUniComponent } from '../registro-uni.component';
import * as XLSX from 'xlsx';
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
  file:any = null;
  public fileName:string = ""
  public fileSize:string = ""
  public cantUni = 0;
  public arrayBuffer:any;
  public jsonData:any;
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UsersService,
    private common: CommonService,
    private regUni:RegistroUniComponent,
    private _formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [''],
      pais: [''],
      ciudad: [''],
      estudiantes: [''],
      logo: ['']
    });
  }
  dataUniversidad = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(8)]],
    pais: ['', [Validators.required, Validators.minLength(8)]],
    ciudad: ['', [Validators.required, Validators.minLength(8)]],
    estudiantes: ['', [Validators.required, Validators.min(5)]],
  });
  submit() {
    console.log(this.dataUniversidad)
    /* const universidad = {nombre:this.nombre, pais:this.pais, ciudad:this.ciudad, cantEstudiantes:this.cantEstudiantes};

    this.userService.registrUniversidad(universidad).subscribe(()=>{
      console.log("Universidad registrada!")
    }, ()=>{
      console.log("Universidad no registrada!")

    }) */
  }
  registrarUniversidadExcel(){
    this.userService.registrarUniversidadExcel(this.file).subscribe((data)=>{
      this.regUni.setActiveUniFunc();
      this.common.sendUpdate(data)
    });
  }
  fileUpload(archivo:any){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = fileReader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial:any, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let hoja = Object.keys(this.jsonData)[0]
      this.jsonData = this.jsonData[hoja]
      this.cantUni = this.jsonData.length
    }
    this.fileName = archivo.value.split("\\", 3 )[2];
    this.fileSize = `${archivo.files[0].size / 100000} Mb`
    this.file = archivo.files.item(0);
    fileReader.readAsArrayBuffer(this.file);
  }

}



