import express from 'express';
import { getAllCourses, getCourseById } from '../controllers/courseController';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;
