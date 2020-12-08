import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.touched && (form.hasError('notSame')||form.hasError('InvalidAge'));
      
    }
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  todayShort = new Date().toISOString().slice(0,10);
  addUser : FormGroup
  hide:boolean= true;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(private builder : FormBuilder, private service:UserService,public route:Router) { }
  ngOnInit(): void {
   
    this.addUser= this.builder.group({
      Title:["",Validators.required],
      FirstName:["",[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      LastName:["",[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      UserEmailId:["",[Validators.required,Validators.email]],
      Age : [""],
      MobileNumber : ["",[Validators.required,Validators.pattern('[7-9][0-9]{9}')]],
      Password : ["",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),Validators.minLength(8)]],
      DateOfBirth:["",[Validators.required]],
      confirmPass:["",[Validators.required]]
    }, { validator: [this.checkPasswords,this.checkAge ]})
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('Password').value;
  console.log(pass);
  let confirmPass = group.get('confirmPass').value;
  console.log(confirmPass);
   return (pass === confirmPass) ? null : { notSame: true };   
  }
  checkAge(group:FormGroup)
  {
    let Age=group.get('Age').value;
    return (Age>=18 || Age<=80)?null:{InvalidAge:true};
  }
  get f() { return this.addUser.controls; }
     submitted:boolean=false;
age:any;
  onSubmit(form : User){
    this.submitted = true;
    const today = new Date();
    const birthDate = new Date(form.DateOfBirth);
    form.Age= moment().diff(form.DateOfBirth , 'years');
    console.log(form);
    console.log(form.Age);
    this.service.addUser(form).subscribe(data=>{

      console.log(data)
      alert("User Registered Successfully");
      this.route.navigate(["userlogin"]); },
      (error) => {console.log(error.error.Message);
      if(error.error.Message=="Email already exists")
      {
        alert("Email already exists");
      }
      if(error.error.Message=="Age cannot be less than 18")
      {
        alert("Age cannot be less than 18!")
      }
      else
       alert("Please Enter valid details!!");
    });
    
    }

}
