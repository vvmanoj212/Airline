import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  constructor(private authService:AuthService,private router:Router) { }
  ngOnInit(){
    this.authService.getLoggedInName.subscribe(name => this.userName = name);
    console.log( this.authService.getLoggedInName);
    
  }
  get isLoggedIn(){return this.authService.isLoggedIn()};
  get isLoggedUser(){return this.authService.isLoggedUser()}; 
  get isLoggedAdmin(){return this.authService.isLoggedAdmin()};
  Logout()
  {
    this.authService.Logout();
    this.router.navigate(['home']);
  }
}
