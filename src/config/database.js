import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'civicreport',      
  process.env.DB_USER || 'postgres',         
  process.env.DB_PASS || 'Blockno7/1/5',    
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,       
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    },
  }
);

export default sequelize;
