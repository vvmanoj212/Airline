import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginForm: FormGroup;
  user:User;
  fromFlightSelect:boolean;
  hide:boolean= true;
  
  constructor(private formBuilder: FormBuilder,private userService: AuthService,private router: Router,private route:ActivatedRoute,private location:Location) {
   
   }
   
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
    });
    this.route.params.subscribe( params => this.fromFlightSelect=params['flightSelect']);
    this.userService.Logout();
  }
  submitted:any ;
  doLogin() {
    this.submitted = true;
    this.userService.doLogin(this.loginForm.value).subscribe(result => {
      console.log(this.fromFlightSelect);
      console.log(this.loginForm.value);
      sessionStorage.setItem('username',result.FirstName+" "+result.LastName);
      sessionStorage.setItem('userData',result.Password);
      sessionStorage.setItem('useremail',result.UserEmailId.toString());
      if(this.fromFlightSelect)
           this.router.navigate(['/passengerdetail']);
      else 
           this.location.back();
      console.log(this.location.path());
      alert('Logged in as a User');
    }, (error) => {
      console.log(error);
      alert("Email Id or Password is wrong!!")
    });  
  }
}
