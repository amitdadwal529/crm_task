import { addProduct, deleteProduct, getProductDetail, getProducts, updateProduct } from "@redux/thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";
import { showErrorToast, showSuccessToast } from "@utils/utils";

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:false,
        success:false,
        productInfo:{},
        total:0,
      
    },
    reducers:{
        addProductInfo:(state,action)=>{
            state.productInfo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
                const payload = action.payload
                state.products = payload.products;
                state.loading = false;
                state.total =  payload.total;        
        })
        .addCase(getProducts.rejected, (state) => {
            state.loading = false;
            showErrorToast("Something went wrong!")
        })

        // add product
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                showSuccessToast("Product added")
        })
        .addCase(addProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!")

        })
        // update product
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                showSuccessToast("Product updated")
        })
        .addCase(updateProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!")
        })

        // delete product
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                showSuccessToast("Product deleted")
        })
        .addCase(deleteProduct.rejected, (state) => {
            state.success = false;
            state.loading = false;
            showErrorToast("Something went wrong!")
        })
        // get product details
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
            showErrorToast("Something went wrong!")
        })

    }
})

export const {addProductInfo} = productSlice.actions

export default productSlice.reducer