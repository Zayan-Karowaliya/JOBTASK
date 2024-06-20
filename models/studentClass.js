// models/studentClass.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Student from './student.js';
import Course from './course.js';
const StudentClass = sequelize.define('StudentClass', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id'
    }
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Classes',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  }
});
StudentClass.belongsTo(Student, { foreignKey: 'studentId' });
StudentClass.belongsTo(Course, { foreignKey: 'courseId' });
export default StudentClass;
