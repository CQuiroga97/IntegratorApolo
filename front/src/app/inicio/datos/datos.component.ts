import { Component, OnInit} from '@angular/core';
import { UsersService } from '../../users/users.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})

export class DatosComponent implements OnInit{
  public cantEncuentros = 0;
  public cantUniversidades:any;
  public loading = true;
  public transition = true;
  constructor(
    private userServices:UsersService
  ){

  }
  ngOnInit(): void {
    this.userServices.mostrarUniversidadesNum().subscribe(res=>{
      this.cantUniversidades = res[0].length;
      this.userServices.llamarEncuentros().subscribe((res2:any) =>{
        this.cantEncuentros = res2.filter((ronda:any)=>ronda.estado>1).length / 2;
        this.loading = false;
        setTimeout(()=>{
          this.transition = false
        }, 10)
      })
    }, (res)=>{
      console.log(res.message)
    })
    setInterval(
      ()=>{
        this.userServices.mostrarUniversidadesNum().subscribe(res=>{
          this.cantUniversidades = res[0].length;
          this.userServices.llamarEncuentros().subscribe((res2:any) =>{
            this.cantEncuentros = res2.filter((ronda:any)=>ronda.estado>1).length / 2;
            this.loading = false;
            setTimeout(()=>{
              this.transition = false
            }, 10)
          })
        }, (res)=>{
          console.log(res.message)
        })
      }, 30000
    )
    
  }
}
