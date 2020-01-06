import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../_services/insurance.service';
import { AuthenticationService } from '../_services/authentication.service';
import { PatientService } from '../_services/patient.service';
import { TypeScriptEmitter } from '@angular/compiler';

// export interface PeriodicElement {
//   name: string;
//   relation: number;
//   actions: number;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { relation: 1, name: 'Hydrogen', actions: 1.0079 },
//   { relation: 2, name: 'Helium', actions: 4.0026, },
//   { relation: 3, name: 'Lithium', actions: 6.941 },
//   { relation: 4, name: 'Beryllium', actions: 9.0122 },
//   { relation: 5, name: 'Boron', actions: 10.811 }
// ]

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  PatientData = [];
  constructor(private insurance: InsuranceService, private patient: PatientService, private authentication: AuthenticationService) { }
  ngOnInit() {

    this.patient.getAllPatientsList().subscribe((data: []) => {
      console.log(data, 'patientlist');      
      this.PatientData = data
    }, (err) => {
      console.log(err);
    })
  }

  editPatient(patientData) {
    console.log(patientData, 'id');
    patientData.testData = 'editPatient';
    this.authentication.testHTML(patientData)
  }

  removePatient(pid) {
    console.log(pid, 'id');
    this.patient.removePatient(pid).subscribe((data) => {
      console.log(data, 'removed');
      // this.PatientData = data
      this.PatientData = this.PatientData.filter(e => e.pid !== pid);
      this.authentication.toggleEmit('close');

    }, (err) => {
      console.log(err);

    })
  }

  // displayedColumns: string[] = ['relation', 'name', 'actions'];
  // dataSource = ELEMENT_DATA;
}

