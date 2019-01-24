export class PersonDetail {
  id: number;
  date: Date;
  employeeType: string;
  employeeTypeId: number;
  clearance: string;
  clearanceId: number;
  degree: string;
  name: string;
  phone: string; // phone "number" may include spaces, dashes, parenthesis, pluses, extensions, etc.
  mailingAddress: string;
  physicalAddress: string;
  email: string;
  pdfSrc?: string;
  status: string;
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
      status: givenPerson.internalEmployeeType.short,
      degree: givenPerson.degree.long,
      date: getDateFromEpoch(givenPerson.lastStatusOfPersonDate),
      clearance: givenPerson.securityClearance.long,
      clearanceId: givenPerson.securityClearance.id,
      pdfSrc: resumeDataUri,

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
    short: string;
  };
  degree: {
    long: string;
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
  lastStatusOfPersonDate: string;
  resumeLatest?: {
    payloadText?: string;
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
      short
    }
    degree {
      long
    }
    securityClearance {
      long
    }
    positionAppliedFor
    phone
    mailingAddress
    physicalAddress
    email
    lastStatusOfPersonDate
    resumeLatest{
      payloadText
    }
`;
