import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PatientService } from '../_services/patient.service';
import { CalendarService } from '../_services/calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  selectedIndex: any = 0;

  persons = []
  switchMember: any;
  @ViewChild('addPatient', { static: true }) addPatient: TemplateRef<any>;
  @ViewChild('patientsList', { static: true }) patientsList: TemplateRef<any>;

  constructor(private patientService: PatientService, private calendarService: CalendarService, private modal: NgbModal,) { }

  ngOnInit() {

    this.patientService.getAllPatientsList().subscribe((data) => {
      this.calendarService.getAppointmentsByPatientId(data[0].pid).subscribe((pdata: any) => {
        console.log(pdata);

        this.persons = this.persons.concat(data)

        this.persons.map((e) => {
          if (e.gender == 'male') {
            e.image = '../assets/familyView/ethan.png';
          } else if (e.gender == 'female') {
            e.image = '../assets/familyView/Sophia.png';
          }
        })
        this.switchMember = this.persons[0];
        this.switchMember.Appointment = pdata[0].title + " " + pdata[0].startTime;
        console.log(this.switchMember);

      })
      // pid: 1
      // userId: 1
      // relation: "Self"
      // patientName: "Narendar Geesidi"
      // height: 165
      // weight: 55

      console.log(this.persons);


    }, (err) => {
      console.log(err);

    })
  }

  // {
  //   "name": "Sophia",
  //   "weight": "49",
  //   "age": "23",
  //   "height": "158",
  //   "image": "../assets/familyView/Sophia.png"
  // },
  // {
  //   "name": "Ethan",
  //   "url": "/Kai",
  //   "weight": "69",
  //   "age": "18",
  //   "height": "158",
  //   "image": "../assets/familyView/ethan.png"
  // },

  testFamily(memberDetails, _index) {
    console.log(memberDetails.pid);

    this.calendarService.getAppointmentsByPatientId(memberDetails.pid).subscribe((pdata: any) => {
      console.log(pdata);
      this.selectedIndex = _index;
      this.switchMember = memberDetails;
      if (pdata.length == 0) {
        this.switchMember.Appointment = "No Appointments available";
        // this.switchMember.Appointment = pdata[0].title + " " + pdata[0].startTime;
      }
      else{
        this.switchMember.Appointment = pdata[0].title + " " + pdata[0].startTime;
      }
    }, (err) => {
      console.log(err);

    })

  }

  testPatient(){
    this.modal.open(AddPatientComponent,  { centered: true })
  }

}
