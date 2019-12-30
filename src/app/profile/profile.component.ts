import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  emailFormControl = new FormControl();
  userNameFormControl = new FormControl();
  numberFormControl = new FormControl();
  dateFormControl = new FormControl();
  heightFormControl = new FormControl();
  weightFormControl = new FormControl();

  ngOnInit() {
  }

}
