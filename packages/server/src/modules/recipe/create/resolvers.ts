import { Recipe } from "../../../entity/Recipe";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    createRecipe: async (_, { input }, { session }) => {
      console.log("TCL: session", session)
      await Recipe.create({
        ...input,
        pictureUrl: "",
        userId: session.userId
      }).save();

      return true;
    }
  }
};
