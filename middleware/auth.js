import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({
      message: "unauthorized",
      success: false,
      data: null,
    });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(404).json({
        message: "unauthorized",
        success: false,
        data: null,
      });
    }
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({
        message: "unauthorized",
        success: false,
        data: null,
      });
    } else {
      req.user = decode.id;
      next();
    }
  } catch (e) {
    res.status(500).json({
      message: e?.message,
      success: false,
      data: null,
    });
  }
};
