import { useRef, useState } from 'react';
import { createNote } from '../api'; // ✅ import from api.js

function AddNote({ onClose }) {

  // Local state for title + content inputs
  const [data, setData] = useState({
    title: '',
    content: ''
  });

  // Submit handler for adding a new note
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data.title || !data.content) return;

      // Call API helper
      await createNote(data);

      console.log('Note added successfully', data);

      // Close modal after saving
      onClose();

    } catch (error) {
      console.log('Error adding note:', error);
    }
  };

  // Ref to detect clicks outside modal
  const modelRef = useRef();

  const closeModel = (e) => {
    if (e.target === modelRef.current) {
      onClose();
    }
  };

  return (
    <div
      onClick={closeModel}
      ref={modelRef}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
      <div className="mt-10 flex flex-col gap-4">

        {/* Close modal button */}
        <button className='place-self-end text-xl' onClick={onClose}>X</button>

        {/* Main card */}
        <div className="py-10 bg-neutral-950 rounded-xl px-10 shadow-lg flex flex-col gap-5 items-centermx-4">
          <h1 className='text-3xl font-extrabold '>Add a new note</h1>

          {/* Add Note Form */}
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder='Title'
              className='border border-black rounded-lg w-full p-2 mt-4 font-bold text-slate-900'
              required
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />

            <textarea
              placeholder='Content'
              rows={10}
              className='border border-black rounded-lg w-full p-2 mt-4 text-slate-900 font-semibold'
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />

            <button
              className='rounded-md text-neutral-100 border border-neutral-500 hover:bg-violet-800 hover:border-neutral-300 transition w-full mt-5 p-2 cursor-pointer'
            >
              Add Note
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AddNote;
