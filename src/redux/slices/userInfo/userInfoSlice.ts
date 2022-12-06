import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  aerobicTrainingCategrory,
  purposeCategory,
  weightTrainingCategrory,
} from "~/constants/constants";

export interface userInfoState {
  userInfo: {
    gender: string;
    age: string;
    height: string;
    weight: string;
    dietPurposecd: string;
    bmr: string;
    weightTimeCd: string;
    aerobicTimeCd: string;
  };
}

const initialState: userInfoState = {
  userInfo: {
    gender: "M",
    age: "",
    height: "",
    weight: "",
    dietPurposecd: purposeCategory[0].value,
    bmr: "",
    weightTimeCd: weightTrainingCategrory[0].value,
    aerobicTimeCd: aerobicTrainingCategrory[0].value,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    saveUserInfo: (
      state,
      action: PayloadAction<{
        gender?: string;
        age?: string;
        height?: string;
        weight?: string;
        dietPurposecd?: string;
        bmr?: string;
        weightTimeCd?: string;
        aerobicTimeCd?: string;
      }>
    ) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { saveUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
