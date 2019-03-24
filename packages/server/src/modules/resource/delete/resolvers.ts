import { Project } from "../../../entity/Project";
import { Resource } from "../../../entity/Resource";
import { ResolverMap } from "../../../types/graphql-utils";
import { prismaDeployService } from "../../../utils/PrismaUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteResource: async (_, { input: { serviceName, id: resourceId } }) => {
      const project = await Project.findOne({
        where: { serviceName }
      });

      if (!project) {
        throw new Error(`No project found for service ${serviceName}`);
      }

      const resource = await Resource.findOne({ where: { id: resourceId } });
      if (!resource) {
        throw new Error(`No resource found for id ${resourceId}`);
      }
      await Resource.remove(resource);

      const resources = await Resource.find({ where: { project } });
      await prismaDeployService({
        resources,
        serviceName
      });

      return true;
    }
  }
};
