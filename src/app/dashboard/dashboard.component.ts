import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { DashboardService } from '../_services/dashboard.service';
import { Details } from '../details';
import { Graph } from '../graph';
import * as Chart from 'chart.js';
import { GetAppsService } from '../_services/get-apps.service';
import { DatePipe } from '@angular/common';

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
  measurementProviderForWeight: string = 'fa-user-md' //icon of 4th point in req sheet.
  measurementProviderForBP: string = 'fa-user-md' //icon of 4th point in req sheet.
  measurementProviderForGL: string = 'fa-user-md' //icon of 4th point in req sheet.
  measurementProviderForCL: string = 'fa-user-md' //icon of 4th point in req sheet.

  currentHBP;
  currentLBP;
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
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(242,87,87,0.8)',
      pointBackgroundColor: 'rgba(242,87,87,0.8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(242,87,87,0.8)',
    },

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
  weightCompare: boolean;
  clCompare: boolean;
  glucoseCompare: boolean;
  dangerStatement: string;

  constructor(private dashboardService: DashboardService, private getApp: GetAppsService, private datePipe: DatePipe) {
  }
  contenteditable3: boolean = false;
  contenteditable1: boolean = false;
  contenteditable2: boolean = false;
  contenteditable4: boolean = false;
  ngOnInit() {
    // current weight
    this.dashboardService.getCurrentWeight().subscribe(
      (res) => {
        console.log(res);
        if (parseInt(localStorage.getItem("userId")) == res['modifiedBy']) {
          this.measurementProviderForWeight = "fa-user"
        }
        else {
          this.measurementProviderForWeight = "fa-user-md"
        }
        console.log(this.measurementProviderForWeight);

        this.WeightDate = this.getDifferenceInDays(res['TimeStamp'])
        // console.log(this.WeightDate)
        this.currentWeight = res['currentWeight'];

        this.dashboardService.getPatientsTopTwoWeights().subscribe((data: []) => {
          console.log(data);
          
          // (w/h*h) * 703 = BMI
          
          if (data.length > 1) {
            let i = 0;

            if (data[i]['weight'] > data[i + 1]['weight']) {
              this.weightCompare = true;
            }
            else {
              this.weightCompare = false;
            }

          } else {
            this.weightCompare = true;
          }

        }, (error) => {
          console.log(error);

        })

      },
      err => {
        console.log("error", err);
      }
    );
    //curent Glucose
    this.dashboardService.getGlucoseofPatient().subscribe(
      (res) => {
        console.log(res);
        if (parseInt(localStorage.getItem("userId")) == res['modifiedBy']) {
          this.measurementProviderForGL = "fa-user"
        }
        else {
          this.measurementProviderForGL = "fa-user-md"
        }
        this.glucoseDate = this.getDifferenceInDays(res['glDate'])

        this.currentGlucose = res['glucoseLevel'];
        this.dashboardService.getPatientsTopTwoGL().subscribe((data: []) => {
          console.log(data);
          let i = 0;
          if (data.length > 1) {
            if (data[i]['glucoseLevel'] > data[i + 1]['glucoseLevel']) {
              this.glucoseCompare = true;
            }
            else {
              this.glucoseCompare = false;
            }
          } else {
            this.glucoseCompare = true;
          }

        }, (error) => {
          console.log(error);

        })
      },
      err => {
        console.log("error", err);
      }
    );

    this.dashboardService.getCholesterol().subscribe(
      (res) => {
        console.log(res);
        if (parseInt(localStorage.getItem("userId")) == res['modifiedBy']) {
          this.measurementProviderForCL = "fa-user"
        }
        else {
          this.measurementProviderForCL = "fa-user-md"
        }
        this.cholesterolDate = this.getDifferenceInDays(res['clDate'])
        this.currentCholesterol = res['chLevel'];
        this.dashboardService.getPatientsTopTwoCL().subscribe((data: []) => {
          console.log(data);
          let i = 0;

          if (data.length > 1) {
            if (data[i]['chLevel'] > data[i + 1]['chLevel']) {
              this.clCompare = true;
            }
            else {
              this.clCompare = false;
            }
          } else {
            this.clCompare = true;
          }

        }, (error) => {
          console.log(error);

        })
      },
      err => {
        console.log("error", err);
      }
    );
    this.dashboardService.getBloodPressure().subscribe(
      (res) => {
        console.log(res, 'ressssss');
        // console.log(res.highBP);
        this.bpdate = this.getDifferenceInDays(res['bpDate'])
        if (parseInt(localStorage.getItem("userId")) == res['modifiedBy']) {
          this.measurementProviderForBP = "fa-user"
        }
        else {
          this.measurementProviderForBP = "fa-user-md"
        }
        this.currentHBP = res['highBP'];
        this.currentLBP = res['lowBP'];
        this.colorForBP(this.currentHBP, this.currentLBP)
        // this.dashboardService.getPatientsTopTwoBP().subscribe((data) => {
        //   console.log(data);
        //   if(data[0].weight>data[1].weight){
        //     this.weightCompare = true;
        //   }
        //   else{
        //     this.weightCompare = false;
        //   }

        // }, (error) => {
        //   console.log(error);

        // })
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

  colorForBP(currentHBP: Number, currentLBP) {

    // hbp <= 90 , lbp <= 60 ==> Low, Consult Doctor Immediately.
    // hbp 91 tp 120 , lbp 61 to 80 ==> Normal
    // hbp 121 to 140, lbp 81 to 90 ==> PRE-HYPERtENSION
    // hbp 141 to 160, lbp 91 to 100 ==> Hypertension Stage-1, Consult Doctor
    // hbp >= 161, lbp > 100 ==> Hypertension Stage -2,  Consult Doctor Immediately


    if (currentHBP <= 90 && currentLBP <= 60) {
      this.dangerStatement = "Low, Consult Doctor Immediately";
      this.colorClassForBP = 'dark-red'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP
    }
    else if (currentHBP <= 120 && currentHBP >= 91 && currentLBP >= 61 && currentLBP < 80) {
      this.dangerStatement = "Normal";
      this.colorClassForBP = 'green'
      this.presentedInfo = 'fa-check-circle'
      this.colorPresentedInfo = this.colorClassForBP
    }
    else if (currentHBP <= 140 && currentHBP >= 121 && currentLBP >= 81 && currentLBP < 90) {
      this.dangerStatement = "Pre-Hypertension";
      this.colorClassForBP = 'orange'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP
    }
    else if (currentHBP <= 160 && currentHBP >= 141 && currentLBP >= 91 && currentLBP < 100) {
      this.dangerStatement = "Hypertension Stage-1, Consult Doctor";
      this.colorClassForBP = 'darkRed'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP
    }
    else if (currentHBP >= 161 && currentLBP > 100) {
      this.dangerStatement = "Hypertension Stage -2,  Consult Doctor Immediately";
      this.colorClassForBP = 'darkRed'
      this.presentedInfo = 'fa-exclamation-triangle'
      this.colorPresentedInfo = this.colorClassForBP
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
    console.log("inide toggle", this.bloodpressure);

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

  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
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
      modifiedBy: parseInt(localStorage.getItem("userId")),
      pid: localStorage.getItem("patientId")
    }

    console.log(json);
    this.dashboardService.sendCholesterol(json).subscribe((data) => {

    });
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
    console.log(localStorage.getItem("patientId"), "patientId");

    let json = {
      "pid": localStorage.getItem("patientId"),
      "weight": this.currentWeight,
      modifiedBy: parseInt(localStorage.getItem("userId")),
      "weightDate": new Date().toISOString()
    }
    this.dashboardService.postWeight(json).subscribe((data) => {
      console.log(data, 'dasssssssssssssh');
      this.WeightDate = this.getDifferenceInDays(data['weightDate'])
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
      modifiedBy: parseInt(localStorage.getItem("userId")),
      pid: localStorage.getItem("patientId")
    }

    console.log(json1);
    this.dashboardService.sendGlucose(json1).subscribe((data) => {

    })
  }

  toggleContenteditableBlood(): void {
    this.contenteditable3 = !this.contenteditable3;
    if (!this.contenteditable3) {
      this.toggleSubmitBlood();
    }
  }

  toggleSubmitBlood() {
    this.contenteditable3 = false;
    this.details = this.currentHBP;
    this.details = this.currentLBP;
    console.log(this.details);

    let dataBP = {
      pid: parseInt(localStorage.getItem("patientId")),
      highBP: parseInt(this.currentHBP),
      lowBP: parseInt(this.currentLBP),
      modifiedBy: parseInt(localStorage.getItem("userId")),
      bpDate: new Date().toISOString()
    }
    console.log(dataBP);

    this.colorForBP(this.currentHBP, this.currentLBP)
    console.log("json1 " + JSON.stringify(dataBP));
    this.dashboardService.postBloodPressure(dataBP);
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
