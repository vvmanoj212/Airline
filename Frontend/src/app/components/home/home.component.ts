import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AirportlistService } from 'src/app/services/airportlist.service';
import { Router } from '@angular/router';
import { airportlist } from 'src/app/models/airportlist';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  airports:airportlist[];
  SearchForm:FormGroup;
  departdate: any;
  returndate: any;
  today = new Date();
  source: string;
  destination: string;
  todayShort = new Date().toISOString().slice(0,10);
  submitted:boolean=false;
  constructor(private formbulider: FormBuilder,private airportservice:AirportlistService,private router:Router) {
   }

  ngOnInit(): void {
    
    this.airportservice.getallairports().subscribe(data=>{
      this.airports=data;
      console.log(this.airports); },(error)=>{
        alert("Failed to fetch data from server.");
      });
    localStorage.clear();
    this.SearchForm = this.formbulider.group({  
      flighttype:['',Validators.required], 
      source:['',Validators.required],    
      destination:['' ,Validators.required],    
      departdate:['',Validators.required],   
      returndate:[''], 
      adultpassengercount:[0,[Validators.required,Validators.pattern("[1-5]+")]],
      childpassengercount:[0,Validators.pattern("[0-9]*")],
      infantpassengercount:[0,Validators.pattern("[0-9]*")],
      seatclass:['',Validators.required],
    }); 
    this.SearchForm.controls['returndate'].disable();
  }

  DisableReturn(){
      this.SearchForm.controls['returndate'].disable();
  }

  EnableReturn()
  {
    this.SearchForm.controls['returndate'].enable();
  }

  
  onSubmit(form){
    if(form.invalid){
      alert("Please enter all requiured details");
      return;
    }
    console.log(form.source);  
    localStorage.setItem('type',form.flighttype);
    localStorage.setItem('source', form.source);
    localStorage.setItem('destination',form.destination);
    localStorage.setItem('departdate',form.departdate);
    localStorage.setItem('returndate', form.returndate);
    localStorage.setItem('adultpassengercount',form.adultpassengercount);
    localStorage.setItem('childpassengercount',form.childpassengercount);
    localStorage.setItem('infantpassengercount',form.infantpassengercount);
    localStorage.setItem('class',form.seatclass);
    //console.log(this.SearchForm.valid);
   this.router.navigate(['flightSelect']);
    }
  }


