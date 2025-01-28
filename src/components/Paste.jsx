import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePastes } from '../redux/pasteSlice';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Get the day (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
    const year = date.getFullYear(); // Get the full year
    return `${day} ${month} ${year}`; // Format: "25 October 2023"
  };

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removePastes(pasteId));
  }

  return (
    <div>
      <input
        className='bg-black p-3 border-2 border-solid border-purple-400 m-3.5 rounded-lg'
        placeholder='Search Here...'
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col mt-5 gap-5'>
        {filteredData.map((paste) => (
          <div key={paste?._id} className='bg-black p-3 m-3.5 rounded-lg min-w-xl'>
            <h1 className='text-white'>{paste.title}</h1>
            <p className='text-white'>{paste.content}</p>
            <div className='flex gap-4 place-content-evenly'>
              {/* <button> */}
                <Link to={`/?pasteid=${paste?._id}`}>Edit</Link>
              {/* </button> */}
              {/* <button>
                <Link to={`/pastes/${paste?._id}`}>View</Link>
              </button> */}
              <button onClick={() => handleDelete(paste?._id)}>Delete</button>
            </div>
            <div className='text-white'>{formatDate(paste.createdAt)}</div> {/* Formatted date */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;