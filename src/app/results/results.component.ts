import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PersonSummary } from '../classes/person-summary';

import { ResultsDetailComponent } from './results-detail/results-detail.component';

import { PersonService } from '../services/person.service';
import { SearchComponent } from '../search/search.component';

import { Keyword } from '../interfaces/keyword';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  @ViewChild('search_input') search: SearchComponent;

  results: PersonSummary[];
  keyword: Keyword[];

  constructor(
    public dialog: MatDialog,
    private personService: PersonService) {

    this.keyword = personService.keywords;
    personService.personData.subscribe(persons => this.results = persons);
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(ResultsDetailComponent, {
      height: '95%',
      width: '90%',
      data: {
        id: id
      }
    });
  }

  ngOnInit() { }

  searching() {
    this.search.keywordSearch();
  }

}
