import { Project } from "../../../entity/Project";
import { ResolverMap } from "../../../types/graphql-utils";
import { Resource } from "../../../entity/Resource";

export const resolvers: ResolverMap = {
  Query: {
    findResources: async (_, { serviceName }) => {
      const project = await Project.findOne({ where: { serviceName } });
      if (!project) {
        throw new Error(`No project found for service ${serviceName}`);
      }
      return Resource.find({ where: { project } });
    }
  }
};
