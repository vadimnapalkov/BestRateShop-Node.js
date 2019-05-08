import path from "path";
import autoload from "auto-load";
import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";

const Query = `
  type Query {
    status: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

let resolvers = {
  Query: {
    status: () => "ok"
  }
};

const typeDefs = [Query, Mutation];

// Read the current directory and load types and resolvers automatically
Object.keys(autoload(__dirname))
  .filter(file => {
    return file !== "index";
  })
  .forEach(dir => {
    const tmp = require(path.join(__dirname, dir)).default;
    resolvers = merge(resolvers, tmp.resolvers);
    typeDefs.push(tmp.types);
  });

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
