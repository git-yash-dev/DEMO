      import { DataTypes } from 'sequelize';

      export default (sequelize) => {
        const Report = sequelize.define('Report', {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [5, 200],
            },
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [10, 2000],
            },
          },
          photoURL: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          location: {
            type: DataTypes.JSONB,  // for Postgres, else change to JSON
            allowNull: true,
            validate: {
              isValidLocation(value) {
                if (value && (!value.lat || !value.lng)) {
                  throw new Error('Location must have lat and lng properties');
                }
              },
            },
          },
          issueType: {
            type: DataTypes.ENUM(
              'sanitation',
              'public_works',
              'lighting',
              'traffic',
              'parks',
              'noise',
              'other'
            ),
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM('submitted', 'acknowledged', 'in_progress', 'resolved'),
            defaultValue: 'submitted',
          },
          priority: {
            type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
            defaultValue: 'medium',
          },
        });

        return Report;
      };
