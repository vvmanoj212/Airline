import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {airportlist} from '../models/airportlist';

@Injectable({
  providedIn: 'root'
})
export class AirportlistService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl : string="https://localhost:44374/api/airport/GetAll";
  constructor(private http:HttpClient) { }
  getallairports(){
    return this.http.get<airportlist[]>(this.baseUrl,this.httpOptions);
   }
   
  
}

