import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService'; 
 
const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(userData); 
   
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const getMyDetails = createAsyncThunk("auth/getMyDetails", async (id, { rejectWithValue }) => {
   
  try {
      const response = await authService.getMyDetails(id);
      return response;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }

})

export default {
    login,
    getMyDetails
}
