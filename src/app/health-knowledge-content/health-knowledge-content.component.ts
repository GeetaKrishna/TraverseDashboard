import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-knowledge-content',
  templateUrl: './health-knowledge-content.component.html',
  styleUrls: ['./health-knowledge-content.component.css']
})
export class HealthKnowledgeContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  searchVal: string = '';

  searchValue(searchVal) {

    console.log('searchValue', searchVal);

  }
  clearValue() {
    this.searchVal = ''
    console.log('clear val', this.searchValue);
  }
}
