import { Sequelize } from "sequelize";
const dbName = process.env.DB_NAME;

const db = new Sequelize(dbName, "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export default db;
