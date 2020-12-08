import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import{Ticket} from 'src/app/models/Ticket';
import{ Passenger} from 'src/app/models/Passenger';
import { Router } from '@angular/router';
@Component({
  selector: 'app-passengerdetails',
  templateUrl: './passengerdetails.component.html',
  styleUrls: ['./passengerdetails.component.css']
})
export class PassengerdetailsComponent implements OnInit {
  adultpassengercount:number;
  childpassengercount:number;
  infantpassengercount:number;
  passengerForm: FormGroup;
  childForm:FormGroup;
  infantForm:FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void
   {
    this.adultpassengercount=+localStorage.getItem('adultpassengercount');
    this.childpassengercount=+localStorage.getItem('childpassengercount');
    this.infantpassengercount=+localStorage.getItem('infantpassengercount');
    sessionStorage.removeItem('adultpassengers');
    sessionStorage.removeItem('childpassengers');
    sessionStorage.removeItem('infantpassengers');
    //console.log(this.childpassengercount);
    //console.log(this.adultpassengercount);
     this.passengerForm=this.formBuilder.group
     ({
          childForm :this.formBuilder.group ({ childtickets: new FormArray([]) }),
             infantForm : this.formBuilder.group ({ infanttickets: new FormArray([])  }), 
             adultForm : this.formBuilder.group({adulttickets: new FormArray([])})
     });

     this.adultpassengerform(this.adultpassengercount);
    this.childpassengerform(this.childpassengercount);
    this.infantpassengerform(this.infantpassengercount);
  }

  get fa() { return this.passengerForm.controls.adultForm['controls']; }
    get ta() { return this.fa.adulttickets as FormArray; }

    get fc() { return this.passengerForm.controls.childForm['controls']; }
    get tc() { return this.fc.childtickets as FormArray; }

    get fi() { return this.passengerForm.controls.infantForm['controls']; }
    get ti() { return this.fi.infanttickets as FormArray; }
  

  adultpassengerform(number){
    for (let i = this.ta.length; i < number; i++) {
      this.ta.push(this.formBuilder.group({
         title : ['', Validators.required],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required]
      }));
  }
  }

  childpassengerform(number){
    for (let i = this.tc.length; i < number; i++) {
      this.tc.push(this.formBuilder.group({
         title : ['', Validators.required],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required]
      }));
  }
  }

  infantpassengerform(number){
    for (let i = this.ti.length; i < number; i++) {
      this.ti.push(this.formBuilder.group({
         title : ['', Validators.required],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required]
      }));
  }
  }

  submit(){
    //console.log(this.dynamicForm.value.tickets);
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.passengerForm.controls.adultForm.value, null, 4));
   console.log(JSON.stringify(this.passengerForm.controls.adultForm.value));
   console.log(JSON.stringify(this.passengerForm.controls.childForm.value));
   console.log(JSON.stringify(this.passengerForm.controls.infantForm.value));

   sessionStorage.setItem('adultpassengers',JSON.stringify(this.passengerForm.controls.adultForm.value.adulttickets));
   sessionStorage.setItem('childpassengers',JSON.stringify(this.passengerForm.controls.childForm.value.childtickets));
   sessionStorage.setItem('infantpassengers',JSON.stringify(this.passengerForm.controls.infantForm.value.infanttickets));  
   this.router.navigate(['/seatselect']);
   //to retrieve passenger details
  }

  
}
