import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn:"root"
})


export class UsersService{
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    constructor(
        private http:HttpClient, 
        private cookies:CookieService,
        private router:Router,
        private authService:AuthService
        ){
            this.isLoggedIn()
        }
        
    login(user:any):Observable<any>{
        return this.http.post("http://localhost:3000/api/login", user);
    }
    registrUniversidad(universidad:any):Observable<any>{
        return this.http.post("http://localhost:3000/api/registrarUniversidad", universidad)
    }
    registrarUniversidadExcel(excel:File):Observable<any>{
        const formData: FormData = new FormData();
        formData.append('filekey', excel, excel.name)
        return this.http.post("http://localhost:3000/api/registrarUniversidadExcel", formData)
    }
    registrarParticipantesExcel(excel:File):Observable<any>{
        const formData: FormData = new FormData();
        formData.append('filekey', excel, excel.name)
        return this.http.post("http://localhost:3000/api/registrarParticipantesExcel", formData)
    }
    getUniversidades():Observable<any>{
        return this.http.post("http://localhost:3000/api/sp_getUniversidades", {});
    }
    setToken(token:string){
        this.cookies.set("token", token);
        this.isLoggedIn()
        /* this.authService.setDecodedToken() */
    }
    generateExcelEstudiantes(){
        return this.http.get("http://localhost:3000/api/generateExcelParticipante",{responseType:'blob'});
    }
    borrarUniversidadesEstudiantes(idu:any){
        return this.http.post("http://localhost:3000/api/borrarUniversidadesEstudiantes",{idu:idu});
    }
    getToken(){
        return this.cookies.get("token")
    }
    isLoggedIn(): boolean {
        const token = this.getToken();
        const isLoggedIn = token !== "";
        this.isLoggedInSubject.next(isLoggedIn);
        return isLoggedIn;
      }
    logoutAdmin(){
        this.cookies.delete("token", "/");
        console.log(this.cookies.get("token"))
        /* this.authService.dropDecodedToken(); */
        this.router.navigate(["./loginAdmin"])
        this.isLoggedInSubject.next(false)
      }
}