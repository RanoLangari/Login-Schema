import db from "../config/database.js";
import mahasiswa from "../model/mahasiswaModel.js";
import moment from "moment";
moment().format();

export const addMahasiswa = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    const response = await mahasiswa.create({
      nama,
      nim,
      jurusan,
    });

    if (!response) {
      res.status(200).json({
        status: "failed",
        message: "failed add new mahasiswa",
      });
    }
    res.status(200).json({
      status: "success",
      message: "success add new mahasiswa",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMahasiswa = async (req, res) => {
  try {
    const response = await mahasiswa.findAll();
    if (!response) {
      res.status(200).json({
        status: "failed",
        message: "failed get all Mahasiswa",
      });
    }
    res.status(200).json({
      status: "success",
      message: "success get mahasiswa data",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMahasiswaById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await mahasiswa.findOne({
      where: {
        id,
      },
    });
    if (!response) {
      res.status(200).json({
        status: "failed",
        message: "failed find mahasiswa",
      });
    }
    res.status(200).json({
      status: "success",
      message: "success find mahasiswa",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const editMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const { nama, nim, jurusan } = req.body;
    const response = await mahasiswa.update(
      {
        nama,
        nim,
        jurusan,
        updatedAt: moment,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!response) {
      res.status(200).json({
        status: "failed",
        message: "failed update mahasiswa",
      });
    }
    res.status(200).json({
      status: "success",
      message: "success update mahasiswa",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await mahasiswa.destroy({
      where: {
        id,
      },
    });
    if (!response) {
      res.status(200).json({
        status: "failed",
        message: "failed delete Mahasiswa",
      });
    }
    res.status(200).json({
      status: "success",
      message: "success delete Mahasiswa",
    });
  } catch (error) {
    console.log(error.message);
  }
};
