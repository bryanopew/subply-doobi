import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "~/styles/colors";
import styled from "styled-components/native";
import { InputHeaderText } from "~/styles/styledConsts";

interface CategoryObject {
  label: string;
  value: string;
}
interface DropdownProps {
  placeholder: string;
  value: string;
  // setValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: Function;
  items: Array<CategoryObject>;
  setItems?: React.Dispatch<React.SetStateAction<Array<CategoryObject>>>;
  scrollRef?: any;
}

const DropdownHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;

const Dropdown = (props: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const { placeholder, value, setValue, items, setItems, scrollRef } = props;

  return (
    <>
      <DropdownHeader isActivated={true}>{placeholder}</DropdownHeader>
      <DropDownPicker
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.inActivated,
        }}
        dropDownContainerStyle={{
          position: "relative",
          marginTop: -44,
          paddingBottom: 4,
          borderRadius: 0,
          borderWidth: 1,
          borderTopWidth: 0,
          elevation: 3,
          borderColor: colors.inActivated,
          // zIndex: 6000,
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.highlight,
        }}
        textStyle={{
          fontSize: 16,
          fontWeight: "normal",
          color: colors.textMain,
        }}
        showTickIcon={false}
        open={open}
        setOpen={() => {
          !open && scrollRef.current.scrollToEnd();
          setOpen((open) => !open);
        }}
        value={value}
        setValue={(v) => setValue("dietPurposecd", v)}
        items={items}
        //   onChangeValue={() => {}}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </>
  );
};

export default Dropdown;
