import { View, Text } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~/screens/Home";
import Mypage from "~/screens/Mypage";
import Like from "~/screens/Like";
import Cart from "~/screens/Cart";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Mypage" component={Mypage} />
      <Tab.Screen name="Like" component={Like} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default BottomTab;
