import { adminPasswordVerify } from "../helper/passwordEncrypt.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
export const userController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "email and password is required",
        success: false,
        data: null,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "email and password is wrong",
        success: false,
        data: null,
      });
    }
    const newPassword = await adminPasswordVerify(password, user?.password);
    if (!newPassword) {
      return res.status(404).json({
        message: "email and password is wrong",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: "user data",
      success: true,
      data: { user, token },
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      data: null,
      error: e.message,
    });
  }
};

export const userCurrentDataController = async (req, res) => {
  try {
    const id = req.user;
    if (!id) {
      return res.status(404).json({
        message: "unauthorized",
        success: false,
        data: null,
      });
    }

    const user = await User.findById( id );
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "user data",
      success: true,
      data:  user ,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      data: null,
      error: e.message,
    });
  }
};