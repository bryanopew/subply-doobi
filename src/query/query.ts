import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PRODUCT_LIST, TOKEN_CONTROLLER } from "./urls";

// doobi server------------------ //
// 카카오 토큰으로 DoobiToken 발급
export const getDoobiToken = async (kakaoAccessToken: string | null) => {
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
// kakaoToken 저장

export const storeKakaoAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem("KAKAO_ACCESS_TOKEN", accessToken);
    console.log("storeKakaoToken : ", accessToken);
  } catch (e) {
    console.log(e);
  }
};

// AsyncStorage
export const getKakaoToken = async () => {
  let token = await AsyncStorage.getItem("KAKAO_ACCESS_TOKEN");
  console.log("getToken: ", token);
  return token;
};

// test data
export const getTestData = async () => {
  try {
    const { accessToken, refreshToken } = await getKakaoToken().then(
      (kakaoAccessToken) => getDoobiToken(kakaoAccessToken)
    );
    const res = await axios.get(
      `${PRODUCT_LIST}?searchText=도시락&categoryCd=&sort`,
      {
        headers: {
          authentication: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data.slice(0, 10);
  } catch (e) {
    console.log("getTestData error: ", e);
  }
};
