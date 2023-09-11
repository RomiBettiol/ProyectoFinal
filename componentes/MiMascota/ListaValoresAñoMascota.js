import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: '2022', value: '1' },
  { label: '2023', value: '2' },
];

const ListaValoresAñoMascota = ({ setSelectedValue, selectedValue }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => ({
    label: (currentYear - index).toString(),
    value: (currentYear - index).toString(),
  }));

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={years}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Año"
      value={selectedValue}
      onChange={item => {
        setSelectedValue(item.value);
      }}
    />
  );
};

export default ListaValoresAñoMascota;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '28%',
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
});