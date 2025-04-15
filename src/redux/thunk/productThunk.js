//  createAsyncThunk to define asynchronous thunk actions
import { createAsyncThunk } from "@reduxjs/toolkit";
//  product-related API calls from the service layer
import productService from "@services/productService";
import { loadProductsFromLocalStorage, saveProductsToLocalStorage } from "@utils/productUtils";

// Thunk to fetch all products with optional query parameters (e.g., pagination, filters)
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      // First check localStorage
      const localProducts = loadProductsFromLocalStorage();

      if (localProducts && localProducts.length > 0) {
        return {
          products: localProducts,
          total: localProducts.length
        };
      }

      // Fallback to API only if localStorage is empty
      const response = await productService.getAllProducts();
      saveProductsToLocalStorage(response.products);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Thunk to add a new product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await productService.addProduct(data);

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const dataToSave = {id: parseInt(existingProducts?.length +1), ...data};
      const updatedProducts = [dataToSave, ...existingProducts];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to add product");
    }
  }
);


// Thunk to update an existing product using its ID and new data
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const dataToSave = {id:parseInt(id), ...data};
       await productService.updateProduct(id, data);

      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = existingProducts.map((p) => (parseInt(p.id) === parseInt(id) ? dataToSave : p));
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return dataToSave;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to update product");
    }
  }
);


// Thunk to delete a product by its ID
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct();

      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = existingProducts.filter((p) => parseInt(p.id) !== parseInt(id));
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to delete product");
    }
  }
);


// Thunk to get detailed information of a single product by its ID
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      // Check localStorage first
      const products = JSON.parse(localStorage.getItem("products")) || [];
      console.log(products);
      console.log(typeof(id));
      const product = products.find((p) => p.id == id);
      if (product) {
        // If the product is found in localStorage, return it
        return product;
      }

      // If not found in localStorage, fall back to the API call
      await productService.getProductDetail(id);
      return product;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch product details");
    }
  }
);

