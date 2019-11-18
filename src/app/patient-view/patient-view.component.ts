import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  patientsDetails = [
    {
      "name": "Sophia Deleila",
      "appointment": "No Appointment",
      "url": "../assets/familyView/Sophia.png",
      prespcriptions: 0
    },
    {
      "name": "Ethan Hunt",
      "appointment": "Next Appointment 2019/09/23",
      "url": "../assets/familyView/ethan.png",
      prespcriptions: 2
    },
    {
      "name": "Kylo Ren",
      "appointment": "Next Appointment 2019/10/23",
      "url": "../assets/familyView/kai.svg",
      prespcriptions: 1
    }
  ]
}
