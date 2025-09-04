import { sequelize, Department, User } from "../models/index.js";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    await sequelize.sync({ force: true }); // ⚠️ this will DROP and recreate tables
    console.log("Database synced.");

    // Insert default departments
    const departments = await Department.bulkCreate([
      { name: "Sanitation", description: "Handles garbage collection and waste management" },
      { name: "Public Works", description: "Handles potholes, roads, and construction" },
      { name: "Street Lighting", description: "Handles street light repairs" },
      { name: "Water Supply", description: "Handles leaking pipes and water issues" }
    ]);
    console.log("Departments seeded:", departments.map(d => d.name));

    // Insert an admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "System Admin",
      email: "admin@city.gov",
      password: hashedPassword,
      role: "admin"
    });
    console.log("Admin user created:", adminUser.email);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
