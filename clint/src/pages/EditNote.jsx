import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNote } from '../api'; // ✅ use API helper

function EditNote() {

  const { _id } = useParams();
  const navigation = useNavigate();

  const [userData, setUserData] = useState({
    title: '',
    content: ''
  });

  // Fetch single note
  const fetchDataById = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/note/${_id}`);
      const data = await res.json();

      setUserData({
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.log('Error fetching note:', error);
    }
  };

  // Submit edit form
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await updateNote(_id, userData);  // ✅ API helper for PUT

      alert('Updated successfully!');
      navigation('/');

    } catch (error) {
      console.log('Error updating note:', error);
    }
  };

  // Click outside to close
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      navigation('/');
    }
  };

  // Fetch note on mount
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

        {/* Close btn */}
        <button className="place-self-end text-xl" onClick={() => navigation('/')}>X</button>

        {/* Edit card */}
        <div className="py-10 bg-neutral-950 rounded-xl px-10 shadow-lg flex flex-col gap-5 items-center mx-4">
          <h1 className="text-3xl font-extrabold text-white">Edit Note</h1>

          <form onSubmit={handleEdit}>
            <input
              type="text"
              placeholder="Title"
              className="border border-neutral-700 rounded-lg w-full p-2 mt-4 font-bold text-slate-900 bg-neutral-200"
              onChange={(e) =>
                setUserData({ ...userData, title: e.target.value })
              }
              value={userData.title}
            />

            <textarea
              placeholder="Content"
              rows={10}
              className="border border-neutral-700 rounded-lg w-full p-2 mt-4 text-slate-900 font-semibold bg-neutral-200"
              onChange={(e) =>
                setUserData({ ...userData, content: e.target.value })
              }
              value={userData.content}
            ></textarea>

            <button
              className="rounded-md text-neutral-100 border border-neutral-500 hover:bg-violet-800 hover:border-neutral-300 transition w-full mt-5 p-2 cursor-pointer"
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
