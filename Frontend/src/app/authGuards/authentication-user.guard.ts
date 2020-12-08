import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguarduserService } from '../services/authguarduser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserGuard implements CanActivate {
  constructor(private Auth: AuthguarduserService,private router : Router){

  }
  canActivate(): boolean {  
    if (!this.Auth.gettoken()) {  
        this.router.navigateByUrl("/userlogin");  
    }  
    return this.Auth.gettoken();
  }
  
}
