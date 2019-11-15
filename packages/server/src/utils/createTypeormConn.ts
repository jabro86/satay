import { createConnection, getConnectionOptions } from "typeorm";
import { Excercise } from "../entity/Excercise";
import { Set } from "../entity/Set";
import { Training } from "../entity/Training";
import { User } from "../entity/User";
import { DATABASE_URL } from "./config";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: DATABASE_URL,
        entities: [User, Excercise, Set, Training],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
