import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
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
    private appComponent: AppComponent,
    private toastrService: NbToastrService
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
      this.toastrService.show("Login invalido", "Correo o contraseña invalidos", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
    })
  }
}
