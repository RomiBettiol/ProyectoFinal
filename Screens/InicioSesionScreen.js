import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Image } from 'react-native-elements';
import { ImageBackground} from 'react-native';
import Registro from '../componentes/Registro';
import { navigation } from '@react-navigation/native'; 

export function InicioSesionScreen({navigation}){
  return(
    <ImageBackground
      source={require('../Imagenes/Fondo2.png')}
      style={styles.backgroundImage}
    >
        <View style={styles.contenedor1}>
            <Text style={styles.titulo}>¡HOLA!</Text>
            <Text style={styles.subtitulo}>Bienvenido a BUDDY!</Text>
        </View>
        <Registro />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 50,
    marginBottom: '5%',
  },

  subtitulo: {
    fontSize: 30,
  },

  contenedor1: {
    marginTop: '50%',
    alignItems: 'center',
  },
});