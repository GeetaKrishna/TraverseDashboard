import * as tslib_1 from "tslib";
// this component completley depends upon https://mattlewis92.github.io/angular-calendar/
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarView } from 'angular-calendar';
// import { start } from 'repl';
const colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
let CalendarComponent = class CalendarComponent {
    constructor(modal) {
        this.modal = modal;
        this.view = CalendarView.Month;
        this.CalendarView = CalendarView;
        this.viewDate = new Date();
        this.actions = [
            {
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: ({ event }) => {
                    this.handleEvent('Edit', event);
                }
            },
            {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: ({ event }) => {
                    this.events = this.events.filter(iEvent => iEvent !== event);
                    this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new Subject();
        this.sampleEvent = [
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
        ];
        this.events = [
            {
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'Take your medicine daily.',
                color: colors.red,
                actions: this.actions,
                allDay: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            },
            {
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'Take medicine daily for 2 Months',
                color: colors.blue,
                allDay: true
            },
            {
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
        this.activeDayIsOpen = true;
    }
    dayClicked({ date, events }) {
        console.log(date, events);
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
        if (events.length < 1) {
            this.addNewEvent(date);
        }
        else {
            this.openEvents(events);
        }
    }
    eventTimesChanged({ event, newStart, newEnd }) {
        this.events = this.events.map(iEvent => {
            if (iEvent === event) {
                return Object.assign({}, event, { start: newStart, end: newEnd });
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }
    handleEvent(action, event) {
        this.modalData = { event, action };
        // this.modal.open(this.modalContent, { size: 'sm' });
    }
    addEvent() {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
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
        this.modal.open(this.tesst);
    }
    addNewEvent(startDate) {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date(startDate)),
                end: endOfDay(new Date(startDate)),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
        ];
    }
    deleteEvent(eventToDelete) {
        this.events = this.events.filter(event => event !== eventToDelete);
    }
    setView(view) {
        this.view = view;
    }
    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
};
tslib_1.__decorate([
    ViewChild('modalContent', { static: true })
], CalendarComponent.prototype, "modalContent", void 0);
tslib_1.__decorate([
    ViewChild('tesst', { static: true })
], CalendarComponent.prototype, "tesst", void 0);
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar',
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.css']
    })
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map