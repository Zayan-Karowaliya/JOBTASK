import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controller/coursecontroller.js';

const courserouter = express.Router();

courserouter.post('/createcourses', createCourse);
courserouter.get('/getcourses', getAllCourses);
courserouter.get('/courses/:id', getCourseById);
courserouter.put('/updatecourses/:id', updateCourse);
courserouter.delete('/deletecourses/:id', deleteCourse);

export default courserouter;
