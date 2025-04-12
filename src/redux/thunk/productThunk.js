import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "@services/productService";


 const getProducts =  createAsyncThunk("product/getProducts", async (url, { rejectWithValue }) => {

    try {
        const response = await productService.getAllProducts(url);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})


 const addProduct =  createAsyncThunk("product/addProduct", async (data, { rejectWithValue }) => {

    try {
        const response = await productService.addProduct(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

 const updateProduct =  createAsyncThunk("product/updateProduct", async (data, { rejectWithValue }) => {

    try {
        const response = await productService.updateProduct(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

 const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue }) => {
   
    try {
        const response  = await productService.deleteProduct(id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    
    }
})

 const getProductDetail = createAsyncThunk("product/getProductDetail", async (id, { rejectWithValue }) => {
    try {
        const response  = await productService.getProductDetail(id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    
    }
})

export default {
    getProducts, addProduct, updateProduct, deleteProduct, getProductDetail
}
