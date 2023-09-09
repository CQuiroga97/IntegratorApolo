import { Component } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-llaves',
  templateUrl: './llaves.component.html',
  styleUrls: ['./llaves.component.scss']
})
export class LlavesComponent {

  public octavos:any = {};
  constructor(
    private _userService:UsersService
  ){
    _userService.llamarEncuentros().subscribe((res:any)=>{
      res.forEach((el:any)=>{
        if(!this.octavos[`${el.encuentro}${el.ronda}`])
          this.octavos[`${el.encuentro}${el.ronda}`] = []
        this.octavos[`${el.encuentro}${el.ronda}`].push(el)
      })
      console.log(this.octavos)
    })
  }
}
