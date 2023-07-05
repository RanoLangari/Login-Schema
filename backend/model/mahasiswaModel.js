import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const mahasiswa = db.define(
  "tbl_mahasiswa",
  {
    nama: DataTypes.STRING,
    nim: DataTypes.STRING,
    jurusan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default mahasiswa;

(async () => {
  await db.sync();
})();
