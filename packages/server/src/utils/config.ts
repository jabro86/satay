import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FRONTEND_HOST = process.env.FRONTEND_HOST;
const REDIS_URL = process.env.REDIS_URL;
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;
const PRISMA_URL = process.env.PRISMA_URL;
const PRISMA_MANAGEMENT_API_SECRET = process.env.PRISMA_MANAGEMENT_API_SECRET;

export {
  BACKEND_URL,
  FRONTEND_HOST,
  SENDGRID_API_KEY,
  REDIS_URL,
  DATABASE_URL,
  PORT,
  PRISMA_URL,
  PRISMA_MANAGEMENT_API_SECRET
};
