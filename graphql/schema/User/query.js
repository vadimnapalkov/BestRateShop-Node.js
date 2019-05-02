const User = require("../../../controllers/user");

const Query = `
  extend type Query {
    user(name:String!):User
    authUser(input:UserInput!):User
  }
`;

exports.queryTypes = () => [Query];

exports.queryResolvers = {
  Query: {
    authUser: async (_, { input }) => {
      let user = await User.authenticateUser(input);
      return user;
    }
  }
};
