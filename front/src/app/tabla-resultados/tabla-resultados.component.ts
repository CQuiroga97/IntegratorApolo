import { Component } from '@angular/core';
import { ParticipanteService } from '../users/participante.services';
import { ToastrService } from 'ngx-toastr';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrls: ['./tabla-resultados.component.scss']
})
export class TablaResultadosComponent {
  public primeros = [];
  public siguientes = [];
  public universidades = []
  constructor(
    private participanteService:ParticipanteService,
    private toast:NbToastrService,
    private router:Router,
    private user:UsersService
  ){
    participanteService.obtenerTopParticipantesPuntaje().subscribe((result:any)=>{
      
      if(result[1].length < 11){
        toast.warning("Vuelve más tarde", "Aún no se han completado los cupos.");
        router.navigate(["./"])
      }
      user.getTopUniversidades().subscribe((res:any)=>{
        this.universidades = res;
      })
      this.primeros = result[0]
      this.siguientes = result[1]
    })
  }
}
