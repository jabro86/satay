import { createConnection, getConnectionOptions } from "typeorm";

import { Project } from "../entity/Project";
import { Resource } from "../entity/Resource";
import { User } from "../entity/User";
import { DATABASE_URL } from "./config";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: DATABASE_URL,
        entities: [User, Project, Resource],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
