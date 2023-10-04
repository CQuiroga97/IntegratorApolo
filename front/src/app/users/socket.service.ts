import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
  })
export class SocketService {
    constructor(private socket: Socket) {}
    emitUser(user:any): void {
        this.socket.emit('add-user', user);
    }
    emitExit(): void {
        this.socket.emit('exit');
    }
    getClientId(): Observable<string> {
        return this.socket.fromEvent('user-id');
    }
      
    getUsersOnline(): Observable<any> {
        return this.socket.fromEvent<any>('users-online');
    }
    iniciarClasificatorias(): void{
        this.socket.emit("iniciarClasificatorias")
    }
    getEstadoClasificatorias(): Observable<any>{
        return this.socket.fromEvent<any>('getEstadoClasificatorias')
    }
    getEstadoClasificatoriasEmit(): void{
        this.socket.emit("getEstadoClasificatorias");
    }
    setIntegral(integral:number): void{
        this.socket.emit("setIntegral", integral);
    }
    loginSegundaRonda(user:any, clasificacion:number):void{
        this.socket.emit('loginSegundaRonda', user, clasificacion)
    }
    editarTexto(texto:number):void{
        this.socket.emit('editarTexto', texto)
    }
    getUsersOnlineSegunda(): Observable<any> {
        return this.socket.fromEvent<any>('usersOnlineSegunda');
    }
    volverALlamar(): Observable<any> {
        return this.socket.fromEvent<any>('volverALlamar');
    }
    pedirLlamada(): void {
        this.socket.emit('pedirLlamada');
    }
    iniciarIntegral(): void {
        this.socket.emit('iniciarIntegral');
    }
    iniciarIntegralParticipante(): Observable<any> {
        return this.socket.fromEvent<any>('iniciarIntegralParticipante');
    }
    participantePreparado(estado:boolean):void{
        this.socket.emit('participantePreparado', estado)
    }
    usuariosPreparados(): Observable<any> {
        return this.socket.fromEvent<any>('usuariosPreparados');
    }
    iniciarCronometro():void{
        this.socket.emit('iniciarCronometro')
    }
    iniciarCronometroParticipante(): Observable<any> {
        return this.socket.fromEvent<any>('iniciarCronometroParticipante');
    }

}