import {
  PersonDetail,
  PersonDetailFields,
  personDetailFieldsOfQuery
} from './person-detail';

// These key names must match GraphQL response
export class CreatePersonAndResumeJson {
  data: {
    createPersonAndResume: {
      person: PersonDetailFields;
    };
  };
}

export function savePersonAndResumeMutator (givenPerson: PersonDetail) {
  // FIXME: Forcing values for early testing.
  // FIXME: for GraphQL Body size limits - payload: ${givenPerson.pdfSrc}
  return `
mutation {
  createPersonAndResume(newPersonResume: {
    fullName: "${givenPerson.name}"
    internalEmployeeTypeId: ${givenPerson.employeeTypeId}
    internalEmployeeStatusId: ${givenPerson.employeeStatusId}
    schoolingLevelId: ${givenPerson.eduLevelId}
    degreeId: ${givenPerson.degreeId}
    securityClearanceId: ${givenPerson.clearanceId}
    positionAppliedFor: "${givenPerson.positionAppliedFor}"
    email: "${givenPerson.email}"
    phone: "${givenPerson.phone}"
    mailingAddress: "${givenPerson.mailingAddress}"
    physicalAddress: "${givenPerson.physicalAddress}"
    lastStatusOfPersonId: ${givenPerson.statusId || 1}
    fileName: "${givenPerson.pdfFileName || '<no filename passed in>'}"
    uploadUserId: 1
    UploadSourceId: 1
    payload: "hello"
    textBlob: "${givenPerson.textBlob || '<no text blob passed in>'}"
  }) {
    person {
      ${personDetailFieldsOfQuery}
    }
  }
}
`;
}
