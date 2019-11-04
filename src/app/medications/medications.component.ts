import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedicationService } from '../_services/medication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantPool } from '@angular/compiler';

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
    // {
    //   "appId": 4,
    //   "medicationDetails": "This is Candesartan",
    //   "medication": "Candesartan",
    //   "medicationImage": "assets/medications/candestron.jpg",
    //   "medicationIndication": "warn",// alerts user for potential contraindications
    //   "medicationSchedule": "thrice",
    //   "color": "lightpink"
    // },
    // {
    //   "appId": 5,
    //   "medicationDetails": "This is Liptor",
    //   "medication": "Liptor",
    //   "medicationImage": "assets/medications/lipitol.jpg",
    //   "medicationIndication": "warn",// alerts user for potential contraindications
    //   "medicationSchedule": "once",
    //   "color": "aliceblue"
    // },
    // {
    //   "appId": 6,
    //   "medicationDetails": "This is Vicodin",
    //   "medication": "Vicodin",
    //   "medicationImage": "assets/medications/vicodin.jpg",
    //   "medicationIndication": "warns",// alerts user for potential contraindications
    //   "medicationSchedule": "four times",
    //   "color": "lightyellow"
    // },
    // {
    //   "appId": 7,
    //   "medicationDetails": "This is Metformin",
    //   "medication": "Metformin",
    //   "medicationImage": "assets/medications/metformin.jpg",
    //   "medicationIndication": "warns",// alerts user for potential contraindications
    //   "medicationSchedule": "four times",
    //   "color": "lightgreen"
    // },
  ]
  // medData: { "name": any; "medDesc": any; "intake": any; "medMeal": any; };
  addMedicationToggle: boolean = true;
  medName = new FormControl('');
  medImage = new FormControl('');
  medIntake = new FormControl('');
  medDesc = new FormControl('');
  medMeal = new FormControl('');
  medData: { "DESCRIPTION": any; "MEDIMAGE": any; "MEDNAME": any; };
  imageData: any ;
  // medData: { "description": any; "medImage": string; "medid": number; "medname": any; };
  constructor(private http: HttpClient, private medServ: MedicationService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.medServ.getMedtcations().subscribe(
      (res: []) => {
        let medicinesAvailable = []
        // console.log(res);
        // medicinesAvailable.concat(res)
        // res.forEach(element => {
        //   let t = {};
        //   t['medicationDetails'] = element[0];
        //   t['medication'] = element[1];
        //   t['medicationSchedule'] = element[2];
        //   t['medicationTime'] = element[3];
        //   this.apps.push(t);
        //   console.log(element)
        // });
        res.forEach((element, index) => {
          if (element['MEDID'] != 44 && index<4) {
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
            t['id'] = element['MEDID']
            t['medicationSchedule'] = element['MEDSCHEDULE'];
            t['medicationDetails'] = element['DESCRIPTION'];
            t['medication'] = element['MEDNAME'];
            let TYPED_ARRAY = new Uint8Array(element['MEDIMAGE']['data']);


            // const STRING_CHAR = ;
            // // let base64String = ;
            // let imageurl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + btoa(String.fromCharCode.apply(null, TYPED_ARRAY)));
            // console.log(imageurl, 'imageURLLLLLu');
            t['medicationImage'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + btoa(String.fromCharCode.apply(null, TYPED_ARRAY)));
            this.apps.push(t);
            // console.log(element)
          }
        });
      },
      err => {
        console.log("error", err);
      }
    );
  }


  create_blob(file, callback) {

  }

  imageInput(event) {
var file = event.target.files[0];
this.imageData = file;
    // var reader = new FileReader();
    // reader.onload = () => {
    //   let data = reader.result as ArrayBuffer;
    //   this.imageData = new Uint8Array(data);

    // var array = new Int8Array(this.imageData);
    // console.log(array)
    // };
    // // reader.readAsDataURL(event.target.files[0]);
    // reader.readAsArrayBuffer(file)
    // // reader.readAsBinaryString(event.target.files[0]);

  }

  processFile(theFile) {
    return function (e) {
      let fileByteArray = [];
      var theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
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
    // console.log("medMeal", this.medIntake)
    let ta = {
      // "name": this.medName.value,
      // "medDesc": this.medDesc.value,
      // "intake": this.medIntake.value
    }
    const formData = new FormData();
    formData.append('DESCRIPTION', this.medDesc.value);
    formData.append('MEDIMAGE', this.imageData);
    formData.append('MEDNAME', this.medName.value);
    this.medData = {
      "DESCRIPTION": this.medDesc.value,
      "MEDIMAGE": {data: this.imageData, 'content-type':"image/*"},
      "MEDNAME": this.medName.value
      // "MEDNAME": this.medName.value,
      // "DESCRIPTION": this.medDesc.value,
      // "intake": this.medIntake.value,
      // "medMeal": this.medMeal.value,
    }
    // this.apps.push({
    //   "appId": 7,
    //   "medicationDetails": "This is " + this.medName.value,
    //   "medication": this.medName.value,
    //   "medicationImage": "assets/medications/metformin.jpg",
    //   "medicationIndication": "warns",// alerts user for potential contraindications
    //   "medicationSchedule": this.medIntake.value + " times",
    //   "color": "lightgreen"
    // })
    console.log(formData, 'data');

    this.medServ.addMedication(formData).subscribe((data) => {
      console.log(data);

    }, (err) => {
      console.log(err, "err");

    })


    // console.log(this.medData, 'data');
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

    this.medServ.deleteMedtcations(JSON.stringify(k.id)).subscribe((res) => {
      console.log(res);
      this.apps.splice(i, 1)
    }, (err) => {
      console.log(err);
    })
  }
}
