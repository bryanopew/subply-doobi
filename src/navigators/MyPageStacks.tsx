import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "~/screens/History";
import Orders from "~/screens/Orders";

const Stack = createNativeStackNavigator();
const MyPageStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Hitory"
        component={History}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStacks;
