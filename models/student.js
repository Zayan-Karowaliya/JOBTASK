import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Class from './class.js';
const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
   
  }
});

export default Student;
