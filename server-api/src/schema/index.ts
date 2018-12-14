// const { buildSchema } = require('graphql');
import { buildSchema } from 'graphql';

import db from '../db';
import { async } from 'q';

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

  _Still a work in progress._
  """
  getPerson (
    "Id of Person to retrieve"
    id: Int!
  ): Person

  """
  Return all of our employee types.

  _Still a work in progress._
  """
  getAllInternalEmployeeTypes: [InternalEmployeeType]

  """
  Return employee type.

  _Still a work in progress._
  """
  getInternalEmployeeType (
    "Id of our employee type."
    id: Int
  ): InternalEmployeeType

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
  rollDice: ({ numberOfDice, numberOfSidesOnDie }: {
    numberOfDice: number;
    numberOfSidesOnDie: number;
  }) => {
    const output = [];
    for (let i = 0; i < numberOfDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numberOfSidesOnDie || 6)));
    }
    return output;
  },
  getAllInternalEmployeeTypes: async() => {
    const { rows } = await db.query(`
SELECT I.internal_employee_type_id AS id
     , I.sort_order AS "sortOrder"
     , I.description_short AS short
     , I.description_long AS long
FROM internal_employee_type AS I
`, undefined);
    // console.log({'rows': rows});
    return rows;
  },
  getInternalEmployeeType: async ({ id }: { id: number }) => {
    const { rows } = await db.query(`
SELECT I.internal_employee_type_id AS id
     , I.sort_order AS "sortOrder"
     , I.description_short AS short
     , I.description_long AS long
FROM internal_employee_type AS I
WHERE I.internal_employee_type_id = $1
`, [id]);
    // console.log({'rows': rows});
    return rows[0];
  },
  getPerson: async ({ id }: { id: number }) => {
    // console.log({'id': id});
    const { rows } = await db.query('SELECT * FROM vw_person WHERE person_id = $1', [id]);
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
    sample.internalEmployeeType.short = src.internal_employee_type;
    sample.internalEmployeeType.long = src.internal_employee_type_description;

    // sample.internal_employee_type = src.internal_employee_type;
    // sample.internal_employee_type_description = src.internal_employee_type_description;
    // sample.internal_employee_status = src.internal_employee_status;
    // sample.internal_employee_status_description = src.internal_employee_status_description;
    // sample.schooling_level = src.schooling_level;
    // sample.schooling_level_abbr = src.schooling_level_abbr;
    // sample.degree = src.degree;
    // sample.degree_abbr = src.degree_abbr;
    // sample.security_clearance = src.security_clearance;
    // sample.security_clearance_abbr = src.security_clearance_abbr;
    // sample.last_status_of_person = src.last_status_of_person;
    // sample.last_status_of_person_abbr = src.last_status_of_person_abbr;

    // console.log({'sample': sample});
    return sample;
  }
};

export default {
  schema,
  root
};
