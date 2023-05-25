import { createSlice } from "@reduxjs/toolkit";
import { fetchProductList } from "../../services/inventory/InventoryProductService";

const initialState = {
  productList: {
    status: "idle",
    data: [],
  },
};

export const InventoryProductSlice = createSlice({
  name: "inventoryProduct",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("action payload", action.payload.data.result);
      state.productList.data.push(action.payload.data.result);
    },
    updateProduct: (state, action) => {
      console.log("efefef", action.payload.data.result);
      const updatedCompany = action.payload.data.result;
      const updatedProduct = state.productList.data.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      state.productList.data = updatedProduct;
    },
    removeProduct: (state, action) => {
      const updatedProduct = state.productList.data.filter(
        (company) => company.id !== action.payload
      );
      state.productList.data = updatedProduct;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.productList.status = "loading";
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.productList.status = "succeeded";
        state.productList.data = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        console.log("rejected", action.error);
        state.productList.status = "failed";
      });
  },
});

export default InventoryProductSlice.reducer;

export const { addProduct, updateProduct, removeProduct } = InventoryProductSlice.actions;

export const getProductList = (state) => state.inventoryProduct.productList;
