import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@redux/slices/authSlice"
import productReducer from "@redux/slices/productSlice"

const store = configureStore({
    reducer: {
      auth: authReducer,
      product: productReducer
    },
  });

export default store;
