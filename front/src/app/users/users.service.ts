import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root"
})


export class UsersService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn()
  }

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/login", user);
  }
  loginParticipante(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/loginParticipante", user);
  }
  registrUniversidad(universidad: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/registrarUniversidad", universidad)
  }
  registrarUniversidadExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post("http://localhost:3000/api/registrarUniversidadExcel", formData)
  }
  registrarParticipantesExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post("http://localhost:3000/api/registrarParticipantesExcel", formData)
  }
  getUniversidades(): Observable<any> {
    return this.http.post("http://localhost:3000/api/sp_getUniversidades", {});
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    this.isLoggedIn()
    /* this.authService.setDecodedToken() */
  }
  generateExcelEstudiantes() {
    return this.http.get("http://localhost:3000/api/generateExcelParticipante", { responseType: 'blob' });
  }
  borrarUniversidadesEstudiantes(idu: any) {
    return this.http.post("http://localhost:3000/api/borrarUniversidadesEstudiantes", { idu: idu });
  }
  modificarUniversidad(universidad: any) {
    return this.http.post("http://localhost:3000/api/modificarUniversidad", universidad);
  }
  borrarParticipante(idEstudiante: any) {
    return this.http.post("http://localhost:3000/api/borrarParticipante", { idEstudiante: idEstudiante });
  }
  insertarParticipante(data: any) {
    return this.http.post("http://localhost:3000/api/insertarParticipante", { data: data });
  }
  modificarParticipante(data: any) {
    return this.http.post("http://localhost:3000/api/modificarParticipante", { data: data });
  }
  modificarContrasenaParticipante(data: any) {
    return this.http.post("http://localhost:3000/api/modificarContrasenaParticipante", { data: data });
  }

  ingresarIntegrales(data: any) {
    return this.http.post("http://localhost:3000/api/ingresarIntegrales", data);
  }
  
  iniciarSegundaRonda(){
    return this.http.post("http://localhost:3000/api/iniciarSegundaRonda", {});
  }
  llamarEncuentros(){
    return this.http.post("http://localhost:3000/api/llamarEncuentros", {});
  }
  getToken() {
    return this.cookies.get("token")
  }
  getUserInfo() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = token !== "";
    this.isLoggedInSubject.next(isLoggedIn);
    return isLoggedIn;
  }
  logoutAdmin() {
    this.cookies.delete("token");
    console.log(this.cookies.get("token"))
    /* this.authService.dropDecodedToken(); */
    this.router.navigate(["./login"])
    this.isLoggedInSubject.next(false)
  }
}
