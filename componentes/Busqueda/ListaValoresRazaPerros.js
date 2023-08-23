import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const ListaValoresRazaPerros = ({ selectedAnimal }) => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedOptions, setBreedOptions] = useState([]);

  const getRazas = () => {
    axios
      .get(`http://buddy-app.loca.lt/parameters/petBreed/byType/${selectedAnimal}`)
      .then((response) => {
        console.log('Razas exitosas:', response.data);
        const petBreeds = response.data;
        if (petBreeds && Array.isArray(petBreeds)) {
          setBreedOptions(petBreeds);
        } else {
          setBreedOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setBreedOptions([]);
      });
  };

  useEffect(() => {
    getRazas();
  }, [selectedAnimal]);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={breedOptions}
      search
      maxHeight={300}
      labelField="petBreedName"
      valueField="petBreedName"
      placeholder="Raza"
      searchPlaceholder="Buscar"
      value={selectedBreed}
      onChange={(item) => {
        setSelectedBreed(item.petBreedName);
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
