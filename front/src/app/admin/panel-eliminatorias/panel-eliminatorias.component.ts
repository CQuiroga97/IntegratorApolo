import { Component } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-panel-eliminatorias',
  templateUrl: './panel-eliminatorias.component.html',
  styleUrls: ['./panel-eliminatorias.component.scss']
})
export class PanelEliminatoriasComponent {
  public siguienteIntegral:any = "";
  public siguienteIntegralNum:any = "";
  public integralActual:any = "";
  public integralActuallNum:any = "";
  constructor(
    private user:UsersService
  ){
    this.getIntegralesAdmin()
  }
  enviarIntegral(){
    const data = {
      idIntegral:this.siguienteIntegralNum,
      estado:1
    }
    this.user.modificarIntegral(data).subscribe(res=>{
      if(this.integralActual != ""){
        const data2 = {
          idIntegral:this.integralActuallNum,
          estado:3
        }
        this.user.modificarIntegral(data2).subscribe(res=>{
          
          this.getIntegralesAdmin()
    
        })
      }else
        this.getIntegralesAdmin()

    })
  }
  getIntegralesAdmin(){
    this.user.getIntegralesAdmin().subscribe((res:any)=>{
      console.log(res)
      res.forEach(async (el:any)=>{

        if(el[0]){

          let blob = await fetch(`http://localhost:3000/integralesFinales/${el[0].idIntegral}.png?key=akjjyglc`).then(r => r.blob())
          const reader = new FileReader();
          reader.readAsDataURL(blob)
          reader.onloadend = async ()=>{
            if(el[0].estado == 0){
  
              this.siguienteIntegralNum = el[0].idIntegral;
              this.siguienteIntegral = reader.result;
            }else{
  
              this.integralActuallNum = el[0].idIntegral;
              this.integralActual = reader.result;
            }
          }
        }
      })
    })
  }
}
