import { Recipe } from "../../../entity/Recipe";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    findRecipes: async () => {
      return Recipe.find();
    }
  }
};
