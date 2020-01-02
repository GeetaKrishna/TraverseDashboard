import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MedicationService } from '../_services/medication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AddMedComponent } from '../add-med/add-med.component';

@Component({
  selector: 'app-meds',
  templateUrl: './meds.component.html',
  styleUrls: ['./meds.component.css']
})
export class MedsComponent implements OnInit {

  addMedicationToggle: boolean = true;
  medName = new FormControl('');
  startTime = new FormControl({ value: '', disabled: true });
  endTime = new FormControl({ value: '', disabled: true });
  medImage = new FormControl('');
  medIntake = new FormControl('');
  medDesc = new FormControl('');
  medMeal = new FormControl('');

  medicationDetails: any;

  apps: any[] = [
    {
      "name": "Add Medication",
      "medicationImage": "assets/icons-home/motion01.png",
      "color": "lightgrey"
    },
  ]

  constructor(public dialog: MatDialog, private medicationService: MedicationService, private sanitizer: DomSanitizer,) { }

  ngOnInit() {

    let colors = ['ch-1',
    'ch-2',
    'ch-3',
    'ch-4',
    'ch-0']
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
                press.startDate = press.startDate.split("T")[0];
                press.endDate = press.endDate.split("T")[0];
                let t = {};
                t = press;
                if (index % 2 == 0) {
                  t['medicationIndication'] = 'warn'
                }
                t['color'] = colors[index];
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMedComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  toggleMedication() {
    this.addMedicationToggle = !this.addMedicationToggle
  }

  cancelAdding() {
    this.medName.setValue('')
    this.medIntake.setValue('')
    this.addMedicationToggle = !this.addMedicationToggle
  }

}
