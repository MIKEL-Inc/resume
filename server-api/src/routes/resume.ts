import Router from 'express-promise-router';
import { json } from 'body-parser';

import { createResume } from '../schema/resume';

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = Router();

router.use(json());

/*
can test with:

curl \
--header "Content-Type: application/json" \
--data "{
  \"personId\": 1,
  \"fileName\": \"test\",
  \"uploadUserId\": 3,
  \"UploadSourceId\": 3,
  \"payload\": \"This is where an encoded file goes.\",
  \"textBlob\": \"3\"
}" \
localhost:4000/resume

*/

router.post('/', async (req: any, res: any) => {
  const {
    personId,
    fileName,
    uploadUserId,
    UploadSourceId,
    payload,
    textBlob
  } = req.body;
  const newResume = {
    personId,
    fileName,
    uploadUserId,
    UploadSourceId,
    payload,
    textBlob
  };
  const { id }  = await createResume({ newResume });
  res.status(201).send({ id });
});

// export our router to be mounted by the parent application
export default router;
