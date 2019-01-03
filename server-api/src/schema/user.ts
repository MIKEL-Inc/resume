import db from '../db';

const userSql = `SELECT
  U.user_id                   AS id
, U.fullname                  AS "fullName"
, U.password                  AS password
, U.email                     AS email
, U.created_on                AS "createdOn"
, U.last_login                AS "lastLogin"
FROM app_user AS U`;

export const users = async () => {
  const queryText = userSql;
  const { rows } = await db.query(queryText, undefined);
  return rows;
};

export const user = async ({ id }: { id: number }) => {
  const queryText = userSql.concat(' WHERE U.user_id = $1');
  const { rows } = await db.query(queryText, [id]);
  return rows[0];
};
