import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
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
    const user = {name:this.name, pass:this.pass}
    this.userService.login(user).subscribe(data => {
    this.userService.setToken(data.token);
    this.router.navigate(["admin/menu"])
    }, error =>{
    })
  }
}
