import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const TipoMascota = ({ selectedTypes, setSelectedTypes}) => {
  const [animalOptions, setAnimalOptions] = useState([]);
  const [animalId, setAnimalId] = useState([]);

  useEffect(() => {
    axios
      .get('http://romibettiol.loca.lt.loca.lt/parameters/petType/')
      .then((response) => {
        console.log('Tipos de animal exitosos:', response.data);
        setAnimalOptions(response.data.petTypes);
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setAnimalOptions([]);
      });
  }, []);

  const toggleTypeSelection = (selectedOption) => {
    const isSelected = selectedTypes.some((option) => option.idPetType === selectedOption.idPetType);
  
    if (isSelected) {
      setSelectedTypes(selectedTypes.filter((option) => option.idPetType !== selectedOption.idPetType));
    } else {
      setSelectedTypes([...selectedTypes, selectedOption]);
    }
  
    // Imprimir los IDs de las opciones seleccionadas en la consola
    const selectedIds = selectedTypes.map((option) => ({
      idPetType: option.idPetType,
      petTypeName: option.petTypeName,
    }));
    setAnimalId(selectedIds);
    console.log('IDs y nombres de las opciones seleccionadas:', selectedIds);
  };

  console.log('Animales elegidos: ', animalId);
  
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {animalOptions.map((animalOption, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedTypes.some((option) => option.idPetType === animalOption.idPetType) && styles.selectedOption,
            ]}
            onPress={() => toggleTypeSelection(animalOption)}
          >
            <Text
              style={[
                styles.optionText,
                selectedTypes.some((option) => option.idPetType === animalOption.idPetType) && styles.selectedOptionText,
              ]}
            >
              {animalOption.petTypeName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDC4B8',
    borderRadius: 5,
    margin: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#DDC4B8',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default TipoMascota;