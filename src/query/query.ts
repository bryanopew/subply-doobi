import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TOKEN_CONTROLLER } from "./urls";

// doobi server------------------ //
// 카카오 토큰으로 DoobiToken 발급
export const getDoobiToken = async (kakaoAccessToken: string) => {
  try {
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
