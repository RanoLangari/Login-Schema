import { forgotPass, login, registerUser, verifyOTP, resetPassword, checkSession, checkOTP, checkPhone } from "../controller/userController.js";
import express from "express";

const Router = express.Router();

Router.post("/login", login);
Router.post("/register", registerUser);
Router.post("/forgotpass", forgotPass);
Router.post("/verifyotp", verifyOTP);
Router.post("/resetpass", resetPassword);
Router.get("/checksession", checkSession);
Router.get("/checkotp", checkOTP);
Router.get("/checkphone", checkPhone);

export default Router;
