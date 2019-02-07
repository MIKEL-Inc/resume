import graphqlHTTP from 'express-graphql';

import ourSchema from '../schema';

const router = graphqlHTTP({
  schema: ourSchema.schema,
  rootValue: ourSchema.root,
  graphiql: true,      // FIXME: Don't run graphiql in Production
});

export default router;
