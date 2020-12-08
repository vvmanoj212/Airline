import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguarduserService {

  constructor() { }
  gettoken(){  
    return !!sessionStorage.getItem("userData");  
    }  
}
