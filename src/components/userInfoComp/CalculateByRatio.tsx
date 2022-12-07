import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import {
  ErrorBox,
  ErrorText,
  InputHeaderText,
  TextMain,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  IDropdownField,
  nutrRatioCategory,
  validationRules,
} from "~/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Dropdown from "./Dropdown";

const ContentContainer = styled.View`
  padding-bottom: 30px;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const renderCaloriePerMealInput = (
  { field: { onChange, onBlur, value } }: IDropdownField,
  handleSubmit: Function,
  calorieRecommended?: string
) => {
  return (
    <>
      <InputHeader isActivated={value ? true : false}>만 나이</InputHeader>
      <Input
        placeholder={`한 끼 칼로리 입력 (추천: ${calorieRecommended})`}
        value={value}
        onChangeText={onChange}
        onFocus={() => handleSubmit()()}
        isActivated={value ? true : false}
        keyboardType="numeric"
        maxLength={4}
      />
    </>
  );
};

interface ICalculateByRatio {
  ratioType: string;
  setValue: any;
  control: any;
  handleSubmit: any;
  calorieRecommended: any;
  errors: any;
}
const CalculateByRatio = ({
  ratioType,
  setValue,
  control,
  handleSubmit,
  calorieRecommended,
  errors,
}: ICalculateByRatio) => {
  console.log(errors);

  return (
    <ContentContainer>
      <Dropdown
        placeholder="탄:단:지 비율"
        value={ratioType}
        setValue={setValue}
        items={nutrRatioCategory}
        reactHookFormName="ratioType"
      />
      {/* --- caloriePerMeal --- */}
      <Controller
        control={control}
        rules={validationRules.caloriePerMeal}
        render={(field) =>
          renderCaloriePerMealInput(field, handleSubmit, calorieRecommended)
        }
        name="caloriePerMeal"
      />

      {errors.caloriePerMeal && (
        <ErrorBox>
          <ErrorText>{errors.caloriePerMeal.message}</ErrorText>
        </ErrorBox>
      )}
    </ContentContainer>
  );
};

export default CalculateByRatio;
