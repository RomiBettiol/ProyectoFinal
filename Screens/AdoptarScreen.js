import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BotonFlotante from '../componentes/BotonFlotante';
import BotonesFiltrosAdopcion from '../componentes/Adopcion/BotonesFiltrosAdopcion';

export default function AdoptarScreen() {
  const navigation = useNavigation();
  const [buttonTransform, setButtonTransform] = useState(0);

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>¡Adopta una mascota!</Text>
          <BotonesFiltrosAdopcion />
        </View>
      </ScrollView>
      <View style={[styles.botonFlotanteContainer, { transform: [{ translateY: buttonTransform }] }]}>
            <BotonFlotante />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 5,
    fontSize: 22,
    marginLeft: 15,
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
  },
  botonFlotanteContainer: {
    position: 'absolute',
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
});
