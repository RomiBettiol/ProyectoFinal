import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Ciudad', value: '1' },
  { label: 'Luján de cuyo', value: '2' },
  { label: 'Godoy Cruz', value: '3' },
  { label: 'Las Heras', value: '4' },
  { label: 'Rivadavia', value: '5' },
  { label: 'San Rafael', value: '6' },
  { label: 'Tunuyan', value: '7' },
  { label: 'San Martín', value: '8' },
];

const ListaValoresZona = () => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Zona"
      searchPlaceholder="Buscar"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default ListaValoresZona;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '93%',
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 16,
  },
});