import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const StudentCourse = sequelize.define('StudentCourse', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id'
    }
  },
//   classId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Classes',
//       key: 'id'
//     }
//   },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  }
});

export default StudentCourse;
