import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import PublicacionBusqueda from '../Screens/PublicacionBusqueda';
import { useNavigation } from '@react-navigation/native';

const BotonFlotante = () => {

  const navigation = useNavigation();

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.botonMenu}>
          <View style={styles.fab}>
            <Image
              source={require('../Imagenes/menu.png')}
              style={styles.imagenBoton}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCrear}
          onPress = {()=> (
            navigation.navigate('PublicacionBusqueda')
          )}
        >
          <View style={styles.fab2}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenBoton}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  botonMenu: {
    position: 'absolute',
    bottom: 120,
    right: 25,
  },
  botonCrear: {
    position: 'absolute',
    bottom: 190,
    right: 25,
  },
  fab: {
    backgroundColor: '#DDC4B8',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fab2: {
    backgroundColor: '#FFB984',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  imagenBoton: {
    width: 40,
    height: 40,
  }
});

export default BotonFlotante;
