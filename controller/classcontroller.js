import Class from '../models/class.js';
import { Op } from 'sequelize';
// Create a new class
export const createClass = async (req, res) => {
  try {
    const { name } = req.body;
    const classInstance = await Class.create({ name });
    res.status(201).json(classInstance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
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

    const classes = await Class.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      totalClasses: classes.count,
      classes: classes.rows
    });
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get class by ID
export const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    res.json(classInstance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a class
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    classInstance.name = name;
    await classInstance.save();
    res.json(classInstance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    await classInstance.destroy();
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
