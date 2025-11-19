import  { useEffect, useRef, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';

function EditNote() {

  // Get note ID from route parameters
  const { _id } = useParams();

  // State for storing note details (title + content)
  const [userData, setUserData] = useState({
    title: '',
    content: ''
  });

  // Fetch a single note by id
  const fetchDataById = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/note/${_id}`);
      if (!response.ok) {
        console.log('Failed to fetch note details');
        return;
      }

      const data = await response.json();
      // Populate input fields with existing note data
      setUserData({ title: data.title, content: data.content });

    } catch (error) {
      console.log('Error fetching note details:', error);
    }
  };

  // Update note handler
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/notes/update/${_id}`, {
        method: 'Put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        console.log('Failed to update note');
        return;
      }

      alert("updated");
      navigation('/');  // Redirect back home

    } catch (error) {
      console.log('error in updating data', error);
    }
  };

  const navigation = useNavigate();

  // Ref for detecting outside click
  const modalRef = useRef();

  // Close modal on clicking outside the card
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      navigation('/');
    }
  };

  // Fetch selected note on component mount
  useEffect(() => {
    fetchDataById();
  }, [_id]);

  return (
    <div 
      ref={modalRef}
      onClick={closeModal}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >

      <div className="mt-10 flex flex-col gap-4">

        {/* Close button */}
        <button className="place-self-end text-xl" onClick={() => navigation('/')}>X</button>

        {/* Main Edit Card */}
        <div className="py-10 bg-neutral-950 rounded-xl px-10 shadow-lg flex flex-col gap-5 items-center mx-4">
          <h1 className="text-3xl font-extrabold text-white">Edit Note</h1>

          {/* Edit Form */}
          <form onSubmit={handleEdit}>
            <input
              type="text"
              placeholder="Title"
              className="border border-neutral-700 rounded-lg w-full p-2 mt-4 font-bold text-slate-900 bg-neutral-200"
              onChange={(e) => setUserData({ ...userData, title: e.target.value })}
              value={userData.title}
            />

            <textarea
              placeholder="Content"
              rows={10}
              className="border border-neutral-700 rounded-lg w-full p-2 mt-4 text-slate-900 font-semibold bg-neutral-200"
              onChange={(e) => setUserData({ ...userData, content: e.target.value })}
              value={userData.content}
            ></textarea>

            {/* Save button */}
            <button
              className="rounded-md text-neutral-100 border border-neutral-500 hover:bg-violet-800 hover:border-neutral-300 transition w-full mt-5 p-2"
            >
              Save Changes
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}

export default EditNote;












