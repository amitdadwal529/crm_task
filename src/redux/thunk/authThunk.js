// redux/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authServices'; 

export const login = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(userData); 
   
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const getMyDetails = createAsyncThunk("auth/getMyDetails", async (id, { rejectWithValue }) => {
   
  try {
      const response = await authService.getMyDetails(id);
      return response;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }

})
