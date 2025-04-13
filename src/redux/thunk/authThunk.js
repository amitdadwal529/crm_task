//  createAsyncThunk to define an asynchronous thunk action
import { createAsyncThunk } from '@reduxjs/toolkit';

//  the auth service which contains the API call
import authService from '@services/authService'; 
 
//  an async thunk for user login
export const login = createAsyncThunk(
  'auth/login', // Action type
  async (userData, { rejectWithValue }) => {
    try {
      // login API with user data
      const response = await authService.login(userData); 
   
      // response data if successful
      return response;
    } catch (error) {
      // error message if the request fails
      return rejectWithValue(error.response.data.message);
    }
  }
);
