import { IProduct } from "~/constants/constants";

export const numberComma = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const sortBySeller = (cart: Array<Array<IProduct>>) => {};
