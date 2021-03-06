
// this component completley depends upon https://mattlewis92.github.io/angular-calendar/
// https://mattlewis92.github.io/angular-calendar/#/custom-templates
// https://mattlewis92.github.io/angular-calendar/#/group-similar-events
import { FormControl, Validators } from '@angular/forms';
import { ViewPeriod } from 'calendar-utils';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,

} from 'angular-calendar';
import { MedicationService } from '../_services/medication.service';
import { CalendarService } from '../_services/calendar.service';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import RRule from 'rrule';

const moment = _moment;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: 'rgb(0, 128, 255)',
    secondary: 'rgb(0, 128, 255)'
  },
  yellow: {
    primary: '#ffbf00',
    secondary: '#ffbf00'
  }
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      // dON'T USE DATEaDAPTER FROM aNGULAR-CALENDAR, USE angular-core
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('newAppointment', { static: true }) newAppointment: TemplateRef<any>;
  @ViewChild('editApponitment', { static: true }) editApponitment: TemplateRef<any>;
  @ViewChild('editOrDeleteApponitment', { static: true }) editOrDeleteApponitment: TemplateRef<any>;
  @ViewChild('tesst', { static: true }) tesst: TemplateRef<any>;
  existingEvents: any;
  disabledFlag: boolean = false;

  constructor(private modal: NgbModal, private prescriptionService: MedicationService,
    private calendarService: CalendarService, private cdRef: ChangeDetectorRef) { }

  startDateFormControl = new FormControl({ value: moment().format('YYYY-MM-DD'), disabled: false }, [
    Validators.required,
  ])
  endDateFormControl = new FormControl({ value: moment().format('YYYY-MM-DD'), disabled: false }, [
    Validators.required,
  ])

  TimeList = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
  MeridianList = ['AM', 'PM']
  DurationList = ["00", "15", "30", "45"]

  startTime
  endTime
  startDuration
  startMeridian
  endDuration
  endMeridian
  recurringEvents: RecurringEvent[] = [
    {
      title: 'Recurs on the 5th of each month',
      color: colors.yellow,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: 5
      }
    },
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: moment().month() + 1,
        bymonthday: 10
      }
    },
    {
      title: 'Recurs weekly on mondays',
      color: colors.red,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO]
      }
    }
  ];
  ngOnInit() {

    this.allDay.valueChanges.subscribe(val => {
      console.log(val);
      if (!val) {
        this.disabledFlag = false;
      }
      else {
        this.startTime = "00";
        this.endTime = "11";
        this.startDuration = "00";
        this.startMeridian = 'AM'
        this.endDuration = "45";
        this.endMeridian = 'PM'
        this.disabledFlag = true;
      }
    });

    this.prescriptionService.getPrescriptions().subscribe((prescriptionList: []) => {

      prescriptionList.map((e) => {

        this.prescriptionService.getMedicationsById(e['medicationId']).subscribe((medicineName) => {
          this.events = [...this.events, {
            id: "Medication",
            start: new Date(e['startDate']),
            end: new Date(e['endDate']),
            title: medicineName['name'],
            color: colors.blue,
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: false,
            meta: e
          }];
          console.log(this.events);
          this.refresh.next()
        })

      })
    }, (err) => {
      console.log(err);
    });

    this.calendarService.getAppointments().subscribe((appointmentList: []) => {

      appointmentList.map((e: any) => {
        console.log(e);
        console.log(new Date(e['startTime'].split(".")[0]));

        e['startHours'] = e['startTime'].split("T")[1].split('.')[0]
        e['endHours'] = e['endTime'].split("T")[1].split('.')[0]
        console.log(e);

        this.events = [...this.events, {
          id: "Appointment",
          start: new Date(e['startTime'].split(".")[0]),
          end: new Date(e['endTime'].split(".")[0]),
          title: e['title'],
          color: colors.yellow,
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          meta: e
        }];
        console.log(this.events);

        // refresh inorder to update the events
        this.refresh.next()
      })
    }, (err) => {
      console.log(err);
    });

  }

  viewPeriod: ViewPeriod;

  updateCalendarEvents(viewRender) {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.recurringEvents.forEach(event => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start)
            .startOf('day')
            .toDate(),
          until: moment(viewRender.period.end)
            .endOf('day')
            .toDate()
        });
        const { title, color } = event;

        rule.all().forEach(date => {
          console.log(date);

          this.events.push({
            title,
            color,
            start: moment(date).toDate()
          });
        });
      });
      // this.cdRef.detectChanges();

    }
  }

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  AppointmentDetails = new FormControl()
  AppointmentName = new FormControl()
  Location = new FormControl()
  allDay = new FormControl(false)
  editAppointmentDetails = new FormControl()
  editAppointmentName = new FormControl()

  startTimeControl = new FormControl()
  endTimeControl = new FormControl()

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit', event, null);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        if (this.events.length <= 1) {
          this.activeDayIsOpen = !this.activeDayIsOpen
        }
        this.handleEvent('Deleted', event, null);
      }
    }
  ];

  changeStartTime(d) {

  }
  changeStartDuration(d) {

  }
  changeStartMeridian(d) {

  }
  changeEndTime(d) {

  }
  changeEndDuration(d) {

  }
  changeEndMeridian(d) {

  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events)
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
    }
    if (events.length < 1) {
      this.startDateFormControl.reset()
      this.endDateFormControl.reset()
      this.AppointmentDetails.reset()
      this.AppointmentName.reset()
      this.Location.reset()
      this.addNewEvent()
    }
    else {
      this.openEvents(events)
    }
  }

  //Called during Drag and Drop
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    console.log(newStart, newEnd);
    console.log(event);
    console.log(newStart.toString().split(" ")[4]);
    console.log(newEnd.toString().split(" ")[4]);

    event.meta.startHours = newStart.toString().split(" ")[4];
    event.meta.endHours = newEnd.toString().split(" ")[4];

    let t = {
      "allDay": event.allDay,
      "description": event.meta.description,
      "endTime": moment(newEnd).format("YYYY-MM-DD") + "T" + event.meta.endHours,
      "pid": parseInt(localStorage.getItem("patientId")),
      "startTime": moment(newStart).format("YYYY-MM-DD") + "T" + event.meta.startHours,
      "title": event.title,
      "id": event.meta.id,
      "location": event.meta.location,
      "userId": parseInt(localStorage.getItem("userId"))
    }

    console.log(t);

    this.calendarService.editAppoinments(t).subscribe((data) => {
      console.log(data);

      // let newStart = new Date(this.startDateFormControl.value);
      // let newEnd = new Date(this.endDateFormControl.value)
      this.events = this.events.map(iEvent => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd
          };
        }
        return iEvent;
      });
      this.refresh.next();
      // this.existingEvents = this.existingEvents.filter(iEvent => {
      //   if (iEvent === event) {
      //     return {
      //       ...event,
      //       start: newStart,
      //       end: newEnd
      //     };
      //   }
      //   return iEvent;
      // });
      this.modal.dismissAll()
    }, (err) => {
      console.log(err);

    })

    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent, _index): void {
    console.log('handling event', event);
    this.modalData = { event, action };

    // somehow allDay remains always true while drag and drop regardless of it's original value, so get it from meta data instead
    event.allDay = event.meta.allDay;
    if (action == "Edit") {
      console.log(event.meta.endTime);

      let endTime = parseInt((event.meta.endTime).split("T")[1].split('.')[0].split(":")[0]);
      let startTime = parseInt((event.meta.startTime).split("T")[1].split('.')[0].split(":")[0]);

      if (endTime > 12) {
        this.endTime = (endTime - 12).toString();
        if (this.startTime < 9) {
          this.endTime = "0" + this.endTime.toString();
        }
        this.endMeridian = 'PM';
      } else {
        if (endTime < 10) {
          this.endTime = "0" + endTime.toString();
        }
        else {
          this.endTime = endTime.toString();

        }
        this.endMeridian = 'AM';
      }
      console.log(this.endTime);

      if (startTime > 11) {
        this.startTime = (startTime - 12).toString();
        if (this.startTime < 9) {
          this.startTime = "0" + this.startTime.toString();
        }
        this.startMeridian = 'PM';
      } else {
        if (startTime < 10) {
          this.startTime = "0" + startTime.toString();
        }
        else {
          this.startTime = startTime.toString();
        }
        console.log(this.startTime);
        console.log(this.endTime);

        this.startMeridian = 'AM';
      }

      this.endDuration = (event.meta.endTime).split("T")[1].split(":")[1]
      this.startDuration = (event.meta.startTime).split("T")[1].split(":")[1]

      this.editAppointmentDetails.setValue(event.meta.description)
      this.editAppointmentName.setValue(event.meta.title)
      this.allDay.setValue(event.meta.allDay)
      this.startDateFormControl.setValue(moment(event.meta.startTime.split('+')[0]))
      this.endDateFormControl.setValue(event.meta.endTime.split('+')[0])

      this.Location.setValue(event.meta.location)
      this.modal.open(this.editApponitment, { centered: true }).result.then((data) => {
        console.log(data, "after closing edit");
        if (data == 'Update') {

          if (this.endMeridian == 'PM') {
            this.endTime = parseInt(this.endTime) + 12;
          }

          if (this.startMeridian == 'PM') {
            this.startTime = parseInt(this.startTime) + 12;
          }

          console.log(moment(this.endDateFormControl.value).format("YYYY-MM-DD") + "T" + this.endTime + ":" + this.endDuration + ":" + "00")
          console.log(moment(this.startDateFormControl.value).format("YYYY-MM-DD") + "T" + this.startTime + ":" + this.startDuration + ":" + "59")
          console.log(this.allDay.value);

          let t = {
            "allDay": this.allDay.value,
            "description": this.editAppointmentDetails.value,
            "endTime": moment(this.endDateFormControl.value).format("YYYY-MM-DD") + "T" + this.endTime + ":" + this.endDuration + ":" + "00",
            "pid": parseInt(localStorage.getItem("patientId")),
            "startTime": moment(this.startDateFormControl.value).format("YYYY-MM-DD") + "T" + this.startTime + ":" + this.startDuration + ":" + "59",
            "title": this.editAppointmentName.value,
            "id": event.meta.id,
            "location": event.meta.location,
            "userId": parseInt(localStorage.getItem("userId"))
          }

          //API call to update
          this.calendarService.editAppoinments(t).subscribe((data) => {

            console.log(data);
            event.meta = data;
            event.meta['startHours'] = data['startTime'].split("T")[1].split('.')[0]
            event.meta['endHours'] = data['endTime'].split("T")[1].split('.')[0]

            console.log(event.meta);

            let newStart = new Date(this.startDateFormControl.value);
            let newEnd = new Date(this.endDateFormControl.value)
            this.events = this.events.map(iEvent => {
              if (iEvent === event) {
                return {
                  ...event,
                  start: newStart,
                  end: newEnd
                };
              }
              return iEvent;
            });
            this.refresh.next();
            this.existingEvents = this.existingEvents.filter((iEvent) => {
              if (iEvent === event) {
                return {
                  ...event,
                  start: newStart,
                  end: newEnd
                };
              }
              return iEvent;
            })
            // this.modal.dismissAll()
          }, (err) => {
            console.log(err);

          })
        }
      })
      console.log(this.startDateFormControl);
    }
    else if (action == "Deleted") {
      console.log('before deletion');
      this.modal.open(this.editOrDeleteApponitment).result.then((editDelete) => {
        console.log(editDelete);
        if (editDelete == 'Delete') {
          this.deleteEvent(event, _index);
        } else if (editDelete == 'Update') {
          this.handleEvent('Edit', event, _index)
        }
      })
    }
    else {
      this.modal.open(this.tesst, { centered: true })
    }
  }

  openEvents(e) {
    this.existingEvents = e;
    this.modal.open(this.tesst, { centered: true, size: 'lg', windowClass: "" })
  }

  close(k) {
    console.log(k);
    console.log(this.AppointmentName.value);
    console.log(this.AppointmentDetails.value);

    if (k === "Add") {
      this.events = [
        ...this.events,
        {
          title: this.AppointmentDetails.value,
          start: startOfDay(this.viewDate),
          end: endOfDay(this.viewDate),
          color: colors.red,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        }
      ];
    }
    this.refresh.next();
    this.modal.dismissAll();
    this.AppointmentName.reset()
    this.AppointmentDetails.reset()
    this.editAppointmentName.reset()
    this.editAppointmentDetails.reset()
  }

  addNewEvent(): void {
    let startDate = this.viewDate;
    console.log(startDate, "test startDate format");
    this.endDateFormControl.setValue(moment(startDate))
    this.startDateFormControl.setValue(moment(startDate))
    // if(this.allDay){
    //   this.endDateFormControl.setValue(moment(startDate))
    //   this.startDateFormControl.setValue(moment(startDate))
    // }
    // else{
    //   this.endDateFormControl.setValue(moment(startDate))
    //   this.startDateFormControl.setValue(moment(startDate))
    // }

    this.modal.open(this.newAppointment, { centered: true }).result.then((data) => {

      if (this.endMeridian == 'PM') {
        this.endTime = parseInt(this.endTime) + 12;
      }

      if (this.startMeridian == 'PM') {
        this.startTime = parseInt(this.startTime) + 12;
      }

      console.log(moment(this.endDateFormControl.value).format("YYYY-MM-DD") + "T" + this.endTime + ":" + this.endDuration + ":" + "00" + ".882Z")
      console.log(moment(this.startDateFormControl.value).format("YYYY-MM-DD") + "T" + this.startTime + ":" + this.startDuration + ":" + "59" + ".882Z")

      if (data === 'Add') {
        let t = {
          "allDay": this.allDay.value,
          "description": this.AppointmentDetails.value,
          "endTime": moment(this.endDateFormControl.value).format("YYYY-MM-DD") + "T" + this.endTime + ":" + this.endDuration + ":" + "00",
          "pid": parseInt(localStorage.getItem("patientId")),
          "startTime": moment(this.startDateFormControl.value).format("YYYY-MM-DD") + "T" + this.startTime + ":" + this.startDuration + ":" + "59",
          "title": this.AppointmentName.value,
          "location": this.Location.value,
          "userId": parseInt(localStorage.getItem("userId"))
        }

        this.calendarService.createAppoinments(t).subscribe((data) => {
          console.log(data);

          data['startHours'] = data['startTime'].split("T")[1].split('.')[0]
          data['endHours'] = data['endTime'].split("T")[1].split('.')[0]

          this.events = [
            ...this.events,
            {
              id: 'Appointment',
              title: this.AppointmentDetails.value,
              start: startOfDay(startDate),
              end: endOfDay(startDate),
              color: colors.red,
              actions: this.actions,
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              meta: data
            }
          ];
          this.refresh.next();
          //to update current events in appointments list
          this.existingEvents.push({
            id: 'Appointment',
            title: this.AppointmentDetails.value,
            start: startOfDay(startDate),
            end: endOfDay(startDate),
            color: colors.red,
            actions: this.actions,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            meta: data
          })
          console.log(this.events);

        }, (err) => {
          console.log(err);
        })

      }
    })
  }

  deleteEvent(eventToDelete: CalendarEvent, _index) {
    this.calendarService.deleteAppoinmentById(eventToDelete['meta']['id']).subscribe((data) => {
      if (this.existingEvents) {
        this.removeEvent(eventToDelete, _index)
      }
      this.events = this.events.filter(event => {
        return event !== eventToDelete
      }
      );
      this.activeDayIsOpen = !this.activeDayIsOpen;
      this.refresh.next()
    }, (err) => {
      console.log(err);

    })

  }

  removeEvent(eve, _index) {
    this.existingEvents = this.existingEvents.filter((value, index, arr) => {
      return value !== eve
    });

    this.refresh.next()
    if (this.existingEvents.length == 0) {
      this.modal.dismissAll();
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}