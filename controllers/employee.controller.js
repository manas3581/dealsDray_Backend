import { adminPasswordVerify } from "../helper/passwordEncrypt.js";
import { Employee } from "../model/employee.model.js";

export const addEmployeeController = async (req, res) => {
  try {
    const {
      employeeId,
      course,
      gender,
      designation,
      mobileNumber,
      email,
      name,
      profilePic,
    } = req.body;
    if (
      !employeeId ||
      !course ||
      !gender ||
      !designation ||
      !mobileNumber ||
      !email ||
      !name ||
      !profilePic
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        data: null,
      });
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
        data: null,
      });
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        message: "Invalid mobile number format",
        success: false,
        data: null,
      });
    }

    const newEmployee = new Employee({
      employeeId,
      course,
      gender,
      designation,
      mobileNumber,
      email,
      name,
      profilePic,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully",
      success: true,
      data: newEmployee,
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

export const deleteEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
      data: deletedEmployee,
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

export const editEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      employeeId,
      course,
      gender,
      designation,
      mobileNumber,
      email,
      name,
      profilePic,
    } = req.body;

    if (email) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
          data: null,
        });
      }
    }
    if (mobileNumber) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobileNumber)) {
        return res.status(400).json({
          message: "Invalid mobile number format",
          success: false,
          data: null,
        });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {employeeId, course, gender, designation, mobileNumber, email, name, profilePic },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updatedEmployee,
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

export const getEmployeeController = async (req, res) => {
  try {
    const employees = await Employee.find({});

    res.status(200).json({
      message: "Employee retrived successfully",
      success: true,
      data: employees,
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
export const getEmployeeBYIdController = async (req, res) => {
  try {
    const employees = await Employee.findById(req.params.id);

    res.status(200).json({
      message: "Employee retrived successfully",
      success: true,
      data: employees,
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
