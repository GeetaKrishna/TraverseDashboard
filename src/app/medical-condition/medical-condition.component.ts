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

  constructor(private http: HttpClient, private medicalConditionService: MedicalConditionService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.medicalConditionService.getMedicalCondition().subscribe(
      (res: []) => {
        console.log(res);
        this.apps = this.apps.concat(res)
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
    this.medicalConditionData = {
      "medication": this.conditionName.value,
      "medicationImage": this.medImage.value,
      // "medicationImage": this.imageData,
      "diagnosed": this.Diagnosed.value,
      "restrictions": this.triggers.value,
      "severity": this.severity.value
    }
    this.apps.push(this.medicalConditionData)
    console.log(this.medicalConditionData, 'data');
    let formDataa = new FormData();
    formDataa.append("conditionName", this.conditionName.value)
    formDataa.append("linkToApi", `http://www.google.com/${this.conditionName.value}`)
    formDataa.append("severity", this.severity.value)
    formDataa.append("triggers", this.triggers.value)
    formDataa.append("diagnosisDate", this.Diagnosed.value)
    formDataa.append("image", this.imageData, this.imageData.name)
    this.medicalConditionService.addMedicalCondition(formDataa).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
    this.addMedicationToggle = !this.addMedicationToggle
  }

  cancelAdding() {
    this.addMedicationToggle = !this.addMedicationToggle
  }

  removeMedication(id, i) {
    console.log(id, 'ts');
    // this.apps.splice(i, 1)
    this.medicalConditionService.deleteMedicalCondition(id).subscribe((res) => {
      console.log(res);
      this.apps.splice(i, 1)
    }, (err) => {
      console.log(err);
    })
  }

}
