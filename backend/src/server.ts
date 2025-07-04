import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
