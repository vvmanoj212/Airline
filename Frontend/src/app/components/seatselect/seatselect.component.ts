import { Component, OnInit } from '@angular/core';
import { Seat} from 'src/app/models/Seat';
import { SeatqueryService } from 'src/app/services/seatquery.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger } from 'src/app/models/Passenger';
import { Ticket } from 'src/app/models/Ticket';
import {  flight } from 'src/app/models/flight';
import {TicketService} from 'src/app/services/ticket.service';

@Component({
  selector: 'app-seatselect',
  templateUrl: './seatselect.component.html',
  styleUrls: ['./seatselect.component.css']
})
export class SeatselectComponent implements OnInit {

  constructor(private _router: Router, private _seatService: SeatqueryService, private activatedRoute: ActivatedRoute,private ticketservice:TicketService) { }
  seats: Seat[]=[];
  returnSeats:Seat[]=[];
  flight:flight;
  returnFlight:flight;
  flightId: string;
  returnFlightId:string;
  departDate: string;
  returnDate:String;
  adultpassengercount:number=0;
  childpassengercount:number=0;
  infantpassengercount:number=0;
  adultpassengers:Passenger[];
  childpassengers:Passenger[];
  infantpassengers:Passenger[];
  isReturn:boolean=false;
  class:string="";
  tickets:Ticket[]=[];
  price:number=0.0;
  returnPrice:number=0.0;
  TotalPrice:number=0.0;
  ngOnInit() {
    console.log(this.class);
    this.adultpassengercount=+localStorage.getItem("adultpassengercount");
    this.childpassengercount=+localStorage.getItem("childpassengercount");
    this.infantpassengercount=+localStorage.getItem("infantpassengercount");
    console.log(this.adultpassengercount);
    console.log(this.childpassengercount);
    console.log(this.infantpassengercount);
  
    this.adultpassengers=JSON.parse(sessionStorage.getItem("adultpassengers"));
    this.childpassengers=JSON.parse(sessionStorage.getItem("childpassengers"));
    this.infantpassengers=JSON.parse(sessionStorage.getItem("infantpassengers"));
    this.class=localStorage.getItem('class');
    this.isReturn=localStorage.getItem("type")=="roundtrip"?true:false;
    this.flight=JSON.parse(sessionStorage.getItem("flight"));
    this.flightId =this.flight.FlightId;
    this.departDate =localStorage.getItem('departdate');
    this.getSeatsFromService();
    if(this.isReturn)
    {
      this.returnFlight=JSON.parse(sessionStorage.getItem("returnflight"));
      this.returnFlightId=this.returnFlight.FlightId;
      this.returnDate=localStorage.getItem('returndate');
      this.getReturnSeatsFromService();
    }
    if(this.class=="Economy")
    {
      this.price=this.flight.EconomyPrice;
      if(this.isReturn)
      this.returnPrice=this.returnFlight.EconomyPrice;
    }
    else if(this.class=="Business")
    {
      this.price=this.flight.BusinessPrice;
      if(this.isReturn)
      this.returnPrice=this.returnFlight.BusinessPrice;
    }
    this.TotalPrice=this.price*(this.adultpassengercount)+this.price*0.65*(this.childpassengercount)+this.price*0.35*(this.infantpassengercount);
    if(this.isReturn)
    { 
      this.TotalPrice=this.TotalPrice+this.returnPrice*(this.adultpassengercount)+this.returnPrice*0.65*(this.childpassengercount)+this.returnPrice*0.35*(this.infantpassengercount);
    }
    sessionStorage.setItem('TotalPrice',this.TotalPrice.toString());
    console.log(this.TotalPrice);
  }
  
  getSeatsFromService() {
    this._seatService.getSeats(this.flightId, this.departDate).subscribe((res: any) => {
    this.seats = res;
    console.log(this.seats);
      },(error)=>{
        alert("Failed to fetch data from server.");
      });
  }
    getReturnSeatsFromService(){

      this._seatService.getSeats(this.returnFlightId, this.returnDate).subscribe((res: any) => {
        this.returnSeats = res;
        console.log(this.returnSeats);
      },(error)=>{
        alert("Failed to fetch data from server.");
      });
    }

  seatnum: string[] = [];
  retSeatnum:string[]=[];
  
  selectSeat(seatNo: string) {  
    let index = this.seatnum.indexOf(seatNo);
    if(this.seatnum.length>=(this.adultpassengercount+this.childpassengercount) && index === -1){
      alert('Maximum seats selected');
    }
    else if (index === -1) 
    {
      this.seatnum.push(seatNo);
      this.seats.forEach((item) => {
        if (item.SeatNo == seatNo) {
          item.status = "myselection";
        }
      });
    }
    else{
      this.seatnum.splice(index,1);
      this.seats.forEach((item) => {
        if (item.SeatNo === seatNo) {
          item.status = "available";
        }
      });
    }
    console.log(this.seatnum);
    console.log(this.seatnum.length);
  }

  selectReturnSeat(seatNo: string) {  
    let index = this.retSeatnum.indexOf(seatNo);
    if (index === -1 && this.retSeatnum.length>=(this.adultpassengercount+this.childpassengercount)) {
      alert('Maximum seats of return flight selected');
    }
    else if(index === -1) {

      this.retSeatnum.push(seatNo);
      this.returnSeats.forEach((item) => {
        if (item.SeatNo == seatNo) {
          item.status = "myselection";
        }
      });
    }else{
      this.retSeatnum.splice(index,1);
      this.returnSeats.forEach((item) => {
        if (item.SeatNo === seatNo) {
          item.status = "available";
        }
      });
    }
    console.log(this.retSeatnum);
  }
    


  onClick1() {
    if(this.seatnum.length==0 || (this.isReturn && this.retSeatnum.length==0))
    {
      alert("Please select all seats");
      return;
    }
    let j = 0;
    for(let i=0;i<this.adultpassengercount;i++)
    {
      let TicketId='107'+JSON.stringify(Date.now()).substr(4,9)+j;
      this.tickets.push(new Ticket(TicketId,this.flightId,this.adultpassengers[i].title,this.adultpassengers[i].firstname,this.adultpassengers[i].lastname,"Adult",
                         this.flight.SourceId,this.flight.DestinationId,this.flight.DepartTime,this.flight.ArrivalTime,this.flight.Duration,
                         this.seatnum[0],this.departDate,this.class,this.price,null));
      this.seatnum.splice(0,1);
      if(this.isReturn)
      {
        this.tickets.push(new Ticket(TicketId,this.returnFlightId,this.adultpassengers[i].title,this.adultpassengers[i].firstname,this.adultpassengers[i].lastname,"Adult",
                          this.returnFlight.SourceId,this.returnFlight.DestinationId,this.returnFlight.DepartTime,this.returnFlight.ArrivalTime,this.returnFlight.Duration,
                          this.retSeatnum[0],this.returnDate,this.class,this.returnPrice,null));
        this.retSeatnum.splice(0,1);
      }
      j++;
    }
    for(let i=0;i<this.childpassengercount;i++)
    {
      let TicketId='107'+JSON.stringify(Date.now()).substr(4,9)+j;
      this.tickets.push(new Ticket(TicketId,this.flightId,this.childpassengers[i].title,this.childpassengers[i].firstname,this.childpassengers[i].lastname,"Child",
                         this.flight.SourceId,this.flight.DestinationId,this.flight.DepartTime,this.flight.ArrivalTime,this.flight.Duration,
                         this.seatnum[0],this.departDate,this.class,this.price*0.65,null));
      this.seatnum.splice(0,1);
      if(this.isReturn)
      {
        this.tickets.push(new Ticket(TicketId,this.returnFlightId,this.childpassengers[i].title,this.childpassengers[i].firstname,this.childpassengers[i].lastname,"Child",
                          this.returnFlight.SourceId,this.returnFlight.DestinationId,this.returnFlight.DepartTime,this.returnFlight.ArrivalTime,this.returnFlight.Duration,
                          this.retSeatnum[0],this.returnDate,this.class,this.returnPrice*0.65,null));
                          this.retSeatnum.splice(0,1);
      }
      j++;
    }
    for(let i=0;i<this.infantpassengercount;i++)
    {
      let TicketId='107'+JSON.stringify(Date.now()).substr(4,9)+j;
      this.tickets.push(new Ticket(TicketId,this.flightId,this.infantpassengers[i].title,this.infantpassengers[i].firstname,this.infantpassengers[i].lastname,"Infant",
                         this.flight.SourceId,this.flight.DestinationId,this.flight.DepartTime,this.flight.ArrivalTime,this.flight.Duration,
                         null,this.departDate,this.class,this.price*0.35,null));
      if(this.isReturn)
      {
        this.tickets.push(new Ticket(TicketId,this.returnFlightId,this.infantpassengers[i].title,this.infantpassengers[i].firstname,this.infantpassengers[i].lastname,"Infant",
                          this.returnFlight.SourceId,this.returnFlight.DestinationId,this.returnFlight.DepartTime,this.returnFlight.ArrivalTime,this.returnFlight.Duration,
                          null,this.returnDate,this.class,this.returnPrice*0.35,null));
      }
      j++;
    }
    this.ticketservice.tickets=this.tickets;
    console.log(this.tickets);
    console.log(this.ticketservice.tickets);
    this._router.navigate(['paymentgateway']);
  }
}