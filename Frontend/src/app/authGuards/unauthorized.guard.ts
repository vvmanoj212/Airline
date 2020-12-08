import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../services/authguard.service';
import {Location} from '@angular/common';
import { AuthguarduserService } from '../services/authguarduser.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  constructor(private AuthA: AuthguardService,private AuthU:AuthguarduserService,private router : Router,private _location: Location){
  }
  canActivate(): boolean {  
    if (this.AuthA.gettoken() || this.AuthU.gettoken()) {  
      this._location.back(); 
        return false; 
    }  
    return true;
  }
}
