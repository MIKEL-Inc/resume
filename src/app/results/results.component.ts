import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SearchComponent } from '../search/search.component';
import { Person } from '../classes/person';
import { ApiService } from '../services/api.service';

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
    this.apiService.getResults()
        .subscribe(results => this.results = results);
  }

  ngOnInit() {
    this.getResults();
    this.search = this.search.keywords;
  }

}

@Component({
  selector: 'app-results-modal',
  templateUrl: 'results-detail.component.html',
  styleUrls: ['./results-detail.component.sass']
})
export class ResultsDetailComponent {

  editMode = false;

  detailData;

  constructor(
    public dialogRef: MatDialogRef<ResultsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private apiService: ApiService) {
    this.apiService.getResultsNo404(data.id)
      .subscribe(results => this.detailData = results);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
