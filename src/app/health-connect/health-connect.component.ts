import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-connect',
  templateUrl: './health-connect.component.html',
  styleUrls: ['./health-connect.component.css']
})
export class HealthConnectComponent implements OnInit {

  constructor(private route: Router) { }

  defaultContactsList = [{ from: 'GeetaKrishna Adhikari', image: '../assets/logo.png', name: 'Geeta Krishna Adhikari' },
  { name: 'Harish Kumar Madugula', from: 'Harish Madugula', image: '../assets/icons-home/motion03.jpeg' },
  { name: 'Manoj Devarashetty', from: 'Manoj Devarashetty', image: '../assets/icons-home/motion03.jpeg' },
  { name: 'Manoj Kumar', from: 'Manoj Kumar', image: '../assets/icons-home/motion03.jpeg' }];

  contactsList = [{ from: 'GeetaKrishna Adhikari', image: '../assets/logo.png', name: 'Geeta Krishna Adhikari' },
  { name: 'Harish Kumar Madugula', from: 'Harish Madugula', image: '../assets/icons-home/motion03.jpeg' },
  { name: 'Manoj Kumar', from: 'Manoj Kumar', image: '../assets/icons-home/motion03.jpeg' }];

  doctorsList = [
    {
      name: "Ashok",
      speciality: "Orthopedician",
      image: "../assets/logo.png"
    },
    {
      name: "Kumar",
      speciality: "Heart Surgeon",
      image: "../assets/icons-home/motion03.jpeg"
    },
    {
      name: "Lalitha",
      speciality: "Pediatrician",
      image: "../assets/icons-home/motion03.jpeg"
    },
  ]

  ngOnInit() {
  }

  test(index) {
    console.log('dasd')
    this.route.navigateByUrl('admin/healthconnect/healthconnectchat')
  }

}
