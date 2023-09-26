import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function BotonesFiltroServicios() {
  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <TouchableOpacity style={styles.filterButton}>
        <Image
          source={require('../../Imagenes/veterinaria.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Veterinaria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Image
          source={require('../../Imagenes/petshop.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Pet Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Image
          source={require('../../Imagenes/refugios.png')}
          style={styles.imagenFiltro}
        />
        <Text style={styles.textoFiltros}>Refugios</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
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
    imagenFiltro: {
      width: 55,
      height: 55,
    },
    textoFiltros: {
      marginTop: 5,
    },
  });