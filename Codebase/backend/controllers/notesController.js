// src/controllers/notesController.js
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../models/note.js';

// GET /notes
export const getNotes = (req, res) => {
    const notes = getAllNotes();
    res.json(notes);
};

// GET /notes/:id
export const getNote = (req, res) => {
    const note = getNoteById(parseInt(req.params.id, 10));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
};

// POST /notes
export const createNewNote = (req, res) => {
    const { title, content } = req.body;
    const newNote = createNote(title, content);
    res.status(201).json(newNote);
};

// PUT /notes/:id
export const updateExistingNote = (req, res) => {
    const { title, content } = req.body;
    const updatedNote = updateNote(parseInt(req.params.id, 10), title, content);
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.json(updatedNote);
};

// DELETE /notes/:id
export const deleteExistingNote = (req, res) => {
    const success = deleteNote(parseInt(req.params.id, 10));
    if (!success) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
};