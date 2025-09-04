import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reportId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Reports',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('assigned', 'accepted', 'in_progress', 'completed'),
      defaultValue: 'assigned',
    },
  });

  return Assignment;
};
