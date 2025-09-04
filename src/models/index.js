import { Sequelize } from "sequelize";
import UserModel from "./User.js";
import ReportModel from "./Report.js";
import DepartmentModel from "./Department.js";
import AssignmentModel from "./Assignment.js";
import NotificationModel from "./Notification.js";

// Initialize Sequelize (adjust config to your DB)
const sequelize = new Sequelize({
  dialect: "sqlite",            // or 'postgres', 'mysql'
  storage: "./database.sqlite"  // only for sqlite
});

// Initialize models
const User = UserModel(sequelize);
const Report = ReportModel(sequelize);
const Department = DepartmentModel(sequelize);
const Assignment = AssignmentModel(sequelize);
const Notification = NotificationModel(sequelize);

// Define associations
User.hasMany(Report, { foreignKey: "userId", as: "reports" });
Report.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

Report.hasMany(Assignment, { foreignKey: "reportId", as: "assignments" });
Assignment.belongsTo(Report, { foreignKey: "reportId", as: "report" });

Department.hasMany(Assignment, { foreignKey: "departmentId", as: "assignments" });
Assignment.belongsTo(Department, { foreignKey: "departmentId", as: "department" });

// Export sequelize + models
export { sequelize, User, Report, Department, Assignment, Notification };
