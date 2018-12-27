import { Component, OnInit } from '@angular/core';
import { UploadModalComponent } from '../upload/upload.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  loggedIn = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadModalComponent);
  }

}
