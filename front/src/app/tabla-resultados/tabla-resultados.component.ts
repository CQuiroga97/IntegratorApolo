import { Component } from '@angular/core';
import { ParticipanteService } from '../users/participante.services';

@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrls: ['./tabla-resultados.component.scss']
})
export class TablaResultadosComponent {
  public primeros = [];
  public siguientes = [];
  constructor(
    private participanteService:ParticipanteService
  ){
    participanteService.obtenerTopParticipantesPuntaje().subscribe((result:any)=>{
      console.log(result)
      this.primeros = result[0]
      this.siguientes = result[1]
    })
  }
}
