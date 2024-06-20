import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  addMark,
  getMarks,
} from '../controller/teachercontroller.js'

const teacherrouter = express.Router();

teacherrouter.post('/createteachers', createTeacher);
teacherrouter.get('/getteachers', getAllTeachers);
teacherrouter.get('/teachers/:id', getTeacherById);
teacherrouter.put('/updateteachers/:id', updateTeacher);
teacherrouter.delete('/deleteteachers/:id', deleteTeacher);
teacherrouter.post('/addmarks',addMark)
teacherrouter.get('/showmarks',getMarks)
export default teacherrouter;
