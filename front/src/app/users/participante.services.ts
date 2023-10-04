import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "./users.service";
@Injectable({
    providedIn:"root"
})

export class ParticipanteService{
    constructor(
        private http:HttpClient,
        private user:UsersService,
    ){

    }
    getIntegralesClasificaciones(){
        return this.http.post("http://localhost:3000/api/getIntegralesClasificaciones", this.user.getUserInfo())
    }
    guardarRespuestaParticipante(data:any){
        return this.http.post("http://localhost:3000/api/guardarRespuestaParticipante", data)
    }
    getTimerClasificaciones(){
        return this.http.post("http://localhost:3000/api/getTimerClasificaciones","");
    }
    calcularPuntaje(data:any){
        return this.http.post("http://localhost:3000/api/calcularPuntaje",data);
    }
    obtenerInfoParticipantes(){
        return this.http.post("http://localhost:3000/api/obtenerInfoParticipantes","");
    }
    obtenerTopParticipantesPuntaje(){
        return this.http.post("http://localhost:3000/api/obtenerTopParticipantesPuntaje","");
    }
    getRespuestasIntegrales(){
        return this.http.post("http://localhost:3000/api/getRespuestasIntegrales","");
    }
    getEliminatoriaParticipante(data:any){
        return this.http.post("http://localhost:3000/api/getEliminatoriaParticipante",data);
    }
    getPosicionParticipante(data:any){
        return this.http.post("http://localhost:3000/api/getPosicionParticipante",data);
    }
}