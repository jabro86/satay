import { Project } from "../../../entity/Project";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deployProject: async (_, { id }, { session }) => {
      const project = await Project.findOne({ where: { id } });
      if (project === undefined) {
        throw new Error(`Project ${id} does not exist.`);
      }

      if (session.userId !== project.userId) {
        console.warn(
          `The user ${
            session.userId
          } is trying to deploy a project they do not own.`
        );
        throw new Error("Not authorized!");
      }

      return true;
    }
  }
};
