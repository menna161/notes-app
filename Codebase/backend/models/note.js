let notes = [];
let idCounter = 1;

export const getAllNotes = () => notes;

export const getNoteById = (id) => notes.find(note => note.id === id);

export const createNote = (title, content) => {
    const newNote = { id: idCounter++, title, content, createdAt: new Date(), updatedAt: new Date() };
    notes.push(newNote);
    return newNote;
};

export const updateNote = (id, title, content) => {
    const note = notes.find(note => note.id === id);
    if (note) {
        note.title = title;
        note.content = content;
        note.updatedAt = new Date();
    }
    return note;
};

export const deleteNote = (id) => {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        return true;
    }
    return false;
};