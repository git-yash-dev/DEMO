import express from "express";
import { Department } from "../models/index.js";

const router = express.Router();

// ✅ Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

// ✅ Create new department
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDepartment = await Department.create({ name, description });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
});

export default router;
