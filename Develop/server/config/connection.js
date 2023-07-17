const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/mybooksdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize ApolloServer with typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply middleware to Express app
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
