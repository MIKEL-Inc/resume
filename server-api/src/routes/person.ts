import Router from 'express-promise-router';

import db from '../db';

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = Router();

// export our router to be mounted by the parent application
export default router;

router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM person WHERE id = $1', [id]);
  res.send(rows[0]);
});
