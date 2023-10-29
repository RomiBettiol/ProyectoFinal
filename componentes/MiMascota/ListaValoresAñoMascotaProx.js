import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  
  { label: '2023', value: '1' },
  { label: '2024', value: '2' },
  { label: '2025', value: '3' },
  { label: '2026', value: '4' },
  { label: '2027', value: '5' },
];

const ListaValoresAñoMascotaProx = ({ setSelectedValue, selectedValue }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => ({
    label: (currentYear + index).toString(),
    value: (currentYear + index).toString(),
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

export default ListaValoresAñoMascotaProx;

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