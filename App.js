import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import RootStack from "~/navigators/RootStack";
import { store } from "~/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <StatusBar style="auto" /> */}
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
