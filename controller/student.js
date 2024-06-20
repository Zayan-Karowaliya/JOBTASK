import Student from '../models/student.js';
import Class from '../models/class.js';
import Course from '../models/course.js';
import StudentCourse from '../models/studentCourse.js';
import sequelize from '../config/db.js';
import { Op } from 'sequelize';
// CRUD operations for students
import StudentClass from '../models/StudentClass.js';
// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({ name, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
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

    const students = await Student.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      totalStudents: students.count,
      students: students.rows
    });
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    student.name = name;
    student.email = email;
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Adjust the path as per your project structure

// Function to enroll a student into courses within a class
// controllers/enrollmentController.js

// Adjust the path as per your project structure

// Function to enroll a student into courses within a class
export async function enrollStudent(req, res) {
  const { studentId, classId, courseIds } = req.body;

  try {
    // Check if the class exists
    const classInstance = await Class.findByPk(classId);
    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Check if the student exists
    const studentInstance = await Student.findByPk(studentId);
    if (!studentInstance) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Ensure courseIds is an array
    if (!Array.isArray(courseIds)) {
      return res.status(400).json({ error: 'courseIds must be an array' });
    }

    // Check if the courses exist
    const courses = await Course.findAll({
      where: {
        id: courseIds
      }
    });

    const existingCourseIds = courses.map(course => course.id);
    const nonExistingCourseIds = courseIds.filter(id => !existingCourseIds.includes(id));

    if (nonExistingCourseIds.length > 0) {
      return res.status(404).json({ error: `Courses with IDs [${nonExistingCourseIds.join(', ')}] not found` });
    }

    // Enroll the student in each course within the class
    await Promise.all(
      courses.map(course => {
        return StudentClass.findOrCreate({
          where: {
            studentId: studentId,
            classId: classId,
            courseId: course.id
          }
        });
      })
    );

    return res.status(200).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

 // Ensure this import

 export async function getEnrolledCourses(req, res) {
  const { studentId, classId, courseId } = req.body; // Assuming these are sent in the request body

  try {
    // Validate input
    if (!studentId || !classId || !courseId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Fetch the enrollment record
    const enrollmentRecord = await StudentClass.findOne({
      where: {
        studentId: studentId,
        classId: classId,
        courseId: courseId
      },
      include: [
        {
          model: Student,
          attributes: ['id', 'name'] // Include specific attributes of Student model
        },
        {
          model: Course,
          attributes: ['id', 'name'] // Include specific attributes of Course model
        }
      ]
    });

    if (!enrollmentRecord) {
      return res.status(404).json({ error: 'Student not enrolled in the specified course' });
    }

    // Extract student and course details from the enrollment record
    const studentName = enrollmentRecord.Student.name;
    const courseName = enrollmentRecord.Course.name;

    // Return the enrollment record with student and course names
    return res.status(200).json({
      id: enrollmentRecord.id, // Adjust as per your enrollment record structure
      studentId: enrollmentRecord.studentId,
      classId: enrollmentRecord.classId,
      courseId: enrollmentRecord.courseId,
      studentName: studentName,
      courseName: courseName
      // Add any other relevant details you need to return
    });

  } catch (error) {
    console.error('Error fetching enrolled student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}