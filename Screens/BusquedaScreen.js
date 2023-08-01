import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusqueda from '../componentes/BarraBusqueda';
import BotonesFiltros from '../componentes/BotonesFiltros';
import BotonFlotante from '../componentes/BotonFlotante';
import axios from 'axios';

export default function BusquedaScreen() {
  const navigation = useNavigation();
  const [publicaciones, setPublicaciones] = useState([]); // Estado para almacenar las publicaciones

  const getPublicaciones = () => {
    // Hacer la petición GET al backend usando axios
    axios
      .get('http://10.0.2.2:4000/publication/publications?modelType=adoption', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta exitosa:', response.data);

        // Extraer los datos necesarios del backend y guardarlos en el estado 'publicaciones'
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          setPublicaciones(data);
        } else {
          setPublicaciones([]); // Si no se obtuvieron datos válidos, restablecer el estado a un arreglo vacío
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setPublicaciones([]); // En caso de error, asegurarse de restablecer el estado a un arreglo vacío
      });
  };

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Encuentra a tu mascota</Text>
          <TouchableOpacity onPress={getPublicaciones}>
            <Text>Obtener Publicaciones</Text>
          </TouchableOpacity>
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
