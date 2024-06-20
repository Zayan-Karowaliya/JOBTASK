import Sequelize from 'sequelize';
import sequelize from '../config/db.js';

import Teacher from './teacher.js'
import Class from './class.js';
import Course from './course.js';
import Student from './student.js';
import { defineAssociations } from './associations.js';

// Define associations


const db = {
  sequelize,
  Sequelize,
  Teacher,
  Class,
  Course,
  Student,
  
};
defineAssociations();

export default db;