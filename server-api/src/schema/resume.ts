import db from '../db';
import schema from '.';

const resumeSql = `SELECT
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

const attachExternalResolvers = (givenResume: any) => {
  givenResume.person = schema.root.person({ id: givenResume.personId });
  givenResume.uploadUser = schema.root.user({ id: givenResume.uploadUserId });
  givenResume.uploadSource = schema.root.resumeSource({ id: givenResume.UploadSourceId });
  givenResume.payload = decodeBase64(givenResume.payloadText);
};

export const decodeBase64 = (b64Encoded: string) =>
  Buffer.from(b64Encoded, 'base64').toString();

export const resumes = async () => {
  const queryText = resumeSql;
  const { rows } = await db.query(queryText, undefined);
  rows.forEach(row => attachExternalResolvers(row));
  return rows;
};

export const resume = async ({ id }: { id: number }) => {
  const queryText = resumeSql.concat(' WHERE R.resume_id = $1');
  const { rows } = await db.query(queryText, [id]);
  const firstRow = rows[0];
  attachExternalResolvers(firstRow);
  return firstRow;
};
