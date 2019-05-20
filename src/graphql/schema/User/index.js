import { types, typeResolvers } from "./type";
import { queryTypes, queryResolvers } from "./query";
import inputTypes from "./input";
import { mutationTypes, mutationResolvers } from "./mutation";

export default {
  types: () => [types, queryTypes, inputTypes, mutationTypes],
  resolvers: Object.assign(queryResolvers, mutationResolvers, typeResolvers)
};
