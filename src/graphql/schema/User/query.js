import { authenticationUserByPassport } from "../../../config/passport";

const Query = `
  extend type Query {
    authorisationUser(input:UserInput!):User
    authenticationUser:User
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    authorisationUser: async (_, { input }, { req }) => {
      req.body.user = { name: input.name, password: input.password };
      const { passportUser } = await authenticationUserByPassport(req);
      if (passportUser) return passportUser;
      else return null;
    },
    authenticationUser: (_, {}, { req }) => {
      if (req.user !== undefined) return req.user;
      else;
      return null;
    }
  }
};
