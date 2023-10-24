import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function BotonesFiltroServicios({ onFilterChange }) {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  const handleFilterPress = (filtro) => {
    const nuevoFiltro = filtro === filtroSeleccionado ? null : filtro;
    setFiltroSeleccionado(nuevoFiltro);
    onFilterChange(nuevoFiltro);
  };

  return (
    <View style={[styles.container, { flexDirection: 'row' }]}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filtroSeleccionado === 'VETERINARIA' && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress('VETERINARIA')}
      >
        <Image
          source={require('../../Imagenes/veterinaria.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Veterinaria</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filtroSeleccionado === 'PET SHOP' && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress('PET SHOP')}
      >
        <Image
          source={require('../../Imagenes/petshop.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Pet Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filtroSeleccionado === 'REFUGIO' && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress('REFUGIO')}
      >
        <Image
          source={require('../../Imagenes/refugios.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Refugios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 7,
    width: 90,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#DDC4B8',
  },
  imagenFiltro: {
    width: 55,
    height: 55,
  },
  textoFiltros: {
    marginTop: 5,
  },
});
