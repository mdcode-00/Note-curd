import Note from '../models/notes.model.js';


export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    // const exestingNote = await Note.findOne({ title });
    // if (exestingNote) {
    //   return res.status(409).json({ message: 'Note with this title already exists' });
    // }

    const newNote = new Note({ title, content });
    newNote.save();

    res.status(201).json({ message: 'note added successfully' }, newNote);

  } catch (error) {
    console.log('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params._id;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log('Error fetching note by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params._id;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(noteId, { $set: { title, content } }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully', updatedNote });
  } catch (error) {
    console.log('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params._id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.log("error in deleting", error);
    res.status(500).json({ message: 'Internal server error' });
  }

}