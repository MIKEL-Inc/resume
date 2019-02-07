import { Express } from 'express';

import graphql from './graphql';
import person from './person';

export default (app: Express) =>
  app
    .use('/graphql', graphql)
    .use('/person', person);
