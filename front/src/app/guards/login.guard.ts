import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private cookies: CookieService,
    public userService:UsersService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.getUserInfo() == null) return false;

      if(this.userService.getUserInfo().data["rol"] == "Admin"){
        return true;
      }else{
        
        this.router.navigate(["/"])
        return false;
      }
  }
  
}
