import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPastes, updatePastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteid');
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("Inside use Effect");
    if (pasteId) {
      const paste = pastes.find((paste) => paste._id === pasteId);
      if (paste) {
        console.log("Paste Found");
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      // update paste
      dispatch(updatePastes(paste));
    } else {
      // create paste
      dispatch(addPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div>
        <input
          className='bg-black p-3 border-2 border-solid border-purple-400 m-3.5 rounded-lg'
          type="text"
          placeholder='Enter title here...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className='bg-purple-400' onClick={createPaste}>
          {pasteId ? "Update My paste" : "Create My paste"}
        </button>
      </div>
      <div>
        <textarea
          className='bg-black p-3 border-2 border-solid border-purple-400 m-3.5 rounded-lg'
          placeholder='Enter content here...'
          rows={10}
          cols={39}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;