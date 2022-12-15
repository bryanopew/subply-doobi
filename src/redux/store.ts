import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "~/redux/slices/userInfo/userInfoSlice";
import cartReducer from "~/redux/slices/cart/cartSlice";
import likeReducer from "~/redux/slices/like/likeSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    cart: cartReducer,
    like: likeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
