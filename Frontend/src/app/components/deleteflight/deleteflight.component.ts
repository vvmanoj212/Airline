import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flight } from 'src/app/models/flight';
import { Router } from '@angular/router';
import { FlightlistService } from 'src/app/services/flightlist.service';

@Component({
  selector: 'app-deleteflight',
  templateUrl: './deleteflight.component.html',
  styleUrls: ['./deleteflight.component.css']
})
export class DeleteflightComponent implements OnInit {
  Deleteflight: FormGroup;
  flights:any;
  constructor(private builder : FormBuilder,private service: FlightlistService,public route: Router) { }

  ngOnInit(): void {
    this.service.getallflights().subscribe(data=>{
      this.flights=data;
     console.log(this.flights);
     },(error)=>{
      alert("Failed to fetch data from server.");
    });
    this.Deleteflight= this.builder.group({
      FlightId:["",Validators.required]
    })
  }
  onSubmit(form :any){
      console.log(form.FlightId);
      this.service.deleteFlight(form.FlightId).subscribe(data=>{
      console.log(data);
      alert("Flight Deleted Successfully");
      this.route.navigate(['adminview']);
})
  }

}
