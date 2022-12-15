import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";
import { addProductToMenu, deleteProduct } from "~/redux/slices/cart/cartSlice";
import NutrientsProgress from "~/components/common/NutrientsProgress";
import colors from "~/styles/colors";
import { FlatList, Text, View } from "react-native";
import { getTestData } from "~/query/query";
import FoodList from "~/components/homeComp/FoodList";
import MenuSelect from "~/components/homeComp/MenuSelect";

const MenuAndSearchBox = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  align-items: center;
`;

const MenuHeader = styled.TouchableOpacity`
  flex-direction: row;
`;

const HeaderText = styled(TextMain)`
  font-size: 18px;
  font-weight: bold;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 32px;
  margin-left: 8px;
  border-radius: 4px;
  background-color: ${colors.line};
  padding: 5px 8px 5px 8px;
  font-size: 14px;
  color: ${colors.textSub};
`;

const ListTitle = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;
const NoOfFoods = styled(TextSub)`
  font-size: 16px;
  font-weight: bold;
`;

const SortBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

const SortBtnText = styled(TextSub)`
  font-size: 14px;
`;

const SortImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const FilterBtn = styled.TouchableOpacity`
  height: 20px;
  margin-right: 36px;
`;
const FilterBtnText = styled(TextMain)`
  font-size: 14px;
`;

const Home = () => {
  // redux
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // state
  const [menuIndex, setMenuIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [testData, setTestData] = useState([]);
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);

  console.log("Home: cartLength: ", cart.length);

  useEffect(() => {
    const getInitialFoods = async () => {
      const res = await getTestData();
      setTestData(res);
    };
    getInitialFoods();
  }, []);

  return (
    <Container>
      <MenuAndSearchBox>
        {/* <MenuSelect menuIndex={menuIndex} setMenuIndex={setMenuIndex} /> */}
        <MenuHeader onPress={() => setMenuSelectOpen((v) => !v)}>
          <HeaderText>{`식단${menuIndex + 1}`}</HeaderText>
          {menuSelectOpen ? (
            <Arrow source={require(`~/assets/icons/24_dropdown_up.png`)} />
          ) : (
            <Arrow source={require(`~/assets/icons/24_dropdown_down.png`)} />
          )}
        </MenuHeader>
        <SearchInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder="검색어 입력"
          onSubmitEditing={() => console.log("search!!")}
        />
      </MenuAndSearchBox>
      <NutrientsProgress menuIndex={menuIndex} />
      <Row style={{ justifyContent: "space-between", marginTop: 32 }}>
        <Row>
          <ListTitle>전체 식품</ListTitle>
          <NoOfFoods>87개</NoOfFoods>
        </Row>
        <SortBtn>
          <SortBtnText>정렬</SortBtnText>
          <SortImage source={require("~/assets/icons/24_sort.png")} />
        </SortBtn>
      </Row>
      <HorizontalLine style={{ marginTop: 8 }} />
      <Row style={{ marginTop: 8 }}>
        <FilterBtn>
          <FilterBtnText>카테고리</FilterBtnText>
        </FilterBtn>
        <FilterBtn>
          <FilterBtnText>영양성분</FilterBtnText>
        </FilterBtn>
        <FilterBtn>
          <FilterBtnText>가격</FilterBtnText>
        </FilterBtn>
        <FilterBtn>
          <FilterBtnText>식단구성</FilterBtnText>
        </FilterBtn>
      </Row>
      <FlatList
        style={{ marginTop: 24 }}
        data={testData}
        renderItem={(item) => <FoodList item={item} menuIndex={menuIndex} />}
        ItemSeparatorComponent={() => <HorizontalSpace height={16} />}
        keyExtractor={(item) => item.productNo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <BtnCTA
        btnStyle="activated"
        onPress={async () => {
          const res = await getTestData();
          setTestData(res);
        }}
      >
        <BtnText>테스트 데이터</BtnText>
      </BtnCTA>
      {menuSelectOpen && (
        <MenuSelect
          menuIndex={menuIndex}
          setMenuIndex={setMenuIndex}
          open={menuSelectOpen}
          setOpen={setMenuSelectOpen}
        />
      )}
    </Container>
  );
};

export default Home;
