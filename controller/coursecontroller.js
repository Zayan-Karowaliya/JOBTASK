import Course from '../models/course.js';
import { Op } from 'sequelize';
// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Course.create({ name });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
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

    const courses = await Course.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      totalCourses: courses.count,
      courses: courses.rows
    });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    course.name = name;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    await course.destroy();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status (500).json({ error: err.message });
  }
};
