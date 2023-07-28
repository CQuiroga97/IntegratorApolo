import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login-participante',
  templateUrl: './login-participante.component.html',
  styleUrls: ['./login-participante.component.scss']
})
export class LoginParticipanteComponent {
  name: string;
  pass: string;
  constructor(
    public userService:UsersService,
    private router:Router,
    private authService:AuthService,
    private appComponent: AppComponent
    ){
  }
  
  checkEnter(e:any){
    if(e.key == "Enter")
      this.login()
  }

  login(){
    const user = {correo:this.name, pass:this.pass}
    this.userService.loginParticipante(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.userService.getUserInfo()
      this.router.navigate(["/participante/clasificatorias"])
    }, error =>{
      console.log("error")
    })
  }
}
