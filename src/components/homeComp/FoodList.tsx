import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { Col, Row, TextMain, TextSub } from "~/styles/styledConsts";
import { BASE_URL } from "~/query/urls";

const Container = styled.View`
  flex: 1;
`;

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  /* background-color: ${colors.highlight}; */
`;

const ProductInfoContainer = styled.View`
  flex: 1;
  height: 100px;
  margin-left: 16px;
  justify-content: space-between;
  /* background-color: ${colors.highlight}; */
`;

const NutrSummaryContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 22px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 3px 8px 3px 8px;
  justify-content: space-between;
  background-color: ${colors.line};
`;

const SellerText = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

const ProductName = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;

const Price = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;

const Nutr = styled.View`
  flex-direction: row;
`;

const NutrText = styled(TextSub)`
  font-size: 12px;
`;

const NutrValue = styled(TextMain)`
  font-size: 12px;
`;

const AddToCartBtn = styled.TouchableOpacity`
  height: 100%;
  margin-left: 16px;
  align-self: flex-start;
  /* background-color: ${colors.highlight}; */
`;

const AddToCartBtnImage = styled.Image`
  width: 24px;
  height: 24px;
`;

interface IFoods {
  index: number;
  item: {
    item: {
      [key: string]: string;
    };
  };
}
const FoodList = ({ item }: IFoods) => {
  return (
    <Container>
      <Row>
        <Thumbnail
          source={{
            uri: `${BASE_URL}${item.item.mainAttUrl}`,
          }}
        />
        <ProductInfoContainer>
          <Col>
            <SellerText numberOfLines={1} ellipsizeMode="tail">
              {item.item?.platformNm}
            </SellerText>
            <ProductName numberOfLines={2} ellipsizeMode="tail">
              {item.item?.productNm}
            </ProductName>
          </Col>
          <Price>{item.item?.price}원</Price>
        </ProductInfoContainer>
        <AddToCartBtn onPress={() => console.log("AddToCartBtn Clicked")}>
          <AddToCartBtnImage
            source={require(`~/assets/icons/24_foodAdd.png`)}
          />
        </AddToCartBtn>
      </Row>
      <NutrSummaryContainer>
        <Nutr>
          <NutrText>칼로리</NutrText>
          <NutrValue>123kcal</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>칼로리</NutrText>
          <NutrValue>123kcal</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>칼로리</NutrText>
          <NutrValue>123kcal</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>칼로리</NutrText>
          <NutrValue>123kcal</NutrValue>
        </Nutr>
      </NutrSummaryContainer>
    </Container>
  );
};

export default FoodList;
