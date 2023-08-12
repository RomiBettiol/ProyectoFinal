import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBarExample = ({ data, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text); // Llamar a la función onSearch del componente padre para enviar los resultados filtrados.
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        onChangeText={handleSearch}
        value={searchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: '#EEE9E9',
    backgroundColor: '#EEE9E9',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
});

export default SearchBarExample;
