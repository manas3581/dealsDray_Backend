import express from "express";
import { isAdmin } from "../middleware/auth.js";
import {
  addEmployeeController,
  deleteEmployeeController,
  editEmployeeController,
  getEmployeeController,
  getEmployeeBYIdController,
} from "../controllers/employee.controller.js";
const router = express.Router();
router.post("/add-employee", isAdmin, addEmployeeController);
router.delete("/delete-employee/:id", isAdmin, deleteEmployeeController);
router.put("/edit-employee/:id", isAdmin, editEmployeeController);
router.get("/get-employee", isAdmin, getEmployeeController);
router.get("/employee/:id", isAdmin, getEmployeeBYIdController);


export default router;
