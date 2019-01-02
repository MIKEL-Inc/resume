import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SearchComponent } from '../search/search.component';
import { Person } from '../classes/person';
import { ApiService } from '../services/api.service';
import { ResultsDetailComponent } from './results-detail/results-detail.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  results: Person[];

  @ViewChild(SearchComponent) search;

  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(ResultsDetailComponent, {
      height: '95%',
      width: '90%',
      data: {
        id: id
      }
    });

    // dialogRef.afterClosed().subscribe(result => { });
  }

  getResults(): void {
    // FIXME: Please!
    this.apiService.getResults()
        .subscribe(results => this.results = results);
  }

  ngOnInit() {
    this.getResults();
    this.search = this.search.keywords;
  }

}
