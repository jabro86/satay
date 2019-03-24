import { Project } from "../../../entity/Project";
import { Resource } from "../../../entity/Resource";
import { ResolverMap } from "../../../types/graphql-utils";
import { prismaDeployService } from "../../../utils/PrismaUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    createResource: async (_, { input: { serviceName, content, name } }) => {
      const project = await Project.findOne({
        where: { serviceName }
      });

      if (!project) {
        throw new Error(`No project found for service ${serviceName}`);
      }

      await Resource.create({
        project,
        name,
        content
      }).save();

      const resources = await Resource.find({ where: { project } });
      await prismaDeployService({
        resources,
        serviceName
      });

      return true;
    }
  }
};
