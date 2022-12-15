import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~/screens/Home";
import Mypage from "~/screens/Mypage";
import Cart from "~/screens/Cart";
import Likes from "~/screens/Likes";
import colors from "~/styles/colors";

const Tab = createBottomTabNavigator();

const BottomTabIcon = styled.Image`
  width: 36px;
  height: 36px;
`;

const BackArrow = styled.Image`
  margin-left: 16px;
  width: 24px;
  height: 24px;
`;

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_mainPage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_mainPage.png`)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_profilePage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_profilePage.png`)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_likePage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_likePage.png`)}
              />
            ),
          headerShown: true,
          headerTitle: "찜한 상품",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => (
            <BackArrow source={require(`~/assets/icons/24_back.png`)} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_cartPage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_cartPage.png`)}
              />
            ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
