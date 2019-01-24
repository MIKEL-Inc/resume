export class PersonDetail {
  id: number;
  date: Date;
  employeeType: string;
  employeeTypeId: number;
  clearance: string;
  clearanceId: number;
  degree: string;
  name: string;
  pdfSrc?: string;
  pdfBlob?: any;
  pdfFile?: any;
  pdfUrl?: any;
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
  // const { data } = json;
  // const givenPerson = data.person;

  let resumeText: string;
  let resumeUrl: string;
  let fileBlob: Blob;
  let file: File;

  if  (givenPerson.resumeLatest && givenPerson.resumeLatest.payloadText) {
    const pureText = givenPerson.resumeLatest.payloadText.replace(/\\n/g, '').replace(/\n/g, '');
    resumeText = 'data:application/pdf;base64,' + pureText;
    // download works in FireFox
    // document.location = resumeText;

    // console.log({'resumeText': resumeText});

    fileBlob = new Blob([resumeText], {type: 'application/pdf'});
    // resumeUrl = window.URL.createObjectURL( fileBlob);
    file = new File([atob(pureText)], 'test.pdf', {type: 'application/pdf'});
    resumeUrl = window.URL.createObjectURL( file);

    // debugger;
  } else {
    resumeText = '';
    resumeUrl = '';
  }

    return {
      id: givenPerson.id,
      name: givenPerson.fullName,
      employeeType: givenPerson.internalEmployeeType.long,
      employeeTypeId: givenPerson.internalEmployeeType.id,
      status: givenPerson.internalEmployeeType.short,
      degree: givenPerson.degree.long,
      date: getDateFromEpoch(givenPerson.lastStatusOfPersonDate),
      clearance: givenPerson.securityClearance.long,
      clearanceId: givenPerson.securityClearance.id,
      pdfSrc: '/assets/functionalSample.pdf',
      pdfBlob: fileBlob,
      pdfFile: file,
      pdfUrl: resumeUrl

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
    email
    lastStatusOfPersonDate
    resumeLatest{
      payloadText
    }
`;
