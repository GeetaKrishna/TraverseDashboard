import { Component, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from '../dashboard.service';
import { Details } from '../details';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Graph } from '../graph';
import * as Chart from 'chart.js';
import { GetAppsService } from '../_services/get-apps.service';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  weightInfo: String = 'Weight is Normal'
  bloodPressureInfo: String = 'Blood Pressure is Normal'
  glucoseInfo: String = 'Glucose Levels are fine'
  cholesterolInfo: String = 'Cholestrol Levels are fine'
  weight = true;
  glucose = true;
  bloodpressure = true;
  cholesterol = true;
  currentWeight;
  currentGlucose;
  currentCholesterol;

  weightpresentedInfo: string = 'fa-check-circle' //icon of 3rd point in req sheet.
  glucoseweightpresentedInfo: string = 'fa-check-circle' //icon of 3rd point in req sheet.
  cholesterolpresentedInfo: string = 'fa-check-circle' //icon of 3rd point in req sheet.
  presentedInfo: string = 'fa-check-circle' //icon of 3rd point in req sheet.
  mesurementProvider: string = 'fa-user-md' //icon of 4th point in req sheet.

  currentHBP;
  currentLBP;
  // currentBlood1;
  highBp;
  lowBp;
  response;
  graph: Graph[];
  details: Details[];

  weightChart: Chart;
  glucoseChart: Chart;
  colorClassForBP: string;
  colorPresentedInfo: any;
  getpatientWeight: Object;
  BPChart: Chart;
  cholesterolChart: Chart;


  public lineChartType = 'line';

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          gridLines: {
            // drawBorder: false,
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            // drawBorder: false,
            display: false,
          },
        },
      ],
    },
    annotation: {
      annotations: [{}],
    },
  };
  public lineChartLabels: Label[] = [
    'Jan 2019',
    'Feb 2019',
    'Mar 2019',
    'Apr 2019',
    'May 2019',
    'June 2019',
  ];
  public lineChartColors: Color[] = [
    /*{
      backgroundColor: 'transparent',
      borderColor: 'rgba(46,134,171,1)',
      pointBackgroundColor: 'rgba(46,134,171,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(46,134,171,1)',
    },*/
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(242,87,87,0.8)',
      pointBackgroundColor: 'rgba(242,87,87,0.8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(242,87,87,0.8)',
    },
    /*{
      backgroundColor: 'transparent',
      borderColor: 'rgba(224,116,0,0.8)',
      pointBackgroundColor: 'rgba(224,116,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(224,116,0,0.8)',
    },*/
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 300, 81, 56, 140], label: 'Weight' }
  ];
  WeightDate = {
    days: "",
    timer: ""
  };
  glucoseDate = {
    days: "",
    timer: ""
  };
  cholesterolDate = {
    days: "",
    timer: ""
  };
  bpdate = {
    days: "",
    timer: ""
  };
  timer: string;

  constructor(private dashboardService: DashboardService, private getApp: GetAppsService, private datePipe: DatePipe) {
  }
  contenteditable3: boolean = false;
  contenteditable1: boolean = false;
  contenteditable2: boolean = false;
  contenteditable4: boolean = false;
  ngOnInit() {
    // console.log(this.datePipe.transform(new Date()), 'dateeeeeeeee');
    // current weight
    this.dashboardService.getDashboard().subscribe(
      (res) => {
        console.log(res);

        this.WeightDate = this.getDifferenceInDays(res['TimeStamp'])
        console.log(this.WeightDate)
        this.currentWeight = res['currentWeight'];
      },
      err => {
        console.log("error", err);
      }
    );
    // // // curent Glucose
    this.dashboardService.getGlucoseofPatient().subscribe(
      (res) => {
        console.log(res);
        this.glucoseDate = this.getDifferenceInDays(res['TimeStamp'])

        this.currentGlucose = res['currentGlucose'];
      },
      err => {
        console.log("error", err);
      }
    );
    this.dashboardService.getCholesterol().subscribe(
      (res) => {
        console.log(res);
        this.cholesterolDate = this.getDifferenceInDays(res['TimeStamp'])

        this.currentCholesterol = res['currentCholestrol'];
      },
      err => {
        console.log("error", err);
      }
    );
    this.dashboardService.getBloodPressure().subscribe(
      (res) => {
        console.log(res, 'ressssss');
        // console.log(res.highBP);
        this.bpdate = this.getDifferenceInDays(res['TimeStamp'])

        this.currentHBP = res['highBp'];
        this.currentLBP = res['lowBp'];
        this.colorForBP(this.currentHBP, this.currentLBP)
        // console.log(this.currentLBP);
        // this.currentBlood = res.lowBP;
      },
      err => {
        console.log("error", err);
      }
    );
    // // getWeightOfLoggedInUser()
    // this.dashboardService.getWeightOfLoggedInUser().subscribe(
    //   (res) => {
    //     console.log(res, 'ressssss');
    //   },
    //   err => {
    //     console.log("error", err);
    //   }
    // );

    // this.getApp.getWeightProfile().subscribe(
    //   (res) => {
    //     console.log(res, 'res');
    //   }, (err) => {
    //     console.log(err);
    //   }
    // )

    // this.getApp.getToken().subscribe(
    //   (res) => {
    //     console.log(res, 'res');
    //   }, (err) => {
    //     console.log(err);
    //   }
    // )
  }

  colorForBP(currentHBP, currentLBP) {
    if (currentHBP < 120 && currentLBP < 80) {
      this.colorClassForBP = 'green'
      this.presentedInfo = 'fa-check-circle'

    } else if ((120 <= currentHBP && currentHBP < 129) && currentLBP < 80) {
      this.colorClassForBP = 'yellow'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP
    } else if ((129 <= currentHBP && currentHBP < 139) || (80 <= currentLBP && currentLBP < 89)) {
      this.colorClassForBP = 'darkYellow'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP

    } else if ((139 <= currentHBP && currentHBP < 180) || (90 <= currentLBP && currentLBP < 120)) {
      this.colorClassForBP = 'red'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP

    } else if (currentHBP >= 180 && currentLBP > 120) {
      this.colorClassForBP = 'darkRed'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP

    } else if (currentHBP >= 180 || currentLBP > 120) {
      this.colorClassForBP = 'darkRed'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP

    } else {
      this.colorClassForBP = 'grey'
    }
  }

  weightToggle() {
    this.weight = !this.weight;
    let avgMonthforWeight = [];
    let avgWeight = [];
    this.dashboardService.getweight().subscribe((result: Graph[]) => {
      console.log(result);
      result.forEach(x => {
        avgMonthforWeight.push(x.avgMonth);
        avgWeight.push(x.avgWeight);
      });
      this.weightChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: avgMonthforWeight,
          datasets: [
            {
              data: avgWeight,
              backgroundColor: 'transparent',
              borderColor: 'rgba(224,116,0,0.8)',
              pointBackgroundColor: 'rgba(224,116,0,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(224,116,0,0.8)',
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                max: 400,
                min: 85,
                stepSize: 70
              }
            }],
          }
        }
      });
    });
  }

  public lineChartData1: ChartDataSets[] = [
    { data: [122, 234, 111, 222, 111, 123], label: 'glucose' }
  ];

  glucoseToggle() {
    this.glucose = !this.glucose;
    this.dashboardService.getGlucoses().subscribe((result: Graph[]) => {
      console.log(result);
      let avgMonthForGL = []
      let avgWeightForGL = []
      result.forEach(x => {
        console.log(x, 'xxxxxx');
        avgMonthForGL.push(x.avgMonth);
        avgWeightForGL.push(x['avgGL']);
      });
      console.log(avgMonthForGL, 'moooo');
      console.log(avgWeightForGL, 'weeeee');
      this.glucoseChart = new Chart('canvasforGL', {
        type: 'line',
        data: {
          labels: avgMonthForGL,
          datasets: [
            {
              data: avgWeightForGL,
              borderColor: 'rgba(324,16,0,0.8)',
              pointBackgroundColor: 'rgba(264,116,0,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(214,116,0,0.8)',
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
  public lineChartColors2: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(224,116,0,0.8)',
      pointBackgroundColor: 'rgba(224,116,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(224,116,0,0.8)',
    }
  ];

  public lineChartData2: ChartDataSets[] = [
    { data: [65, 59, 300, 81, 56, 140], label: 'high' },
    { data: [122, 234, 111, 222, 111, 123], label: 'low' }
  ];
  bloodpressureToggle() {
    this.bloodpressure = !this.bloodpressure;
    this.dashboardService.getBloodPressures().subscribe((result: Graph[]) => {
      console.log(result);
      let avgHighBP = [];
      let avgLowBP = [];
      let avgMonthforBP = [];
      result.forEach(x => {
        console.log(x, 'xxxxxx');
        avgLowBP.push(x['avgLowBP']);
        avgHighBP.push(x['avgHighBP']);
        avgMonthforBP.push(x.avgMonth);
      });

      this.BPChart = new Chart('canvass', {
        type: 'line',
        data: {
          labels: avgMonthforBP,
          datasets: [
            {
              data: avgLowBP,
              borderColor: 'rgba(224,116,0,0.8)',
              pointBackgroundColor: 'rgba(224,116,0,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(224,116,0,0.8)',
              label: 'LowBP'
            },
            {
              data: avgHighBP,
              backgroundColor: 'transparent',
              borderColor: 'rgba(114,132,4,0.8)',
              pointBackgroundColor: 'rgba(234,146,0,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(324,516,0,0.8)',
              label: 'HighBP'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

  }

  public lineChartColors3: Color[] = [

    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(224,116,0,0.8)',
      pointBackgroundColor: 'rgba(224,116,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(224,116,0,0.8)',
    }
  ];

  public lineChartData3: ChartDataSets[] = [
    { data: [65, 159, 200, 85, 156, 140], label: 'cholesterol' },

  ];

  cholesterolToggle() {
    this.cholesterol = !this.cholesterol;
    this.dashboardService.getCholesterols().subscribe((result: Graph[]) => {
      console.log(result);
      let avgMonthForCL = []
      let avgCLForCL = []
      result.forEach(x => {
        console.log(x, 'xxxxxx');

        avgMonthForCL.push(x.avgMonth);
        avgCLForCL.push(x['avgCL']);
      });
      console.log(avgMonthForCL, 'moooo');
      console.log(avgCLForCL, 'weeeee');
      this.cholesterolChart = new Chart('canvasForCL', {
        type: 'line',
        data: {
          labels: avgMonthForCL,
          datasets: [
            {
              data: avgCLForCL,
              borderColor: '#3cba9f',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }




  toggleContenteditableCholestrol(): void {
    this.contenteditable4 = !this.contenteditable4;
    if (!this.contenteditable4) {
      this.toggleSubmitCholestrol();
    }
  }

  toggleSubmitCholestrol(): void {
    this.contenteditable4 = false;
    this.details = this.currentCholesterol;
    console.log(this.details);
    let json =
    {
      chLevel: this.currentCholesterol,
      clDate: new Date().toISOString(),
      pid: 2
    }
    console.log(json);
    this.dashboardService.sendCholesterol(json);
  }

  toggleContenteditableWeight(): void {
    this.contenteditable1 = !this.contenteditable1;
    if (!this.contenteditable1) {
      this.toggleSubmitWeight();
    }
  }

  toggleSubmitWeight(): void {
    this.contenteditable1 = false;
    this.details = this.currentWeight;
    let json = {
      weight: this.currentWeight
    }
    this.dashboardService.postWeight(json).subscribe((data) => {
      console.log(data, 'dasssssssssssssh');
      this.WeightDate =  this.getDifferenceInDays(data['weightDate'])
    }, (err) => {

    })
  }

  toggleContenteditableGlucose(): void {
    this.contenteditable2 = !this.contenteditable2;
    if (!this.contenteditable2) {
      this.toggleSubmitGlucose();
    }
  }

  toggleSubmitGlucose(): void {
    this.contenteditable2 = false;
    this.details = this.currentGlucose;
    console.log(this.details);
    let json1 = {
      glDate: new Date().toISOString(),
      glucoseLevel: this.currentGlucose,
      // id: 0,
      pid: 2
    }
    console.log(json1);
    this.dashboardService.sendGlucose(json1);
  }

  toggleContenteditableBlood(): void {
    this.contenteditable3 = !this.contenteditable3;
    if (!this.contenteditable3) {
      this.toggleSubmitBlood();
    }
  }

  toggleSubmitBlood() {
    this.contenteditable3 = false;
    // this.details=;
    this.details = this.currentHBP;
    this.details = this.currentLBP;
    console.log(this.details);
    //   console.log(this.details);
    // this.details = this.currentBlood1;
    let dataBP = {
      // highBP : this.high,
      pId: "2",
      highBP: this.currentHBP,
      lowBP: this.currentLBP
    }
    this.colorForBP(this.currentHBP, this.currentLBP)
    console.log("json1 " + JSON.stringify(dataBP));
    this.dashboardService.postBlood(dataBP);
  }

  //this.dashboardService.postCholesterol(this.details).subscribe();
  // this.details = new Details();



  // this.dashboardService.postCholesterol.
  // this.currentCholesterol.value = ;

  getDifferenceInDays(date) {
    let difference = new Date().getTime() - new Date(date).getTime();
    let days;

    if (difference / 1000 < 60) {
      days = difference / 1000
      console.log(days.toFixed())
      return { days: days.toFixed(), timer: "seconds" };
    }
    else if (difference / 1000 >= 60 && difference / 1000 < 3600) {
      days = difference / (1000 * 60)
      console.log(days.toFixed())

      return { days: days.toFixed(), timer: "minutes" };
    }
    else if (difference / 1000 >= 3600 && difference / 1000 < 3600 * 24) {
      days = difference / (1000 * 3600)
      console.log(days.toFixed())

      return { days: days.toFixed(), timer: "hours" };
    }
    else if (difference / 1000 >= 3600 * 24) {
      days = difference / (1000 * 3600 * 24)
      console.log(days.toFixed())
      return { days: days.toFixed(), timer: "days" };
    }

  }

}
