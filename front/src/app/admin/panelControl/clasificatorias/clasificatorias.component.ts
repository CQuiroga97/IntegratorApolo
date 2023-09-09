import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParticipanteService } from 'src/app/users/participante.services';
import { SocketService } from 'src/app/users/socket.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-clasificatorias',
  templateUrl: './clasificatorias.component.html',
  styleUrls: ['./clasificatorias.component.scss']
})
export class ClasificatoriasComponent implements OnInit{
  public users:any = [];
  public cantIntegrales:number = 0;
  constructor(
    private socket: SocketService,
    private participanteService:ParticipanteService,
    private usersService:UsersService
  ) {}
  ngOnInit(): void {
    this.socket.getUsersOnline().subscribe(res =>{
      this.users = []
      res.forEach((el:any) => {
        this.users.push(el)
      });
      this.participanteService.getIntegralesClasificaciones().subscribe((res:any)=>{
        this.cantIntegrales = res.integrales.length;
      })
    })

  }
  iniciarClasificatorias(){
    this.socket.iniciarClasificatorias();
  }
  iniciarSegundaRonda(){
    this.usersService.iniciarSegundaRonda().subscribe(res => {
      console.log(res)
    });
  }
}
