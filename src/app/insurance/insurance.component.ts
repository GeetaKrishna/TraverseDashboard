import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../_services/insurance.service';
import { FormControl, Validators } from '@angular/forms';
import { PatientService } from '../_services/patient.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  patientsListAll: Object;
  selectedIndex: number = 0;

  constructor(private insuranceService: InsuranceService, private patientService: PatientService) { }

  private plans: any;

  private claims: any;

  private date = "2019";

  patientId = parseInt(localStorage.getItem("patientId"));

  private dentalDeductable: number = 0;

  private medicalDeductable: number = 0;

  private presDeductable: number = 0;

  private totalDeductable: number = 0;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Medical', 'Dental', 'Rx'];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    { backgroundColor: 'rgba(153, 102, 255, 0.6)', borderColor: 'rgba(153, 102, 255, 1)', data: [this.medicalDeductable, this.dentalDeductable, this.presDeductable], label: 'Costs' }
  ];
  //---------------------------------------//
  public deductChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public deductChartLabels = ['You', 'Sophia', 'Ethan', 'Kai'];
  public deductChartType = 'horizontalBar';
  public deductChartLegend = true;
  public deductChartData = [
    { backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', data: [65, 59, 80, 100], label: 'Deductibles' }
  ];
  public setRow(_index: number, patient) {
    this.selectedIndex = _index;
    console.log(patient);
    
  }
  dateFormControl = new FormControl("", [Validators.required])
  
  ngOnInit() {
    this.insuranceService.getPlans().subscribe(

      (res) => {
        this.plans = res;
        console.log(this.plans);
        for (let index = 0; index < this.plans.length; index++) {
          console.log("Obained date " + this.plans[index].date);

          this.totalDeductable = this.plans[index].dentalDeductable + this.plans[index].medicalDeductable + this.plans[index].presDeductable

          this.dentalDeductable = (this.plans[index].dentalDeductable / this.totalDeductable) * 100;
          this.medicalDeductable = (this.plans[index].medicalDeductable / this.totalDeductable) * 100;
          this.presDeductable = (this.plans[index].presDeductable / this.totalDeductable) * 100;

          console.log("Obtained deduct " + this.dentalDeductable);
          console.log("Obtained medicalDeductable " + this.medicalDeductable);
          console.log("Obtained presDeductable " + this.presDeductable);
          this.barChartData = [
            { backgroundColor: 'rgba(153, 102, 255, 0.6)', borderColor: 'rgba(153, 102, 255, 1)', data: [this.medicalDeductable, this.dentalDeductable, this.presDeductable], label: 'Costs' }
          ];
        }
      },
      err => {
        console.log("error", err);
      }
    );
    this.insuranceService.getClaims().subscribe(

      (res) => {
        console.log(res);
        this.claims = res;

        this.patientService.getAllPatientsList().subscribe((patientsList) => {
          console.log(patientsList);
          this.patientsListAll = patientsList;
        }, (error) => {
          console.log(error, "error from patients list API");

        })


      },
      err => {
        console.log("error", err);
      }
    );
  }

}
