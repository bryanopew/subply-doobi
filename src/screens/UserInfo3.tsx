import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { Container, TextMain } from "~/styles/styledConsts";
import styled from "styled-components/native";

const Title = styled(TextMain)`
  font-size: 24px;
  font-weight: bold;
`;

const UserInfo3 = () => {
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );
  console.log(userInfo);
  console.log(userTarget);

  return (
    <Container>
      <Text>UserInfo3</Text>
    </Container>
  );
};

export default UserInfo3;
