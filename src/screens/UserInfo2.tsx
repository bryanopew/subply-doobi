import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  aerobicTrainingCategrory,
  NavigationProps,
  validationRules,
  weightTrainingCategrory,
} from "~/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import styled from "styled-components/native";
import {
  BtnBottomCTA,
  BtnText,
  Container,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  TextMain,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { Controller, useForm, useWatch } from "react-hook-form";
import Dropdown from "~/components/userInfoComp/Dropdown";
import {
  IUserInfo,
  saveUserInfo,
  saveUserTarget,
  userInfoState,
} from "~/redux/slices/userInfo/userInfoSlice";
import { calculateNutrTarget } from "~/util/targetCalculation";

interface IFormData {
  bmrKnown: string;
  weightTimeCd: string;
  aerobicTimeCd: string;
}

interface IDropdownField {
  field: {
    onChange: () => void;
    onBlur: () => void;
    value: string;
  };
}

const Title = styled(TextMain)`
  font-size: 24px;
  font-weight: bold;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const renderBmrKnownInput = (
  { field: { onChange, value } }: IDropdownField,
  handleSubmit: Function,
  userInfo1Refs?: React.MutableRefObject<any[]>
) => {
  // const onSubmit = (data) => console.log("dddd", data);
  return (
    <>
      <InputHeader isActivated={value ? true : false}>
        기초대사량(kcal)
      </InputHeader>
      <Input
        placeholder="기초대사량을 알고있다면 적어주세요 (kcal)"
        value={value}
        onChangeText={onChange}
        isActivated={value ? true : false}
        onFocus={handleSubmit()}
        keyboardType="numeric"
        maxLength={4}
      />
    </>
  );
};

const onHandlePress = (
  dispatch: Function,
  navigate: Function,
  userInfo: IUserInfo,
  bmrKnownValue: string,
  weightTimeCdValue: string,
  aerobicTimeCdValue: string
) => {
  // 기초대사량 직접 입력된 경우는 입력된 bmr로
  const bmrMod = bmrKnownValue ? bmrKnownValue : userInfo.bmr;
  const nutrTarget = calculateNutrTarget(
    userInfo.weight,
    weightTimeCdValue,
    aerobicTimeCdValue,
    userInfo.dietPurposecd,
    bmrMod
  );
  dispatch(
    saveUserInfo({
      bmr: bmrMod,
      weightTimeCd: weightTimeCdValue,
      aerobicTimeCd: aerobicTimeCdValue,
    })
  );
  dispatch(
    saveUserTarget({
      tmr: String(nutrTarget.TMR),
      calorie: String(nutrTarget.calorieTarget),
      carb: String(nutrTarget.carbTarget),
      protein: String(nutrTarget.proteinTarget),
      fat: String(nutrTarget.fatTarget),
    })
  );

  navigate("Stacks", { screen: "UserInfo3", params: "" });
};

const UserInfo2 = ({ navigation: { navigate }, route }: NavigationProps) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo);
  console.log("userInfo2: userInfo:", userInfo);
  // redux
  const dispatch = useDispatch();

  // react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    // 나중에 사용자 정보 있으면 초기값으로 넣어줘야함.
    defaultValues: {
      bmrKnown: "",
      weightTimeCd: weightTrainingCategrory[0].value,
      aerobicTimeCd: aerobicTrainingCategrory[0].value,
    },
  });
  const bmrKnownValue = useWatch({ control, name: "bmrKnown" });
  const weightTimeCdValue = useWatch({ control, name: "weightTimeCd" });
  const aerobicTimeCdValue = useWatch({ control, name: "aerobicTimeCd" });
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>{"선택정보를\n입력해주세요"}</Title>
        <Controller
          control={control}
          rules={validationRules.bmrKnown}
          render={(field) => renderBmrKnownInput(field, handleSubmit)}
          name="bmrKnown"
        />
        {errors.bmrKnown && (
          <ErrorBox>
            <ErrorText>{errors.bmrKnown.message}</ErrorText>
          </ErrorBox>
        )}
        <Dropdown
          placeholder="웨이트 운동시간"
          items={weightTrainingCategrory}
          value={weightTimeCdValue}
          setValue={setValue}
          reactHookFormName="weightTimeCd"
        />
        <Dropdown
          placeholder="유산소 운동시간"
          items={aerobicTrainingCategrory}
          value={aerobicTimeCdValue}
          setValue={setValue}
          reactHookFormName="aerobicTimeCd"
        />
      </ScrollView>
      <BtnBottomCTA
        btnStyle={
          Object.keys(errors).length === 0 ? "activated" : "inactivated"
        }
        disabled={Object.keys(errors).length === 0 ? false : true}
        onPress={() =>
          onHandlePress(
            dispatch,
            navigate,
            userInfo,
            bmrKnownValue,
            weightTimeCdValue,
            aerobicTimeCdValue
          )
        }
      >
        <BtnText>다음</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default UserInfo2;
