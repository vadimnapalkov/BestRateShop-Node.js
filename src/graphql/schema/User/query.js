import User from "../../../controllers/user";

const Query = `
  extend type Query {
    authUser(input:UserInput!):User
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    authUser: async (_, { input }) => {
      let user = await User.authenticateUser(input);
      return user;
    }
  }
};
