const User = `
  type User {
    id: Int!
    name: String!
    photo: String
  }
`;

export const types = () => [User];

export const typeResolvers = {};
