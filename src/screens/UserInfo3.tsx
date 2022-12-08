import React, { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import Auto from "~/components/userInfoComp/Auto";
import CalculateByRatio from "~/components/userInfoComp/CalculateByRatio";
import Manual from "~/components/userInfoComp/Manual";
import { NavigationProps, nutrRatioCategory } from "~/constants/constants";
import { RootState } from "~/redux/store";
import colors from "~/styles/colors";
import {
  BtnBottomCTA,
  BtnText,
  Container,
  HorizontalSpace,
  StyledProps,
  TextMain,
} from "~/styles/styledConsts";
import { onSubmit, submitActionsByMethod } from "~/util/userInfoSubmit";

interface IFormData {
  ratioType: string;
  caloriePerMeal: string;
  carbManual: string;
  proteinManual: string;
  fatManual: string;
}
const Title = styled(TextMain)`
  font-size: 24px;
  font-weight: bold;
`;

const AccordionHeader = styled.View`
  height: 52px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.inActivated};
`;

const AccordionHeaderTitle = styled.Text`
  font-size: 16px;
  color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.textSub};
`;

const ArrowIcon = styled.View`
  width: 20px;
  height: 20px;
  position: absolute;
  align-self: flex-end;
  right: 8px;
  background-color: ${colors.backgroundLight};
`;

const UserInfo3 = ({ navigation: { navigate } }: NavigationProps) => {
  // redux
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();
  console.log("userInfo3: userInfo:", userInfo);
  console.log("userInfo3: userTarget:", userTarget);

  // ref
  const scrollRef = useRef<ScrollView>(null);

  // react-hook-form
  const calorieRecommended = userTarget.calorie;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    // 나중에 사용자 정보 있으면 초기값으로 넣어줘야함.
    defaultValues: {
      ratioType: nutrRatioCategory[0].value,
      caloriePerMeal: "",
      carbManual: "",
      proteinManual: "",
      fatManual: "",
    },
  });
  const ratioType = useWatch({ control, name: "ratioType" });
  const caloriePerMeal = useWatch({ control, name: "caloriePerMeal" });
  const carbManual = useWatch({ control, name: "carbManual" });
  const proteinManual = useWatch({ control, name: "proteinManual" });
  const fatManual = useWatch({ control, name: "fatManual" });

  // accordion
  // activeSections[0] == 1 : 두비가 알아서 / 탄단지 비율 / 영양성분 직접 입력
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const CONTENT = [
    {
      title: <Text>귀찮다 두비가 알아서 다해줘</Text>,
      content: <Auto />,
    },
    {
      title: <Text>탄:단:지 비율로 계산하기</Text>,
      content: (
        <CalculateByRatio
          ratioType={ratioType}
          calorie={caloriePerMeal}
          setValue={setValue}
          control={control}
          handleSubmit={handleSubmit}
          calorieRecommended={calorieRecommended}
          errors={errors}
        />
      ),
    },
    {
      title: <Text>각 영양성분 직접 입력 (고수용)</Text>,
      content: (
        <Manual
          carbManual={carbManual}
          proteinManual={proteinManual}
          fatManual={fatManual}
          setValue={setValue}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          scrollRef={scrollRef}
        />
      ),
    },
  ];
  const renderHeader = (section, index, isActive) => {
    // return section.title;
    return (
      <AccordionHeader isActivated={isActive}>
        <AccordionHeaderTitle>{section.title}</AccordionHeaderTitle>
        <ArrowIcon />
      </AccordionHeader>
    );
  };
  const renderContent = (section, isActive) => {
    return section.content;
  };
  const updateSections = (actives) => {
    setActiveSections(actives);
  };
  console.log("userInfo3: errors: ", errors);

  const btnIsActive =
    activeSections[0] === 0 ||
    (activeSections[0] === 1 && !errors.caloriePerMeal) ||
    (activeSections[0] === 2 &&
      !errors.carbManual &&
      !errors.proteinManual &&
      !errors.fatManual)
      ? true
      : false;
  const btnStyle = btnIsActive ? "activated" : "inactivated";

  // TBD | 스크롤뷰 ref를 Manual에 넘겨서 단백질입력 활성화시 스크롤 내려주기
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={200}
          onChange={updateSections}
          renderFooter={() => <HorizontalSpace height={20} />}
        />
      </ScrollView>
      <BtnBottomCTA
        btnStyle={btnStyle}
        disabled={btnIsActive ? false : true}
        onPress={() => {
          const calculationMethod = activeSections[0];
          const submitArgs = {
            userInfo: userInfo,
            userTarget: userTarget,
            ratioType: ratioType,
            caloriePerMeal: caloriePerMeal,
            carbManual: carbManual,
            proteinManual: proteinManual,
            fatManual: fatManual,
            dispatch: dispatch,
          };
          submitActionsByMethod[calculationMethod](submitArgs);
          navigate("BottomTab", { screen: "Home" });
        }}
      >
        <BtnText>완료</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default UserInfo3;
