import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electronic-health',
  templateUrl: './electronic-health.component.html',
  styleUrls: ['./electronic-health.component.css']
})
export class ElectronicHealthComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    console.log(window.innerHeight, 'height of ehr');
    
  }

}
