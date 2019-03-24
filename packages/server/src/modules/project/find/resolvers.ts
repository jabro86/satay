import { Project } from "../../../entity/Project";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    findProjects: async (_, __, { session: { userId } }) => {
      return Project.find({ where: { userId } });
    }
  }
};
