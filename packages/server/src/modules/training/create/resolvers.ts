import { Training } from "../../../entity/Training";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    createTraining: async (_, { input }, { session }) => {
      if (!session.userId) {
        // user is not logged in
        throw new Error("not authenticated");
      }

      await Training.create({
        ...input,
        sets: [],
        userId: session.userId
      }).save();

      return true;
    }
  }
};
