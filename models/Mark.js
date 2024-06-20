import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Student from './student.js';
import Class from './class.js';
import Course from './course.js';
import Teacher from './teacher.js';

const Mark = sequelize.define('Mark', {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id'
    }
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Class,
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id'
    }
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teacher,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'classId', 'courseId', 'teacherId']
    }
  ]
});

Mark.belongsTo(Student, { foreignKey: 'studentId' });
Mark.belongsTo(Class, { foreignKey: 'classId' });
Mark.belongsTo(Course, { foreignKey: 'courseId' });
Mark.belongsTo(Teacher, { foreignKey: 'teacherId' });

Student.hasMany(Mark, { foreignKey: 'studentId' });
Class.hasMany(Mark, { foreignKey: 'classId' });
Course.hasMany(Mark, { foreignKey: 'courseId' });
Teacher.hasMany(Mark, { foreignKey: 'teacherId' });

export default Mark;
