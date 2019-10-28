import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-connect',
  templateUrl: './health-connect.component.html',
  styleUrls: ['./health-connect.component.css']
})
export class HealthConnectComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }

test(index){
  console.log('dasd')
  this.route.navigateByUrl('admin/healthconnect/healthconnectchat')
}

}
