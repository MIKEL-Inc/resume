import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ResultsDetailComponent } from '../results/results.component';
import { ApiService } from '../services/api.service';
import { Person } from '../classes/person';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input()
  openDialog(): void {
    const dialogRef = this.dialog.open(UploadModalComponent);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-upload-modal',
  templateUrl: 'upload-input.component.html',
  styleUrls: ['./upload-input.component.sass']
})
export class UploadModalComponent {
  files: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadModalComponent>,
    private apiService: ApiService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* TODO:  When the upload button is clicked...
  *         1. upload the file to the database,
  *         2. return the new id,
  *         3. pass the new id to the ResultsDetailComponent
  *            modal for the user to do the final edits within
  *            the ResultsDetailComponent modal.
  */

 onFileChange(evt: any) {
    /* wire up file reader */
    const file =  this.files[0];
  }

  uploadResume() {
    // TODO: Upload to server
    // this.apiService.createPerson();

  }

  // openDialog(id?: number): void {
  //   const dialogRef = this.dialog.open(ResultsDetailComponent, {
  //     height: '95%',
  //     width: '90%',
  //     data: {
  //       id: id
  //     }
  //   });
  // }

}
