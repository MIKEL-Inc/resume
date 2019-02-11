import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  personData = this.formBuilder.group({
    id: [0],
    pdfSrc: [''],

    name: ['', Validators.required],
    appStatusId: [1, Validators.required],
    employeeStatusId: [1],
    employeeTypeId: [1],

    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    mailingAddress: [''],
    physicalAddress: [''],

    positionAppliedFor: [''],

    clearanceId: [1],

    eduLevelId: [1],
    degreeId: [1]
  });
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
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.dataExists = data && typeof data.id !== 'undefined' ;
    if (this.dataExists) {
      this.getPerson(data);
    }
  }

  toggleEditMode(setEditMode?: boolean): void {
    const isJustToggle = typeof setEditMode === 'undefined';
    if (isJustToggle) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = setEditMode;
    }

    const isLookupListsNeedToBeLoaded = typeof this.lookupLists === 'undefined';
    if (this.editMode && isLookupListsNeedToBeLoaded) {
      this.apiService
        .getLookupLists()
        .subscribe(lookupLists => (this.lookupLists = lookupLists));
    }
  }

  onSubmit(sameAsMailingCheckBox: {checked: boolean}) {
    if (this.personData.invalid) {
      return;
    }
    if (sameAsMailingCheckBox.checked) {
      this.personData.patchValue({physicalAddress: this.personData.value.mailingAddress});
    }
    // FIXME: Remove this Alert!!!  Testing only.
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.personData.value));
    this.apiService.savePersonAndResume(this.personData.value).subscribe(results => {
      this.personData.setValue({
        id: results.id,
        pdfSrc: results.pdfSrc,

        name: results.name,
        appStatusId: results.statusId,
        employeeStatusId: results.employeeTypeId,
        employeeTypeId: results.employeeTypeId,

        email: results.email,
        phone: results.phone,
        mailingAddress: results.mailingAddress,
        physicalAddress: results.physicalAddress,

        positionAppliedFor: results.positionAppliedFor,

        clearanceId: results.clearanceId,

        eduLevelId: results.eduLevelId,
        degreeId: results.degreeId
      });
      this.detailData = results;
    });

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
    this.personData.patchValue({pdfSrc: reader.result});
    this.loaded = true;
    this.dataExists = true;
  }

  private getPerson(data: { id: number }) {
    this.apiService.getPersonApi(data.id).subscribe(results => {
      this.personData.setValue({
        id: results.id,
        pdfSrc: results.pdfSrc,

        name: results.name,
        appStatusId: results.statusId,
        employeeStatusId: results.employeeTypeId,
        employeeTypeId: results.employeeTypeId,

        email: results.email,
        phone: results.phone,
        mailingAddress: results.mailingAddress,
        physicalAddress: results.physicalAddress,

        positionAppliedFor: results.positionAppliedFor,

        clearanceId: results.clearanceId,

        eduLevelId: results.eduLevelId,
        degreeId: results.degreeId
      });
      this.detailData = results;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
