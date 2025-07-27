import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get all courses
function getCourses(req: Request, res: Response) {
  supabase.from('Course').select('*').then(({ data, error }) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });
}

// Get one course by ID with modules and videos
function getCourseById(req: Request, res: Response) {
  const { id } = req.params;

  supabase
    .from('Course')
    .select('*, Module(*, Video(*))')
    .eq('id', id)
    .single()
    .then(({ data, error }) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(data);
    });
}

// Create course
function createCourse(req: Request, res: Response) {
  const { title, instructor, category, image, rating, students, duration, description } = req.body;

  supabase
    .from('Course')
    .insert([{ title, instructor, category, image, rating, students, duration, description }])
    .then(({ data, error }) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json(data);
    });
}

// Create module
function createModule(req: Request, res: Response) {
  const { title, course_id } = req.body;

  supabase
    .from('Module')
    .insert([{ title, course_id }])
    .then(({ data, error }) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json(data);
    });
}

// Create video
function createVideo(req: Request, res: Response) {
  const { title, url, module_id } = req.body;

  supabase
    .from('Video')
    .insert([{ title, url, module_id }])
    .then(({ data, error }) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json(data);
    });
}

// Get modules for a course
function getModulesByCourseId(req: Request, res: Response) {
  const { courseId } = req.params;

  supabase
    .from('Module')
    .select('*')
    .eq('course_id', courseId)
    .then(({ data, error }) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(data);
    });
}

// Routes
app.get('/courses', getCourses);
app.get('/courses/:id', getCourseById);
app.post('/courses', createCourse);
app.post('/modules', createModule);
app.get('/modules/:courseId', getModulesByCourseId);
app.post('/videos', createVideo);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
