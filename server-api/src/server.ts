import express from 'express';
import cors from 'cors';

import mountRoutes from './routes';

const server = express();

mountRoutes(server);

server.use(cors()); // FIXME: Not needed in Production when all is on same server.

server.listen(4000);

/* legitimate use of console.log */ console.log(
  'Running a GraphQL API server at http://localhost:4000/graphql'
);
