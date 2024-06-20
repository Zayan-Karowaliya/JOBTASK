import Student from './student.js';
import Class from './class.js';
import Course from './course.js';
import Teacher from './teacher.js';
import Mark from './Mark.js';
// Define associations
export function defineAssociations() {
  // Many-to-Many: Student and Class
  Student.belongsToMany(Class, { through: 'StudentClass' });
  Class.belongsToMany(Student, { through: 'StudentClass' });

  Student.belongsToMany(Course, { through: 'StudentCourse' });
  Course.belongsToMany(Student, { through: 'StudentCourse' });

  Mark.belongsTo(Student, { foreignKey: 'studentId' });
  Mark.belongsTo(Class, { foreignKey: 'classId' });
  Mark.belongsTo(Course, { foreignKey: 'courseId' });
  Mark.belongsTo(Teacher, { foreignKey: 'teacherId' });

  Student.hasMany(Mark, { foreignKey: 'studentId' });
  Class.hasMany(Mark, { foreignKey: 'classId' });
  Course.hasMany(Mark, { foreignKey: 'courseId' });
}