import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "2023", value: "1" },
  { label: "2024", value: "2" },
  { label: "2025", value: "3" },
  { label: "2026", value: "4" },
  { label: "2027", value: "5" },
  { label: "2028", value: "6" },
];

const ListaValoresAñoEstablecimiento = ({ setSelectedYear }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Año"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        setSelectedYear(item.label);
      }}
    />
  );
};

export default ListaValoresAñoEstablecimiento;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: "#EEE9E9",
    padding: 25,
    borderRadius: 40,
    width: "28%",
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
