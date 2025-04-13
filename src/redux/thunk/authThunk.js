import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService'; 
 
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData); 
   
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


