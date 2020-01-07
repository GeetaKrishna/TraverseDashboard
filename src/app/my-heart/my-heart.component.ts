import { Component, OnInit, ViewChild } from '@angular/core';
import { MyHeartService } from '../_services/my-heart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { CalendarService } from '../_services/calendar.service';
import { MedicationService } from '../_services/medication.service';

@Component({
  selector: 'app-my-heart',
  templateUrl: './my-heart.component.html',
  styleUrls: ['./my-heart.component.css']
})
export class MyHeartComponent implements OnInit {
  imageData: any;
  heartRate: any;
  heartRateFormControl = new FormControl('');
  flag: Boolean = false;
  recentlyUpdatedTime: any;
  compareDate = moment(new Date(), "YYYY-MM-DD");

  appointments = [];
  timer: any;

  constructor(private myHeartService: MyHeartService, private modal: NgbModal, private sanitizer: DomSanitizer,
    private prescriptionService: MedicationService, private calendarService: CalendarService) { }
  @ViewChild('createEKGTemplate', { static: true }) createEKGTemplate;
  @ViewChild('createHRTemplate', { static: true }) createHRTemplate;

  ngOnInit() {

    this.timer = setInterval(() => {
      this.apps[0].time = moment(this.recentlyUpdatedTime).fromNow();
      console.log(this.apps[0].time);
    }, 1000);

    this.prescriptionService.getPrescriptions().subscribe((prescriptionList: []) => {
      if (prescriptionList.length > 0) {
        prescriptionList.map((e) => {
          console.log(e);
          // isBetween(start, end, 'limit', inclusivity/exclusivity)
          if (this.compareDate.isBetween(moment(e['startDate'], '"YYYY-MM-DD"'), moment(e['endDate'], "YYYY-MM-DD"), "days", "[]")
          ) {
            this.appointments.push(e)
          }
        })
      }
    }, (err) => {
      console.log(err);
    });

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
      this.apps[0].appId = data.id;
      this.apps[0].details = data.heartRate;
      this.apps[0].time = moment(data.hrDate).fromNow();
      this.recentlyUpdatedTime = data.hrDate;
      console.log(moment(data.hrDate).fromNow())
    }, (err) => {
      console.log(err);
    })

    this.myHeartService.getEkg().subscribe((data) => {
      console.log(data);
      let t = {};
      this.apps[3].url = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${data['image']}`);
    }, (err) => {
      console.log(err);
    })

  }

  apps: any[] = [
    {
      "appId": 1,
      "details": 78,
      "version": "1.0v",
      "appName": "HeartRate",
      "url": "assets/myHeart/myheartlogo.jpg",
      "time": "2 days ago"
    },
    {
      "appId": 2,
      "details": "147/93",
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
    this.modal.open(this.createEKGTemplate, { centered: true, size: 'lg', windowClass: "" })
  }

  createHR() {
    this.modal.open(this.createHRTemplate, { centered: true, size: 'lg', windowClass: "" })
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
        // this.apps[0].time
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

  addEKG() {

    let t = new FormData()

    t.append('ekgDate', new Date().toISOString())
    t.append('image', this.imageData)
    t.append('pId', localStorage.getItem("patientId"))

    this.myHeartService.addEkg(t).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

}