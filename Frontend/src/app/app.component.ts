import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AuthService } from './services/auth.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AirFly';
  
  constructor(private authservice:AuthService)
  {
  }
  ngOnInit(): void {
    var $myCarousel = $('#mycarousel');
    $myCarousel.carousel(
      {
        interval:5000,pause: 'none'
      }
    );
  }

}

