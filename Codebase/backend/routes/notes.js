// src/routes/notesRoutes.js
import express from 'express';
import { getNotes, getNote, createNewNote, updateExistingNote, deleteExistingNote } from '../controllers/notesController.js';

const router = express.Router();

// GET /notes
router.get('/', getNotes);

// GET /notes/:id
router.get('/:id', getNote);

// POST /notes
router.post('/', createNewNote);

// PUT /notes/:id
router.put('/:id', updateExistingNote);

// DELETE /notes/:id
router.delete('/:id', deleteExistingNote);

export default router;