import User from "../../../controllers/user";
import { authenticateUser } from "../../../config/passport";

const Mutation = `
extend type Mutation {
  registrationUser(input:UserInput!):User
}
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    registrationUser: async (_, { input }, { req, res }) => {
      let { name, password } = input;
      let user = await User.getByName(name);
      if (user.length != 0) return null;
      else {
        user = await User.createUser({ name: name, pass: password });
        req.body.user = { name: name, password: password };
        await authenticateUser(req, res);
        return user;
      }
    }
  }
};
