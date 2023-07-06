import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.scss']
})
export class CabezeraComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(
    public userService:UsersService,
    public router:Router,
    private changeDetectorRef: ChangeDetectorRef
  ){

  }
  ngOnInit(): void {
   /*  this.checkLoginStatus(); */
   this.userService.isLoggedIn$.subscribe(isLoggedIn => {
     console.log("asd")
    this.isLoggedIn = isLoggedIn;
   })
  }
  checkLoginStatus() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.changeDetectorRef.detectChanges();
  }
  logOut(){
    this.userService.logoutAdmin();
  }
}
