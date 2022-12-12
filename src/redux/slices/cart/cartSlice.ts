import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProductIndex, hasProduct } from "~/util/reduxUtil";

export interface IProduct {
  // productNo: string;
  // platformNm: string;
  // itemReportNo: string;
  // categoryNm: string;
  // subCategoryNm: string;
  // productNm: string;
  // calorie: string;
  // sodium: string;
  // carb: string;
  // sugar: string;
  // fiber: string;
  // protein: string;
  // fat: string;
  // cholesterol: string;
  // transFat: string;
  // saturatedFat: string;
  // price: string;
  // minQty: string;
  // shippingPrice: string;
  // freeShippingPrice: string;
  // freeShippingYn: string;
  // mainAttUrl: string;
  // subAttUrl: string;
  [key: string]: string;
}
// cart -> menu -> product
export interface ICartState {
  cart: Array<Array<IProduct>>;
}

const initialState: ICartState = {
  cart: [[]],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

export const { addProductToMenu, deleteProduct, addMenuToCart, deleteMenu } =
  cartSlice.actions;
export default cartSlice.reducer;
