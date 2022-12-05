import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "~/screens/Login";
import UserInfo1 from "~/screens/UserInfo1";
import styled from "styled-components/native";
import UserInfo2 from "~/screens/UserInfo2";
import UserInfo3 from "~/screens/UserInfo3";

const StepIcon = styled.Image`
  width: 36px;
  height: 36px;
`;

const Stack = createNativeStackNavigator();
const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInfo1"
        component={UserInfo1}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step1.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="UserInfo2"
        component={UserInfo2}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step2.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="UserInfo3"
        component={UserInfo3}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step3.png")} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
