import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Enero', value: '01' },
  { label: 'Febrero', value: '02' },
  { label: 'Marzo', value: '03' },
  { label: 'Abril', value: '04' },
  { label: 'Mayo', value: '05' },
  { label: 'Junio', value: '06' },
  { label: 'Julio', value: '07' },
  { label: 'Agosto', value: '08' },
  { label: 'Septiembre', value: '09' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' },
];

const ListaValoresMesM = ({ selectedYear, setSelectedMonth }) => {
    const [value, setValue] = useState(null);
    const [months, setMonths] = useState([]);
    console.log(selectedYear)
    
  
    // Actualiza el mes seleccionado utilizando setSelectedMonth
    const handleMonthChange = (item) => {
      setSelectedMonth(item.value);
    };

    useEffect(() => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // +1 porque los meses en JavaScript van de 0 a 11
  
      // Crear una lista de meses disponibles
      const availableMonths = [];
  
      if (selectedYear === currentYear) {
        // Si el año seleccionado es el año actual, solo mostramos los meses a partir del mes actual
        for (let month = currentMonth; month <= 12; month++) {
          availableMonths.push({ label: getMonthName(month), value: formatMonth(month) });
        }
      } else {
        // Si el año seleccionado es diferente al año actual, mostramos todos los meses
        for (let month = 1; month <= 12; month++) {
          availableMonths.push({ label: getMonthName(month), value: formatMonth(month) });
        }
      }
  
      setMonths(availableMonths);
      setSelectedMonth(null);
    }, [selectedYear]);
  
    const getMonthName = (month) => {
      // Devuelve el nombre del mes según su número (1-12)
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      return monthNames[month - 1];
    };
  
    const formatMonth = (month) => {
      // Formatea el número del mes como "01", "02", etc.
      return month < 10 ? `0${month}` : `${month}`;
    };
  

    return (
      <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={months}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Mes"
      value={value}
      onChange={handleMonthChange} // Aquí se pasa la función como manejador de cambios
    />
      );
    };

export default ListaValoresMesM;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '39%',
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
});