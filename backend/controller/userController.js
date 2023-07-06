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
    const otp = Math.floor(100000 + Math.random() * 900000);
    let { username, password, phone } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const fixPhone = `+${phone}`;
    const phoneExist = await user.findOne({
      where: {
        phone: fixPhone,
      },
    });
    if (phoneExist) {
      return res.status(200).json({
        status: "failed",
        message: "Phone number already registered",
      });
    }
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+14178043519",
      to: `${fixPhone}`,
    });
    if (message) {
      req.session.otp = otp;
      req.session.phone = fixPhone;
      req.session.username = username;
      req.session.password = hash;
      res.status(200).json({
        status: "success",
        message: "OTP has been sent",
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "OTP failed to send",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyOtpRegister = async (req, res) => {
  try {
    const { otp } = req.body;
    const otpSession = req.session.otp;
    const username = req.session.username;
    const password = req.session.password;
    const phone = req.session.phone;
    if (otp == otpSession) {
      const data = await user.create({
        username,
        password,
        phone,
      });
      if (data) {
        res.status(200).json({
          status: "success",
          message: "User has been registered",
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "User failed to register",
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message: "Wrong OTP",
      });
    }
    req.session.destroy();
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
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
          message: "Wrong Password",
        });
      } else {
        req.session.username = data.username;
        res.status(200).json({
          status: "success",
          message: "Login Success",
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
  const otp = Math.floor(100000 + Math.random() * 900000);
  const phone = `+${req.body.phone}`;
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
        to: `${phone}`,
      });
      if (message) {
        req.session.otp = otp;
        req.session.phone = phone;
        res.status(200).json({
          status: "success",
          message: "OTP has been sent",
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "OTP failed to send",
        });
      }
    } else {
      res.status(200).json({
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
    res.status(200).json({
      status: "failed",
      message: "Wrong OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const phone = req.session.phone;
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
      res.status(200).json({
        status: "failed",
        message: "Password failed to reset",
      });
    }
    req.session.destroy();
  } catch (error) {
    console.log(error.message);
  }
};

export const checkSession = (req, res) => {
  if (req.session.username) {
    res.status(200).json({
      status: "success",
      message: "Session Found",
    });
  } else {
    res.status(200).json({
      status: "failed",
      message: "Session Not Found",
    });
  }
};

export const checkOTP = (req, res) => {
  if (req.session.otp) {
    res.status(200).json({
      status: "success",
      message: "OTP Found",
    });
  } else {
    res.status(200).json({
      status: "failed",
      message: "OTP Not Found",
    });
  }
};

export const checkPhone = async (req, res) => {
  if (req.session.phone) {
    res.status(200).json({
      status: "success",
      message: "Phone Found",
    });
  } else {
    res.status(200).json({
      status: "failed",
      message: "Phone Not Found",
    });
  }
};
