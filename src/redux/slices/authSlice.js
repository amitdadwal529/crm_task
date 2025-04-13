//  the login thunk
import { login } from '@redux/thunk/authThunk';
//  createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
// Utility functions to show toast notifications
import { showErrorToast, showSuccessToast } from '@utils/utils';
// Toast from react-toastify for logout info
import { toast } from 'react-toastify';

// Initial state of authentication slice
const initialState = {
  isAuthenticated: !!localStorage.getItem('accessToken'), 
  token: localStorage.getItem('accessToken') || null,   
  refreshToken: localStorage.getItem('refreshToken') || null, 
  myDetails: JSON.parse(localStorage.getItem('user')) || {}, 
  loading: false, 
};

// Creating the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout reducer: Clears all auth-related state and localStorage
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.myDetails = {};
      localStorage.clear();
      toast.info("You’ve been logged out.");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending state: Set loading to true
      .addCase(login?.pending, (state) => {
        state.loading = true;
      })

      // Login fulfilled: Set auth tokens and user info
      .addCase(login?.fulfilled, (state, action) => {
        const payload = action.payload;

        // If access token is present, update auth state
        if (payload.accessToken) {
          const {
            accessToken,
            refreshToken,
            ...userDetails
          } = payload;

          state.token = accessToken;
          state.refreshToken = refreshToken;
          state.myDetails = userDetails;
          state.isAuthenticated = true;
          state.loading = false;

          // Save auth data in local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(userDetails));

          showSuccessToast("Login successful");
        }
      })

      // Login rejected: Set loading to false and show error toast
      .addCase(login.rejected, (state) => {
        state.loading = false;
        showErrorToast("Login failed!!");
      });
  },
});

// Export logout action
export const { logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
