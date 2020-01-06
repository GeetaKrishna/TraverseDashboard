import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../_services/insurance.service';
import { AuthenticationService } from '../_services/authentication.service';

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
  PatientData: Object;
  constructor(private insurance: InsuranceService, private authentication: AuthenticationService) { }
  ngOnInit() {
    this.insurance.getAllPatientsList().subscribe((data) => {
      console.log(data, 'patientlist');
      this.PatientData = data
    }, (err) => {
      console.log(err);

    })
  }

  editPatient(patientData) {
    console.log(patientData, 'id');
    patientData.testData = 'editPatient';
    // let pData = JSON.stringify(patientData)
    // this.authentication.testHTML('')
    // console.log(pData, 'pdata');
    this.authentication.testHTML(patientData)
  }

  removePatient(patientData) {
    console.log(patientData, 'id');
  }
  
  // displayedColumns: string[] = ['relation', 'name', 'actions'];
  // dataSource = ELEMENT_DATA;
}

