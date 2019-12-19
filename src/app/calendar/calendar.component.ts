
// this component completley depends upon https://mattlewis92.github.io/angular-calendar/
// https://mattlewis92.github.io/angular-calendar/#/custom-templates
// https://mattlewis92.github.io/angular-calendar/#/group-similar-events
import { FormControl } from '@angular/forms';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MedicationService } from '../_services/medication.service';
import { CalendarService } from '../_services/calendar.service';

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

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('newAppointment', { static: true }) newAppointment: TemplateRef<any>;
  @ViewChild('editApponitment', { static: true }) editApponitment: TemplateRef<any>;
  @ViewChild('tesst', { static: true }) tesst: TemplateRef<any>;
  existingEvents: any;
  clickedDate: Date;
  selectedIndex: number = 0;

  constructor(private modal: NgbModal, private prescriptionService: MedicationService,
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.prescriptionService.getPrescriptions().subscribe((prescriptionList: []) => {

      prescriptionList.map((e) => {

        this.events = [...this.events, {
          id: "Medication",
          start: new Date(e['startDate']),
          end: new Date(e['endDate']),
          title: e['instruction'] + ' a day',
          color: colors.blue,
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
        this.refresh.next()
      })
    }, (err) => {
      console.log(err);
    });

    this.calendarService.getAppointments().subscribe((appointmentList: []) => {
console.log(appointmentList);

      appointmentList.map((e) => {

        // this.events = [...this.events, {
        //   id: "Medication",
        //   start: new Date(e['startDate']),
        //   end: new Date(e['endDate']),
        //   title: e['instruction'] + ' a day',
        //   color: colors.blue,
        //   actions: this.actions,
        //   allDay: true,
        //   resizable: {
        //     beforeStart: true,
        //     afterEnd: true
        //   },
        //   draggable: true,
        //   meta: e
        // }];
        console.log(this.events);
        this.refresh.next()
      })
    }, (err) => {
      console.log(err);
    });



  }

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
  allDay = new FormControl(true)
  editAppointmentDetails = new FormControl()
  editAppointmentName = new FormControl()

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        if (this.events.length <= 1) {
          this.activeDayIsOpen = !this.activeDayIsOpen
        }
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  sampleEvent = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Take your medicine daily.',
      type: "Medication",
    }, {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Make an appointment for your EKG',
      type: "Appointment",
    }, {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Reschedule the appointment',
      type: "Appointment",
    },
  ]

  events: CalendarEvent[] = [
    {
      id: "Medication",
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(), 1),
      title: 'Take your medicine daily.',
      color: colors.blue,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      id: "Medication",
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Take medicine daily for 2 Months',
      color: colors.blue,
      allDay: true
    },
    {
      id: "Appointment",
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Appointment to be Rescheduled',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events)
    this.clickedDate = date;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        // this.addNewEvent(date)
      } else {
        this.activeDayIsOpen = true;
      }

      this.viewDate = date;
    }
    if (events.length < 1) {
      this.addNewEvent(date)
    }
    else {
      this.openEvents(events)
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
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
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handling event', event);
    this.modalData = { event, action };
    if (action == "Edit") {
      this.editAppointmentDetails.setValue(event.title)
      this.editAppointmentName.setValue(event.start)
      this.modal.open(this.editApponitment, { centered: true })
    }
    else if (action == "Deleted") {

    }
    else {
      this.modal.open(this.tesst, { centered: true })
    }

  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
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
          start: startOfDay(this.clickedDate),
          end: endOfDay(this.clickedDate),
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
    this.modal.dismissAll();
    this.AppointmentName.reset()
    this.AppointmentDetails.reset()
    // this.editAppointmentName.reset()
    // this.editAppointmentDetails.reset()
    // this.addNewEvent(new Date())
  }

  addNewEvent(startDate): void {

    this.modal.open(this.newAppointment, { centered: true }).result.then((data) => {
      console.log(data)
      if (data === 'Add') {
        this.events = [
          ...this.events,
          {
            title: this.AppointmentDetails.value,
            start: startOfDay(startDate),
            end: endOfDay(startDate),
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
    })

  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.activeDayIsOpen = !this.activeDayIsOpen
  }
  removeEvent(eve, _index) {
    console.log(_index);
    // 
    this.existingEvents = this.existingEvents.filter((value, index, arr) => {
      return index != _index;
    });

    console.log(this.events);

  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}