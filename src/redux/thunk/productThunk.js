//  createAsyncThunk to define asynchronous thunk actions
import { createAsyncThunk } from "@reduxjs/toolkit";
//  product-related API calls from the service layer
import productService from "@services/productService";

// Thunk to fetch all products with optional query parameters (e.g., pagination, filters)
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts(queryParams);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk to add a new product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.addProduct(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk to update an existing product using its ID and new data
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProduct(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk to delete a product by its ID
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProduct(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Thunk to get detailed information of a single product by its ID
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductDetail(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
