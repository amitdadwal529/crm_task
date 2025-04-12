// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import authThunk from '@redux/thunk/authThunk';
import { toast } from 'react-toastify';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: null,
    error: null,
    loading: false,
    myDetails:[],
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');     
    },
    login:(state,action)=>{
      if(action.payload.code === 200){
        state.isAuthenticated = true;
        state.token = action.payload.data.accessToken;
        localStorage.setItem('token', action.payload);       
        toast.success(action.payload);
      }else{
        toast.error(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(authThunk.login.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(authThunk.login.fulfilled, (state) => {
        state.loading = false;
      
        })
      .addCase(authThunk.login.rejected, (state, action) => {
      
        state.loading = false;
        state.error = action.payload;
       
      })


       //   get my details
       .addCase(authThunk.getMyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(authThunk.getMyDetails.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.myDetails = action.payload?.data;
          state.loading = false;
          state.error = null;
        } else {
          toast.error(action.payload.message);
        }
      })

      .addCase(authThunk.getMyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { logout,login} = authSlice.actions;
export default authSlice.reducer;
