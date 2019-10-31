import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  persons = [
    {
      "name": "Sophia",
      "url": "../assets/familyView/Sophia.png"
    },
    {
      "name": "Ethan",
      "url": "../assets/familyView/ethan.png"
    },
    {
      "name": "Kai",
      "url": "../assets/familyView/kai.svg"
    }
  ]
}
