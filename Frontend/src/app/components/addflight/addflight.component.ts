import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flight } from 'src/app/models/flight';
import {Router} from '@angular/router';
import { FlightlistService } from 'src/app/services/flightlist.service';
import { AirportlistService } from 'src/app/services/airportlist.service';
import {FlightSchedule} from '../../models/FlightSchedule'

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {
  addFlight: FormGroup

  airports:any;
 
  today = new Date();
  constructor(private builder : FormBuilder, private service: FlightlistService,public route:Router,private airportservice:AirportlistService) { }

  ngOnInit(): void {
    this.airportservice.getallairports().subscribe(data=>{
      this.airports=data;
     console.log(this.airports);
     },(error)=>{
      alert("Failed to fetch data from server.");
    });

    this.addFlight= this.builder.group({
      FlightId:["",Validators.required],
      SourceId:["",Validators.required],
      DestinationId:["",[Validators.required]],
      DepartTime: ["",[Validators.required]],
      ArrivalTime : ["",[Validators.required]],
      Duration : [""],
      EconomyPrice:["",[Validators.required]],
      BusinessPrice:["",[Validators.required]]
    });
 
  }
 onSubmit(form:any){
   let hours=(+form.ArrivalTime.substr(0,2))-(+form.DepartTime.substr(0,2));
   let minutes=(+form.ArrivalTime.substr(3,2))-(+form.DepartTime.substr(3,2));
   if(minutes<0){
     hours-=1;
     minutes+=60;
   }
   form.Duration=hours+':'+minutes+':00';
   console.log(form.Duration)
   console.log(form.SourceId);
   
   this.service.Addflight(form).subscribe(data=>{
    // console.log(data);
     
     alert("Flight Added Successfully"); 
    
  
   this.route.navigate(['adminview']);
    },(error) => {
      console.log(error);
     
      if(error.error.Message=="Flight already Exists"){
        alert("Flight already Exists!!")
      }
      else{
        alert("Please enter valid details");
      }
      
    });
  
 }

   

}
