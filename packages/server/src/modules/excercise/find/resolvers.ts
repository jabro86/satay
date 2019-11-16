import { Excercise } from "../../../entity/Excercise";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    findExcercise: async () => {
      return Excercise.find();
    }
  }
};
