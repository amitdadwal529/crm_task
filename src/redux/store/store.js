//  configureStore function from Redux Toolkit to set up the store
import { configureStore } from "@reduxjs/toolkit";
//  authReducer from the authSlice module
import authReducer from "@redux/slices/authSlice"
//  productReducer from the productSlice module
import productReducer from "@redux/slices/productSlice"

// Create a Redux store using configureStore
const store = configureStore({
    // Define the reducers for the store, associating slices of state with their corresponding reducers
    reducer: {
      auth: authReducer,   // auth state is managed by authReducer
      product: productReducer  // product state is managed by productReducer
    },
  });

// Export the store 
export default store;
