import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProductIndex, hasProduct } from "~/util/reduxUtil";
import { IProduct } from "~/constants/constants";

// cart -> menu -> product
export interface ICartState {
  menuIndex: number;
  cart: Array<Array<IProduct>>;
}

const initialState: ICartState = {
  menuIndex: 0,
  cart: [[]],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMenuIndex: (state, action: PayloadAction<number>) => {
      state.menuIndex = action.payload;
    },
    addProductToMenu: (
      state,
      action: PayloadAction<{
        menuIndex: number;
        product: IProduct;
      }>
    ) => {
      const { menuIndex, product } = action.payload;
      hasProduct(state.cart[menuIndex], product.productNo) ||
        state.cart[menuIndex].push(product);
    },
    deleteProduct: (
      state,
      action: PayloadAction<{
        menuIndex: number;
        productNo: string;
      }>
    ) => {
      const { menuIndex, productNo } = action.payload;
      if (hasProduct(state.cart[menuIndex], productNo)) {
        const productIndex = getProductIndex(state.cart[menuIndex], productNo);
        console.log("deleteProduct: index:", productIndex);
        state.cart[menuIndex].splice(productIndex, 1);
      }
    },
    addMenuToCart: (state) => {
      state.cart = [...state.cart, []];
    },
    deleteMenu: (state, action: PayloadAction<number>) => {
      state.cart.splice(action.payload, 1);
    },
  },
});

export const {
  setMenuIndex,
  addProductToMenu,
  deleteProduct,
  addMenuToCart,
  deleteMenu,
} = cartSlice.actions;
export default cartSlice.reducer;
