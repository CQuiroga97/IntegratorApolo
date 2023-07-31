import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.scss']
})
export class CabezeraComponent implements OnInit{
  isLoggedIn: boolean = false;
  usuario:any = {rol:""};
  constructor(
    public userService:UsersService,
    public router:Router,
    private changeDetectorRef: ChangeDetectorRef,
    private appComp: AppComponent,
  ){

  }
  ngOnInit(): void {
   this.userService.isLoggedIn$.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
    if(isLoggedIn){
      this.usuario = this.userService.getUserInfo().data
      console.log(this.usuario)
    }
   })
  }
  checkLoginStatus() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.changeDetectorRef.detectChanges();
  }
  logOut(){
    this.userService.logoutAdmin();
  }
  goLogin(){
    this.appComp.menu = false;
    this.router.navigate(["/login"])
  }
}
