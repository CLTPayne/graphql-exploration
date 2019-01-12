const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const data = {
  users: [
    {
      age: 21,
      id: 1,
      name: 'John Smith'
    },
    {
      age: 25,
      id: 2,
      name: 'Jane Doe'
    },
    {
      age: 31,
      id: 3,
      name: 'John Doe'
    },
    {
      age: 32,
      id: 4,
      name: 'Jane Smith'
    }
  ]
}

const schema = buildSchema(`
  type UserInput {
    age: Int
    name: String
  }
  type User {
    age: Int
    id: ID
    name: String
  }
  type Query {
    getUser(id: Int!): User
    getUsers(userIds: [Int]!): [User]
    getWelcome: String
  }
  type Mutation {
    createUser(input: UserInput): User
  }
`);

const root = {
  createUser: (args) => {
    const { age, name } = args.input;
    const id = data.users.length + 1;
    data.users.push({ age, id, name });
    return data.users.find(user => user.id === id);
  },
  getUser: (args) => {
    const { id } = args;
    return data.users.find(user => user.id === id);
  },
  getUsers: (args) => {
    const { userIds } = args;
    const foundUsers = data.users.filter(user => {
      return userIds.some(id => id === user.id);
    });
    return foundUsers;
  },
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
