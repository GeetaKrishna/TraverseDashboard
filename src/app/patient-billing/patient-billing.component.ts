import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-patient-billing',
  templateUrl: './patient-billing.component.html',
  styleUrls: ['./patient-billing.component.css']
})
export class PatientBillingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    //tooltips required for showing percentage based scores in PIE chart
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset['_meta'][Object.keys(dataset['_meta'])[0]];
          var total = meta.total;
          var currentValue: any = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue/total*100).toFixed(1));
          return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    },
  };

  public pieChartLabels: Label[] = ['Insurance', 'Patient'];
  public pieChartData: SingleDataSet = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  //---------------------------------------//
  public deductChartOptions = {
    scaleShowHorizontalLines: false,
    responsive: true,
    scales : {
      xAxes : [ {
          gridLines : {
              display : false
          },
          ticks: {
            display: false //this will remove only the label
        }
      }
     ],
     yAxes : [ {
      gridLines : {
          display : false
      }
  }
 ]
  }
  };
  public deductChartLabels = ['Current', '30 Dyas', 'Past Due'];
  public deductChartType = 'horizontalBar';
  public deductChartLegend = true;
  public deductChartData = [
    { backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', data: [65, 59, 80, 100], label: 'Deductibles' }
  ];
  patientsDetails = [
    {
      "name": "Sophia Deleila",
      "hospital": "Stanford Orthopedics Clinic",
      "appointment": "No Appointment",
      "url": "../assets/familyView/Sophia.png",
      'amount': 2345,
      "color": "alert-primary",
      "fromDays": "30 days"
    },
    {
      "name": "Ethan Hunt",
      "hospital": "Palo ALto Orthopedics",
      "appointment": "Next Appointment 2019/09/23",
      "url": "../assets/familyView/ethan.png",
      'amount': 2345,
      "color": "alert-orange",
      "fromDays": "Current"

    },
    {
      "name": "Kylo Ren",
      "hospital": "Silicon Valley Orthopedics Clinic",
      "appointment": "Next Appointment 2019/10/23",
      "url": "../assets/familyView/kai.svg",
      amount: 2345,
      "color": "alert-info",
      "fromDays": "Past Due"
    }
  ]
}
