import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  apps: any[] = [
    {
      "medication": "Add Medication",
      "medicationImage": "assets/icons-home/motion01.png",
      "color": "lightgrey"
    },
    {
      "appId": 2,
      "medicationDetails": "This is Beazepril",
      "medication": "Beazepril",
      "medicationImage": "assets/medications/benazepril.jpg",
      "medicationIndication": "warn",// alerts user for potential contraindications
      "medicationSchedule": "twice",
      "color": "lightblue"
    },
    {
      "appId": 4,
      "medicationDetails": "This is Candesartan",
      "medication": "Candesartan",
      "medicationImage": "assets/medications/candestron.jpg",
      "medicationIndication": "warn",// alerts user for potential contraindications
      "medicationSchedule": "thrice",
      "color": "lightpink"
    },
    {
      "appId": 5,
      "medicationDetails": "This is Liptor",
      "medication": "Liptor",
      "medicationImage": "assets/medications/lipitol.jpg",
      "medicationIndication": "warn",// alerts user for potential contraindications
      "medicationSchedule": "once",
      "color": "aliceblue"
    },
    {
      "appId": 6,
      "medicationDetails": "This is Vicodin",
      "medication": "Vicodin",
      "medicationImage": "assets/medications/vicodin.jpg",
      "medicationIndication": "warns",// alerts user for potential contraindications
      "medicationSchedule": "four times",
      "color": "lightyellow"
    },
    {
      "appId": 7,
      "medicationDetails": "This is Lizodine",
      "medication": "Vicodin",
      "medicationImage": "assets/medications/vicodin.jpg",
      "medicationIndication": "warns",// alerts user for potential contraindications
      "medicationSchedule": "four times",
      "color": "lightgreen"
    },
  ]

  constructor() { }

  ngOnInit() {

  }
  removeMedication(k){
    this.apps.splice(k, 1)
  }
}
