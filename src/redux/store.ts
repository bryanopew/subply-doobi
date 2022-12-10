import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "~/redux/slices/userInfo/userInfoSlice";
import cartReducer from "~/redux/slices/cart/cartSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
