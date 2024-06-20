import express from 'express';
import { createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent,enrollStudent,getEnrolledCourses } from '../controller/student.js';
const router = express.Router();
router.post('/creatstudent', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.post('/enroll', enrollStudent);
router.get('/getcoursestudents', getEnrolledCourses);
export default router