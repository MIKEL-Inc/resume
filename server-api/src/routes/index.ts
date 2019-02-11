import { Express } from 'express';

import graphql from './graphql';

export default (app: Express) =>
  app
    .use('/graphql', graphql);
