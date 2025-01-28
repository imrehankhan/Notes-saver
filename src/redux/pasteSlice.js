//Get Boilerplate code from https://redux-toolkit.js.org/tutorials/quick-start

import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPastes: (state,action) => {
      const paste = action.payload
        state.pastes.push(paste)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste created successfully')
    },
    updatePastes: (state, action) => {
        const updatedPaste = action.payload;
        const index = state.pastes.findIndex(paste => paste._id === updatedPaste._id);
        if (index >= 0) {
          state.pastes[index] = updatedPaste;
          localStorage.setItem('pastes', JSON.stringify(state.pastes));
          toast.success('Paste updated successfully');
        }
      },
      resetPastes: (state,action) => {
        state.pastes = [];
        localStorage.removeItem('pastes');
        toast.success('All pastes reset successfully');
      },
      removePastes: (state, action) => {
        const pasteId = action.payload;
        state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste removed successfully');
      },
  },
})

// Action creators are generated for each case reducer function
export const { addPastes, updatePastes, resetPastes, removePastes } = pasteSlice.actions

export default pasteSlice.reducer