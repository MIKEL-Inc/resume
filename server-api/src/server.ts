import express from 'express';
import graphqlHTTP from 'express-graphql';
import ourSchema from './schema';
import mountRoutes from './routes';

const server = express();
// console.log({'ourSchema': ourSchema});
mountRoutes(server);
server.use('/graphql', graphqlHTTP({
  schema: ourSchema.schema,
  rootValue: ourSchema.root,
  graphiql: true,
}));
server.listen(4000);
/* legitimate use of console.log */ console.log('Running a GraphQL API server at http://localhost:4000/graphql');
// console.log({'process.env': process.env});
// console.log({
//   comment:
//     'Select Environment Variables \
//   that concern the database plugin "pg".',
//   'PGUSER': process.env.PGUSER,
//   'PGHOST': process.env.PGHOST,
//   'PGPASSWORD': process.env.PGPASSWORD,
//   'PGDATABASE': process.env.PGDATABASE,
//   'PGPORT': process.env.PGPORT
// });