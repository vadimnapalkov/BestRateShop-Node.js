import { authenticateUser } from "../../../config/passport";

const Query = `
  extend type Query {
    authUser(input:UserInput!):User
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    authUser: async (_, { input }, { req, res }) => {
      req.body.user = { name: input.name, password: input.password };
      const { passportUser, info } = await authenticateUser(req, res);
      if (passportUser) return passportUser;
      else return null;
    }
  }
};
