import { Component, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from '../dashboard.service';
import { Details } from '../details';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Graph } from '../graph';
import * as Chart from 'chart.js';

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
  avgMonth = [];
  avgWeight = [];
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
  weightChart: Chart;
  colorClassForBP: string;
  colorPresentedInfo: any;

  constructor(private dashboardService: DashboardService) {
  }
  contenteditable3: boolean = false;
  contenteditable1: boolean = false;
  contenteditable2: boolean = false;
  contenteditable4: boolean = false;
  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(
      (res) => {
        console.log(res);
        this.currentWeight = res;
      },
      err => {
        console.log("error", err);
      }
    );

    this.dashboardService.getGlucose().subscribe(
      (res) => {
        console.log(res);
        this.currentGlucose = res;
      },
      err => {
        console.log("error", err);
      }
    );
    this.dashboardService.getCholesterol().subscribe(
      (res) => {
        console.log(res);
        this.currentCholesterol = res;
      },
      err => {
        console.log("error", err);
      }
    );
    this.dashboardService.getBlood().subscribe(
      (res) => {

        console.log(res, 'ressssss');
        // console.log(res.highBP);
        this.currentHBP = res.highBP;
        this.currentLBP = res.lowBP;
        this.colorForBP(this.currentHBP, this.currentLBP)
        // console.log(this.currentLBP);
        // this.currentBlood = res.lowBP;
      },
      err => {
        console.log("error", err);
      }
    );
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
    console.log("Success");
    // console.log(this.httpClient.get(this.url));
    this.avgMonth = [];
    this.avgWeight = [];
    this.dashboardService.getweight().subscribe((result: Graph[]) => {
      console.log(result);
      result.forEach(x => {
        console.log(x, 'xxxxxx');

        this.avgMonth.push(x.avgMonth);
        this.avgWeight.push(x.avgWeight);
        // console.log(this.httpClient.get(this.url));
      });
      console.log(this.avgMonth, 'moooo');
      console.log(this.avgWeight, 'weeeee');
      this.weightChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.avgMonth,
          datasets: [
            {
              data: this.avgWeight,
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

    // this.weightChart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: ["124", "4"],//this.avgMonth,

    //     datasets: [
    //       {
    //         data: [1,2,3,4],//this.avgWeight,
    //         borderColor: '#3cba9f',
    //         // backgroundColor: "#0000FF",
    //       }
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true
    //       }],
    //       yAxes: [{
    //         display: true
    //       }],
    //     }
    //   }
    // });

  }

  ngAfterViewChecked() {

  }
  // weightToggle() {
  //   this.weight = !this.weight;
  // }
  public lineChartData1: ChartDataSets[] = [
    // {data: [65, 59, 300, 81, 56, 140], label: 'Weight'},
    { data: [122, 234, 111, 222, 111, 123], label: 'glucose' }


  ];

  glucoseToggle() {
    this.glucose = !this.glucose;
    // this.dashboardService.getGlucose().subscribe((result: Graph[]) => {
    //   console.log(result);
    //   result.forEach(x => {
    //     console.log(x, 'xxxxxx');

    //     this.avgMonth.push(x.avgMonth);
    //     this.avgWeight.push(x.avgWeight);
    //     // console.log(this.httpClient.get(this.url));
    //   });
    //   console.log(this.avgMonth, 'moooo');
    //   console.log(this.avgWeight, 'weeeee');
    //   this.weightChart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: this.avgMonth,
    //       datasets: [
    //         {
    //           data: this.avgWeight,
    //           borderColor: '#3cba9f',
    //           backgroundColor: "#0000FF",
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }],
    //       }
    //     }
    //   });
    // });
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
    // this.dashboardService.getBlood().subscribe((result: Graph[]) => {
    //   console.log(result);
    //   result.forEach(x => {
    //     console.log(x, 'xxxxxx');

    //     this.avgMonth.push(x.avgMonth);
    //     this.avgWeight.push(x.avgWeight);
    //     // console.log(this.httpClient.get(this.url));
    //   });
    //   console.log(this.avgMonth, 'moooo');
    //   console.log(this.avgWeight, 'weeeee');
    //   this.BPChart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: this.avgMonth,
    //       datasets: [
    //         {
    //           data: this.avgWeight,
    //           borderColor: '#3cba9f',
    //           backgroundColor: "#0000FF",
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }],
    //       }
    //     }
    //   });
    // });

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
    // this.dashboardService.getCholesterol().subscribe((result: Graph[]) => {
    //   console.log(result);
    //   result.forEach(x => {
    //     console.log(x, 'xxxxxx');

    //     this.avgMonth.push(x.avgMonth);
    //     this.avgWeight.push(x.avgWeight);
    //     // console.log(this.httpClient.get(this.url));
    //   });
    //   console.log(this.avgMonth, 'moooo');
    //   console.log(this.avgWeight, 'weeeee');
    //   this.cholesterolChart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: this.avgMonth,
    //       datasets: [
    //         {
    //           data: this.avgWeight,
    //           borderColor: '#3cba9f',
    //           backgroundColor: "#0000FF",
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }],
    //       }
    //     }
    //   });
    // });
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
    let json = {
      chLevel: this.currentCholesterol
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
    this.dashboardService.postWeight(json);
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
      glucoseLevel: this.currentGlucose,
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










}
