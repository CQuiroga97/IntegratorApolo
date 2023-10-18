import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-login-participante',
  templateUrl: './login-participante.component.html',
  styleUrls: ['./login-participante.component.scss']
})
export class LoginParticipanteComponent {
  name: string = "participante@gmail.com";
  pass: string = "CristhianQuiroga1";
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
    const user = {correo:this.name, pass:this.pass}
    this.userService.loginParticipante(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.userService.getUserInfo()
      this.router.navigate(["/participante/clasificatorias"])
    }, error =>{
      this.toastrService.show("Login invalido", "Correo o contraseña invalidos", { status: "warning", destroyByClick: true, icon: "alert-triangle-outline" });
      /* console.error("Error en el inicio de sesión:", error); */

    })
  }
}
