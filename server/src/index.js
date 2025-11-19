import express from 'express';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes.routes.js';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
connectDB();

app.use('/api/notes', notesRoutes);


export default app