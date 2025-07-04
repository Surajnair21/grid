import { Request, Response } from 'express';
import prisma from '../db';

export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
};

export const getCourseById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        include: {
          videos: true
        }
      }
    }
  });
  res.json(course);
};
