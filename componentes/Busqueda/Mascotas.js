import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListaValoresAnimal = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={[{flexDirection: 'row'}, styles.contenedor2]}>
        <TouchableOpacity
            style={[styles.option, selectedOption === 'perdida' && styles.selectedOption]}
            onPress={() => handleOptionSelect('perdida')}
        >
            <Text style={[styles.optionText, selectedOption === 'perdida' && styles.selectedOptionText]}>Mascota perdida</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.option, selectedOption === 'encontrada' && styles.selectedOption]}
            onPress={() => handleOptionSelect('encontrada')}
        >
            <Text style={[styles.optionText, selectedOption === 'encontrada' && styles.selectedOptionText]}>Mascota encontrada</Text>
        </TouchableOpacity>
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
  contenedor2: {
    justifyContent: 'center',
    marginTop: 15,
  }
});

export default ListaValoresAnimal;
