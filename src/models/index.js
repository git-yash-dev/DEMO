import User from './User.js';
import Report from './Report.js';
import Department from './Department.js';
import Assignment from './Assignment.js';
import Notification from './Notification.js';

// Define associations
User.hasMany(Report, {
  foreignKey: 'userId',
  as: 'reports',
});

Report.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Notification, {
  foreignKey: 'userId',
  as: 'notifications',
});

Notification.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Report.hasMany(Assignment, {
  foreignKey: 'reportId',
  as: 'assignments',
});

Assignment.belongsTo(Report, {
  foreignKey: 'reportId',
  as: 'report',
});

Department.hasMany(Assignment, {
  foreignKey: 'departmentId',
  as: 'assignments',
});

Assignment.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department',
});

export {
  User,
  Report,
  Department,
  Assignment,
  Notification,
};