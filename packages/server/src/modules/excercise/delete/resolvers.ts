import { Excercise } from "../../../entity/Excercise";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteExcercise: async (_, { id }, { session }) => {
      const excercise = await Excercise.findOne({ where: { id } });
      if (!excercise) {
        throw new Error("does not exist");
      }

      if (!session.userId) {
        throw new Error("not authorized");
      }

      await Excercise.remove(excercise);

      return true;
    }
  }
};
