import User from "../../../controllers/user";

const Mutation = `
extend type Mutation {
  registrationUser(input:UserInput!):User
}
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    registrationUser: async (_, { input }) => {
      let { name, password } = input;
      let user = await User.getByName(name);
      if (user.length != 0) return null;
      else {
        user = await User.createUser({ name: name, pass: password });
        return user;
      }
    }
  }
};
