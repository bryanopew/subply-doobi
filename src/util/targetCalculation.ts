import { purposeCdToAddCalorie, timeCdToMinutes } from "~/constants/constants";

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

export const calculateManualCalorie = (
  carb: string,
  protein: string,
  fat: string
) => {
  const c = carb || "0";
  const p = protein || "0";
  const f = fat || "0";
  const totalCalorie = parseInt(c) * 4 + parseInt(p) * 4 + parseInt(f) * 9;
  const carbRatio =
    totalCalorie == 0
      ? "    "
      : Math.round(((parseFloat(c) * 4) / totalCalorie) * 100);
  const proteinRatio =
    totalCalorie == 0
      ? "    "
      : Math.round(((parseFloat(p) * 4) / totalCalorie) * 100);
  const fatRatio =
    totalCalorie == 0
      ? "    "
      : Math.round(((parseFloat(f) * 9) / totalCalorie) * 100);

  console.log(c, p, f, totalCalorie, carbRatio, proteinRatio, fatRatio);

  return {
    totalCalorie: String(totalCalorie),
    carbRatio: String(carbRatio),
    proteinRatio: String(proteinRatio),
    fatRatio: String(fatRatio),
  };
};
