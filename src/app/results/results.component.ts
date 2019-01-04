import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Person } from '../classes/person';

import { ResultsDetailComponent } from './results-detail/results-detail.component';

import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  results: Person[];

  constructor(public dialog: MatDialog, private personService: PersonService) {
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

}
