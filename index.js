const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    getWelcome: String
  }
`);
