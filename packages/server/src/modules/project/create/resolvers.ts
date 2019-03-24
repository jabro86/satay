import { Content } from "@faas/common";
import { generate } from "randomstring";

import { Project } from "../../../entity/Project";
import { Resource } from "../../../entity/Resource";
import { ResolverMap } from "../../../types/graphql-utils";
import { prismaDeployService } from "../../../utils/PrismaUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    createProject: async (_, { input }, { session }) => {
      const serviceName = generate({ length: 8, charset: "alphabetic" });

      const newProject = await Project.create({
        ...input,
        serviceName,
        userId: session.userId
      }).save();
      const content: Content = {
        attributes: [
          { name: "id", type: "ID", required: true, unique: true },
          { name: "name", type: "String", required: true }
        ]
      };
      const newResource = await Resource.create({
        project: newProject,
        name: "User",
        content
      }).save();

      await prismaDeployService({ resources: [newResource], serviceName });

      return newProject;
    }
  }
};
