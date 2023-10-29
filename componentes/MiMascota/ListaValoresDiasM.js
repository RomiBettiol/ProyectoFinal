import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
const ListaValoresDiasM = ({ selectedYear, selectedMonth, selectedValue, setSelectedValue }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    // Lógica para calcular los días disponibles en función del año y el mes aquí
    const calculateDays = () => {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        // Formatear el día para que tenga dos dígitos (por ejemplo, 01 en lugar de 1)
        const formattedDay = day.toString().padStart(2, '0');
        return { label: formattedDay, value: formattedDay };
      });
      return daysArray;
    };

    if (selectedYear && selectedMonth) {
      const daysArray = calculateDays();
      setDays(daysArray);
    }
  }, [selectedYear, selectedMonth]);

  return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={days}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Día"
        value={selectedValue}
        onChange={item => {
          setSelectedValue(item.value);
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

export default ListaValoresDiasM;