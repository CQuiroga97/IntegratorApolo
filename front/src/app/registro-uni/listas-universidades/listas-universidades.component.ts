import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NbAccordionModule } from '@nebular/theme';





@Component({
  selector: 'app-listas-universidades',
  templateUrl: './listas-universidades.component.html',
  styleUrls: ['./listas-universidades.component.scss']
})





export class ListasUniversidadesComponent implements OnInit {

  dataArray = [{
    header: 'Universidad de America',
    imageUrl: 'https://www.emagister.com.co/assets/co/logos/centro/id/64982/size/l.jpg',
    persons: [
      { name: 'Camilo ', surname: 'Ramirez', position: '1', career: 'Ingeniería de sistemas' },
      { name: 'Cristhian ', surname: 'Quiroga', position: '2', career: 'Ingeniería de ambiental' },
      { name: 'Miguel', surname: 'Moreno', position: '3', career: 'Scrum Master' },]
  },
  {
    header: 'universidad Central',
    imageUrl: 'https://www.ucentral.edu.co/themes/ucentral/img/template/Universidad%20Central.png',
    persons: [
      { name: 'Jaime', surname: 'Cardenas', position: '1', career: 'Diseño' },
      { name: 'Paula', surname: 'Díaz', position: '2', career: 'Derecho' },
      { name: 'Lucía', surname: 'Ruiz', position: '3', career: 'Educación' },
    ]
  }
  ];

  constructor() { }

  ngOnInit() {
  }

}



