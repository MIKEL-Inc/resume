import { Express } from 'express';

import graphql from './graphql';
import resume from './resume';

export default (app: Express) =>
  app
    .use('/graphql', graphql)
    .use('/resume', resume);
