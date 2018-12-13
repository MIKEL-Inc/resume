import { Component, ViewChild, OnInit } from '@angular/core';

import { SearchComponent } from '../search/search.component';

const RESULTS = [
  {
    id: 0,
    name: 'John Doe',
    status: 'candidate',
    clearance: 'Secret',
    date: '2/12/2017'
  },
  {
    id: 2,
    name: 'Roger Yuri',
    status: 'employee',
    clearance: 'Secret',
    date: '1/4/2018'
  },
  {
    id: 3,
    name: 'Stephanie Apple',
    status: 'former',
    clearance: 'Top Secret',
    date: '4/3/2018'
  },
];


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  @ViewChild(SearchComponent) search;

  results = RESULTS;

  constructor() {
  }

  ngOnInit() {
    this.search = this.search.keywords;
  }

}
