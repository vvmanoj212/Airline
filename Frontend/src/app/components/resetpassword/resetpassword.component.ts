import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  OtpForm: FormGroup;
  ResetPasswordForm: FormGroup;
  setPwdForm: FormGroup;
  currentUserEmailId: string;
  requestSent: boolean=false;
  showPassword:boolean = false;
  current: Number;
  // forbiddenEmails: any;
  // errorMessage: string;
  // successMessage: string;
  // IsvalidForm=true;
  constructor(private formBuilder: FormBuilder,private auth_service: AuthService,private user_service:UserService,private router: Router) {
     this.ResetPasswordForm = this.formBuilder.group({
       email:['',[Validators.required, Validators.email]]
      })
      this.OtpForm = this.formBuilder.group({
        otp: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999), Validators.pattern("^[0-9]*$")])
      })
      this.setPwdForm = this.formBuilder.group({
        loginpwd: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),Validators.minLength(8)]), 
        confirmloginpwd: new FormControl('',Validators.required)}, { 
          validators: this.confirmedValidator('loginpwd', 'confirmloginpwd') 
      });
   }
  

  ngOnInit(): void {
    
  }
  get f(){
    return this.ResetPasswordForm.controls;
  }
  get f2(){
    return this.OtpForm.controls;
  }
  
  get f3(){
    return this.setPwdForm.controls;
  }
  onSubmit(form)
{
  this.currentUserEmailId = form.value.email;
  this.auth_service.forgotUserPassword(form.value.email).subscribe(data => {
      if(data=="User Not Found"){
        alert("User does not exist");
        return;
      }
      this.requestSent = true;
      this.current = data;
  })
}

onSubmit2(form){
  try{
    if(this.current === form.value.otp){

      alert("Reset Password!");
      return;
    } 
      this.showPassword = true;
    
  }catch{
    alert("Incorrect OTP");
  }
}

onSubmit3(form){
     console.log(form);
    this.user_service.getUserById(this.currentUserEmailId).subscribe(data => {
      data.Password=form.value.loginpwd;
      this.user_service.changePassword(data).subscribe(data =>
        {
          console.log(data);
        alert("Password changed successfully");
        this.router.navigate(['userlogin']);
      })
    })
}
confirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      //     return;
      // }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
}