import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  aerobicTrainingCategrory,
  purposeCategory,
  weightTrainingCategrory,
} from "~/constants/constants";

export interface IUserInfo {
  nickname: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  dietPurposecd: string;
  bmr: string;
  weightTimeCd: string;
  aerobicTimeCd: string;
}

export interface IUserTarget {
  [key: string]: string;
  tmr: string;
  calorie: string;
  carb: string;
  protein: string;
  fat: string;
}

export interface userInfoState {
  userInfo: IUserInfo;
  userTarget: IUserTarget;
}

const initialState: userInfoState = {
  userInfo: {
    nickname: "",
    gender: "M",
    age: "",
    height: "",
    weight: "",
    dietPurposecd: purposeCategory[0].value,
    bmr: "",
    weightTimeCd: weightTrainingCategrory[0].value,
    aerobicTimeCd: aerobicTrainingCategrory[0].value,
  },
  userTarget: {
    tmr: "",
    calorie: "",
    carb: "",
    protein: "",
    fat: "",
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
    saveUserTarget: (
      state,
      action: PayloadAction<{
        tmr?: string;
        calorie?: string;
        carb?: string;
        protein?: string;
        fat?: string;
      }>
    ) => {
      state.userTarget = { ...state.userTarget, ...action.payload };
    },
  },
});

export const { saveUserInfo, saveUserTarget } = userInfoSlice.actions;
export default userInfoSlice.reducer;
