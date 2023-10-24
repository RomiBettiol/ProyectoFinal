import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: '2022', value: '1' },
  { label: '2023', value: '2' },
];

const ListaValoresAño = ({ setSelectedYear }) => {
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
      onChange={item => {
        setValue(item.value);
        setSelectedYear(item.label);
      }}
    />
  );
};

export default ListaValoresAño;

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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
