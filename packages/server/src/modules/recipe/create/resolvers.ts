import { Recipe } from "../../../entity/Recipe";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    createRecipe: async (_, { input }, { session }) => {
      if (!session.userId) {
        // user is not logged in
        throw new Error("not authenticated");
      }

      await Recipe.create({
        ...input,
        pictureUrl: "",
        userId: session.userId
      }).save();

      return true;
    }
  }
};
