import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const FilterButtonsExample = () => {
  const [selectedFilter, setSelectedFilter] = useState(''); // Estado para almacenar el filtro seleccionado, inicializado a una cadena vacía

  // Datos de ejemplo para simular los elementos a filtrar
  const data = [
    { id: 1, title: 'Elemento 1', category: 'Perro' },
    { id: 2, title: 'Elemento 2', category: 'Gato' },
    { id: 3, title: 'Elemento 3', category: 'Perro' },
    { id: 4, title: 'Elemento 4', category: 'Conejo' },
    { id: 5, title: 'Elemento 5', category: 'Otros' },
    { id: 6, title: 'Elemento 6', category: 'Otros' },
    { id: 7, title: 'Elemento 7', category: 'Otros' },
    { id: 8, title: 'Elemento 8', category: 'Perro' },
    { id: 9, title: 'Elemento 9', category: 'Gato' },
    { id: 10, title: 'Elemento 10', category: 'Perro' },
    { id: 11, title: 'Elemento 11', category: 'Conejo' },
    { id: 12, title: 'Elemento 12', category: 'Otros' },
    { id: 13, title: 'Elemento 13', category: 'Otros' },
    { id: 14, title: 'Elemento 14', category: 'Otros' },
    { id: 15, title: 'Elemento 15', category: 'Otros' },
    { id: 16, title: 'Elemento 16', category: 'Otros' },
    // Añade más elementos si lo deseas
  ];

  const handleFilterPress = (filter) => {
    // Si el botón seleccionado es el mismo que el anterior, deseleccionarlo
    setSelectedFilter(prevFilter => (prevFilter === filter ? '' : filter));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
    </View>
  );

  // Filtrar los elementos según el filtro seleccionado o mostrar todos si no hay filtro seleccionado
  const filteredData = selectedFilter ? data.filter(item => item.category === selectedFilter) : data;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Perro' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Perro')}
        >
          <Image
            source={require('../Imagenes/perroFiltro.png')}
            style={styles.imagenFiltro}
          /> 
          <Text style={[styles.filterButtonText, selectedFilter === 'Perro' && styles.selectedFilterButtonText]}>Perro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Gato' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Gato')}
        >
          <Image
            source={require('../Imagenes/gato.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Gato' && styles.selectedFilterButtonText]}>Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Conejo' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Conejo')}
        >
          <Image
            source={require('../Imagenes/conejo.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Conejo' && styles.selectedFilterButtonText]}>Conejo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Otros' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Otros')}
        >
          <Image
            source={require('../Imagenes/animales.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Otros' && styles.selectedFilterButtonText]}>Otros</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 7,
    marginBottom: 15,
  },
  selectedFilterButton: {
    backgroundColor: '#DDC4B8',
  },
  filterButtonText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  selectedFilterButtonText: {
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imagenFiltro: {
    width: 60,
    height: 60,
    margin: 5,
  },
});

export default FilterButtonsExample;
