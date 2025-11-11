import express from 'express';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes.routes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});