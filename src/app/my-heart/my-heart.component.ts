import { Component, OnInit, ViewChild } from '@angular/core';
import { MyHeartService } from '../_services/my-heart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { CalendarService } from '../_services/calendar.service';
import { MedicationService } from '../_services/medication.service';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-my-heart',
  templateUrl: './my-heart.component.html',
  styleUrls: ['./my-heart.component.css']
})
export class MyHeartComponent implements OnInit {
  imageData: any;
  heartRate: any;
  heartRateFormControl = new FormControl('');
  highBPFormControl = new FormControl('');
  lowBPFormControl = new FormControl('');
  flag: Boolean = false;
  recentlyUpdatedTime: any;
  compareDate = moment(new Date(), "YYYY-MM-DD");

  appointments = [];
  timer: any;
  heartData: boolean = false;
  hrData: boolean = false;
  currentHBP: any = 0;
  currentLBP: any = 0;
  bpData: boolean = false;
  bpflag: boolean = false;
  medications: any = [];
  imageDataName: any = '';

  constructor(private myHeartService: MyHeartService, private modal: NgbModal, private sanitizer: DomSanitizer,
    private prescriptionService: MedicationService, private calendarService: CalendarService, private dashboardService: DashboardService, ) { }
  @ViewChild('createEKGTemplate', { static: true }) createEKGTemplate;
  @ViewChild('createHRTemplate', { static: true }) createHRTemplate;
  @ViewChild('createBPTemplate', { static: true }) createBPTemplate;

  ngOnInit() {

    this.timer = setInterval(() => {
      this.apps[0].time = moment(this.recentlyUpdatedTime).fromNow();
      console.log(this.apps[0].time);
    }, 1000);

    this.prescriptionService.getPrescriptions().subscribe((prescriptionList: []) => {
      console.log(prescriptionList);

      if (prescriptionList.length > 0) {

        this.prescriptionService.getMedications().subscribe((data: []) => {
          data.map((meds, index) => {

            prescriptionList.map((e: any) => {
              console.log(e);
              // isBetween(start, end, 'limit', inclusivity/exclusivity)
              console.log(this.compareDate.isBetween(moment(new Date(e['startDate']), '"YYYY-MM-DD"'), moment(new Date(e['endDate']), "YYYY-MM-DD"), "days", "[]"));
              if (this.compareDate.isBetween(moment(new Date(e['startDate']), '"YYYY-MM-DD"'), moment(new Date(e['endDate']), "YYYY-MM-DD"), "days", "[]")
              ) {
                console.log(e);
                if (meds['id'] === e['medicationId']) {
                  console.log(meds);

                  e.startDate = moment(new Date(e.startDate)).format('YYYY-MM-DD');
                  e.endDate = moment(new Date(e.endDate)).format('YYYY-MM-DD');
                  let t = {};
                  t = e;
                  t['name'] = meds['name'];
                  t['image'] = meds['image'];
                  t['description'] = meds['description'];
                  t['image'] = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${t['image']}`);
                  console.log(t);
                  this.medications.push(t)
                  console.log(this.medications);

                }
              }
            })
            if (index == data.length - 1) {
              this.apps[4].url = this.medications[this.medications.length - 1].image
              this.apps[4].text = this.medications[this.medications.length - 1].name
              this.apps[4].nature = this.medications[this.medications.length - 1].description
              this.apps[4].content = this.medications[this.medications.length - 1].dosage
              this.apps[4].time = this.medications[this.medications.length - 1].instruction + ' a day'
            }
          })
        }, (err) => {

        })

      }
    }, (err) => {
      console.log(err);
    });

    this.dashboardService.getBloodPressure().subscribe(
      (res) => {
        console.log(res, 'ressssss');
        if (res != null) {
          this.bpData = true;
          this.apps[1].details = res['highBP'] + '/' + res['lowBP'];
          this.highBPFormControl.setValue(res['highBP'])
          this.lowBPFormControl.setValue(res['lowBP'])
          this.currentHBP = res['highBP'];
          this.currentLBP = res['lowBP'];
        } else {
          this.bpData = false;
        }
      },
      err => {
        console.log("error", err);
      }
    );

    this.calendarService.getAppointments().subscribe((appointmentList: []) => {
      if (appointmentList.length > 0) {
        appointmentList.map((e: any) => {
          console.log(e);

          if (this.compareDate.isBetween(moment(e['startTime'], '"YYYY-MM-DD"'), moment(e['endTime'], "YYYY-MM-DD"), 'days', '[]')
          ) {
            this.appointments.push(e)
          }
        })
      }
    }, (err) => {
      console.log(err);
    });

    this.myHeartService.getHeartRate().subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.hrData = true;
        this.apps[0].appId = data.id;
        this.apps[0].details = data.heartRate;
        this.apps[0].time = moment(data.hrDate).fromNow();
        this.recentlyUpdatedTime = data.hrDate;
      } else {
        this.hrData = false;
      }
      console.log(moment(data.hrDate).fromNow())
    }, (err) => {
      console.log(err);
      this.hrData = false;

    })

    this.myHeartService.getEkg().subscribe((data) => {
      console.log(data);
      if (data != null) {
        this.heartData = true;
        this.apps[3].url = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${data['image']}`);
      } else {
        this.heartData = false;
      }
    }, (err) => {
      console.log(err);
    })

  }

  apps: any[] = [
    {
      "appId": 1,
      "details": 0,
      "version": "1.0v",
      "appName": "HeartRate",
      "url": "assets/myHeart/myheartlogo.jpg",
      "time": ""
    },
    {
      "appId": 2,
      "details": "",
      "version": "1.0v",
      "appName": "Blood Pressure",
      "url": "assets/icons-home/motion02.png",
      "time": ""
    },
    {
      "appId": 3,
      "details": "You have a Doctor Appointment coming up, Please check your calendar.",
      "version": "1.0v",
      "appName": "Appointment",
      "url": "assets/icons-home/motion01.png",
      "time": ""
    },
    {
      "appId": 4,
      "details": "YOU CAN SEARCH FOR ARTICLES FROM ONLINE",
      "version": "1.0v",
      "appName": "EKG",
      "url": "assets/myHeart/EKG.png",
      "time": "3 days ago"
    },
    {
      "appId": 5,
      "details": "KEEPS TRACK OF APPOINTMENT",
      "version": "1.0v",
      "appName": "Medication",
      "content": "20mg",
      "nature": "improves blood flow",
      "text": "Benazepril ",
      "url": "assets/medications/benazepril.jpg",
      "time": "twice a day"
    },
    {
      "appId": 6,
      "details": "0.8 mg/dl",
      "version": "1.0v",
      "appName": "Lab",
      "text": "Creatinine",
      "url": "assets/myHeart/lab.png",
      "time": "10/23/19"
    },
    {
      "appId": 8,
      "details": "3000 Steps",
      "version": "1.0v",
      "appName": "Steps / Activity",
      "url": "assets/myHeart/walk.png",
      "time": "3 days ago"
    }, {
      "appId": 7,
      "details": "2 Miles",
      "version": "1.0v",
      "appName": "Distance",
      "url": "assets/runn.png",
      "time": "yesterday"
    },
  ]

  close() {
    this.modal.dismissAll()
  }

  createEKG() {
    this.modal.open(this.createEKGTemplate, { centered: true, size: 'sm', windowClass: "" })
  }

  createHR() {
    this.modal.open(this.createHRTemplate, { centered: true, size: 'lg', windowClass: "" })
  }

  createBP() {
    this.modal.open(this.createBPTemplate, { centered: true, size: 'lg', windowClass: "" })
  }

  editHR(id) {
    this.flag = !this.flag;
    if (!this.flag) {
      console.log(this.heartRate);
      let body = {
        "heartRate": parseInt(this.heartRate),
        "hrDate": new Date().toISOString(),
        "pid": parseInt(localStorage.getItem("patientId")),
        "id": id
      }

      console.log(id, body);

      this.myHeartService.updateHR(body).subscribe((data: any) => {
        console.log(data);
        this.apps[0].time = moment(data.hrDate).fromNow()
        this.recentlyUpdatedTime = data.hrDate
      }, (err) => {
        console.log(err);
      })
    }
  }

  imageInput(event) {
    console.log(event.target.files);
    let file = event.target.files[0]
    this.imageData = file;
    this.imageDataName = file.name;
    console.log(this.imageData);
  }

  addHR() {

    let body = {
      "heartRate": parseInt(this.heartRateFormControl.value),
      "hrDate": new Date().toISOString(),
      "pid": localStorage.getItem("patientId")
    }
    console.log(body);

    this.myHeartService.addHR(body).subscribe((data) => {
      console.log(data);

    }, (err) => {
      console.log(err);

    })

  }

  addBP() {

    let dataBP = {
      pid: parseInt(localStorage.getItem("patientId")),
      highBP: parseInt(this.currentHBP),
      lowBP: parseInt(this.currentLBP),
      modifiedBy: parseInt(localStorage.getItem("userId")),
      bpDate: new Date().toISOString()
    }
    console.log(dataBP);
    this.dashboardService.postBloodPressure(dataBP).subscribe((data) => {
      console.log(data, 'dasssssssssssssh');
      this.bpData = true;
      this.currentHBP = dataBP.highBP;
      this.currentLBP = dataBP.lowBP;

      this.apps[1].details = dataBP.highBP + '/' + dataBP.lowBP;
    }, (err) => {
      console.log(err);
    });
  }


  editBP() {
    this.bpflag = !this.bpflag;
    if (!this.bpflag) {
      this.addBP()
    }
  }

  addEKG() {

    let t = new FormData()

    t.append('ekgDate', new Date().toISOString())
    t.append('image', this.imageData)
    t.append('pId', localStorage.getItem("patientId"))

    this.myHeartService.addEkg(t).subscribe((data) => {
      console.log(data);
      this.modal.dismissAll();
    }, (err) => {
      console.log(err);
    })
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

}