import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  public lineChartType = 'line';
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    annotation: {
      annotations: [{}],
    },
  };
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
    { data: [65, 59, 300, 81, 56, 140, 554], label: 'high' },
    { data: [122, 234, 111, 222, 111, 123, 332], label: 'low' }
  ];

  public lineChartLabels: Label[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ];

  public barChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }], yAxes: [{
        gridLines: {
          display: false,
        },
      }],
    },
    annotation: {
      annotations: [{}],
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


}
