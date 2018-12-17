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
  {
    id: 4,
    name: 'Jennifer Jublibeast',
    status: 'employee',
    clearance: 'none',
    date: '9/17/2018'
  },
];


export interface DialogData {
  editMode: boolean;
  pdfSrc: string;
}


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  @ViewChild(SearchComponent) search;

  pdfSrc = './../../assets/functionalSample.pdf';

  results = RESULTS;

  editMode = true;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultsDetailComponent, {
      height: '95%',
      width: '90%',
      data: {editMode: this.editMode, pdfSrc: this.pdfSrc}
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnInit() {
    this.search = this.search.keywords;
  }

}

@Component({
  selector: 'app-results-modal',
  templateUrl: 'results-detail.component.html',
  styleUrls: ['./results-detail.component.sass']
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
