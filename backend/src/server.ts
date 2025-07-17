import express, { RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// GET all courses
const getCourses: RequestHandler = async (req, res) => {
  const { data, error } = await supabase.from('Course').select('*');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
};

// ✅ GET course by ID with modules and videos
const getCourseById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Course')
    .select('*, Module(*, Video(*))') // nested fetch
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
};

app.get('/courses', getCourses);
app.get('/courses/:id', getCourseById);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
