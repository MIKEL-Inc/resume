export class PersonDetail {
  id: number;
  date: Date;
  employeeType: string;
  employeeTypeId: number;
  employeeStatusId: number;
  clearance: string;
  clearanceId: number;
  degree: string;
  degreeId: number;
  eduLevelId: number;
  name: string;
  phone: string; // phone "number" may include spaces, dashes, parenthesis, pluses, extensions, etc.
  mailingAddress: string;
  physicalAddress: string;
  email: string;
  pdfSrc?: string;
  pdfFileName?: string;
  textBlob: string;
  status: string;
  statusId: number;
  positionAppliedFor: string;
  // comments: {
  //   comment: string,
  //   id: number,
  //   date: string,
  //   name: string
  // } [];
}

// These key names must match GraphQL response
export class PersonDetailJson {
  data: {
    person: PersonDetailFields
  };
}

export const personDetailMapping = (givenPerson: PersonDetailFields): PersonDetail => {
  let resumeDataUri: string;

  if  (givenPerson.resumeLatest && givenPerson.resumeLatest.payloadText) {
    const pureText = givenPerson.resumeLatest.payloadText.replace(/\\n/g, '').replace(/\n/g, '');
    resumeDataUri = 'data:application/pdf;base64,' + pureText;
  } else {
    resumeDataUri = '';
  }

    return {
      id: givenPerson.id,
      name: givenPerson.fullName,
      phone: givenPerson.phone,
      mailingAddress: givenPerson.mailingAddress,
      physicalAddress: givenPerson.physicalAddress,
      email: givenPerson.email,
      employeeType: givenPerson.internalEmployeeType.long,
      employeeTypeId: givenPerson.internalEmployeeType.id,
      employeeStatusId: givenPerson.internalEmployeeStatus.id,
      status: givenPerson.internalEmployeeType.short,
      statusId: givenPerson.lastStatusOfPerson.id,
      degree: givenPerson.degree.long,
      degreeId: givenPerson.degree.id,
      eduLevelId: givenPerson.schoolingLevel.id,
      date: getDateFromEpoch(givenPerson.lastStatusOfPersonDate),
      clearance: givenPerson.securityClearance.long,
      clearanceId: givenPerson.securityClearance.id,
      pdfSrc: resumeDataUri,
      pdfFileName: givenPerson.resumeLatest.fileName,
      textBlob: givenPerson.resumeLatest.textBlob,
      positionAppliedFor: givenPerson.positionAppliedFor

      // comments: this.graphQLCommentsToComments(givenPerson.comments)
    };
};

export const getStuff = (blob: Blob) => {
  let thingy: any;

  if (typeof (FileReader) !== 'undefined' && typeof (blob) !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      thingy = e.target.result;
    };

    reader.readAsArrayBuffer(blob);
  }
  return thingy;
};

export const getDateFromEpoch = (secondsSinceUTCEpoch: string): Date => {
  const seconds = parseInt(secondsSinceUTCEpoch, 10);
  const date = new Date(0); // Epoch time
  date.setUTCSeconds(seconds);
  return date;
};

interface PersonDetailFields {
  id: number;
  fullName: string;
  internalEmployeeType: {
    id: number;
    short: string;
    long: string;
  };
  internalEmployeeStatus: {
    id: number;
    short: string;
  };
  degree: {
    id: number;
    long: string;
  };
  schoolingLevel: {
    id: number;
  };
  securityClearance: {
    id: number;
    long: string;
  };
  positionAppliedFor: string;
  phone: string;
  mailingAddress: string;
  physicalAddress: string;
  email: string;
  lastStatusOfPerson: {
    id: number;
  };
  lastStatusOfPersonDate: string;
  resumeLatest?: {
    fileName?: string;
    payloadText?: string;
    textBlob?: string;
  };
}

// GraphQL aliases allow matching to PersonFields key names.
export const personDetailFieldsOfQuery = `
    id
    fullName
    internalEmployeeType {
      id
      long
      short
    }
    internalEmployeeStatus {
      id
      short
    }
    degree {
      id
      long
    }
    schoolingLevel {
      id
    }
    securityClearance {
      id
      long
    }
    positionAppliedFor
    phone
    mailingAddress
    physicalAddress
    email
    lastStatusOfPerson {
      id
    }
    lastStatusOfPersonDate
    resumeLatest{
      fileName
      payloadText
      textBlob
    }
`;
