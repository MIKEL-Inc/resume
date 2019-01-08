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
  givenResume.person = () => schema.root.person({ id: givenResume.personId });
  givenResume.uploadUser = () => schema.root.user({ id: givenResume.uploadUserId });
  givenResume.uploadSource = () => schema.root.resumeSource({ id: givenResume.UploadSourceId });
  givenResume.payload = () => decodeBase64(givenResume.payloadText);
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

export const keywordSearchResumes = async ({ keywords }: { keywords: string }) => {
  const queryText = resumeSql.concat(' WHERE keywords @@ TO_TSQUERY($1)');
  const { rows } = await db.query(queryText, [keywords]);
  rows.forEach(row => attachExternalResolvers(row));
  return rows;
};

export const createResume = async ({
  newResume
}: {
  newResume: {
    personId: number
    fileName: string
    uploadUserId?: number
    UploadSourceId?: number
    payload: string
    textBlob: string
    };
}) => {
  const queryText = `INSERT INTO resume
  ( person_id
  , file_name
  , upload
  , upload_user_id
  , upload_source_id
  , payload
  , text_blob
  , keywords
  )
VALUES
  ( $1 -- person_id
  , $2 -- file_name
  , transaction_timestamp() -- upload
  , $3 -- upload_user_id
  , $4 -- upload_source_id
  , ENCODE(CONVERT_TO($5, 'UTF-8'), 'base64') -- payload
  , $6 -- text_blob
  , to_tsvector($6) -- keywords
  )
RETURNING
  resume_id
`;
  const {
    personId = 1,
    fileName = '',
    uploadUserId = 1,
    UploadSourceId = 1,
    payload = '',
    textBlob = ''
  } = newResume;

  const { rows } = await db.query(queryText, [
    personId,
    fileName,
    uploadUserId,
    UploadSourceId,
    payload,
    textBlob
  ]);

  const createdResumeId = rows[0].resume_id;
  const createdResume = () => resume({ id: createdResumeId });
  createdResume.id = createdResumeId;

  return createdResume;
};
