import { Training } from "../../../entity/Training";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteTraining: async (_, { id }, { session }) => {
      const training = await Training.findOne({ where: { id } });
      if (!training) {
        throw new Error("does not exist");
      }

      if (session.userId !== training.userId) {
        throw new Error("not authorized");
      }

      await Training.remove(training);

      return true;
    }
  }
};
