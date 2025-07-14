// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.createMany({
    data: [
      {
        title: 'Web Development Bootcamp',
        instructor: 'Angela Yu',
        rating: 4.8,
        students: 15420,
        duration: '52 hours',
        category: 'Programming',
        description: 'Learn HTML, CSS, JavaScript, React and Node.js from scratch.'
      },
      {
        title: 'UI/UX Design Masterclass',
        instructor: 'Sarah Johnson',
        rating: 4.9,
        students: 9800,
        duration: '38 hours',
        category: 'Design',
        description: 'Design beautiful and user-friendly websites and apps.'
      },
      {
        title: 'Machine Learning A-Z',
        instructor: 'Andrew Ng',
        rating: 4.9,
        students: 21200,
        duration: '40 hours',
        category: 'AI & ML',
        description: 'Hands-on Python and R for machine learning algorithms.'
      }
    ]
  });
  console.log('🌱 Seed data inserted');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
