// These key names must match GraphQL response
export class LookupLists {
  InternalEmployeeType: LookupItem[];
  InternalEmployeeStatus: LookupItem[];
  ResumeSource: LookupItem[];
  Degree: LookupItem[];
  SchoolingLevel: LookupItem[];
  SecurityClearance: LookupItem[];
  StatusOfPerson: LookupItem[];
}

// Common Item properties
// These key names must match GraphQL response
export class LookupItem {
  id: number;
  sortOrder: number;
  short: string;
  long: string;
}

export interface LookupListsJson {
  data: LookupLists;
}

export const lookupListsMapping = (json: LookupListsJson): LookupLists => {
  const { data: lookupLists } = json;
  return lookupLists;
};

// GraphQL aliases allow matching to LookupLists key names.
export const lookupListsGraphQLQueryString = `
{
  InternalEmployeeType: internalEmployeeTypes {
    id
    sortOrder
    short
    long
  }
  InternalEmployeeStatus: internalEmployeeStatuses {
    id
    sortOrder
    short
    long
  }
  ResumeSource: resumeSources {
    id
    sortOrder
    short
    long
  }
  Degree: degrees {
    id
    sortOrder
    short
    long
  }
  SchoolingLevel: schoolingLevels {
    id
    sortOrder
    short
    long
  }
  SecurityClearance: securityClearances {
    id
    sortOrder
    short
    long
  }
  StatusOfPerson: statusOfPersons {
    id
    sortOrder
    short
    long
  }
}`;
