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
import { storeKakaoAccessToken } from "~/query/query";
import { NavigationProps } from "~/constants/constants";

const Container = styled.View`
  flex: 1;
  padding: 0px 16px 0px 16px;
`;

const Box = styled.View`
  width: 100%;
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
  text-align: center;
`;

const BtnKakaoLogin = styled(BtnCTA)`
  align-self: center;
`;

const BtnTextKakao = styled(BtnText)`
  color: ${colors.textMain};
`;

const Login = ({ navigation: { navigate } }: NavigationProps) => {
  // 실제 로그인. 테스트때만 주석처리
  const signInWithKakao = async (): Promise<void> => {
    // TBD: 로그인 정보 있으면 바로 메인페이지로 이동시키기
    // TBD: ios 로그인 설정

    const token: KakaoOAuthToken = await login();
    const kakaoAccessToken = token.accessToken;

    console.log("signInWithKakao: login!");
    console.log(kakaoAccessToken);
    await storeKakaoAccessToken(kakaoAccessToken);
    if (kakaoAccessToken) {
      navigate("Stacks", { screen: "UserInfo1" });
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
          {/* <BtnKakaoLogin
          btnStyle="kakao"
          onPress={() => navigate("Stacks", { screen: "UserInfo1" })}
        > */}
          <BtnTextKakao>카카오 로그인</BtnTextKakao>
        </BtnKakaoLogin>
      </Box>
    </Container>
  );
};

export default Login;
