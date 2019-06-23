import { Recipe } from "../../../entity/Recipe";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteRecipe: async (_, { id }, { session }) => {
      const recipe = await Recipe.findOne({ where: { id } });
      if (!recipe) {
        throw new Error("does not exist");
      }

      if (session.userId !== recipe.userId) {
        throw new Error("not authorized");
      }

      await Recipe.remove(recipe);

      return true;
    }
  }
};
