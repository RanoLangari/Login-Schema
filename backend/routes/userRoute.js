import { forgotPass, getUser, registerUser, verifyOTP, resetPassword } from "../controller/userController.js";
import express from "express";

const Router = express.Router();

Router.post("/login", getUser);
Router.post("/register", registerUser);
Router.post("/forgotpass", forgotPass);
Router.post("/verifyotp", verifyOTP);
Router.post("/resetpass", resetPassword);


export default Router;
