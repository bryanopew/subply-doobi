import {
  purposeCdToAddCalorie,
  ratioCdToValue,
  timeCdToMinutes,
} from "~/constants/constants";

import { IProduct } from "~/redux/slices/cart/cartSlice";

/** gender, age, height, weight  => BMR */
export const calculateBMR = (
  gender: string,
  age: string,
  height: string,
  weight: string
) => {
  console.log("calculateBMR");

  if (gender === "M") {
    return String(
      (
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseFloat(age) +
        5
      ).toFixed()
    );
  } else if (gender === "F") {
    return String(
      (
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseFloat(age) -
        161
      ).toFixed()
    );
  } else return "";
};

/** bmr, weightTimeCd, aerobicTimeCd => TMR */
export const calculateNutrTarget = (
  weight: string,
  weightTimeCd: string,
  aerobicTimeCd: string,
  dietPurposecd: string,
  BMR: string
) => {
  const wcal = 0.0175 * 6 * parseFloat(weight) * timeCdToMinutes[weightTimeCd];
  const acal = 0.0175 * 7 * parseFloat(weight) * timeCdToMinutes[aerobicTimeCd];
  const AMR = wcal + acal + parseFloat(BMR) * 0.2;
  const TMR = parseFloat(BMR) + AMR;
  const calorieTarget =
    (TMR + parseInt(purposeCdToAddCalorie[dietPurposecd].additionalCalorie)) /
    3;
  const carbTarget = (calorieTarget * 0.55) / 4;
  const proteinTarget = (calorieTarget * 0.2) / 4;
  const fatTarget = (calorieTarget * 0.25) / 9;
  const calorieTargetPerMeal = calorieTarget;
  const carbTargetPerMeal = carbTarget;
  const proteinTargetPerMeal = proteinTarget;
  const fatTargetPerMeal = fatTarget;

  return {
    TMR: Math.round(TMR),
    calorieTarget: Math.round(calorieTargetPerMeal),
    carbTarget: Math.round(carbTargetPerMeal),
    proteinTarget: Math.round(proteinTargetPerMeal),
    fatTarget: Math.round(fatTargetPerMeal),
  };
};

export const calculateCaloriesToNutr = (ratioCd: string, calorie: string) => {
  const cal = calorie ? parseFloat(calorie) : 0;
  const c =
    cal === 0 ? 0 : (cal * parseFloat(ratioCdToValue[ratioCd].carbRatio)) / 4;
  const p =
    cal === 0
      ? 0
      : (cal * parseFloat(ratioCdToValue[ratioCd].proteinRatio)) / 4;
  const f =
    cal === 0 ? 0 : (cal * parseFloat(ratioCdToValue[ratioCd].fatRatio)) / 9;

  return {
    carb: String(Math.round(c)),
    protein: String(Math.round(p)),
    fat: String(Math.round(f)),
  };
};

export const calculateManualCalorie = (
  carb: string,
  protein: string,
  fat: string
) => {
  const c = carb ? parseFloat(carb) : 0;
  const p = protein ? parseFloat(protein) : 0;
  const f = fat ? parseFloat(fat) : 0;
  const totalCalorie = c * 4 + p * 4 + f * 9;
  const carbRatio =
    totalCalorie == 0 ? "    " : Math.round(((c * 4) / totalCalorie) * 100);
  const proteinRatio =
    totalCalorie == 0 ? "    " : Math.round(((p * 4) / totalCalorie) * 100);
  const fatRatio =
    totalCalorie == 0 ? "    " : Math.round(((f * 9) / totalCalorie) * 100);

  console.log(c, p, f, totalCalorie, carbRatio, proteinRatio, fatRatio);

  return {
    totalCalorie: String(totalCalorie),
    carbRatio: String(carbRatio),
    proteinRatio: String(proteinRatio),
    fatRatio: String(fatRatio),
  };
};

export const calculateCartNutr = (menu: Array<IProduct>) => {
  let calorie = 0;
  let carb = 0;
  let protein = 0;
  let fat = 0;
  if (menu) {
    menu.forEach((product) => {
      calorie += parseInt(product.calorie);
      carb += parseInt(product.carb);
      protein += parseInt(product.protein);
      fat += parseInt(product.fat);
    });
  }
  return {
    calorie,
    carb,
    protein,
    fat,
  };
};

// cart -> menu -> product
