import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NbAccordionModule } from '@nebular/theme';
import { UsersService } from 'src/app/users/users.service';




@Component({
  selector: 'app-listas-universidades',
  templateUrl: './listas-universidades.component.html',
  styleUrls: ['./listas-universidades.component.scss']
})





export class ListasUniversidadesComponent implements OnInit {

  
  universidades = [];
  constructor(
      private user:UsersService
    ) { 
      this.user.getUniversidades().subscribe((data) =>{
        
        this.universidades = data;
      })
    }

  ngOnInit() {
    
  }

}



