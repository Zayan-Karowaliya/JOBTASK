import Teacher from '../models/teacher.js';
import Mark from '../models/Mark.js';
import Student from '../models/student.js';
import Class from '../models/class.js';
import Course from '../models/course.js';
import { Op } from 'sequelize';
// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;
    const teacher = await Teacher.create({ name, email });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } }, 
        ]
      };
    }

    const teachers = await Teacher.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      totalTeachers: teachers.count,
      teachers: teachers.rows
    });
  } catch (error) {
    console.error('Error retrieving teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get teacher by ID
export const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    teacher.name = name;
    teacher.email = email;
    await teacher.save();
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    await teacher.destroy();
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addMark = async (req, res) => {
  const { studentId, classId, courseId, teacherId, markValue } = req.body;

  try {
    // Check if there is an existing mark for the same student, class, and course but a different teacher
    const existingMark = await Mark.findOne({
      where: {
        studentId,
        classId,
        courseId,
        teacherId: {
          [Op.not]: teacherId  // Ensure teacherId is different than the current teacher
        }
      }
    });

    if (existingMark) {
      return res.status(400).json({ error: 'Another teacher has already added marks for this student in the same class and course.' });
    }

    // Find existing mark or create new one
    const [mark, created] = await Mark.findOrCreate({
      where: {
        studentId,
        classId,
        courseId,
        teacherId
      },
      defaults: {
        value: markValue
      }
    });

    if (!created) {
      // Update existing mark
      mark.value = markValue;
      await mark.save();
    }

    res.json({ message: `Mark ${created ? 'added' : 'updated'} successfully` });
  } catch (error) {
    console.error('Error adding mark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMarks = async (req, res) => {
  const { studentId, classId, courseId, teacherId } = req.body;

  try {
    const marks = await Mark.findOne({
      where: {
        studentId,
        classId,
        courseId,
        teacherId
      },
      include: [
        {
          model: Student,
          attributes: ['name']
        },
        {
          model: Class,
          attributes: ['name']
        },
        {
          model: Course,
          attributes: ['name']
        },
        {
          model: Teacher,
          attributes: ['name']
        }
      ]
    });

    if (!marks) {
      return res.status(404).json({ error: 'Marks not found' });
    }

    const response = {
      student: { id: marks.studentId, name: marks.Student.name },
      class: { id: marks.classId, name: marks.Class.name },
      course: { id: marks.courseId, name: marks.Course.name },
      teacher: { id: marks.teacherId, name: marks.Teacher.name },
      mark: marks.value
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error retrieving marks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};