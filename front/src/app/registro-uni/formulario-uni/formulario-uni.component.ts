import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/users/common.service';
import { RegistroUniComponent } from '../registro-uni.component';
import * as XLSX from 'xlsx';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-formulario-uni',
  templateUrl: './formulario-uni.component.html',
  styleUrls: ['./formulario-uni.component.scss']
})
export class FormularioUniComponent {

  form!: FormGroup;
  nombre: string;
  pais: string;
  ciudad: string;
  cantEstudiantes: string;
  file: any = null;
  public fileName: string = ""
  public fileSize: string = ""
  public cantUni = 0;
  public arrayBuffer: any;
  public jsonData: any;
  public positions = NbGlobalPhysicalPosition;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private common: CommonService,
    private regUni: RegistroUniComponent,
    private _formBuilder: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [''],
      pais: [''],
      ciudad: [''],
      estudiantes: [''],
      correo: [''],
    });

  }
  dataUniversidad = this._formBuilder.group({
    nombre: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    estudiantes: ['', [Validators.required, Validators.min(5)]],
    correo: ['', [Validators.required, Validators.email]],
  });
  submit() {
    if (!this.dataUniversidad.valid) {
      if (!this.dataUniversidad.get('estudiantes')!.hasError('min')) {
        this.toastrService.show("Hay campos vacios", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      } else {
        this.toastrService.show("Debe haber minimo 5 estudiantes", "Error en el formulario", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      }
    } else {

      const universidad = { nombre: this.dataUniversidad.value.nombre, pais: this.dataUniversidad.value.pais, ciudad: this.dataUniversidad.value.ciudad, cantEstudiantes: this.dataUniversidad.value.estudiantes, correo: this.dataUniversidad.value.correo };

      this.userService.registrUniversidad(universidad).subscribe(() => {
        this.dataUniversidad.reset();
        this.toastrService.show(`La universidad ${this.dataUniversidad.value.nombre} ha sido guardad con éxito`, "Guardado", { status: "success", destroyByClick: true, icon: "checkmark-circle-2-outline" });
      }, () => {
        this.toastrService.show(`Universidad no registrada`, "Error", { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });

      })
    }
  }
  registrarUniversidadExcel() {
    this.userService.registrarUniversidadExcel(this.file).subscribe((data) => {
      if (data) {
        this.toastrService.show(data.texto, data.titulo, { status: "success", destroyByClick: true, icon: data.icono });
        this.fileName = "";
        this.fileSize = ""
        this.cantUni = 0;
        this.file = null;
      } else {
        this.toastrService.show(`Universidad no registrada`, "Error", { status: "danger", destroyByClick: true, icon: "checkmark-circle-2-outline" });
      }
    });
  }
  fileUpload(archivo: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = fileReader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial: any, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let hoja = Object.keys(this.jsonData)[0]
      this.jsonData = this.jsonData[hoja]
      this.cantUni = this.jsonData.length
    }
    this.fileName = archivo.value.split("\\", 3)[2];
    this.fileSize = `${archivo.files[0].size / 100000} Mb`
    this.file = archivo.files.item(0);
    fileReader.readAsArrayBuffer(this.file);
  }


}