import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SearchBarExample = ({ data, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text); // Llamar a la función onSearch del componente padre para enviar los resultados filtrados.
  };

  return (
    <View style={[styles.container,{flexDirection: 'row'}]}>
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
    padding: 5,
    marginTop: 15,
  },
  searchInput: {
    height: 40,
    width: '95%',
    borderColor: '#EEE9E9',
    backgroundColor: '#EEE9E9',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 5,
  },
  imagenFiltrar:{
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default SearchBarExample;
