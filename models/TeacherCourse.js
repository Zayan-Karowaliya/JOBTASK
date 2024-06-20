import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const TeacherCourse = sequelize.define('TeacherCourse', {
//   teacherId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'teachers',
//       key: 'id'
//     }
//   },
//   courseId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'courses',
//       key: 'id'
//     }
//   },
//   classId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'classes',
//       key: 'id'
//     }
//   }
});

export default TeacherCourse;
