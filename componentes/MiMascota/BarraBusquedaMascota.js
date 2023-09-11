// BarraBusqueda.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


export default function BarraBusquedaMascota({ searchText, onSearchTextChange }) {
    return (
      
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchText}
            onChangeText={onSearchTextChange}
        />
        
        
    );
}

const styles = StyleSheet.create({
  
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