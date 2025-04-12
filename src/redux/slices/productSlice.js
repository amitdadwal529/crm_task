import productThunk from "@redux/thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";
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
        .addCase(productThunk.getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(productThunk.getProducts.fulfilled, (state, action) => {
            if(action.payload.code == 200){
                state.productlist = action.payload?.data;
                state.loading = false;
                state.error = null;
            }else{
                toast.error(action.payload.message);
            }
           
        })
        .addCase(productThunk.getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        // add product
        .addCase(productThunk.addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(productThunk.addProduct.fulfilled, (state, action) => {
        
            if(action.payload.success == true){
                state.success = true;
                state.loading = false;
                state.error = null;
                toast.success(action.payload.message);
            }else{
                toast.error(action.payload.message);
            }
           
        })
        .addCase(productThunk.addProduct.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        // delete product
        .addCase(productThunk.deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(productThunk.deleteProduct.fulfilled, (state, action) => {
        
            if(action.payload.success == true){
                state.success = true;
                state.loading = false;
                state.error = null;
                toast.success(action.payload.message);
            }else{
                toast.error(action.payload.message);
            }
           
        })
        .addCase(productThunk.deleteProduct.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        // get product details
        .addCase(productThunk.getProductDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(productThunk.getProductDetail.fulfilled, (state, action) => {
            if(action.payload.code == 200){
                state.productInfo = action.payload?.data;
                state.loading = false;
                state.error = null;
            }else{
                toast.error(action.payload.message);
            }
           
        })
        .addCase(productThunk.getProductDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

    }
})

export const {addProductInfo} = productSlice.actions

export default productSlice.reducer