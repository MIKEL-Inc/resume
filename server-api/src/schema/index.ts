import { buildSchema } from 'graphql';

import db from '../db';

const decodeBase64 = (b64Encoded: string) =>
  Buffer.from(b64Encoded, 'base64').toString();

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
  Return all Resumes.
  """
  resumes: [Resume]

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
  person: Person,
  fileName: String,
  "Upload time string representing seconds since Epoch Time"
  upload: String,
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

  internalEmployeeTypes: async () => {
    const queryText = `SELECT
  ET.internal_employee_type_id AS id
, ET.sort_order                AS "sortOrder"
, ET.description_short         AS short
, ET.description_long          AS long
FROM internal_employee_type AS ET`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  internalEmployeeType: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  ET.internal_employee_type_id AS id
, ET.sort_order                AS "sortOrder"
, ET.description_short         AS short
, ET.description_long          AS long
FROM internal_employee_type AS ET
WHERE ET.internal_employee_type_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  internalEmployeeStatuses: async () => {
    const queryText = `SELECT
  ES.internal_employee_status_id AS id
, ES.sort_order                  AS "sortOrder"
, ES.description_short           AS short
, ES.description_long            AS long
FROM internal_employee_status AS ES`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  internalEmployeeStatus: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  ES.internal_employee_status_id AS id
, ES.sort_order                  AS "sortOrder"
, ES.description_short           AS short
, ES.description_long            AS long
FROM internal_employee_status AS ES
WHERE ES.internal_employee_status_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  schoolingLevels: async () => {
    const queryText = `SELECT
  SL.schooling_level_id        AS id
, SL.sort_order                AS "sortOrder"
, SL.description_short         AS short
, SL.description_long          AS long
FROM schooling_level AS SL`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  schoolingLevel: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  SL.schooling_level_id        AS id
, SL.sort_order                AS "sortOrder"
, SL.description_short         AS short
, SL.description_long          AS long
FROM schooling_level AS SL
WHERE SL.schooling_level_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  degrees: async () => {
    const queryText = `SELECT
  D.degree_id                 AS id
, D.sort_order                AS "sortOrder"
, D.description_short         AS short
, D.description_long          AS long
FROM degree AS D`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  degree: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  D.degree_id                 AS id
, D.sort_order                AS "sortOrder"
, D.description_short         AS short
, D.description_long          AS long
FROM degree AS D
WHERE D.degree_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  securityClearances: async () => {
    const queryText = `SELECT
  SC.security_clearance_id     AS id
, SC.sort_order                AS "sortOrder"
, SC.description_short         AS short
, SC.description_long          AS long
FROM security_clearance AS SC`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  securityClearance: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  SC.security_clearance_id     AS id
, SC.sort_order                AS "sortOrder"
, SC.description_short         AS short
, SC.description_long          AS long
FROM security_clearance AS SC
WHERE SC.security_clearance_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  statusOfPersons: async () => {
    const queryText = `SELECT
  SP.status_of_person_id       AS id
, SP.sort_order                AS "sortOrder"
, SP.description_short         AS short
, SP.description_long          AS long
FROM status_of_person AS SP`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  statusOfPerson: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  SP.status_of_person_id       AS id
, SP.sort_order                AS "sortOrder"
, SP.description_short         AS short
, SP.description_long          AS long
FROM status_of_person AS SP
WHERE SP.status_of_person_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  resumeSources: async () => {
    const queryText = `SELECT
  RS.resume_source_id          AS id
, RS.sort_order                AS "sortOrder"
, RS.description_short         AS short
, RS.description_long          AS long
FROM resume_source AS RS`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  resumeSource: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  RS.resume_source_id          AS id
, RS.sort_order                AS "sortOrder"
, RS.description_short         AS short
, RS.description_long          AS long
FROM resume_source AS RS
WHERE RS.resume_source_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  users: async () => {
    const queryText = `SELECT
  U.user_id                   AS id
, U.fullname                  AS "fullName"
, U.password                  AS password
, U.email                     AS email
, U.created_on                AS "createdOn"
, U.last_login                AS "lastLogin"
FROM app_user AS U`;
    const { rows } = await db.query(queryText, undefined);
    return rows;
  },
  user: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  U.user_id                   AS id
, U.fullname                  AS "fullName"
, U.password                  AS password
, U.email                     AS email
, U.created_on                AS "createdOn"
, U.last_login                AS "lastLogin"
FROM app_user AS U
WHERE U.user_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    return rows[0];
  },

  resumes: async () => {
    const queryText = `SELECT
  R.resume_id                 AS id
, R.person_id                 AS "personId"
, R.file_name                 AS "fileName"
, R.upload                    AS upload
, R.upload_user_id            AS "uploadUserId"
, R.upload_source_id          AS "UploadSourceId"
, R.payload                   AS "payloadText"
, R.text_blob                 AS "textBlob"
, R.keywords                  AS keywords
FROM resume AS R`;
    const { rows } = await db.query(queryText, undefined);
    rows.forEach(resume => {
      resume.person = root.person({ id: resume.personId });
      resume.uploadUser = root.user({ id: resume.uploadUserId });
      resume.uploadSource = root.resumeSource({ id: resume.UploadSourceId });
      resume.payload = decodeBase64(resume.payloadText);
    });
    return rows;
  },
  resume: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  R.resume_id                 AS id
, R.person_id                 AS "personId"
, R.file_name                 AS "fileName"
, R.upload                    AS upload
, R.upload_user_id            AS "uploadUserId"
, R.upload_source_id          AS "UploadSourceId"
, R.payload                   AS "payloadText"
, R.text_blob                 AS "textBlob"
, R.keywords                  AS keywords
FROM resume AS R
WHERE R.resume_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    const resume = rows[0];
    resume.person = root.person({ id: resume.personId });
    resume.uploadUser = root.user({ id: resume.uploadUserId });
    resume.uploadSource = root.resumeSource({ id: resume.UploadSourceId });
    resume.payload = decodeBase64(resume.payloadText);
    return resume;
  },

  persons: async () => {
    const queryText = `SELECT
  P.person_id                   AS id
, P.fullname                    AS "fullName"
, P.internal_employee_type_id   AS "internalEmployeeTypeId"
, P.internal_employee_status_id AS "internalEmployeeStatusId"
, P.schooling_level_id          AS "schoolingLevelId"
, P.degree_id                   AS "degreeId"
, P.position_applied_for        AS "positionAppliedFor"
, P.security_clearance_id       AS "securityClearanceId"
, P.email                       AS email
, P.phone                       AS phone
, P.mailing_address             AS "mailingAddress"
, P.physical_address            AS "physicalAddress"
, P.last_status_of_person_id    AS "lastStatusOfPersonId"
, P.last_status_of_person_date  AS "lastStatusOfPersonDate"
FROM person AS P`;
    const { rows } = await db.query(queryText, undefined);
    rows.forEach(person => {
      person.internalEmployeeType = root.internalEmployeeType({
        id: person.internalEmployeeTypeId
      });
      person.internalEmployeeStatus = root.internalEmployeeStatus({
        id: person.internalEmployeeStatusId
      });
      person.schoolingLevel = root.schoolingLevel({
        id: person.schoolingLevelId
      });
      person.degree = root.degree({ id: person.degreeId });
      person.securityClearance = root.securityClearance({
        id: person.securityClearanceId
      });
      person.lastStatusOfPerson = root.statusOfPerson({
        id: person.lastStatusOfPersonId
      });
    });
    return rows;
  },
  person: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  P.person_id                   AS id
, P.fullname                    AS "fullName"
, P.internal_employee_type_id   AS "internalEmployeeTypeId"
, P.internal_employee_status_id AS "internalEmployeeStatusId"
, P.schooling_level_id          AS "schoolingLevelId"
, P.degree_id                   AS "degreeId"
, P.position_applied_for        AS "positionAppliedFor"
, P.security_clearance_id       AS "securityClearanceId"
, P.email                       AS email
, P.phone                       AS phone
, P.mailing_address             AS "mailingAddress"
, P.physical_address            AS "physicalAddress"
, P.last_status_of_person_id    AS "lastStatusOfPersonId"
, P.last_status_of_person_date  AS "lastStatusOfPersonDate"
FROM person AS P
WHERE P.person_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    const person = rows[0];
    person.internalEmployeeType = root.internalEmployeeType({
      id: person.internalEmployeeTypeId
    });
    person.internalEmployeeStatus = root.internalEmployeeStatus({
      id: person.internalEmployeeStatusId
    });
    person.schoolingLevel = root.schoolingLevel({
      id: person.schoolingLevelId
    });
    person.degree = root.degree({ id: person.degreeId });
    person.securityClearance = root.securityClearance({
      id: person.securityClearanceId
    });
    person.lastStatusOfPerson = root.statusOfPerson({
      id: person.lastStatusOfPersonId
    });
    return person;
  }
};

export default {
  schema,
  root
};
