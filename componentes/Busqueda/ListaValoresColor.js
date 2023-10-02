import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const ListaValoresColor = ({setSelectedColorId}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);

  const getColores = () => {
    axios
      .get('http://romibettiol.loca.lt/parameters/petColor/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Colores exitosos:', response.data);
        const petColors = response.data.petColors; // Obtenemos la lista de colores del response
        setColorOptions(petColors); // Actualizamos el estado con la lista de colores
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setColorOptions([]); // En caso de error, seteamos el estado como una lista vacía
      });
  };

  useEffect(() => {
    getColores();
  }, []);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={colorOptions}
      maxHeight={300}
      labelField="petColorName"
      valueField="petColorName"
      placeholder="Color"
      value={selectedColor}
      onChange={item => {
        setSelectedColor(item);
        setSelectedColorId(item.idPetColor);
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