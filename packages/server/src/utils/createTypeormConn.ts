import { createConnection, getConnectionOptions } from "typeorm";
import { ExcerciseInfo } from "../entity/ExcerciseInfo";
import { Training } from "../entity/Training";
import { User } from "../entity/User";
import { DATABASE_URL } from "./config";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: DATABASE_URL,
        entities: [User, Training, ExcerciseInfo],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
