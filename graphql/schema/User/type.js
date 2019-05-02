const User = `
  type User {
    id: Int!
    name: String!
    photo: String
  }
`;

exports.types = () => [User];

exports.typeResolvers = {};
