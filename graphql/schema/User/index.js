const { types, typeResolvers } = require("./type");
const { queryTypes, queryResolvers } = require("./query");
const inputTypes = require("./input");
const { mutationTypes, mutationResolvers } = require("./mutation");

module.exports = {
  types: () => [types, queryTypes, inputTypes, mutationTypes],
  resolvers: Object.assign(queryResolvers, mutationResolvers, typeResolvers)
};
