import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: '1', value: '01' },
  { label: '2', value: '02' },
  { label: '3', value: '03' },
  { label: '4', value: '04' },
  { label: '5', value: '05' },
  { label: '6', value: '06' },
  { label: '7', value: '07' },
  { label: '8', value: '08' },
  { label: '9', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },
  { label: '31', value: '31' },
];
const ListaValoresDiasMascotaProx = ({ selectedMonth, selectedValue, setSelectedValue }) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (selectedMonth === '4' || selectedMonth === '6' || selectedMonth === '9' || selectedMonth === '11') {
      const days = data.filter(item => parseInt(item.value) <= 30);
      setFilteredData(days);
    } else if (selectedMonth === '2') {
      const days = data.filter(item => parseInt(item.value) <= 29);
      setFilteredData(days);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth]);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={filteredData}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Día"
      value={selectedValue} // Usar el prop selectedValue para mostrar el valor seleccionado
      onChange={item => {
        setSelectedValue(item.value); // Llamar a la función setSelectedValue con el día seleccionado
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '25%',
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
});

export default ListaValoresDiasMascotaProx;