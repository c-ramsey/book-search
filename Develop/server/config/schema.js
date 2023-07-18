// Import the necessary dependencies
const { gql } = require('apollo-server-express');

// Define the GraphQL schema using SDL (Schema Definition Language)
const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    searchBooks(query: String!): [Book]!
    me: User
  }

  type Mutation {
    saveBook(input: BookInput!): User!
    removeBook(bookId: ID!): User!
    login(email: String!, password: String!): AuthPayload!
    signup(username: String!, email: String!, password: String!): AuthPayload!
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }
`;

// Export the schema
module.exports = typeDefs;
