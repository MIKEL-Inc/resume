import express from 'express';
import graphqlHTTP from 'express-graphql';
import thingy from './schema';
import mountRoutes from './routes';

const server = express();
console.log({'thingy': thingy});
mountRoutes(server);
server.use('/graphql', graphqlHTTP({
  schema: thingy.schema,
  rootValue: thingy.root,
  graphiql: true,
}));
server.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
