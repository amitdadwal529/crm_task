// product thunks
import { addProduct, deleteProduct, getProductDetail, getProducts, updateProduct } from "@redux/thunk/productThunk";
// createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// toast utility functions
import { showErrorToast, showSuccessToast } from "@utils/utils";

// Creating the product slice
export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],         
        loading: false,      
        success: false,       
        productInfo: {},     
        total: 0,            
    },
    extraReducers: (builder) => {
        builder
        // Get all products
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            const payload = action.payload;
            state.products = payload.products;
            state.total = payload.total;
            state.loading = false;
        })
        .addCase(getProducts.rejected, (state) => {
            state.loading = false;
            showErrorToast("Something went wrong!");
        })

        // Add new product
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.fulfilled, (state) => {
            state.success = true;
            state.loading = false;
            showSuccessToast("Product added");
        })
        .addCase(addProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!");
        })

        // Update product
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state) => {
            state.success = true;
            state.loading = false;
            showSuccessToast("Product updated");
        })
        .addCase(updateProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!");
        })

        // Delete product
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state) => {
            state.success = true;
            state.loading = false;
            showSuccessToast("Product deleted");
        })
        .addCase(deleteProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!");
        })

        // Get details of a single product
        .addCase(getProductDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductDetail.fulfilled, (state, action) => {
            state.productInfo = action.payload;
            state.loading = false;
        })
        .addCase(getProductDetail.rejected, (state) => {
            state.loading = false;
            showErrorToast("Something went wrong!");
        });
    }
});

// Export reducer to be used in the store
export default productSlice.reducer;
