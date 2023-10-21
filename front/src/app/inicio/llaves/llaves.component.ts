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
  public loading = true;
  public transition = true;
  public octavos:any = {};
  constructor(
    private _userService:UsersService,
    private router:Router,
    private toast:NbToastrService
  ){
    _userService.llamarEncuentros().subscribe((res:any)=>{
      console.log(res)
      res.forEach((el:any)=>{
        if(!this.octavos[`${el.encuentro}${el.ronda}`])
        this.octavos[`${el.encuentro}${el.ronda}`] = []
      this.octavos[`${el.encuentro}${el.ronda}`].push(el)
    })
    this.loading = false;
    setTimeout(()=>{

      this.transition = false;
    }, 10)
      console.log(this.octavos)
      console.log(this.octavos["14"].length)
      if(!this.octavos['18']){
        router.navigate(["./"])
        toast.warning("Vuelve más tarde", "Las llaves aún no se han creado")
      }
    })
  }
}
