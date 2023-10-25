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
  public anterior:any;
  constructor(
    private participanteService:ParticipanteService
    ){

    this.getInfo()
    setInterval(()=>{
      this.getInfo()
    },1500)
  }
  getInfo(){

      this.participanteService.obtenerInfoParticipantes().subscribe((res:any)=>{
        res.participantes.forEach((element:any) =>{
          element.respuestasJSON = JSON.parse(element.respuestasJSON)
        })
        if(this.anterior !== JSON.stringify(res.participantes) ){
          this.anterior = JSON.stringify(res.participantes);
          this.participantes = res.participantes;
          res.respuestas.forEach((el:any)=>{
            this.respuestas[el.nombreIntegral] = el.respuesta;
          })
          
        }
        
      })
  }
}
