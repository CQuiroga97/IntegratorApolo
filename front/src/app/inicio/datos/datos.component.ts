import { Component, OnInit} from '@angular/core';
import { UsersService } from '../../users/users.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit{
  public cantUniversidades:any;
  constructor(
    private userServices:UsersService
  ){

  }
  ngOnInit(): void {
    this.userServices.mostrarUniversidadesNum().subscribe(res=>{
      this.cantUniversidades = res[0].length;
    }, (res)=>{
      alert(res.message)
    })
  }
}
