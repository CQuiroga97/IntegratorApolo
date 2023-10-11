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
        return this.http.post("https://integratorapi.azurewebsites.net/api/getIntegralesClasificaciones", this.user.getUserInfo())
    }
    guardarRespuestaParticipante(data:any){
        return this.http.post("https://integratorapi.azurewebsites.net/api/guardarRespuestaParticipante", data)
    }
    getTimerClasificaciones(){
        return this.http.post("https://integratorapi.azurewebsites.net/api/getTimerClasificaciones","");
    }
    calcularPuntaje(data:any){
        return this.http.post("https://integratorapi.azurewebsites.net/api/calcularPuntaje",data);
    }
    obtenerInfoParticipantes(){
        return this.http.post("https://integratorapi.azurewebsites.net/api/obtenerInfoParticipantes","");
    }
    obtenerTopParticipantesPuntaje(){
        return this.http.post("https://integratorapi.azurewebsites.net/api/obtenerTopParticipantesPuntaje","");
    }
    getRespuestasIntegrales(){
        return this.http.post("https://integratorapi.azurewebsites.net/api/getRespuestasIntegrales","");
    }
    getEliminatoriaParticipante(data:any){
        return this.http.post("https://integratorapi.azurewebsites.net/api/getEliminatoriaParticipante",data);
    }
    getPosicionParticipante(data:any){
        return this.http.post("https://integratorapi.azurewebsites.net/api/getPosicionParticipante",data);
    }
    updateTexto(data:any){
        return this.http.post("https://integratorapi.azurewebsites.net/api/updateTexto",data);
    }
}