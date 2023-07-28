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
}