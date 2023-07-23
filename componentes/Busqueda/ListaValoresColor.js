import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Negro', value: '1' },
  { label: 'Blanco', value: '2' },
  { label: 'Gris', value: '3' },
  { label: 'Marrón', value: '4' },
];

const ListaValoresColor = () => {
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
      placeholder="Color"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default ListaValoresColor;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '93%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});