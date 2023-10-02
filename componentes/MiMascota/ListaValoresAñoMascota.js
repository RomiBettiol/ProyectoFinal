import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ListaValoresAñoMascota = ({ setSelectedValue, selectedValue }) => {
  // Obtén el año actual
  const currentYear = new Date().getFullYear();

  // Ajusta la cantidad de años retrocedidos según tus necesidades
  const years = Array.from({ length: 20 }, (_, index) => ({
    label: (currentYear - index).toString(),
    value: (currentYear - index).toString(),
  }));

  const handleChange = (item) => {
    setValue(item.value);
    setSelectedMonth(item.value);
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={years}
      maxHeight={300} // Redujimos la altura máxima
      labelField="label"
      valueField="value"
      placeholder="Año"
      value={selectedValue}
      onChange={handleChange}
    />
  );
};
export default ListaValoresAñoMascota;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: "#EEE9E9",
    padding: 25,
    borderRadius: 40,
    width: "30%",
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
});
