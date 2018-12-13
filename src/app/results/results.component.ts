import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  @ViewChild(SearchComponent) search;

  results = RESULTS;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultsDetailComponent, {
      height: '400px',
      width: '600px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.search = this.search.keywords;
  }

}

@Component({
  selector: 'app-results-modal',
  templateUrl: 'results-detail.component.html',
})
export class ResultsDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<ResultsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
