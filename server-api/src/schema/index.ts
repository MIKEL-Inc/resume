import { buildSchema } from 'graphql';

import { person, persons, createPerson } from './person';
import {
  resume,
  resumeLatestForPerson,
  resumesForPerson,
  resumes,
  createResume,
  keywordSearchResumes
} from './resume';
import { user, users } from './user';
import {
  internalEmployeeTypes,
  internalEmployeeType,
  internalEmployeeStatuses,
  internalEmployeeStatus,
  schoolingLevels,
  schoolingLevel,
  degrees,
  degree,
  securityClearances,
  securityClearance,
  statusOfPersons,
  statusOfPerson,
  resumeSources,
  resumeSource
} from './lookups';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
"""
Sample GraphQL Schema with Demo resolvers
"""
type Query {
  """
  Returns classic phrase.
  """
  hello: String

  """
  Return a Person.
  """
  person (
    "Id of Person to retrieve"
    id: Int!
  ): Person

  """
  Return all Persons.
  """
  persons: [Person]

  """
  Return a Resume.
  """
  resume (
    "Id of Resume to retrieve"
    id: Int!
  ): Resume

  """
  Return all Resumes for a Person.
  """
  resumesForPerson (
    "Id of Person to retrieve Resume from"
    personId: Int!
  ): [Resume]

  """
  Return the latest Resume for a Person.  Latest based on upload time.
  """
  resumeLatestForPerson (
    "Id of Person to retrieve Resume from"
    personId: Int!
  ): Resume

  """
  Return all Resumes.
  """
  resumes: [Resume]

  """
  Return all Resumes with the keywords.
  """
  keywordSearchResumes (
    "Pipe character separated list of keywords"
    keywords: String!
  ): [Resume!]!

  """
  Return a User.
  """
  user (
    "Id of user to retrieve"
    id: Int!
  ): User

  """
  Return all Users.
  """
  users: [User]

  """
  Return all of our employee types.
  """
  internalEmployeeTypes: [InternalEmployeeType]

  """
  Return employee type.
  """
  internalEmployeeType (
    "Id of our employee type."
    id: Int!
  ): InternalEmployeeType

  """
  Return all of our employee status.
  """
  internalEmployeeStatuses: [InternalEmployeeStatus]

  """
  Return employee status.
  """
  internalEmployeeStatus (
    "Id of our employee status."
    id: Int!
  ): InternalEmployeeStatus

  """
  Return all resume sources.
  """
  resumeSources: ResumeSource

  """
  Return resume source.
  """
  resumeSource (
    "Id of resumeSource."
    id: Int!
  ): ResumeSource

  """
  Return all degrees.
  """
  degrees: [Degree]

  """
  Return a degree.
  """
  degree (
    "Id of degree."
    id: Int!
  ): Degree

  """
  Return all schooling levels.
  """
  schoolingLevels: [SchoolingLevel]

  """
  Return a schooling level.
  """
  schoolingLevel (
    "Id of schooling level."
    id: Int!
  ): SchoolingLevel

  """
  Return all clearance levels.
  """
  securityClearances: [SecurityClearance]

  """
  Return a clearance level.
  """
  securityClearance (
    "Id of clearance level."
    id: Int!
  ): SecurityClearance

  """
  Return all possible candidate status.
  """
  statusOfPersons: [StatusOfPerson]

  """
  Return a candidate status.
  """
  statusOfPerson (
    "Id of candidate status."
    id: Int!
  ): StatusOfPerson

  """
  A random quote.
  """
  quoteOfTheDay: String

  """
  Random number from 0 to 1.
  """
  random: Float!

  """
  Three rolls of a 6 sided die.
  """
  rollThreeDice: [Int]

  """
  Return multiple rolls of a die with arbitrary number of faces.
  """
  rollDice(
    "How many rolls"
    numberOfDice: Int!

    "Optional: How many faces per die.  (All die have same number.)  Defaults to 6."
    numberOfSidesOnDie: Int
  ): [Int]
}

"""
Resume
"""
type Resume {
  id: Int
  person: Person
  fileName: String
  "Upload time string representing seconds since Epoch Time"
  upload: String
  "User who uploaded resume. (Just the id.)"
  uploadUserId: Int
  "User who uploaded resume."
  uploadUser: User
  UploadSourceId: ResumeSource
  "CAUTION: LARGE SIZE - Resume base64 encoded text"
  payloadText: String
  "CAUTION: LARGE SIZE - Resume decoded"
  payload: String
  "Text in resume."
  textBlob: String
  "List of normalized keywords in resume."
  keywords: String
}

"""
Candidate with a resume
"""
type Person {
  id: Int
  fullName: String
  resumeLatest: Resume
  resumes: [Resume]
  "Latest hourly/intern type recorded at our company"
  internalEmployeeType: InternalEmployeeType

  "\`None\`, \`Current\`, \`Former\` employment at our company"
  internalEmployeeStatus: InternalEmployeeStatus

  schoolingLevel: SchoolingLevel
  degree: Degree
  securityClearance: SecurityClearance

  "Freeform text for the position the person originally applied for."
  positionAppliedFor: String
  email: String
  phone: String
  mailingAddress: String
  physicalAddress: String
  lastStatusOfPerson: StatusOfPerson

  "String representing seconds since Epoch Time"
  lastStatusOfPersonDate: String
}

"""
Application User
"""
type User {
  "Id of User"
  id: Int

  "User's name"
  fullName: String

  "User's password (not really, it's a token)"
  password: String

  email: String

  "String representing seconds since Epoch Time"
  createdOn: String

  "String representing seconds since Epoch Time"
  lastLogin: String
}

"""
Type to hold Degree from database
"""
type Degree {
  "Id of Degree"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold InternalEmployeeStatus from database
"""
type InternalEmployeeStatus {
  "Id of InternalEmployeeStatus"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold InternalEmployeeType from database
"""
type InternalEmployeeType {
  "Id of InternalEmployeeType"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold SchoolingLevel from database
"""
type SchoolingLevel {
  "Id of SchoolingLevel"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold SecurityClearance from database
"""
type SecurityClearance {
  "Id of SecurityClearance"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold StatusOfPerson from database
"""
type StatusOfPerson {
  "Id of StatusOfPerson"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Type to hold ResumeSource from database
"""
type ResumeSource {
  "Id of ResumeSource"
  id: Int

  "Sorting rank for display"
  sortOrder: Int

  "Short description or Abbreviation"
  short: String

  "Full description or Proper Title"
  long: String
}

"""
Candidate with a resume
"""
input PersonInput {
  fullName: String!
  "Latest hourly/intern type recorded at our company"
  internalEmployeeTypeId: Int

  "\`None\`, \`Current\`, \`Former\` employment at our company"
  internalEmployeeStatusId: Int

  schoolingLevelId: Int
  degreeId: Int
  securityClearanceId: Int

  "Freeform text for the position the person originally applied for."
  positionAppliedFor: String
  email: String
  phone: String
  mailingAddress: String
  physicalAddress: String
  lastStatusOfPersonId: Int
}

"""
Resume
"""
input ResumeInput {
  personId: Int!
  fileName: String
  "User who uploaded resume. (Just the id.)"
  uploadUserId: Int
  UploadSourceId: Int
  payload: String!
  textBlob: String!
}

"""
Candidate with a resume AND the Resume
"""
input PersonResumeInput {
  fullName: String!
  "Latest hourly/intern type recorded at our company"
  internalEmployeeTypeId: Int

  "\`None\`, \`Current\`, \`Former\` employment at our company"
  internalEmployeeStatusId: Int

  schoolingLevelId: Int
  degreeId: Int
  securityClearanceId: Int

  "Freeform text for the position the person originally applied for."
  positionAppliedFor: String
  email: String
  phone: String
  mailingAddress: String
  physicalAddress: String
  lastStatusOfPersonId: Int
  fileName: String
  "User who uploaded resume. (Just the id.)"
  uploadUserId: Int
  UploadSourceId: Int
  payload: String!
  textBlob: String!
}

type Mutation {
  createPerson(newPerson: PersonInput): Person
  createResume(newResume: ResumeInput): Resume
  createPersonAndResume(newPersonResume: PersonResumeInput): Resume
}
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Work hard';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: ({
    numberOfDice,
    numberOfSidesOnDie
  }: {
    numberOfDice: number;
    numberOfSidesOnDie: number;
  }) => {
    const output = [];
    for (let i = 0; i < numberOfDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numberOfSidesOnDie || 6)));
    }
    return output;
  },

  internalEmployeeTypes,
  internalEmployeeType,
  internalEmployeeStatuses,
  internalEmployeeStatus,
  schoolingLevels,
  schoolingLevel,
  degrees,
  degree,
  securityClearances,
  securityClearance,
  statusOfPersons,
  statusOfPerson,
  resumeSources,
  resumeSource,

  user,
  users,

  resume,
  resumeLatestForPerson,
  resumes,
  resumesForPerson,
  createResume,
  keywordSearchResumes,

  person,
  persons,
  createPerson,

  createPersonAndResume: async ({
    newPersonResume
  }: {
    newPersonResume: {
      fullName: string;
      internalEmployeeTypeId?: number;
      internalEmployeeStatusId?: number;
      schoolingLevelId?: number;
      degreeId?: number;
      securityClearanceId?: number;
      positionAppliedFor?: string;
      email?: string;
      phone?: string;
      mailingAddress?: string;
      physicalAddress?: string;
      lastStatusOfPersonId?: number;
      fileName: string;
      uploadUserId?: number;
      UploadSourceId?: number;
      payload: string;
      textBlob: string;
    };
  }) => {
    const newPerson = {
      fullName: newPersonResume.fullName,
      internalEmployeeTypeId: newPersonResume.internalEmployeeTypeId,
      internalEmployeeStatusId: newPersonResume.internalEmployeeStatusId,
      schoolingLevelId: newPersonResume.schoolingLevelId,
      degreeId: newPersonResume.degreeId,
      securityClearanceId: newPersonResume.securityClearanceId,
      positionAppliedFor: newPersonResume.positionAppliedFor,
      email: newPersonResume.email,
      phone: newPersonResume.phone,
      mailingAddress: newPersonResume.mailingAddress,
      physicalAddress: newPersonResume.physicalAddress,
      lastStatusOfPersonId: newPersonResume.lastStatusOfPersonId
    };

    const createdPerson = await createPerson({ newPerson });

    const newResume = {
      personId: createdPerson.id,
      fileName: newPersonResume.fileName,
      uploadUserId: newPersonResume.uploadUserId,
      UploadSourceId: newPersonResume.UploadSourceId,
      payload: newPersonResume.payload,
      textBlob: newPersonResume.textBlob
    };
    const createdResume = await createResume({ newResume });
    return createdResume;
  }
};

export default {
  schema,
  root
};
