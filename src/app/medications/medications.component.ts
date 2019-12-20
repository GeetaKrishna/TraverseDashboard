import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedicationService } from '../_services/medication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddMedComponent } from '../add-med/add-med.component';
import * as moment from 'moment';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
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
    //   "medicationIndication": "warn",// alerts user for potential contraindications
    //   "medicationSchedule": "twice",
    //   "color": "lightblue"
    // },
  ]

  addMedicationToggle: boolean = true;
  medName = new FormControl('');
  // new FormControl({value: 'Nancy', disabled: true}, Validators.required),
  startTime = new FormControl({ value: '', disabled: true });
  endTime = new FormControl({ value: '', disabled: true });
  medImage = new FormControl('');
  medIntake = new FormControl('');
  medDesc = new FormControl('');
  medMeal = new FormControl('');
  imageData: any;
  flag: boolean = false;
  editedImageData: any;
  setImageEditFlag: boolean = true;
  showPres: boolean;
  medicationDetails: any;
  description: any;
  newData: {};
  constructor(
    private http: HttpClient,
    private medicationService: MedicationService,
    private sanitizer: DomSanitizer, public dialog: MatDialog) { }
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  sliderValue = 0;
  animal: string;
  name: string;
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
                  press.startDate = press.startDate.split("T")[0];
                  press.endDate = press.endDate.split("T")[0];
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
            // res.forEach((element, index) => {
            //   if (element['medid'] != 44) {
            //     let colors = ['ch-1',
            //       'ch-2',
            //       'ch-3',
            //       'ch-4',
            //       'ch-0']
            //     let t = {};
            //     if (index % 2 == 0) {
            //       t['medicationIndication'] = 'warn'
            //     }
            //     t['color'] = colors[index];
            //     t['id'] = element['medid']
            //     t['medicationSchedule'] = element['medschedule'];
            //     t['medicationDetails'] = element['description'];
            //     t['medication'] = element['medname'];
            //     t['image'] = element['medimage']
            //     t['medicationImage'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${element['medimage']}`);
            //     this.apps.push(t);
            //   }
            // });
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
      // .replace('/', '-')

      this.apps[index].startDate = moment(this.startTime.value).format("YYYY-MM-DD")
      this.apps[index].endDate = moment(this.endTime.value).format("YYYY-MM-DD"),
        this.apps[index].instruction = this.medIntake.value

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
    // this.endTime = medicationDetail.endDate 
    // this.startTime = medicationDetail.startDate 
    // dosage: "23"
    // endDate: "2020-01-02"
    // id: 4
    // instruction: "Twice"
    // medicationId: 4
    // pid: 1
    // startDate: "2020-02-01"
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
    const dialogRef = this.dialog.open(AddMedComponent, {
      data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  imageInput(event) {
    let file = event.target.files[0];
    this.imageData = file;
    console.log(this.imageData);
  }

  editImageInput(event, index, data) {
    this.setImageEditFlag = false;
    let file = event.target.files[0];
    let reader = new FileReader();
    this.editedImageData = file;
    let oldImageValue = data[index].medicationImage;
    reader.onload = function (e) {
      console.log(e.target['result'])
      data[index].medicationImage = e.target['result'];
    }
    reader.readAsDataURL(file);
  }

  processFile(theFile) {
    return function (e) {
      let fileByteArray = [];
      var theBytes = e.target.result;
      fileByteArray.push(theBytes);
      for (var i = 0; i < fileByteArray.length; i++) {
        document.getElementById('file').innerText += fileByteArray[i];
      }
    }
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
          prescription.startDate = moment(this.startTime.value).format('YYYY-MM-DD');
          prescription.endDate = moment(this.endTime.value).format('YYYY-MM-DD');

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
  //   dateInput(value, dateType){
  // console.log(value, dateType, this.endTime, this.startTime);
  //   }
  //Function to convert base64 String to ByteArray

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  test(test) {
    console.log(test, this.medName);
    this.description = test.description;

  }
}
