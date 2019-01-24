import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ApiService } from 'src/app/services/api.service';

import { LookupLists } from 'src/app/classes/lookup-lists';
import { PersonDetail } from 'src/app/classes/person-detail';

@Component({
  selector: 'app-results-modal',
  templateUrl: 'results-detail.component.html',
  styleUrls: ['./results-detail.component.sass']
})
export class ResultsDetailComponent {

  loaded;
  file: File;
  person: PersonDetail;
  editMode = false;
  detailData;
  lookupLists: LookupLists;
  dataExists = false;

  constructor(
    public dialogRef: MatDialogRef<ResultsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private apiService: ApiService) {

    this.dataExists = data !== null;
    if (this.dataExists) {
      this.getPerson(data);
    } else {
      this.personTemplate();
    }
  }

  private personTemplate() {
    this.detailData = {
      name: 'Name',
      status: 'Status',
      degree: 'Degree',
      date: '',
      clearance: 'Clearance',
    };
  }

  toggleEditMode(setEditMode?: boolean): void {
    if (typeof setEditMode === 'undefined') {
      this.editMode = !this.editMode;
    } else {
      this.editMode = setEditMode;
    }

    if (this.editMode && typeof this.lookupLists === 'undefined') {
      this.apiService
        .getLookupLists()
        .subscribe(lookupLists => (this.lookupLists = lookupLists));
    }
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
     this.handleInputChange(event);
    }
  }

  private handleInputChange(event) {
    const reader = new FileReader();
    this.loaded = false;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      reader.onload = () => {
        this.handleReaderLoaded(reader);
      };
    }
    reader.readAsDataURL(this.file);
  }

  private handleReaderLoaded(reader) {
    this.detailData.pdfSrc = reader.result;
    this.loaded = true;
    this.dataExists = true;
  }

  private createPerson() {
    this.apiService.createPerson(this.person);
  }

  private getPerson(data: { id: number; }) {
    this.apiService.getPersonApi(data.id)
      .subscribe(results => this.detailData = results);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
