import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

const Home = () => {
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );
  console.log("Home: userInfo: ", userInfo);
  console.log("Home: userTarget: ", userTarget);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
