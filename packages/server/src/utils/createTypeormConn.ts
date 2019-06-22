import { createConnection, getConnectionOptions } from "typeorm";

import { User } from "../entity/User";
import { Recipe } from "../entity/Recipe";
import { DATABASE_URL } from "./config";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: DATABASE_URL,
        entities: [User, Recipe],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
