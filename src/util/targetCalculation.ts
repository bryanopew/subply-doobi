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

interface ITimeToMinutes {
  [key: string]: number;
}
const timeCdToMinutes: ITimeToMinutes = {
  SP003001: 0,
  SP003002: 30,
  SP003003: 60,
  SP003004: 90,
  SP003005: 120,
  SP004001: 0,
  SP004002: 30,
  SP004003: 60,
  SP004004: 90,
  SP004005: 120,
};

/** bmr, weightTimeCd, aerobicTimeCd => TMR */
export const calculateTarget = (
  weight: string,
  weightTimeCd: string,
  aerobicTimeCd: string,
  BMR: string
) => {
  const wcal = 0.0175 * 6 * parseFloat(weight) * timeCdToMinutes[weightTimeCd];
  const acal = 0.0175 * 7 * parseFloat(weight) * timeCdToMinutes[aerobicTimeCd];
  const AMR = wcal + acal + parseFloat(BMR) * 0.2;
  const TMR = Math.round(parseFloat(BMR) + AMR);
  return String(TMR);
};
