import { addMahasiswa, getMahasiswa, getMahasiswaById, editMahasiswa, deleteMahasiswa } from "../controller/mahasiswaController.js";
import express from "express";

const Router = express.Router();

Router.post("/addmahasiswa", addMahasiswa);
Router.get("/mahasiswa", getMahasiswa);
Router.get("/mahasiswa/:id", getMahasiswaById);
Router.patch("/mahasiswa/:id", editMahasiswa);
Router.delete("/mahasiswa/:id", deleteMahasiswa);

export default Router;
