import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemedicine',
  templateUrl: './telemedicine.component.html',
  styleUrls: ['./telemedicine.component.css']
})
export class TelemedicineComponent implements OnInit {

  defaultContactsList = [{ from: 'GeetaKrishna Adhikari', image: '../assets/logo.png', name: 'Geeta Krishna Adhikari'},
               {name: 'Harish Kumar Madugula', from: 'Harish Madugula', image: '../assets/icons-home/motion03.jpeg'},
               {name: 'Manoj Devarashetty', from: 'Manoj Devarashetty', image: '../assets/icons-home/motion03.jpeg'},
               {name: 'Manoj Kumar', from: 'Manoj Kumar', image: '../assets/icons-home/motion03.jpeg'}];

  contactsList = [{ from: 'GeetaKrishna Adhikari', image: '../assets/logo.png', name: 'Geeta Krishna Adhikari'},
               {name: 'Harish Kumar Madugula', from: 'Harish Madugula', image: '../assets/icons-home/motion03.jpeg'},
               {name: 'Manoj Kumar', from: 'Manoj Kumar', image: '../assets/icons-home/motion03.jpeg'}];
               
               medicalTeams = [
                {value: 'Dr Sue', viewValue: 'Dr Sue'},
                {value: 'Dr Hunt', viewValue: 'Dr Hunt'},
                {value: 'EthenSheng', viewValue: 'EthenSheng'}
              ];
  constructor() { }

  ngOnInit() {
  }

}
