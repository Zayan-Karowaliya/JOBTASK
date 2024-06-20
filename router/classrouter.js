import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from '../controller/classcontroller.js';

const classrouter = express.Router();

classrouter.post('/createclasses', createClass);
classrouter.get('/getclasses', getAllClasses);
classrouter.get('/classes/:id', getClassById);
classrouter.put('/updateclasses/:id', updateClass);
classrouter.delete('/deleteclasses/:id',deleteClass);

export default classrouter;