import { updateExistingNote } from './notesController';
import { updateNote } from '../models/note';

jest.mock('../models/note');

describe('notesController', () => {
  describe('updateExistingNote', () => {
    it('should update an existing note and return the updated note', () => {
      const req = {
        params: { id: '1' },
        body: { title: 'Updated Title', content: 'Updated Content' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const updatedNote = { id: '1', title: 'Updated Title', content: 'Updated Content' };
      updateNote.mockReturnValueOnce(updatedNote);

      updateExistingNote(req, res);

      expect(updateNote).toHaveBeenCalledWith(1, 'Updated Title', 'Updated Content');
      expect(res.json).toHaveBeenCalledWith(updatedNote);
    });

    it('should return a 404 error if the note is not found', () => {
      const req = {
        params: { id: '1' },
        body: { title: 'Updated Title', content: 'Updated Content' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      updateNote.mockReturnValueOnce(null);

      updateExistingNote(req, res);

      expect(updateNote).toHaveBeenCalledWith(1, 'Updated Title', 'Updated Content');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Note not found' });
    });
  });
});