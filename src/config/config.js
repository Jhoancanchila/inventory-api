import 'dotenv/config';

export default {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  port: process.env.PORT ?? 3000,
};