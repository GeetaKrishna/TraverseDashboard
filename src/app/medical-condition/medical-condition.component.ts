import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MedicationService } from '../_services/medication.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MedicalConditionService } from '../_services/medical-condition.service';

@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
  styleUrls: ['./medical-condition.component.css']
})
export class MedicalConditionComponent implements OnInit {

  apps: any[] = [
    {
      "Condition_Name": "Add a Condition",
      "conditionImage": "assets/icons-home/motion01.png",
      "color": "lightgrey"
    },
    // {
    //   "appId": 2,
    //   "medication": "Gout",
    //   "medicationImage": "assets/medicalCondition/gout.jpg",
    //   "diagnoised": "First Diagnosed 6/12/2016",
    //   "severity": "Chronic",
    //   "restrictions": "Diet based Triggers",
    //   "color": "lightblue"
    // },
    // {
    //   "appId": 4,
    //   "medication": "Peanuts Allergy",
    //   "medicationImage": "assets/medicalCondition/peanuts.png",
    //   "diagnoised": "Since childhood",
    //   "severity": "Mild, small quantities allowed",
    //   "restrictions": "No other restrictions",
    //   "color": "lightpink"
    // },
    // {
    //   "appId": 5,
    //   "medication": "High Blood Pressure",
    //   "medicationImage": "assets/medicalCondition/highBP.jpg",
    //   "diagnoised": "First diagnosed 5/11/2017",
    //   "severity": "Monitor at home regularly",
    //   "restrictions": "Yearly EKG required",
    //   "color": "aliceblue"
    // },

  ]

  addMedicationToggle: boolean = true;
  conditionName = new FormControl('');
  medImage = new FormControl('');
  Diagnosed = new FormControl('');
  severity = new FormControl('');
  triggers = new FormControl('');
  medicalConditionData: { "medication": any; "medicationImage": any; "diagnosed": any; "restrictions": any; "severity": any; };
  imageData: any;
  setImageEditFlag: boolean;
  editedImageData: any;
  flag: any = false;

  constructor(private http: HttpClient, private medicalConditionService: MedicalConditionService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.medicalConditionService.getMedicalCondition().subscribe(
      (res: []) => {
        console.log(res);

        res.forEach((data) => {
          console.log(data);
          let t = {};
          t['ConditionType_ID'] = data['ConditionType_ID']
          t['Condition_Name'] = data['Condition_Name']
          t['DiagnosisDate'] = data['DiagnosisDate']
          t['LinktoAPI'] = data['LinktoAPI']
          t['PID'] = data['PID']
          t['Severity'] = data['Severity']
          t['Triggers'] = data['Triggers']
          t['Image'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${data['Image']}`);
          this.apps.push(t)
        })

        // this.apps = this.apps.concat(res)
      },
      err => {
        console.log("error", err);
      }
    );
  }

  imageInput(event) {
    console.log(event.target.files);
    let file = event.target.files[0]
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
      data[index].Image = e.target['result'];
    }
    reader.readAsDataURL(file);
  }

  toggleMedication() {
    this.addMedicationToggle = !this.addMedicationToggle
  }

  successAdding() {
    let newMedicalCondition = {
      "Condition_Name": this.conditionName.value,
      "DiagnosisDate": this.Diagnosed.value,
      "Triggers": this.triggers.value,
      "Severity": this.severity.value
    };
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target['result'])
      newMedicalCondition['Image'] = e.target['result'];
    }

    reader.readAsDataURL(this.imageData);

    // console.log(newMedicalCondition, 'data');
    let formDataa = new FormData();
    formDataa.append("conditionName", this.conditionName.value)
    formDataa.append("linkToApi", `http://www.google.com/${this.conditionName.value}`)
    formDataa.append("severity", this.severity.value)
    formDataa.append("triggers", this.triggers.value)
    formDataa.append("diagnosisDate", this.Diagnosed.value)
    formDataa.append("image", this.imageData, this.imageData.name)
    this.medicalConditionService.addMedicalCondition(formDataa).subscribe((data) => {
      console.log(data);
      this.apps.push(newMedicalCondition)

    }, (err) => {
      console.log(err);
      if (err === "OK") {
        this.apps.push(newMedicalCondition)
      }
    })
    this.addMedicationToggle = !this.addMedicationToggle
  }

  cancelAdding() {
    this.addMedicationToggle = !this.addMedicationToggle
  }

  removeMedication(id, i) {
    // this.apps.splice(i, 1)
    console.log(id, i);

    this.medicalConditionService.deleteMedicalCondition(id).subscribe((res) => {
      console.log(res);
      this.apps.splice(i, 1)
    }, (err) => {
      console.log(err);

      if (err === "OK") {
        this.apps.splice(i, 1)
      }
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

  editMedicalCondition(index, medicationDetail){
    this.flag = !this.flag;
    if (!this.flag) {
      let formDataa = new FormData();
      if (this.setImageEditFlag) {
        console.log(medicationDetail.medicationImage.changingThisBreaksApplicationSecurity);
        const blob = this.b64toBlob(medicationDetail.image);

        formDataa.append("MEDIMAGE", blob)

        this.setImageEditFlag = true;
      }
      else {
        formDataa.append("MEDIMAGE", this.editedImageData)
      }
      console.log(medicationDetail.medicationSchedule);

      // this.medicationService.editMedications(parseInt(medicationDetail.id), medicationDetail.medicationDetails,
      //   medicationDetail.medication, medicationDetail.medicationSchedule, formDataa).subscribe((data) => {

      //   }, (err) => {

      //   })
    }
  }

}
