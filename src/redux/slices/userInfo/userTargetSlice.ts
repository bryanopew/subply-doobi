import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userTargetState {
  userTarget: {
    tmr: string;
    calculationMethod: string;
    calorie: string;
    carb: string;
    protein: string;
    fat: string;
  };
}

const initialState: userTargetState = {
  userTarget: {
    tmr: "",
    calculationMethod: "",
    calorie: "",
    carb: "",
    protein: "",
    fat: "",
  },
};

export const userTargetSlice = createSlice({
  name: "userTarget",
  initialState,
  reducers: {
    saveUserTarget: (
      state,
      action: PayloadAction<{
        tmr: string;
        calculationMethod: string;
        calorie: string;
        carb: string;
        protein: string;
        fat: string;
      }>
    ) => {
      state.userTarget = action.payload;
    },
  },
});

export const { saveUserTarget } = userTargetSlice.actions;
export default userTargetSlice.reducer;
