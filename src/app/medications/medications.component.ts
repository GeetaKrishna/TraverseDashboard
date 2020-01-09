import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MedicationService } from '../_services/medication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { AddMedComponent } from '../add-med/add-med.component';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MedicationsComponent implements OnInit {

  apps: any[] = [
    {
      "name": "Add Medication",
      "medicationImage": "assets/icons-home/motion01.png",
      "color": "lightgrey"
    },

    // {
    //   "appId": 2,
    //   "medicationDetails": "This is Benazepril",
    //   "medication": "Benazepril",
    //   "medicationImage": "assets/medications/benazepril.jpg",
    //   "startDate": new Date(),
    //   "endDate": new Date(),
    //   "medicationIndication": "warn",// alerts user for potential contraindications
    //   "instruction": "twice",
    //   "color": "lightblue"
    // },
  ]

  addMedicationToggle: boolean = true;
  medName = new FormControl('');
  startTime = new FormControl({ value: '', disabled: true });
  endTime = new FormControl({ value: '', disabled: true });
  medIntake = new FormControl('');
  flag: boolean = false;
  medicationDetails: any;
  description: any;
  newData: {};
  medicationDescription: any;

  constructor(
    private medicationService: MedicationService,
    private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  sliderValue = 0;

  colors = ['ch-1',
    'ch-1',
    'ch-1',
    'ch-1',
    'ch-1'];

  ngOnInit() {
    this.medicationService.getPrescriptions().subscribe(
      (pres: []) => {
        this.medicationService.getMedications().subscribe(
          (res: []) => {
            console.log(res)
            console.log(pres);
            this.medicationDetails = res;
            res.map((e) => {
              pres.map((press: any, index) => {
                if (e['id'] === press['medicationId']) {
                  console.log(moment(new Date(press.startDate)).format('YYYY-MM-DD'));
                  
                  press.startDate = moment(new Date(press.startDate)).format('YYYY-MM-DD');
                  press.endDate = moment(new Date(press.endDate)).format('YYYY-MM-DD');
                  let t = {};
                  t = press;
                  if (index % 2 == 0) {
                    t['medicationIndication'] = 'warn'
                  }
                  t['color'] = this.colors[index];
                  t['name'] = e['name'];
                  t['image'] = e['image'];
                  t['description'] = e['description'];
                  t['image'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${t['image']}`);
                  console.log(t);
                  this.apps.push(t);
                }

              })
            })
          },
          err => {
            console.log("error", err);
          }
        );
      }, (err) => {
        console.log(err);
      })
  }

  saveCancelled() {
    this.flag = false;
  }

  saveNewData(medicationDetail, index) {
    console.log(medicationDetail);
    console.log(this.apps[index])

    this.newData = {
      "dosage": medicationDetail.dosage,
      "id": medicationDetail.id,
      "instruction": this.medIntake.value,
      "medicationId": medicationDetail.medicationId,
      "pid": medicationDetail.pid,
      "endDate": moment(this.endTime.value).format("YYYY-MM-DD"),
      "startDate": moment(this.startTime.value).format("YYYY-MM-DD")
    }

    this.medicationService.editPrescription(this.newData).subscribe((data) => {
      console.log(data, 'after updating');

      this.apps[index].startDate = moment(this.startTime.value).format("YYYY-MM-DD");
      this.apps[index].endDate = moment(this.endTime.value).format("YYYY-MM-DD");
      this.apps[index].instruction = this.medIntake.value;

      // this.apps['index'].id = medicationDetail.dosage,
      // this.apps['index'].dosage = medicationDetail.dosage,
      // this.apps['index'].dosage = medicationDetail.dosage,
      // this.apps['index'].dosage = medicationDetail.dosage,
    }, (err) => {
      console.log(err, 'error after updating');
    })
    this.flag = false;
    console.log(this.newData, 'newData');
  }

  //Method to edit the form
  editMedication(medicationDetail) {
    console.log(medicationDetail, "details");
    this.flag = !this.flag;
    this.endTime.setValue(medicationDetail.endDate);
    this.startTime.setValue(medicationDetail.startDate);
    this.medIntake.setValue(medicationDetail.instruction);
    // dosage: "23"
    // endDate: "2020-01-02"
    // id: 4
    // instruction: "Twice"
    // medicationId: 4
    // pid: 1

    // if (!this.flag) {
    //   console.log(medicationDetail, 'medData');
    //   this.medicationService.editPrescription({
    //     "dosage": medicationDetail.dosage,
    //     "endDate": medicationDetail.endDate,
    //     "id": medicationDetail.id,
    //     "instruction": medicationDetail.instruction,
    //     "medicationId": medicationDetail.medicationId,
    //     "pid": medicationDetail.pid,
    //     "startDate": medicationDetail.startDate
    //   }).subscribe((data) => {
    //     console.log(data, "after updating");
    //   }, (err) => {
    //   })
    // }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMedComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.medicationDescription = result;
    });
  }

  toggleMedication() {
    this.addMedicationToggle = !this.addMedicationToggle
  }

  successAdding() {
    let prescription = {
      "dosage": this.sliderValue.toString(),
      "endDate": this.endTime.value,
      "instruction": this.medIntake.value,
      "medicationId": this.medName.value.id,
      "pid": localStorage.getItem("patientId"),
      "startDate": this.startTime.value
    }
    console.log(moment(this.startTime.value).format('YYYY-MM-DD'));
    console.log(moment(this.endTime.value).format('YYYY-MM-DD'));


    this.medicationService.addPrescription(prescription).subscribe((data) => {
      console.log(data);
      this.medicationDetails.map((e, index) => {
        if (e['id'] === prescription['medicationId']) {
          prescription.startDate = moment(new Date(this.startTime.value)).format('YYYY-MM-DD');
          prescription.endDate = moment(new Date(this.endTime.value)).format('YYYY-MM-DD');

          let t = {};
          t = prescription;
          t['id'] = data['id'];
          // if (index % 2 == 0) {
          //   t['medicationIndication'] = 'warn'
          // }
          t['color'] = this.colors[index];
          t['name'] = e['name'];
          t['image'] = e['image'];
          t['description'] = e['description'];
          t['image'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${t['image']}`);
          console.log(t);
          this.apps.push(t);
        }
      })

    }, (err) => {
      console.log(err, "err");
    })
    console.log(this.startTime, this.endTime);
    this.medName.reset()
    this.medIntake.reset()
    this.addMedicationToggle = !this.addMedicationToggle

    // plan how to reset these values;

    // this.endTime.setValue("")
    // this.startTime.setValue("")
  }

  cancelAdding() {
    this.medName.setValue('')
    this.medIntake.setValue('')
    this.addMedicationToggle = !this.addMedicationToggle
  }

  removeMedication(medication, i) {
    console.log(medication, i)
    this.medicationService.deletePrescription(parseInt(medication.id)).subscribe((res) => {
      console.log(res);
      this.apps.splice(i, 1)
    }, (err) => {
      console.log(err);
    })
  }

  test(test) {
    console.log(test, this.medName);
    this.description = test.description;

  }
}
