import User from "../../../controllers/user";
import { authenticationUserByPassport } from "../../../config/passport";

const Mutation = `
extend type Mutation {
  registrationUser(input:UserInput!):User
  logoutUser:String
}
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    registrationUser: async (_, { input }, { req }) => {
      let { name, password } = input;
      let user = await User.getByName(name);
      if (user.length != 0) return null;
      else {
        user = await User.createUser({ name: name, pass: password });
        req.body.user = { name: name, password: password };
        await authenticationUserByPassport(req);
        return user;
      }
    },
    logoutUser: (_, {}, { req }) => {
      req.session.destroy();
      return "Logout Success";
    }
  }
};
