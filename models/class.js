import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Student from './student.js';
const Class = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


export default Class;
