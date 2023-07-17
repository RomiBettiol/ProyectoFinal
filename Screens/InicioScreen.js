import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Image } from 'react-native-elements';
import { ImageBackground} from 'react-native';
import { navigation } from '@react-navigation/native';
import {AccountScreen} from './Account/AccountScreen';

export default function InicioScreen({navigation}){
  return(
    <ImageBackground
      source={require('../Imagenes/Fondo.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
            source={require('../Imagenes/logo.png')}
            style={styles.imagen}
          />
        <View style={styles.container2}>
          <Text style={styles.subtitulo1}>Una aplicación para mascotas</Text>
          <TouchableOpacity style={[styles.boton,styles.shadowProp]}
            onPress = {()=> (
              navigation.navigate('AccountScreen')
            )}
          >
            <Text style={styles.texto}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.texto}>¿Todavía no te unis?</Text>
            <TouchableOpacity>
              <Text>Regístrate</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },

  boton:{
    borderRadius: 10,
    marginTop: '10%',
    backgroundColor: '#FFB984',
    width: '50%',
    height: '15%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    marginBottom: '10%',
    alignItems: 'center',
    elevation: 10,
  },

  container2: {
    marginTop: '30%',
    backgroundColor: '#DDC4B8',
    alignItems:'center',
    justifyContent: 'flex-start',
    paddingTop: '17%',
    borderTopRightRadius: 160,
    borderTopLeftRadius: 160,
    width: '100%',
    height: '50%'
  },

  imagen: {
    width: '100%', 
    height: '100%',
    marginRight: '10%',
  },

  container: {
    justifyContent: 'space-around',
  },

  subtitulo1: {
    fontSize: 20,
  },

  texto: {
    fontSize: 16,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});





