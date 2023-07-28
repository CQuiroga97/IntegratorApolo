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
    this.userServices.getUniversidades().subscribe(res=>{
      this.cantUniversidades = res.length;
    })
  }
}
