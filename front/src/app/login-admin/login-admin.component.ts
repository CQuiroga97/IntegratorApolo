import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  name: string;
  pass: string;
  constructor(public userService:UsersService){
    const barra = document.getElementsByTagName("nb-layout-header");
    barra[0].remove();
  }
  login(){
    const user = {name:this.name, pass:this.pass}
    console.log(user)
    this.userService.login(user).subscribe(data => {
      this.userService.setToken(data.token);
    }, error =>{
      console.log("error")
    })
  }
}
