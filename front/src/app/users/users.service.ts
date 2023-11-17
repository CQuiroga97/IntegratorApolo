import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CommonService } from "./common.service";
@Injectable({
  providedIn: "root"
})


export class UsersService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  api = "";
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
    private authService: AuthService,
    private common:CommonService
  ) {
    this.isLoggedIn()
    this.api = common.getApiUrl()
  }

  login(user: any): Observable<any> {
    return this.http.post(this.api+"login", user);
  }
  loginParticipante(user: any): Observable<any> {
    return this.http.post(this.api+"loginParticipante", user);
  }
  registrUniversidad(universidad: any): Observable<any> {
    return this.http.post(this.api+"registrarUniversidad", universidad)
  }
  registrarUniversidadExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post(this.api+"registrarUniversidadExcel", formData)
  }
  registrarParticipantesExcel(excel: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('filekey', excel, excel.name)
    return this.http.post(this.api+"registrarParticipantesExcel", formData)
  }
  getUniversidades(): Observable<any> {
    return this.http.post(this.api+"sp_getUniversidades", {});
  }
  mostrarUniversidadesNum(): Observable<any> {
    return this.http.post(this.api+"mostrarUniversidadesNum", {});
  }
  setToken(token: string) {
    this.cookies.set("token", token);
    this.isLoggedIn()
    /* this.authService.setDecodedToken() */
  }
  generateExcelEstudiantes() {
    return this.http.get(this.api+"generateExcelParticipante", { responseType: 'blob' });
  }
  borrarUniversidadesEstudiantes(idu: any) {
    return this.http.post(this.api+"borrarUniversidadesEstudiantes", { idu: idu });
  }
  modificarUniversidad(universidad: any) {
    return this.http.post(this.api+"modificarUniversidad", universidad);
  }
  borrarParticipante(idEstudiante: any) {
    return this.http.post(this.api+"borrarParticipante", { idEstudiante: idEstudiante });
  }
  insertarParticipante(data: any) {
    return this.http.post(this.api+"insertarParticipante", { data: data });
  }
  modificarParticipante(data: any) {
    return this.http.post(this.api+"modificarParticipante", { data: data });
  }
  modificarContrasenaParticipante(data: any) {
    return this.http.post(this.api+"modificarContrasenaParticipante", { data: data });
  }

  ingresarIntegrales(data: any) {
    return this.http.post(this.api+"ingresarIntegrales", data);
  }
  
  getEliminatoriaActiva(){
    return this.http.post(this.api+"getEliminatoriaActiva", {});
  }
  iniciarSegundaRonda(){
    return this.http.post(this.api+"iniciarSegundaRonda", {});
  }
  llamarEncuentros(){
    return this.http.post(this.api+"llamarEncuentros", {});
  }
  llamarIntegrales(){
    return this.http.post(this.api+"llamarIntegrales", {});
  }
  guardarIntegral(data:any){
    return this.http.post(this.api+"guardarIntegral", data);
  }
  guardarLogoUniversidad(data:any){
    return this.http.post(this.api+"guardarLogoUniversidad", data);
  }
  borrarIntegral(data:any){
    return this.http.post(this.api+"borrarIntegral", data);
  }
  modificarIntegral(data:any){
    return this.http.post(this.api+"modificarIntegral", data);
  }
  updatePuntaje(data:any){
    return this.http.post(this.api+"updatePuntaje", data);
  }
  updateEncuentro(data:any){
    return this.http.post(this.api+"updateEncuentro", data);
  }
  getIntegralesAdmin(){
    return this.http.post(this.api+"getIntegralesAdmin", {});
  }
  getTopUniversidades(){
    return this.http.post(this.api+"getTopUniversidades", {});
  }

  ingresarIntegralesSegundaRonda(data: any) {
    return this.http.post(this.api+"ingresarIntegralesSegundaRonda", data);
  }
  quemarIntegral(data: any) {
    return this.http.post(this.api+"quemarIntegral", data);
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
