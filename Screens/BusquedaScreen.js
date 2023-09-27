import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BotonesFiltros from '../componentes/BotonesFiltros';
import BotonFlotante from '../componentes/BotonFlotante';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

export default function BusquedaScreen() {
  const navigation = useNavigation();
  const [buttonTransform, setButtonTransform] = useState(0);
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;
  
  return (
    <View style={styles.container}>
      <HeaderScreen  token={token}/>
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Encuentra a tu mascota</Text>
          <BotonesFiltros />
        </View>
      </ScrollView>
      <View style={[styles.botonFlotanteContainer, { transform: [{ translateY: buttonTransform }] }]}>
            <BotonFlotante token={token} />
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
