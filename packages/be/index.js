const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

let todos = [];

const typeDefs = gql`
  type Todo {
    id: String
    text: String
    completed: Boolean
  }
  type Query {
    todos(completed: Boolean): [Todo]!
  }
  type Mutation {
    createTodo(text: String!): String
    updateTodo(id: String!): String
    removeTodo(id: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: (_parent, args, _context, _info) =>
      args.completed === null ? todos : todos.filter((td) => td.completed === args.completed),
  },
  Mutation: {
    createTodo: (_parent, args, _context, _info) => {
      return todos.push({
        id: Date.now().toString(),
        text: args.text,
        completed: false,
      });
    },
    updateTodo: (_parent, args, _context, _info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos[i].completed = !todos[i].completed;
        }
      }
      return args.id;
    },
    removeTodo: (_parent, args, _context, _info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(i, 1);
        }
      }
      return args.id;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () => console.log("Now browse to http://localhost:4000" + server.graphqlPath));
