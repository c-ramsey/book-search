const { User, Book } = require('./models'); // Replace './models' with the correct path to your Mongoose models

const resolvers = {
  Query: {
    searchBooks: async (_, { query }) => {
      // Implement logic to search for books using the provided query (e.g., title or author)
      // Use Mongoose methods to fetch books from the database
      try {
        const books = await Book.find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
          ],
        });
        return books;
      } catch (error) {
        throw new Error('Failed to fetch books from the database');
      }
    },
    me: async (_, __, { user }) => {
      // Implement logic to get the currently logged-in user based on the user context
      // Use the provided user context to fetch the user from the database
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const currentUser = await User.findById(user._id).populate('savedBooks');
        return currentUser;
      } catch (error) {
        throw new Error('Failed to fetch user from the database');
      }
    },
  },
  Mutation: {
    saveBook: async (_, { input }, { user }) => {
      // Implement logic to save a book to a user's savedBooks
      // Use Mongoose methods to update the user's savedBooks field in the database
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      } catch (error) {
        throw new Error('Failed to save book to user');
      }
    },
    removeBook: async (_, { bookId }, { user }) => {
      // Implement logic to remove a book from a user's savedBooks
      // Use Mongoose methods to update the user's savedBooks field in the database
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      } catch (error) {
        throw new Error('Failed to remove book from user');
      }
    },
    login: async (_, { email, password }) => {
      // Implement logic for user login
      // Use Mongoose methods to find the user by email and verify the password
      // Return the authenticated user and a token as part of the AuthPayload
      // You can use libraries like bcrypt for password hashing and JWT for token generation
      // For brevity, this example does not include the full authentication implementation
      // It's crucial to use secure authentication practices in a production environment
      throw new Error('Login resolver is not implemented');
    },
    signup: async (_, { username, email, password }) => {
      // Implement logic for user signup
      // Use Mongoose methods to create a new user in the database
      // Return the newly created user and a token as part of the AuthPayload
      // You can use libraries like bcrypt for password hashing and JWT for token generation
      // For brevity, this example does not include the full authentication implementation
      // It's crucial to use secure authentication practices in a production environment
      throw new Error('Signup resolver is not implemented');
    },
  },
};

module.exports = resolvers;
