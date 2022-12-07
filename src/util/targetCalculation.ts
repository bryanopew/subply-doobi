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

  return {
    TMR: Math.round(TMR),
    calorieTarget: Math.round(calorieTarget),
    carbTarget: Math.round(carbTarget),
    proteinTarget: Math.round(proteinTarget),
    fatTarget: Math.round(fatTarget),
  };
};

// export const calculateNutrTarget = (TMR: string) => {
//   const dailyCalorie = TMR;

//   return dailyCalorie;
// };
