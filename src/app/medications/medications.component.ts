import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedicationService } from '../_services/medication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  apps: any[] = [
    {
      "medication": "Add Medication",
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
  medImage = new FormControl('');
  medIntake = new FormControl('');
  medDesc = new FormControl('');
  medMeal = new FormControl('');
  medData: { "DESCRIPTION": any; "MEDIMAGE": any; "MEDNAME": any; };
  imageData: any;
  flag: boolean = false;
  editedImageData: any;
  setImageEditFlag: boolean = true;
  constructor(private http: HttpClient, private medicationService: MedicationService, private sanitizer: DomSanitizer, ) { }

  ngOnInit() {
    this.medicationService.getMedtcations().subscribe(
      (res: []) => {
        console.log(res)
        let medicinesAvailable = []

        res.forEach((element, index) => {

          //   t['color'] = colors[index];
          //   // t['id'] = element['MEDID']
          //   // t['medicationSchedule'] = element['MEDSCHEDULE'];
          //   // t['medicationDetails'] = element['DESCRIPTION'];
          //   // t['medication'] = element['MEDNAME'];
          //   // let TYPED_ARRAY = new Uint8Array(element['MEDIMAGE']);

          if (element['medid'] != 44) {
            let colors = ['lightgreen',
              'lightyellow',
              'pink',
              'lightgray',
              'lightblue']
            let t = {};

            if (index % 2 == 0) {
              t['medicationIndication'] = 'warn'
            }

            t['color'] = colors[index];
            t['id'] = element['medid']
            t['medicationSchedule'] = element['medschedule'];
            t['medicationDetails'] = element['description'];
            t['medication'] = element['medname'];
            t['image'] = element['medimage']

            t['medicationImage'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${element['medimage']}`);
            this.apps.push(t);
          }
        });
      },
      err => {
        console.log("error", err);
      }
    );
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

    const formData = new FormData();
    formData.append('DESCRIPTION', this.medDesc.value);
    formData.append('MEDIMAGE', this.imageData);
    formData.append('MEDNAME', this.medName.value);
    formData.append('MEDSCHEDULE', this.medIntake.value); console.log(formData);

    this.medData = {
      "DESCRIPTION": this.medDesc.value,
      "MEDIMAGE": { data: this.imageData, 'content-type': "image/*" },
      "MEDNAME": this.medName.value
    }
    console.log(formData, 'data');

    this.medicationService.addMedication(formData).subscribe((data) => {
      console.log(data);

    }, (err) => {
      console.log(err, "err");

    })

    this.medName.setValue('')
    this.medIntake.setValue('')
    this.addMedicationToggle = !this.addMedicationToggle
  }
  cancelAdding() {
    this.medName.setValue('')
    this.medIntake.setValue('')
    this.addMedicationToggle = !this.addMedicationToggle

  }
  removeMedication(k, i) {

    console.log(k)

    this.medicationService.deleteMedtcations(JSON.stringify(k.id)).subscribe((res) => {
      console.log(res);
      this.apps.splice(i, 1)
    }, (err) => {
      console.log(err);
    })
  }

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

  //Method to edit the form
  editMedication(medicationDetail) {
    this.flag = !this.flag;
    if (!this.flag) {
      let formDataa = new FormData();
      if (this.setImageEditFlag) {
        console.log()
        console.log(medicationDetail.medicationImage.changingThisBreaksApplicationSecurity);
        const blob = this.b64toBlob(medicationDetail.image);

        formDataa.append("MEDIMAGE", blob)

        this.setImageEditFlag = true;
      }
      else {
        formDataa.append("MEDIMAGE", this.editedImageData)
      }
      console.log(medicationDetail.medicationSchedule);

      this.medicationService.editMedications(parseInt(medicationDetail.id), medicationDetail.medicationDetails,
        medicationDetail.medication, medicationDetail.medicationSchedule, formDataa).subscribe((data) => {

        }, (err) => {

        })
    }

  }
}
