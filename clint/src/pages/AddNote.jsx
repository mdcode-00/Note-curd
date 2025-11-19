import { useRef, useState } from 'react'

function AddNote({ onClose }) {

  // API endpoint for creating a new note
  const API = 'http://localhost:3000/api/notes/create';

  // Local state for title + content inputs
  const [data, setData] = useState({
    title: '',
    content: ''
  });

  // Submit handler for adding a new note
  const handleOnSubmit = (e) => {
    e.preventDefault();

    try {
      // Basic validation (both fields required)
      if (!data.title || !data.content) {
        return;
      }

      // Send POST request to backend API
      fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log('Note added successfully', data);

      // Close modal after saving
      onClose();

    } catch (error) {
      console.log('Error adding note:', error);
    }
  };

  // Ref to detect clicks outside modal
  const modelRef = useRef();

  // Close modal if clicked outside the card
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
        <button className='place-self-end text-xl rounded-full p-2 bg-red-600 text-white' onClick={onClose}>X</button>

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

            {/* Submit Button */}
            <button 
              className='rounded-md text-neutral-100 border border-neutral-500 hover:bg-violet-800 hover:border-neutral-300 transition w-full mt-5 p-2'
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
