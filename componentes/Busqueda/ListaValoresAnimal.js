import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListaValoresAnimal = ({ selectedAnimal, setSelectedAnimal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Animal</Text>
      <View style={[{ flexDirection: 'row' }, styles.contenedor2]}>
        <TouchableOpacity
          style={[styles.option, selectedAnimal === 'perro' && styles.selectedAnimal]}
          onPress={() => setSelectedAnimal('perro')}
        >
          <Text style={[styles.optionText, selectedAnimal === 'perro' && styles.selectedAnimalText]}>Perro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedAnimal === 'gato' && styles.selectedAnimal]}
          onPress={() => setSelectedAnimal('gato')}
        >
          <Text style={[styles.optionText, selectedAnimal === 'gato' && styles.selectedAnimalText]}>Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedAnimal === 'conejo' && styles.selectedAnimal]}
          onPress={() => setSelectedAnimal('conejo')}
        >
          <Text style={[styles.optionText, selectedAnimal === 'conejo' && styles.selectedAnimalText]}>Conejo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedAnimal === 'Otro' && styles.selectedAnimal]}
          onPress={() => setSelectedAnimal('Otro')}
        >
          <Text style={[styles.optionText, selectedAnimal === 'Otro' && styles.selectedAnimalText]}>Otro</Text>
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
  selectedAnimal: {
    backgroundColor: '#DDC4B8',
  },
  selectedAnimalText: {
    fontWeight: 'bold',
  },
  contenedor2: {
    justifyContent: 'center',
  }
});

export default ListaValoresAnimal;
