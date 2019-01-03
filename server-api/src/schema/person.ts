import db from '../db';
import schema from '.';

const personSql = `SELECT
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

const attachExternalResolvers = (givenPerson: any) => {
  givenPerson.internalEmployeeType = schema.root.internalEmployeeType({
    id: givenPerson.internalEmployeeTypeId
  });
  givenPerson.internalEmployeeStatus = schema.root.internalEmployeeStatus({
    id: givenPerson.internalEmployeeStatusId
  });
  givenPerson.schoolingLevel = schema.root.schoolingLevel({
    id: givenPerson.schoolingLevelId
  });
  givenPerson.degree = schema.root.degree({ id: givenPerson.degreeId });
  givenPerson.securityClearance = schema.root.securityClearance({
    id: givenPerson.securityClearanceId
  });
  givenPerson.lastStatusOfPerson = schema.root.statusOfPerson({
    id: givenPerson.lastStatusOfPersonId
  });
};

export const persons = async () => {
  const queryText = personSql;
  const { rows } = await db.query(queryText, undefined);
  rows.forEach(row => attachExternalResolvers(row));
  return rows;
};

export const person = async ({ id }: { id: number }) => {
  const queryText = personSql.concat(' WHERE P.person_id = $1');
  const { rows } = await db.query(queryText, [id]);
  const firstRow = rows[0];
  attachExternalResolvers(firstRow);
  return firstRow;
};

export const createPerson = async ({
  newPerson
}: {
  newPerson: {
    fullName: string;
    internalEmployeeTypeId: number;
    internalEmployeeStatusId: number;
    schoolingLevelId: number;
    degreeId: number;
    securityClearanceId: number;
    positionAppliedFor: string;
    email: string;
    phone: string;
    mailingAddress: string;
    physicalAddress: string;
    lastStatusOfPersonId: number;
  };
}) => {
  const queryText = `INSERT INTO person
  ( fullname
  , internal_employee_type_id
  , internal_employee_status_id
  , schooling_level_id
  , degree_id
  , position_applied_for
  , security_clearance_id
  , email
  , phone
  , mailing_address
  , physical_address
  , last_status_of_person_id
  , last_status_of_person_date
  )
VALUES
  ( $1 --fullname
  , $2 --internal_employee_type_id
  , $3 --internal_employee_status_id
  , $4 --schooling_level_id
  , $5 --degree_id
  , $6 --position_applied_for
  , $7 --security_clearance_id
  , $8 --email
  , $9 --phone
  , $10 --mailing_address
  , $11 --physical_address
  , $12 --last_status_of_person_id
  , transaction_timestamp() --last_status_of_person_date
  )
RETURNING
  person_id
`;
  const { rows } = await db.query(queryText, [
    newPerson.fullName,
    newPerson.internalEmployeeTypeId,
    newPerson.internalEmployeeStatusId,
    newPerson.schoolingLevelId,
    newPerson.degreeId,
    newPerson.positionAppliedFor,
    newPerson.securityClearanceId,
    newPerson.email,
    newPerson.phone,
    newPerson.mailingAddress,
    newPerson.physicalAddress,
    newPerson.lastStatusOfPersonId
  ]);

  const createdPersonId = rows[0].person_id;
  const createdPerson = person({ id: createdPersonId });

  return createdPerson;
};
