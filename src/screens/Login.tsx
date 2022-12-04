import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { BtnCTA, BtnText } from "~/styles/styledConsts";
import colors from "~/styles/colors";
import {
  KakaoOAuthToken,
  login,
  logout,
} from "@react-native-seoul/kakao-login";
import axios from "axios";
import { TOKEN_CONTROLLER } from "~/query/urls";
import {
  getDoobiToken,
  storeAccessToken,
  storeRefreshToken,
} from "~/query/query";

const Container = styled.View`
  flex: 1;
`;

const Box = styled.View`
  position: absolute;
  bottom: 70px;
  align-self: center;
`;

const TitleText = styled.Text`
  margin-bottom: 70px;
  color: ${colors.textMain};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
`;

const BtnKakaoLogin = styled(BtnCTA)`
  align-self: center;
`;

const BtnTextKakao = styled(BtnText)`
  color: ${colors.textMain};
`;

interface NavigationProps {
  navigation: {
    navigate: Function;
  };
}

const Login = ({ navigation: { navigate } }: NavigationProps) => {
  const signInWithKakao = async (): Promise<void> => {
    // TBD: 로그인 정보 있으면 바로 메인페이지로 이동시키기
    // TBD: ios 로그인 설정

    const token: KakaoOAuthToken = await login();
    const kakaoAccessToken = token.accessToken;
    // setResult(JSON.stringify(token));
    console.log("signInWithKakao: login start");
    const { accessToken, refreshToken } = await getDoobiToken(kakaoAccessToken);
    if (accessToken && refreshToken) {
      storeAccessToken(accessToken);
      storeRefreshToken(refreshToken);
      navigate("BottomTab", { screen: "Home" });
    } else {
      console.log("토큰발급 오류");
    }

    // 메인페이지 이동
  };
  return (
    <Container>
      <Box>
        <TitleText>{"식단조절은\n두비에게"}</TitleText>
        <BtnKakaoLogin btnStyle="kakao" onPress={signInWithKakao}>
          <BtnTextKakao>카카오 로그인</BtnTextKakao>
        </BtnKakaoLogin>
      </Box>
    </Container>
  );
};

export default Login;
