import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Stacks from "./Stacks";
import MyPageStacks from "./MyPageStacks";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Stacks" component={Stacks} />
      <Stack.Screen name="MyPageStacks" component={MyPageStacks} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
