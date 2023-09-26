import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ListaValoresAnimal = ({ selectedAnimal, setSelectedAnimal, setSelectedAnimalId }) => {
  const [animalOptions, setAnimalOptions] = useState([]);

  useEffect(() => {
    axios
      .get('http://buddy-app2.loca.lt/parameters/petType/')
      .then((response) => {
        console.log('Tipos de animal exitosos:', response.data);
        setAnimalOptions(response.data.petTypes);
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setAnimalOptions([]);
      });
  }, []);

  return (
    <View style={styles.container}>
      
      
      <View style={styles.optionsContainer}>
        {animalOptions.map((animalOption, index) => (
          <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedAnimal === animalOption.petTypeName && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedAnimal(animalOption.petTypeName);
            setSelectedAnimalId(animalOption.idPetType); // Agrega el ID al estado
          }}
        >
            <Text
              style={[
                styles.optionText,
                selectedAnimal === animalOption.petTypeName && styles.selectedOptionText,
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
  label: {
    fontSize: 16,
    marginBottom: 2,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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

export default ListaValoresAnimal;
