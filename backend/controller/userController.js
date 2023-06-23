import user from "../model/loginModel.js";
import bcrypt from "bcrypt";
import { response } from "express";
import twilio from "twilio";
const saltRounds = 10;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const registerUser = async (req, res) => {
  try {
    let { username, password, phone } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const data = await user.create({
      username: username,
      password: hash,
      phone: phone,
    });
    if (data) {
      res.status(200).json({
        status: "success",
        message: "User has been registered",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "User failed to register",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await user.findOne({
      where: {
        username: username,
      },
    });
    if (data) {
      const match = await bcrypt.compare(password, data.password);
      if (!match) {
        res.status(200).json({
          status: "failed",
          message: "Password wrong",
        });
      } else {
        req.session.phone = data.phone;
        res.status(200).json({
          status: "success",
          message: "Login success",
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message: "username  Not Found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const forgotPass = async (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const data = await user.findOne({
      where: {
        phone: phone,
      },
    });
    if (data) {
      const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: "+14178043519",
        to: `+62${phone}`,
      });
      if (message) {
        req.session.otp = otp;
        req.session.phone = phone;
        res.status(200).json({
          status: "success",
          message: "OTP has been sent",
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "OTP failed to send",
        });
      }
    } else {
      res.status(404).json({
        status: "failed",
        message: "phone number not registered",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const otpSession = req.session.otp;

  if (otp == otpSession) {
    res.status(200).json({
      status: "success",
      message: "OTP verified",
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "OTP not verified",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const phone = req.session.phone;
  console.log(req.session);
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const update = await user.update(
      {
        password: hash,
      },
      {
        where: {
          phone: phone,
        },
      }
    );
    if (update) {
      res.status(200).json({
        status: "success",
        message: "Password has been reset",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Password failed to reset",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
