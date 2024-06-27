import { Sequelize, Model, DataTypes } from "sequelize";
import config from "../config/config.js";

const nameDB = config.dbName;
const userDB = config.dbUser;
const passwordDB = config.dbPassword;
const hostDB = config.dbHost;
const portDB = config.dbPort;
const dialectDB = config.dbDialect;

export const sequelize = new Sequelize(nameDB, userDB,passwordDB, {
  host: hostDB,
  dialect: dialectDB,
  port: portDB,
});

/* async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connect(); */

