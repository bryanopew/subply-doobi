import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~/screens/Home";
import Mypage from "~/screens/Mypage";
import Like from "~/screens/Like";
import Cart from "~/screens/Cart";

const Tab = createBottomTabNavigator();

const BottomTabIcon = styled.Image`
  width: 36px;
  height: 36px;
`;

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
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
          tabBarShowLabel: false,
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
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Like"
        component={Like}
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
          tabBarShowLabel: false,
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
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
