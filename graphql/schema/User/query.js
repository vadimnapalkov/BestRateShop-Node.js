const User = require("../../../controllers/user");

const Query = `
  extend type Query {
    user(name:String!):User
  }
`;

exports.queryTypes = () => [Query];

exports.queryResolvers = {
  Query: {
    user: async (_, { name }) => {
      const user = await User.getByName(name);
      if (user.length != 0) return user[0];
      else return null;
    }
  }
};
