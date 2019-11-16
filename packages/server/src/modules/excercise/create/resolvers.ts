import { Excercise } from "../../../entity/Excercise";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    createExcercise: async (_, { input }, { session }) => {
      if (!session.userId) {
        // user is not logged in
        throw new Error("not authenticated");
      }

      await Excercise.create({
        ...input,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
