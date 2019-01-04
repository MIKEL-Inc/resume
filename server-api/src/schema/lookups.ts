import db from '../db';

const returnAll = (tableName: string) => `SELECT
  ${tableName}_id AS id
, sort_order                AS "sortOrder"
, description_short         AS short
, description_long          AS long
FROM ${tableName}`;

const lookupSql = (tableName: string) => returnAll(tableName).concat(` WHERE ${tableName}_id = $1`);

export const internalEmployeeTypes = async () => {
  const queryText = returnAll('internal_employee_type');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const internalEmployeeType = async ({ id }: { id: number }) => {
  const queryText = lookupSql('internal_employee_type');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const internalEmployeeStatuses = async () => {
  const queryText = returnAll('internal_employee_status');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const internalEmployeeStatus = async ({ id }: { id: number }) => {
  const queryText = lookupSql('internal_employee_status');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const schoolingLevels = async () => {
  const queryText = returnAll('schooling_level');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const schoolingLevel = async ({ id }: { id: number }) => {
  const queryText = lookupSql('schooling_level');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const degrees = async () => {
  const queryText = returnAll('degre');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const degree = async ({ id }: { id: number }) => {
  const queryText = lookupSql('degree');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const securityClearances = async () => {
  const queryText = returnAll('security_clearance');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const securityClearance = async ({ id }: { id: number }) => {
  const queryText = lookupSql('security_clearance');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const statusOfPersons = async () => {
  const queryText = returnAll('status_of_person');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const statusOfPerson = async ({ id }: { id: number }) => {
  const queryText = lookupSql('status_of_person');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};

export const resumeSources = async () => {
  const queryText = returnAll('resume_source');
  const { rows } = await db.query(queryText, undefined);
  return rows;
};
export const resumeSource = async ({ id }: { id: number }) => {
  const queryText = lookupSql('resume_source');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};
