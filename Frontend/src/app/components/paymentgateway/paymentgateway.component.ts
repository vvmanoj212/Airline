import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/Booking';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingserviceService } from 'src/app/services/bookingservice.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent implements OnInit {
  totalPrice = sessionStorage.getItem("TotalPrice");
  carddetailsForm: FormGroup;
  detailsForm: FormGroup;
  paymentForm: FormGroup;
  OtpForm: FormGroup;
  card=["Credit Card", "Debit Card"];
  bank=["HDFC","ICICI", "SBI", "PNB", "Canara", "Kotak"];
  //cardNumber: FormGroup;
  requestSent: boolean=false;
  cardCvv: any;
  current: Number;
  getdetailsform: any;
  makepayment:boolean=false;

  constructor(private formBuilder: FormBuilder ,private auth_service: AuthService,private ticketservice:TicketService,private bookingservice:BookingserviceService,private router:Router) {}
  ngOnInit() {
    //console.log(this.card[0]);
    this.detailsForm = this.formBuilder.group({
      bank: new FormControl('', [Validators.required]),
      card: new FormControl('', [Validators.required]),
    })
    this.carddetailsForm = this.formBuilder.group({
      cardNumber:['',[Validators.required,Validators.pattern("^[0-9]{16}")]],
      cardCvv:['',[Validators.required,Validators.pattern("[0-9]{3}")]],
      cardHolderName:['',[Validators.required,Validators.pattern("^[A-Za-z]+([ ]{0,1})([A-Za-z]+)?([ ]{0,1})?([A-Za-z]+)")]],
      mobilenumber:['',[Validators.required,Validators.pattern("[7-9][0-9]{9}")]],
      cardExpiry:['',[Validators.required]]
     })
     
    this.OtpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999), Validators.pattern("^[0-9]*$")])
    })
  }
  get f(){
    return this.detailsForm.controls;
  }
  get f2(){
    return this.carddetailsForm.controls;
  } 
  
  get f3(){
    return this.OtpForm.controls;
  }
  onSubmit(form)
{  
  if(form.invalid){
    alert("Please Enter Valid details")
  } 
  else{
  this.requestSent = true;
  console.log(form)}
}
onSubmit2(form){ 
  if(form.invalid){
    alert("Please Enter Valid details");
    return;
  } 
  
  this.makepayment = true;
  alert("Payment Successfull!");
      let bookingId= JSON.stringify(Date.now()).substr(7,6);
      console.log(bookingId);
      let totalPrice=0.0;
      let totalPassengers=+localStorage.getItem('adultpassengercount')+(+localStorage.getItem('childpassengercount'))+(+localStorage.getItem('infantpassengercount'));
      console.log(totalPassengers)
      for(let i=0;i<this.ticketservice.tickets.length;i++)
      {
        this.ticketservice.tickets[i].BookingId=bookingId;
        totalPrice=totalPrice+this.ticketservice.tickets[i].Price;
      }
      console.log(this.ticketservice.tickets);
      console.log(totalPrice);
      let booking={ BookingId: bookingId,
                    UserEmailId:sessionStorage.getItem('useremail'),
                    DateBooking:new Date().toISOString().slice(0,10),
                    TransactionId:(this.detailsForm.controls.bank.value).concat(JSON.stringify(Date.now()).substr(7,4)),
                    TotalPrice:totalPrice,
                    TotalPassenger:totalPassengers,
                    BookStatus:'Confirmed'
                  }
                  console.log(booking.TransactionId)
                  sessionStorage.setItem('boo',JSON.stringify(booking));
                  console.log(booking);
      this.bookingservice.addBooking(booking).subscribe(data=>{
        console.log(data);
        this.ticketservice.addTickets().subscribe(data=>{console.log(data) 
        }); 
      }); 

      this.makepayment = true;
      this.router.navigate(['showticket']);
      
    }
}

/* onSubmit3(form){
  if(form.invalid){
    alert("Please Enter Valid details") ;
    return ;
  } 
  
    if(this.current === form.value.otp){
      alert("Payment Successfull!");
      let bookingId= JSON.stringify(Date.now()).substr(7,6);
      console.log(bookingId);
      let totalPrice=0.0;
      let totalPassengers=+localStorage.getItem('adultpassengercount')+(+localStorage.getItem('childpassengercount'))+(+localStorage.getItem('infantpassengercount'));
      console.log(totalPassengers)
      for(let i=0;i<this.ticketservice.tickets.length;i++)
      {
        this.ticketservice.tickets[i].BookingId=bookingId;
        totalPrice=totalPrice+this.ticketservice.tickets[i].Price;
      }
      console.log(this.ticketservice.tickets);
      console.log(totalPrice);
      let booking={ BookingId: bookingId,
                    UserEmailId:sessionStorage.getItem('useremail'),
                    DateBooking:new Date().toISOString().slice(0,10),
                    TransactionId:(this.detailsForm.controls.bank.value).concat(JSON.stringify(Date.now()).substr(7,4)),
                    TotalPrice:totalPrice,
                    TotalPassenger:totalPassengers,
                    BookStatus:'Confirmed'
                  }
                  console.log(booking.TransactionId)
                  sessionStorage.setItem('boo',JSON.stringify(booking));
                  console.log(booking);
      this.bookingservice.addBooking(booking).subscribe(data=>{
        console.log(data);
        this.ticketservice.addTickets().subscribe(data=>{console.log(data) 
        }); 
      }); 

      this.makepayment = true;
      this.router.navigate(['showticket']);
      
    }
    else{
    alert("Incorrect OTP");
  } */








