import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
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

const ListaValoresDias = ({ selectedMonth }) => {
    const [value, setValue] = useState(null);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (selectedMonth === '4' || selectedMonth === '6' || selectedMonth === '9' || selectedMonth === '11') { // Si el mes seleccionado es abril (valor '4')
          const days = data.filter(item => parseInt(item.value) <= 30); // Filtra días del 1 al 30
          setFilteredData(days);
        } else if (selectedMonth === '2') {
          const days = data.filter(item => parseInt(item.value) <= 29);
          setFilteredData(days);
        } else  {
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
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
      );
    };

export default ListaValoresDias;

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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});