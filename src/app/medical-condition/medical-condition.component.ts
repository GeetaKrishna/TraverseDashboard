import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MedicationService } from '../_services/medication.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
  styleUrls: ['./medical-condition.component.css']
})
export class MedicalConditionComponent implements OnInit {

  apps: any[] = [
    {
      "medication": "Add a Condition",
      "medicationImage": "assets/icons-home/motion01.png",
      "color": "lightgrey"
    },
    {
      "appId": 2,
      "medication": "Gout",
      "medicationImage": "assets/medicalCondition/gout.jpg",
      "diagnoised": "First Diagnosed 6/12/2016",
      "severity": "Chronic",
      "restrictions": "Diet based Triggers",
      "color": "lightblue"
    },
    {
      "appId": 4,
      "medication": "Peanuts Allergy",
      "medicationImage": "assets/medicalCondition/peanuts.png",
      "diagnoised": "Since childhood",
      "severity": "Mild, small quantities allowed",
      "restrictions": "No other restrictions",
      "color": "lightpink"
    },
    {
      "appId": 5,
      "medication": "High Blood Pressure",
      "medicationImage": "assets/medicalCondition/highBP.jpg",
      "diagnoised": "First diagnosed 5/11/2017",
      "severity": "Monitor at home regularly",
      "restrictions": "Yearly EKG required",
      "color": "aliceblue"
    },

  ]

  addMedicationToggle: boolean = true;
  conditionName = new FormControl('');
  medImage = new FormControl('');
  Diagnosed = new FormControl('');
  severity = new FormControl('');
  triggers = new FormControl('');
  medicalConditionData: { "medication": any; "medicationImage": any; "diagnosed": any; "restrictions": any; "severity": any; };

  constructor(private http: HttpClient, private medServ: MedicationService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.medServ.getMedtcations().subscribe(
    //   (res: []) => {
    //     let medicinesAvailable = []

    //     res.map((element, index) => {
    //       if (element['MEDID'] != 44) {
    //         let colors = ['lightgreen',
    //         'lightyellow',
    //         'pink',
    //         'lightgray',
    //         'lightblue']
    //         let t = {};

    //         t['color'] = colors[index];
    //         t['id'] = element['MEDID']
    //         t['medicationSchedule'] = element['MEDSCHEDULE'];
    //         t['medicationDetails'] = element['DESCRIPTION'];
    //         t['medication'] = element['MEDNAME'];
    //         let TYPED_ARRAY = new Uint8Array(element['MEDIMAGE']['data']);
    //         const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    //         let base64String = btoa(STRING_CHAR);
    //         let imageurl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
    //         // console.log(imageurl, 'imageURLLLLLu');
    //         t['medicationImage'] = imageurl;
    //         this.apps.push(t);
    //         // console.log(element)
    //       }
    //     });
    //   },
    //   err => {
    //     console.log("error", err);
    //   }
    // );
  }

  imageInput(event) {
    console.log(event.target.files);
    let file = event.target.files[0]

    var reader = new FileReader();

    console.log(reader.readAsDataURL(file))

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
      "diagnosed": this.Diagnosed.value,
      "restrictions": this.triggers.value,
      "severity": this.severity.value
    }
    this.apps.push(this.medicalConditionData)
    console.log(this.medicalConditionData, 'data');

    // this.medServ.addMedication(this.medicalConditionData)

    this.addMedicationToggle = !this.addMedicationToggle
  }

  cancelAdding() {

    this.addMedicationToggle = !this.addMedicationToggle

  }

  removeMedication(k, i) {
    this.apps.splice(i, 1)
    // this.medServ.deleteMedtcations(k).subscribe((res) => {
    //   console.log(res);
    //   this.apps.splice(i, 1)
    // }, (err) => {
    //   console.log(err);
    // })
  }
  
}
