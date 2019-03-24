import "dotenv/config";
import "reflect-metadata";

import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import * as RateLimitRedisStore from "rate-limit-redis";
import { applyMiddleware } from "graphql-middleware";
import { GraphQLSchema } from "graphql";

import { redisSessionPrefix } from "./constants";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { createTestConn } from "./testUtils/createTestConn";
import { BACKEND_URL, PORT } from "./utils/config";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";
import { middlewareShield } from "./shield";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const schema = genSchema() as GraphQLSchema;
  applyMiddleware(schema, middlewareShield);

  const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({
      redis,
      url: BACKEND_URL || request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request
    })
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    const connection = await createTypeormConn();
    await connection.runMigrations();
  }
  const port = PORT || 4000;
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : port
  });
  console.log(`Server is running on localhost:${port}`);

  return app;
};
