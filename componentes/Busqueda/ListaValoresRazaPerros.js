import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Caniche', value: '1' },
  { label: 'Labrador', value: '2' },
  { label: 'Golden', value: '3' },
  { label: 'Boxer', value: '4' },
  { label: 'Afgano', value: '5' },
  { label: 'Beagle', value: '6' },
  { label: 'Bull Terrier', value: '7' },
];

const ListaValoresRazaPerros = () => {
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
      placeholder="Raza"
      searchPlaceholder="Buscar"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default ListaValoresRazaPerros;

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