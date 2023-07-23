import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const SearchBarExample = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Datos de ejemplo para simular los resultados de búsqueda
  const data = [
    { id: 1, title: 'Perro' },
    { id: 2, title: 'Gato' },
    { id: 3, title: 'Perdido' },
    { id: 4, title: 'Encontrado' },
  ];

  const handleSearch = (text) => {
    setSearchText(text);

    // Filtrar los datos basados en el texto de búsqueda
    const filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        onChangeText={handleSearch}
        value={searchText}
      />
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
  },
  searchInput: {
    height: 40,
    borderColor: '#EEE9E9',
    backgroundColor: '#EEE9E9',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDC4B8',
    marginLeft: 15,
    marginRight: '60%',
  },
});

export default SearchBarExample;
