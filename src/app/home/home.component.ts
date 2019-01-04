import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResultsDetailComponent } from '../results/results-detail/results-detail.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  loggedIn = false;

  @ViewChild(SearchComponent) search: SearchComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultsDetailComponent, {
      height: '95%',
      width: '90%',
    });
  }

  doSearch() {
    this.search.keywordSearch();
  }

}
