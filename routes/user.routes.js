import express from "express";
import { userController,userCurrentDataController } from "../controllers/user.controller.js";
import { User } from "../model/user.model.js";
import { adminPasswordHash } from "../helper/passwordEncrypt.js";
import { isAdmin } from "../middleware/auth.js";
const router = express.Router();
router.post("/login", userController);
router.get("/user",isAdmin, userCurrentDataController);
// router.get("/register", async (req, res) => {
//   await User.create({
//     name: "Manas",
//     email: "manaskumar3581@gmail.com",
//     password: await adminPasswordHash("Manas@123"),
//   });

//   res.send("ok");
// });

// router.get("/test", isAdmin, (req, res) => {
//   try {
//     res.send("ok");
//   } catch (e) {
//     console.log(e);
//   }
// });

export default router;
