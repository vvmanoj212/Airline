import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flight, flight1 } from 'src/app/models/flight';
import { AuthService } from 'src/app/services/auth.service';
import { FlightlistService } from 'src/app/services/flightlist.service';
import * as moment from 'moment';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.css']
})
export class FlightSelectComponent implements OnInit {
  source:string;
  destination:string;
  departDate:string;
  returnDate:String;
  flights:flight1[]=[];
  passengerCount:number;
  returnFlights:flight1[]=[];
  selected:boolean=false;
  returnSelected:boolean=false;
  flightSelected:flight=null;
  returnFlightSelected:flight=null;
  order: string = 'DepartTime';
  order2:string='DepartTime';
  reverse2:boolean=false;
  reverse: boolean = false;
  sortedFlights: any[];
  sortedReturn: any[];
  constructor(private flightlistservice:FlightlistService,public router:Router,private authservice:AuthService,private orderPipe: OrderPipe) { 
    this.sortedFlights= orderPipe.transform(this.flights,'');
    console.log(this.sortedFlights);
    this.sortedReturn= orderPipe.transform(this.returnFlights, '');
    console.log(this.sortedReturn);
  }
  isReturn:boolean;
  ngOnInit(): void {
    sessionStorage.removeItem('flight');
    sessionStorage.removeItem('returnflight');
    this.source=localStorage.getItem('source');
    this.destination=localStorage.getItem('destination');
    this.departDate=localStorage.getItem('departdate');
    this.returnDate=localStorage.getItem('returndate');
    this.passengerCount=+localStorage.getItem('adultpassengercount')+(+localStorage.getItem('childpassengercount'));
    this.isReturn=localStorage.getItem("type")=="roundtrip"?true:false;
    this.flightlistservice.searchFlight(this.source,this.destination,this.departDate,this.passengerCount).subscribe(data=>{
      this.flights=data;
       console.log(this.flights); },(error)=>{
        alert("Failed to fetch data from server.");
      });
    if(this.isReturn)
    {
      this.flightlistservice.searchFlight(this.destination,this.source,this.returnDate,this.passengerCount).subscribe(data=>{
        this.returnFlights=data;
         console.log(this.returnFlights); },(error)=>{
           alert("Failed to fetch data from server.");
         });

    }
  }
  get isLoggedInUser(){return this.authservice. isLoggedUser()};
  get isLoggedInAdmin(){return this.authservice.isLoggedAdmin()};
 
  selectReturnFlight(returnFlight:flight1)
{
  this.returnSelected=true;
  this.returnFlightSelected=returnFlight;
 sessionStorage.setItem('returnflight',JSON.stringify(returnFlight));
}

  selectFlight(flight:flight)
  {
    this.selected=true;
    this.flightSelected=flight;
    sessionStorage.setItem('flight',JSON.stringify(flight));
  }
  continue()
  {
    console.log("yes");
    //var startTime = moment(this.flightSelected.ArrivalTime, "HH:mm:ss ");
//var endTime = moment(this.returnFlightSelected.DepartTime, "HH:mm:ss ");
// calculate total duration
//var duration = moment.duration(endTime.diff(startTime));
// duration in hours
//var hours = parseInt(duration.asHours());
    if(this.isLoggedInAdmin==true)
    {
      alert("You are logged in as Admin. Redirecting to Admin View")
      this.router.navigate(['/adminview']);
    }
    else if(this.isLoggedInUser==false)
       this.router.navigate(['/userlogin',{flightSelect:true}]);
    else 
       this.router.navigate(['/passengerdetail']);
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  setOrder2(value:string)
  {
    if (this.order2 === value) {
      this.reverse2 = !this.reverse2;
    }
    this.order2 = value;
  }
}
