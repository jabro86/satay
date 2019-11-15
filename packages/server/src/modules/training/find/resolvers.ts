import { Training } from "../../../entity/Training";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    findTrainings: async () => {
      return Training.find();
    }
  }
};
