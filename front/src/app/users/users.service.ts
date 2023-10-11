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
    return this.http.post("https://integratorapi.azurewebsites.net/api/login", user);
  }
  loginParticipante(user: any): Observable<any> {
    return this.http.post("https://integratorapi.azurewebsites.net/api/loginParticipante", user);
  }
  registrUniversidad(universidad: any): Observable<any> {
    return this.http.post("https://integratorapi.azurewebsites.net/api/registrarUniversidad", universidad)
  }
  registrarUniversidadExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post("https://integratorapi.azurewebsites.net/api/registrarUniversidadExcel", formData)
  }
  registrarParticipantesExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post("https://integratorapi.azurewebsites.net/api/registrarParticipantesExcel", formData)
  }
  getUniversidades(): Observable<any> {
    return this.http.post("https://integratorapi.azurewebsites.net/api/sp_getUniversidades", {});
  }
  mostrarUniversidadesNum(): Observable<any> {
    return this.http.post("https://integratorapi.azurewebsites.net/api/mostrarUniversidadesNum", {});
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    this.isLoggedIn()
    /* this.authService.setDecodedToken() */
  }
  generateExcelEstudiantes() {
    return this.http.get("https://integratorapi.azurewebsites.net/api/generateExcelParticipante", { responseType: 'blob' });
  }
  borrarUniversidadesEstudiantes(idu: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/borrarUniversidadesEstudiantes", { idu: idu });
  }
  modificarUniversidad(universidad: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/modificarUniversidad", universidad);
  }
  borrarParticipante(idEstudiante: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/borrarParticipante", { idEstudiante: idEstudiante });
  }
  insertarParticipante(data: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/insertarParticipante", { data: data });
  }
  modificarParticipante(data: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/modificarParticipante", { data: data });
  }
  modificarContrasenaParticipante(data: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/modificarContrasenaParticipante", { data: data });
  }

  ingresarIntegrales(data: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/ingresarIntegrales", data);
  }
  
  getEliminatoriaActiva(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/getEliminatoriaActiva", {});
  }
  iniciarSegundaRonda(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/iniciarSegundaRonda", {});
  }
  llamarEncuentros(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/llamarEncuentros", {});
  }
  llamarIntegrales(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/llamarIntegrales", {});
  }
  guardarIntegral(data:any){
    return this.http.post("https://integratorapi.azurewebsites.net/api/guardarIntegral", data);
  }
  borrarIntegral(data:any){
    return this.http.post("https://integratorapi.azurewebsites.net/api/borrarIntegral", data);
  }
  modificarIntegral(data:any){
    return this.http.post("https://integratorapi.azurewebsites.net/api/modificarIntegral", data);
  }
  updatePuntaje(data:any){
    return this.http.post("https://integratorapi.azurewebsites.net/api/updatePuntaje", data);
  }
  updateEncuentro(data:any){
    return this.http.post("https://integratorapi.azurewebsites.net/api/updateEncuentro", data);
  }
  getIntegralesAdmin(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/getIntegralesAdmin", {});
  }
  getTopUniversidades(){
    return this.http.post("https://integratorapi.azurewebsites.net/api/getTopUniversidades", {});
  }

  ingresarIntegralesSegundaRonda(data: any) {
    return this.http.post("https://integratorapi.azurewebsites.net/api/ingresarIntegralesSegundaRonda", data);
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
    /* this.authService.dropDecodedToken(); */
    this.router.navigate(["./login"])
    this.isLoggedInSubject.next(false)
  }
}
