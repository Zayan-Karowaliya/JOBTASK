import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Student from './student.js';
const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  }
});

export default Teacher;
