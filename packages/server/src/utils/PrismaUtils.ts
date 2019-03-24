import { createDatamodelPrisma } from "@faas/common";
import * as childProcess from "child_process";
import { mkdirp, outputFile, remove } from "fs-extra";
import * as path from "path";
import { promisify } from "util";

import { Resource } from "../entity/Resource";
import { PRISMA_MANAGEMENT_API_SECRET, PRISMA_URL } from "./config";

const exec = promisify(childProcess.exec);
const currentEnv = process.env;

interface DeployPrismaConfig {
  serviceName: string;
  resources: Resource[];
}
export const prismaDeployService = async ({
  serviceName,
  resources
}: DeployPrismaConfig) => {
  const projectPath = path.join(__dirname, `../../__projects__/${serviceName}`);
  await mkdirp(projectPath);

  const data = resources.map(createDatamodelPrisma).join("\n");

  await outputFile(`${projectPath}/datamodel.prisma`, data);
  await outputFile(
    `${projectPath}/prisma.yml`,
    `endpoint: ${PRISMA_URL}/${serviceName}/dev\ndatamodel: datamodel.prisma`
  );

  const { stdout, stderr } = await exec(`prisma deploy`, {
    cwd: projectPath,
    env: { ...currentEnv, PRISMA_MANAGEMENT_API_SECRET }
  });
  console.log(stdout);
  console.warn(stderr);

  await remove(projectPath);
};

export const prismaDeleteService = async ({
  serviceName,
  resources
}: DeployPrismaConfig) => {
  const projectPath = path.join(__dirname, `../../__projects__/${serviceName}`);
  await mkdirp(projectPath);

  const data = resources.map(createDatamodelPrisma).join("\n");

  await outputFile(`${projectPath}/datamodel.prisma`, data);
  await outputFile(
    `${projectPath}/prisma.yml`,
    `endpoint: ${PRISMA_URL}/${serviceName}/dev\ndatamodel: datamodel.prisma`
  );
  const { stdout, stderr } = await exec(`prisma delete --force`, {
    cwd: projectPath,
    env: { ...currentEnv, PRISMA_MANAGEMENT_API_SECRET }
  });
  console.log(stdout);
  console.warn(stderr);

  await remove(projectPath);
};
