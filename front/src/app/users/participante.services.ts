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
        return this.http.post("http://integratorapi.azurewebsites.net/api/getIntegralesClasificaciones", this.user.getUserInfo())
    }
    guardarRespuestaParticipante(data:any){
        return this.http.post("http://integratorapi.azurewebsites.net/api/guardarRespuestaParticipante", data)
    }
    getTimerClasificaciones(){
        return this.http.post("http://integratorapi.azurewebsites.net/api/getTimerClasificaciones","");
    }
}