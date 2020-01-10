import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientNameFormControl = new FormControl('',
    Validators.required,
  );
  heightFormControl = new FormControl('', [
    Validators.required,
  ]);
  weightFormControl = new FormControl('', [
    Validators.required,
  ]);
// 

  selected: any = '';
  selectedGender: any;
  addPatientButton: boolean;
  updatePatientButton: boolean;
  PatientData;
  ngOnInit() {
    this.authentication.testEmitter.subscribe((data) => {
      console.log(data, 'buttondata');
      this.PatientData = data;
      if (this.PatientData) {
        console.log('hi');
        this.patientNameFormControl.setValue(this.PatientData.patientName)
        this.selected = this.PatientData.relation
        this.heightFormControl.setValue(this.PatientData.height)
        this.weightFormControl.setValue(this.PatientData.weight)
        console.log('hi');
      }
      if (data == 'setPatientButtonTrue') {
        this.addPatientButton = true
        this.updatePatientButton = false
      } else if (data == 'setUpdatePatientButtonTrue') {
        this.addPatientButton = false
        this.updatePatientButton = true
      }
    })



  }
  constructor(
    private toast: ToastrService,
    private userService: UserService,
    private authentication: AuthenticationService,
    @Optional() public dialogRef: MatDialogRef<AddPatientComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeRelation(relation) {
    console.log(relation, this.selected)
  }

  patientProfile(patientName, height, weight) {
    console.log(patientName, height, weight);
    console.log(this.selected)
    this.userService.registerPatient({
      "height": parseFloat(height.value),
      "patientName": patientName.value,
      "relation": this.selected,
      "gender": this.selectedGender,
      "userId": localStorage.getItem("userId"),
      "weight": parseFloat(weight.value)
    }).subscribe((data) => {
      console.log(data, "data during patient registration");
      this.authentication.toggleEmit('close');
      this.toast.success('Patient Added Successfully')
    }, (err) => {
      this.toast.error('Something went wrong, Please Try again.')
      console.log(err, "error during patient registration");
    })
  }

  updatepatientProfile(patientName, height, weight) {
    // "height": 0,
    // "patientName": "string",
    // "pid": 0,
    // "relation": "string",
    // "userId": 0,
    // "weight": 0
    this.userService.updatePatientProfile({
      "height": parseFloat(height.value),
      "patientName": patientName.value,
      "pid": this.PatientData.pid,
      "relation": this.selected,
      "gender": this.selectedGender,
      "userId": localStorage.getItem("userId"),
      "weight": parseFloat(weight.value)
    }).subscribe((data) => {
      console.log(data, "data during patient registration");
      this.authentication.toggleEmit('close');
      this.toast.success('Patient Updated Successfully')
    }, (err) => {
      this.toast.error('Something went wrong, Please Try again.')
      console.log(err, "error during patient registration");
    })
  }

  cancelEdit() {
    this.authentication.toggleEmit('close');
  }

}
