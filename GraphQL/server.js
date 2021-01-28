var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int 
    name: String 
    age: Int 
    shark: String
  }
`);

var users = [
  {
    id: 1, 
    name: 'Brian',
    age: '21',
    shark: 'Great White Shark'
  },
  {
    id: 2, 
    name: 'Kim', 
    age: '22',
    shark: 'Whale Shark'
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    shark: 'Hammerhead Shark'
  },
  {
    id: 4, 
    name: 'Joseph',
    age: '23',
    shark: 'Tiger Shark'
  },
  {
    id: 5, 
    name: 'Joy',
    age: '25',
    shark: 'Hammerhead Shark'
  }
];

var getUser = function(args) {
  var userID = args.id; 
  return users.filter(user => user.id == userID)[0];
}

var getUsers = function(args) {
  if (args.shark) {
    var shark = args.shark;
    return users.filter(user => user.shark === shark);
  } else {
    return users;
  }
}

// Root resolver 
var root = {
  user: getUser, 
  users: getUsers 
};

// Create an express server and a GraphQL endpoint 

var app = express(); 
app.use('/graphql', graphqlHTTP({
  schema: schema, 
  rootValue: root, 
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
