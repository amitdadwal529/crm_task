import { addProduct, deleteProduct, getProductDetail, getProducts, updateProduct } from "@redux/thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";
import { showErrorToast, showSuccessToast } from "@utils/utils";
import { toast } from "react-toastify";




export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        error:null,
        loading:false,
        success:false,
        productInfo:{},
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
            state.error = null;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            if(action.payload.code == 200){
                state.productlist = action.payload?.data;
                state.loading = false;
                state.error = null;
            }else{
                toast.error(action.payload.message);
            }
           
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        // add product
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addProduct.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.error = null;
                toast.success();
                showSuccessToast("Product added")
           
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
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
                state.error = null;
                showSuccessToast("Product updated")
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            showErrorToast("Something went wrong!")
        })

        // delete product
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = null;
                toast.success(action.payload.message);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        // get product details
        .addCase(getProductDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductDetail.fulfilled, (state, action) => {
            
                state.productInfo = action.payload;
                state.loading = false;
                state.error = null;
            
           
        })
        .addCase(getProductDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

    }
})

export const {addProductInfo} = productSlice.actions

export default productSlice.reducer