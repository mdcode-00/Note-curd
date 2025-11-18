import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmptyNote from '../components/EmptyNote.jsx';

function AllNotes() {



  // State to store fetched notes
  const [userData, setUserData] = useState([]);

  // Fetch notes from backend API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes');

      if (!response.ok) {
        console.log('Failed to fetch notes');
        return;
      }

      const data = await response.json();
      setUserData(data);

    } catch (error) {
      console.log('Error fetching notes:', error);
    }
  };

  // Calling fetch function on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigation = useNavigate();

  // Navigate to edit page with note id
  const handleEdit = (_id) => {
    navigation(`/update-todo/${_id}`);
  };



  return (
    <div className="h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-6">
      
      {/* Condition: If no notes → show empty component */}
      {userData.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
          {userData.map((note, _id) => (
            <div
              key={_id}
              className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 h-[250px] flex flex-col"
            >

              {/* Note Details */}
              <div className="flex-grow">
                <h2 className="text-neutral-100 font-bold mb-3">*{note.title}</h2>
                <p className="text-neutral-400 text-sm overflow-y-auto max-h-28 no-scrollbar">
                  {note.content}
                </p>
              </div>

              {/* Actions: Edit  */}
              <div className="flex justify-between items-center pt-4 mt-3">
                <button
                  onClick={() => handleEdit(note._id)}
                  className="p-2 rounded-md text-neutral-100 border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-300 transition"
                >
                  Edit
                </button>

                <button
                  className="p-2 rounded-md text-neutral-100 border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-300 transition"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AllNotes;

