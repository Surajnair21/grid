import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET course by ID
app.get('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);

  prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          videos: true
        }
      }
    }
  }).then(course => {
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  }).catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
