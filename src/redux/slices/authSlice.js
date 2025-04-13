import { login, getMyDetails } from '@redux/thunk/authThunk';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  token: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  myDetails: JSON.parse(localStorage.getItem('user')) || {},
  error: null,
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
        state.error = null;
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

          toast.success("Login successful");
        } else {
          state.error = payload.message || "Login failed";
          toast.error(state.error);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get My Details
      .addCase(getMyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyDetails.fulfilled, (state, action) => {
        if (action.payload.code === 200) {
          state.myDetails = action.payload.data;
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(getMyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
