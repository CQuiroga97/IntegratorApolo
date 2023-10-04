import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any
  decodedTokenSubject = new Subject<any>();
  constructor(
    private router:Router,
    private cookieService:CookieService
  ) { }
  setDecodedToken(){
    const token = this.cookieService.get('token');
    const helper = new JwtHelperService();
    this.user = helper.decodeToken(token);
    this.decodedTokenSubject.next(this.user);
  }
  getDecodedToken() {
    return this.user;
  }
  dropDecodedToken(){
    this.cookieService.delete("token")
    this.user = null;
    this.decodedTokenSubject.next(this.user);
  }
}
