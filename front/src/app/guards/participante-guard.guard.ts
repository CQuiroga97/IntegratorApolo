import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteGuardGuard implements CanActivate {
  constructor(
    private cookies: CookieService,
    public userService:UsersService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.getUserInfo() == null) return false;
      if(this.userService.getUserInfo().data["rol"] == "Participante"){
        return true;
      }else{
        
        this.router.navigate(["/"])
        return false;
      }
  }
  
}
