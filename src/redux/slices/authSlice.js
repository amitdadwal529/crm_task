import { login } from '@redux/thunk/authThunk';
import { createSlice } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from '@utils/utils';
import { toast } from 'react-toastify';

const initialState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  token: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  myDetails: JSON.parse(localStorage.getItem('user')) || {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      // Login
      .addCase(login?.pending, (state) => {
        state.loading = true;
      })
      .addCase(login?.fulfilled, (state, action) => {
        const payload = action.payload;

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

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(userDetails));

          showSuccessToast("Login successful");
        }
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        showErrorToast("Login failed!!");
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
