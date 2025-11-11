import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notes.controller.js';

const router = express.Router();

router.get('/', getAllNotes);
router.post('/create', createNote);
router.get('/note/:_id', getNoteById);
router.put('/update/:_id', updateNote);
router.delete('/delete/:_id', deleteNote);




export default router;