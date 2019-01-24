export class PersonSummary {
  id: number;
  date: Date;
  employeeType: string;
  employeeTypeId: number;
  clearance: string;
  clearanceId: number;
  degree: string;
  name: string;
  status: string;
  // comments: {
  //   comment: string,
  //   id: number,
  //   date: string,
  //   name: string
  // } [];
}

// These key names must match GraphQL response
export class PersonSummaryJson {
  data: {
    person: PersonSummaryFields
  };
}

export const personSummaryMapping = (givenPerson: PersonSummaryFields): PersonSummary => {
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
      // comments: this.graphQLCommentsToComments(givenPerson.comments)
    };
};

export const getDateFromEpoch = (secondsSinceUTCEpoch: string): Date => {
  const seconds = parseInt(secondsSinceUTCEpoch, 10);
  const date = new Date(0); // Epoch time
  date.setUTCSeconds(seconds);
  return date;
};

interface PersonSummaryFields {
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
  lastStatusOfPersonDate: string;
}

// GraphQL aliases allow matching to PersonFields key names.
export const personSummaryFieldsOfQuery = `
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
    lastStatusOfPersonDate
`;
