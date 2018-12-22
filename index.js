const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    getWelcome: String
  }
`);

const root = {
  getWelcome: () => {
    return "Welcome from GraphQL";
  },
};

const app = express();

app.use('/graphql', graphqlHttp({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000)
console.log('Running GraphQL API server on localhost:4000/graphql')
