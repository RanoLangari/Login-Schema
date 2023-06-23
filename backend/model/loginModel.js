import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const user = db.define(
  "tbl_user",
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default user;

(async () => {
  await db.sync();
})();
