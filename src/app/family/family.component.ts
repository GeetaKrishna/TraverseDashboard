import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  selectedIndex: any = 0;

  constructor() { }

  ngOnInit() {
  }

  persons = [
    {
      "name": "Sophia",
      "url": "/Kai",
      "weight": "49",
      "age": "23",
      "height": "158",
      "image": "../assets/familyView/Sophia.png"
    },
    {
      "name": "Ethan",
      "url": "/Kai",
      "weight": "69",
      "age": "18",
      "height": "158",
      "image": "../assets/familyView/ethan.png"
    },
    {
      "name": "Kai",
      "age": "20",
      "weight": "90",
      "height": "180",
      "image": "../assets/familyView/kai.svg",
      "url": "/Kai"
    }
  ]
  switchMember: any = this.persons[0];

  testFamily(memberDetails, _index) {
    this.selectedIndex = _index;
    this.switchMember = memberDetails;
  }
}
