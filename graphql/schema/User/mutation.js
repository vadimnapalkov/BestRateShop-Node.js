const User = require("../../../controllers/user");

const Mutation = `
extend type Mutation {
  registrationUser(input:UserInput!):User
}
`;

exports.mutationTypes = () => [Mutation];

exports.mutationResolvers = {
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
