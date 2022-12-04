import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import RootStack from "~/navigators/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <RootStack />
    </NavigationContainer>
  );
}
