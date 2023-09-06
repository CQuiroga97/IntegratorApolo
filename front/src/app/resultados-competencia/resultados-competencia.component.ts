import { Component } from '@angular/core';
import { ParticipanteService } from '../users/participante.services';

@Component({
  selector: 'app-resultados-competencia',
  templateUrl: './resultados-competencia.component.html',
  styleUrls: ['./resultados-competencia.component.scss']
})
export class ResultadosCompetenciaComponent {
  public participantes:any = [];
  public respuestas:any = {};
  public convert = JSON;
  constructor(
    participanteService:ParticipanteService
    ){

    participanteService.obtenerInfoParticipantes().subscribe((res:any)=>{
      console.log(res)
      res.participantes.forEach((element:any) =>{
        element.respuestasJSON = JSON.parse(element.respuestasJSON)
      })
      console.log(res)
      this.participantes = res.participantes;
      res.respuestas.forEach((el:any)=>{
        this.respuestas[el.nombreIntegral] = el.respuesta;
      })
      
    })
  }

}
