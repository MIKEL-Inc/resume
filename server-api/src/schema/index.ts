// const { buildSchema } = require('graphql');
import { buildSchema } from 'graphql';

import db from '../db';

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
  Return a degree.
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

  "Freeform text for the position the person originally applied for."
  positionAppliedFor: String
  email: String
  mailingAddress: String
  physicalAddress: String
  lastStatusOfPerson: StatusOfPerson

  "String representing seconds since Epoch Time"
  lastStatusOfPersonDate: String
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
    return rows[0];
  },

  internalEmployeeStatuses: async () => {
    const queryText = `SELECT
  ES.internal_employee_status_id AS id
, ES.sort_order                  AS "sortOrder"
, ES.description_short           AS short
, ES.description_long            AS long
FROM internal_employee_status AS I`;
    const { rows } = await db.query(queryText, undefined);
    // console.log({'rows': rows});
    return rows;
  },
  internalEmployeeStatus: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  ES.internal_employee_status_id AS id
, ES.sort_order                  AS "sortOrder"
, ES.description_short           AS short
, ES.description_long            AS long
FROM internal_employee_status AS I
WHERE ES.internal_employee_status_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    // console.log({'rows': rows});
    return rows[0];
  },

  schoolingLevels: async () => {
    const queryText = `SELECT
  SL.schooling_level_id        AS id
, SL.sort_order                AS "sortOrder"
, SL.description_short         AS short
, SL.description_long          AS long
FROM schooling_level AS I`;
    const { rows } = await db.query(queryText, undefined);
    // console.log({'rows': rows});
    return rows;
  },
  schoolingLevel: async ({ id }: { id: number }) => {
    const queryText = `SELECT
  SL.schooling_level_id        AS id
, SL.sort_order                AS "sortOrder"
, SL.description_short         AS short
, SL.description_long          AS long
FROM schooling_level AS I
WHERE SL.schooling_level_id = $1`;
    const { rows } = await db.query(queryText, [id]);
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
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
    // console.log({'rows': rows});
    return rows[0];
  },

  person: async ({ id }: { id: number }) => {
    const queryText = 'SELECT * FROM vw_person WHERE person_id = $1';
    // console.log({'id': id});
    const { rows } = await db.query(queryText, [id]);
    // console.log({'rows': rows});
    // console.log({'rows[0]': rows[0]});
    const src = rows[0];
    const sample: any = {};
    sample.id = src.person_id;
    sample.fullName = src.fullname;
    sample.email = src.email;
    sample.lastStatusOfPersonDate = src.last_status_of_person_date;
    sample.positionAppliedFor = src.position_applied_for;
    sample.mailingAddress = src.mailing_address;
    sample.physicalAddress = src.physical_address;

    sample.internalEmployeeType = {};
    sample.internalEmployeeType.id = src.internal_employee_type_id;
    sample.internalEmployeeType.sortOrder = src.internal_employee_type_sort_order;
    sample.internalEmployeeType.short = src.internal_employee_type_description_short;
    sample.internalEmployeeType.long = src.internal_employee_type_description_long;

    sample.internalEmployeeStatus = {};
    sample.internalEmployeeStatus.id = src.internal_employee_status_id;
    sample.internalEmployeeStatus.sortOrder = src.internal_employee_status_sort_order;
    sample.internalEmployeeStatus.short = src.internal_employee_status_description_short;
    sample.internalEmployeeStatus.long = src.internal_employee_status_description_long;

    sample.schoolingLevel = {};
    sample.schoolingLevel.id = src.schooling_level_id;
    sample.schoolingLevel.sortOrder = src.schooling_level_sort_order;
    sample.schoolingLevel.short = src.schooling_level_description_short;
    sample.schoolingLevel.long = src.schooling_level_description_long;

    sample.degree = {};
    sample.degree.id = src.degree_id;
    sample.degree.sortOrder = src.degree_sort_order;
    sample.degree.short = src.degree_description_short;
    sample.degree.long = src.degree_description_long;

    sample.lastStatusOfPerson = {};
    sample.lastStatusOfPerson.id = src.degree_id;
    sample.lastStatusOfPerson.sortOrder = src.degree_sort_order;
    sample.lastStatusOfPerson.short = src.degree_description_short;
    sample.lastStatusOfPerson.long = src.degree_description_long;

    return sample;
  }
};

export default {
  schema,
  root
};