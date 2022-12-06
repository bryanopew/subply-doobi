import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "~/redux/slices/userInfo/userInfoSlice";
import userTargetReducer from "~/redux/slices/userInfo/userTargetSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    userTargetReducer: userTargetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
