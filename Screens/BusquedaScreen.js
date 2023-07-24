import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusqueda from '../componentes/BarraBusqueda';
import BotonesFiltros from '../componentes/BotonesFiltros';
import BotonFlotante from '../componentes/BotonFlotante';

export default function BusquedaScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Encuentra a tu mascota</Text>
          <BarraBusqueda />
          <BotonesFiltros />
          <BotonFlotante />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 20,
    fontSize: 22,
    marginLeft: 15,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
  },
});
