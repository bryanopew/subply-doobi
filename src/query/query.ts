import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PRODUCT_LIST, TOKEN_CONTROLLER } from "./urls";

// doobi server------------------ //
// 카카오 토큰으로 DoobiToken 발급
export const getDoobiToken = async (kakaoAccessToken: string) => {
  try {
    console.log("getDoobiToken!");
    const result = await axios.get(`${TOKEN_CONTROLLER}/${kakaoAccessToken}`);
    console.log(result.status);
    return result?.status === 200 ? result.data : undefined;
  } catch (e) {
    console.log("getDoobiToken: ", e);
  }
};

// async ------------------------ //
// accessToken, refreshToken 저장
export const storeAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
    console.log("storeAccessToken : ", accessToken);
  } catch (e) {
    console.log(e);
  }
};
export const storeRefreshToken = async (refreshToken: string) => {
  try {
    await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
    console.log("storeRefreshToken : ", refreshToken);
  } catch (e) {
    console.log(e);
  }
};

// AsyncStorage
export const getToken = async () => {
  let token = await AsyncStorage.getItem("ACCESS_TOKEN");
  console.log("getToken: ", token);
  return token;
};
export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");
  console.log("getToken: ", refreshToken);
  return refreshToken;
};

// test data
export const getTestData = async () => {
  try {
    const token = await getToken();
    console.log("getTestData: ", token);
    const res = await axios.get(
      `${PRODUCT_LIST}?searchText=도시락&categoryCd=&sort`,
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );
    return res.data.slice(0, 10);
  } catch (e) {
    console.log("getTestData error: ", e);
  }
};
