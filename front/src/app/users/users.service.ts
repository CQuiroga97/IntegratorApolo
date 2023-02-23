import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn:"root"
})


export class UsersService{
    constructor(private http:HttpClient, private cookies:CookieService){}
    login(user:any):Observable<any>{
        return this.http.post("http://localhost:3000/api/login", user);
    }
    registrUniversidad(universidad:any):Observable<any>{
        return this.http.post("http://localhost:3000/api/registrarUniversidad", universidad)
    }
    registrarUniversidadExcel(excel:any):Observable<any>{
        console.log(excel)
        return this.http.post("http://localhost:3000/api/registrarUniversidadExcel", {"excel":excel})
    }
    getUniversidades():Observable<any>{
        return this.http.post("http://localhost:3000/api/sp_getUniversidades", {});
    }
    setToken(token:string){
        this.cookies.set("token", token);
    }
    getToken(){
        return this.cookies.get("token")
    }
}