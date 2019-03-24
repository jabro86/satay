import { Project } from "../../../entity/Project";
import { Resource } from "../../../entity/Resource";
import { ResolverMap } from "../../../types/graphql-utils";
import { prismaDeleteService } from "../../../utils/PrismaUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteProject: async (_, { id }, { session }) => {
      const project = await Project.findOne({ where: { id } });
      if (project === undefined) {
        throw new Error(`Project ${id} does not exist.`);
      }

      if (session.userId !== project.userId) {
        console.warn(
          `The user ${
            session.userId
          } is trying to delete a project they do not own.`
        );
        throw new Error("Not authorized!");
      }
      const resources = await Resource.find({ where: { project } });

      await prismaDeleteService({
        resources,
        serviceName: project.serviceName
      });
      await Resource.remove(resources);
      await Project.remove(project);

      return true;
    }
  }
};
