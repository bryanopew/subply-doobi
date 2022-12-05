import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  BtnBottomCTA,
  BtnText,
  Container,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  Row,
  StyledProps,
  TextMain,
  UserInfoTextInput,
  VerticalSpace,
} from "~/styles/styledConsts";
import { purposeCategory, validationRules } from "~/constants/constants";
import colors from "~/styles/colors";
import Dropdown from "~/components/userInfoComp/Dropdown";
import { Controller, useForm, useWatch } from "react-hook-form";

const Title = styled(TextMain)`
  font-size: 24px;
  font-weight: bold;
`;

const BtnToggle = styled.TouchableOpacity`
  flex: 1;
  height: 48px;
  margin-top: 48px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.inActivated};
`;

const ToggleText = styled.Text`
  font-size: 16px;
  color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.inActivated};
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const renderAgeInput = (
  { field: { onChange, onBlur, value } },
  handleSubmit
) => {
  // const onSubmit = (data) => console.log("dddd", data);
  return (
    <>
      <InputHeader isActivated={value ? true : false}>만 나이</InputHeader>
      <Input
        placeholder="만 나이를 입력해주세요"
        value={value}
        onChangeText={onChange}
        onFocus={handleSubmit()}
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
};
const renderHeightInput = (
  { field: { onChange, onBlur, value } },
  handleSubmit
) => {
  // const onSubmit = (data) => console.log("dddd", data);
  return (
    <>
      <InputHeader isActivated={value ? true : false}>신장(cm)</InputHeader>
      <Input
        placeholder="신장을 입력해주세요"
        value={value}
        onChangeText={onChange}
        onFocus={handleSubmit()}
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
};
const renderWeightInput = (
  { field: { onChange, onBlur, value } },
  handleSubmit
) => {
  // const onSubmit = (data) => console.log("dddd", data);
  return (
    <>
      <InputHeader isActivated={value ? true : false}>몸무게(kg)</InputHeader>
      <Input
        placeholder="몸무게를 입력해주세요"
        value={value}
        onChangeText={onChange}
        onFocus={handleSubmit()}
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
};

const UserInfo1 = () => {
  //나중에 서버에서 카테고리 정보 가져올 때는 수정
  const [DropdownValue, setDropdownValue] = useState(purposeCategory[0].value);
  const [purposeCategoryItems, setPurposeCategoryItems] =
    useState(purposeCategory);
  const scrollRef = useRef();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    // 나중에 사용자 정보 있으면 초기값으로 넣어줘야함.
    defaultValues: {
      gender: "M",
      age: "",
      height: "",
      weight: "",
      dietPurposecd: purposeCategory[0].value,
    },
  });
  const genderValue = useWatch({ control, name: "gender" });
  const ageValue = useWatch({ control, name: "age" });
  const heightValue = useWatch({ control, name: "height" });
  const weightValue = useWatch({ control, name: "weight" });
  const dietPurposeValue = useWatch({ control, name: "dietPurposecd" });

  console.log("genderValue: ", genderValue);
  console.log("ageValue: ", ageValue);
  console.log("heightValue: ", heightValue);
  console.log("weightValue: ", weightValue);
  console.log("dietPurposeValue: ", dietPurposeValue);
  console.log("errors: ", errors);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <Title>{"기본정보를\n입력해주세요"}</Title>
        <Row style={{ justifyContent: "space-between" }}>
          <BtnToggle
            isActivated={genderValue === "M" ? true : false}
            onPress={() => setValue("gender", "M")}
          >
            <ToggleText isActivated={genderValue === "M" ? true : false}>
              남성
            </ToggleText>
          </BtnToggle>
          <VerticalSpace width={8} />
          <BtnToggle
            isActivated={genderValue === "F" ? true : false}
            onPress={() => setValue("gender", "F")}
          >
            <ToggleText isActivated={genderValue === "F" ? true : false}>
              여성
            </ToggleText>
          </BtnToggle>
        </Row>
        <Controller
          control={control}
          rules={validationRules.age}
          render={(field) => renderAgeInput(field, handleSubmit)}
          name="age"
        />
        {errors.age && (
          <ErrorBox>
            <ErrorText>{errors.age.message}</ErrorText>
          </ErrorBox>
        )}
        <Controller
          control={control}
          rules={validationRules.height}
          render={(field) => renderHeightInput(field, handleSubmit)}
          name="height"
        />
        {errors.height && (
          <ErrorBox>
            <ErrorText>{errors.height.message}</ErrorText>
          </ErrorBox>
        )}
        <Controller
          control={control}
          rules={validationRules.weight}
          render={(field) => renderWeightInput(field, handleSubmit)}
          name="weight"
        />
        {errors.weight && (
          <ErrorBox>
            <ErrorText>{errors.weight.message}</ErrorText>
          </ErrorBox>
        )}
        <Dropdown
          placeholder="식단의 목적"
          items={purposeCategoryItems}
          value={dietPurposeValue}
          setValue={setValue}
          scrollRef={scrollRef}
        />
      </ScrollView>
      <BtnBottomCTA btnStyle="activated">
        <BtnText>다음</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default UserInfo1;
