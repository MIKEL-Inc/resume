export class Person {
  id: number;
  date: Date;
  clearance: string;
  degree: string;
  name: string;
  pdfSrc?: Object;
  status: string;
  // comments: {
  //   comment: string,
  //   id: number,
  //   date: string,
  //   name: string
  // } [];
}

// These key names must match GraphQL response
export class PersonJson {
  data: {
    person: PersonFields
  };
}

export const personMapping = (givenPerson: PersonFields): Person => {
  // const { data } = json;
  // const givenPerson = data.person;

  return {
    id: givenPerson.id,
    name: givenPerson.fullName,
    status: givenPerson.internalEmployeeType.short,
    degree: givenPerson.degree.long,
    date: getDateFromEpoch(givenPerson.lastStatusOfPersonDate),
    clearance: givenPerson.securityClearance.long,
    // pdfSrc: atob(givenPerson.resumeLatest.payloadText)
    // comments: this.graphQLCommentsToComments(givenPerson.comments)
  };
};

export const getDateFromEpoch = (secondsSinceUTCEpoch: string): Date => {
  const seconds = parseInt(secondsSinceUTCEpoch, 10);
  const date = new Date(0); // Epoch time
  date.setUTCSeconds(seconds);
  return date;
};

interface PersonFields {
  id: number;
  fullName: string;
  internalEmployeeType: {
    short: string;
  };
  internalEmployeeStatus: {
    short: string;
  };
  degree: {
    long: string;
  };
  securityClearance: {
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
export const personFieldsOfQuery = `
    id
    fullName
    internalEmployeeType {
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
`;
