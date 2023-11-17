import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "./users.service";
import { CommonService } from "./common.service";
@Injectable({
    providedIn:"root"
})

export class ParticipanteService{
    api = "";
    constructor(
        private http:HttpClient,
        private user:UsersService,
        private common:CommonService
    ){
        this.api = common.getApiUrl()
    }
    getIntegralesClasificaciones(){
        return this.http.post(this.api+"getIntegralesClasificaciones", this.user.getUserInfo())
    }
    guardarRespuestaParticipante(data:any){
        return this.http.post(this.api+"guardarRespuestaParticipante", data)
    }
    getTimerClasificaciones(){
        return this.http.post(this.api+"getTimerClasificaciones","");
    }
    calcularPuntaje(data:any){
        return this.http.post(this.api+"calcularPuntaje",data);
    }
    obtenerInfoParticipantes(){
        return this.http.post(this.api+"obtenerInfoParticipantes","");
    }
    obtenerTopParticipantesPuntaje(){
        return this.http.post(this.api+"obtenerTopParticipantesPuntaje","");
    }
    getRespuestasIntegrales(){
        return this.http.post(this.api+"getRespuestasIntegrales","");
    }
    getEliminatoriaParticipante(data:any){
        return this.http.post(this.api+"getEliminatoriaParticipante",data);
    }
    getPosicionParticipante(data:any){
        return this.http.post(this.api+"getPosicionParticipante",data);
    }
    updateTexto(data:any){
        return this.http.post(this.api+"updateTexto",data);
    }
}