import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency-room',
  templateUrl: './emergency-room.component.html',
  styleUrls: ['./emergency-room.component.css']
})
export class EmergencyRoomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  avlblData: any[] = [
    {
      "text1": '28',
      "text2": 'Munites',
      "header": 'Wait Time'
    },
    {
      "text1": '1 Available',
      "text2": '4 in Use',
      "header": 'Rooms'
    },
    {
      "text1": '45',
      "text2": 'Munites',
      "header": 'Imaging'
    },
    {
      "text1": '9',
      "text2": 'Patients',
      "header": 'Waiting Room'
    }
  ]


}
