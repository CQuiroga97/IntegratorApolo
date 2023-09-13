import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-llaves',
  templateUrl: './llaves.component.html',
  styleUrls: ['./llaves.component.scss']
})
export class LlavesComponent {

  public octavos:any = {};
  constructor(
    private _userService:UsersService,
    private router:Router,
    private toast:NbToastrService
  ){
    _userService.llamarEncuentros().subscribe((res:any)=>{
      res.forEach((el:any)=>{
        if(!this.octavos[`${el.encuentro}${el.ronda}`])
          this.octavos[`${el.encuentro}${el.ronda}`] = []
        this.octavos[`${el.encuentro}${el.ronda}`].push(el)
      })
      if(!this.octavos['18']){
        router.navigate(["./"])
        toast.warning("Vuelve más tarde", "Las llaves aún no se han creado")
      }
    })
  }
}
