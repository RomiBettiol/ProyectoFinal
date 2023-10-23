import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Mascotas() {
  const navigation = useNavigation();
 
  return (
    <View style={styles.container}>
        <View style={styles.contenedor2}>
           <View style={styles.contenedor3}>
                <Image
                        // source={require( imagen seleccionada en agregar mascota)}
                        style={styles.imagMascota}
                />
                <Text style={styles.nombreMascota}>
                    //nombre ingresado en agregar mascota
                </Text>
                <View style={styles.iconos}>
                    <Image
                            source={require('../../Imagenes/editar.png')}
                            style={styles.icono}
                    />
                    <Image
                            source={require('../../Imagenes/basurin.png')}
                            style={styles.icono}
                    />
                </View>
            </View> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#DDC4B8',
  },
  contenedor2: {
    alignItems:'center',
    marginTop:5,
  },
  contenedor3: {
    width:200,
    height:200,
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 10,
    alignItems:'center',
    position: 'relative',
    marginTop:15,
   
  },
  imagMascota:{
    borderRadius:50,
    height:100,
    width:100,
    margin:15,
  },
  nombreMascota:{
    fontSize:14,
    margin:5,
  },
  iconos:{
    //alignContent:'right',
    position: 'absolute', // Posicionamiento absoluto para los iconos
    bottom: 8, // Alinear en la parte inferior
    right: 20, // Alinear en la parte izquierda
    flexDirection: 'row', // Alinear los iconos en fila
    marginBottom: 5, // Agregar margen inferior para separar los iconos del contenido
  },
  icono:{
    height:15,
    width:15,
    margin:5,
    
  },

});