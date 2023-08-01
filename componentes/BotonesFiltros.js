import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const FilterButtonsExample = () => {
  const [selectedFilter, setSelectedFilter] = useState(''); // Estado para almacenar el filtro seleccionado, inicializado a una cadena vacía
  const [publicaciones, setPublicaciones] = useState([]); // Estado para almacenar las publicaciones

  const getPublicaciones = () => {
    // Hacer la petición GET al backend usando axios
    axios
      .get('http://10.0.2.2:4000/publication/publications?modelType=adoption', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta exitosa:', response.data);
        
        // Extraer los datos necesarios del backend y guardarlos en el estado 'publicaciones'
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          setPublicaciones(data);
        } else {
          setPublicaciones([]); // Si no se obtuvieron datos válidos, restablecer el estado a un arreglo vacío
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setPublicaciones([]); // En caso de error, asegurarse de restablecer el estado a un arreglo vacío
      });
  };  

  const handleFilterPress = (filter) => {
    // Si el botón seleccionado es el mismo que el anterior, deseleccionarlo
    setSelectedFilter(prevFilter => (prevFilter === filter ? '' : filter));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
    </View>
  );

  // Llamar a getPublicaciones cuando el componente se monte
  useEffect(() => {
    getPublicaciones();
  }, []);

  // Filtrar los elementos según el filtro seleccionado o mostrar todos si no hay filtro seleccionado
  const filteredData = selectedFilter ? publicaciones.filter(item => item.category === selectedFilter) : publicaciones;

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
        data={publicaciones} // Usar el estado 'publicaciones' en lugar de la variable 'filteredData'
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
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 7,
  },
  selectedFilterButton: {
    backgroundColor: '#DDC4B8',
  },
  filterButtonText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
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
