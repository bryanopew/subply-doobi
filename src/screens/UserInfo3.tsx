import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

const UserInfo3 = () => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo);
  console.log(userInfo);
  return (
    <View>
      <Text>UserInfo3</Text>
    </View>
  );
};

export default UserInfo3;
