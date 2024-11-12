import express from "express";
import { config as configDotenv } from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import cors from 'cors';
import colors from "colors";

configDotenv();
const app = express();
connectDb();

// Middleware for JSON and CORS
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL if needed
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/employee", employeeRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Deals Dray</h1>");
});

// Server listening

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`.bgCyan.white);
});

app.get('/api/v1/employee/get-employee-count', async (req, res) => {
  try {
    const count = await Employee.countDocuments(); // Assuming Employee is your Mongoose model
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching employee count" });
  }
});