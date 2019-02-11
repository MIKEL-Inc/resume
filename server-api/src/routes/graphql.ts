import graphqlHTTP from 'express-graphql';

import ourSchema from '../schema';

const router = graphqlHTTP({
  schema: ourSchema.schema,
  rootValue: ourSchema.root,
  graphiql: process.env.NODE_ENV === 'dev'
});

export default router;
