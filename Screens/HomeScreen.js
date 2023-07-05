import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.home}>
        <View>
            <TouchableOpacity style={styles.boton1}>
                <Image
                    source={require('../Imagenes/lupa.png')}
                    style={styles.imagen1}
                />
                <Text>Encontrar mi mascota</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton1}>
                <Image
                    source={require('../Imagenes/huella.png')}
                    style={styles.imagen1}
                />
                <Text>Adoptar una mascota</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.boton1}>
            <Image
                source={require('../Imagenes/veterinario.png')}
                style={styles.imagen1}
            />
            <Text>Servicios para mi mascota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton1}>
            <Image
                source={require('../Imagenes/huella.png')}
                style={styles.imagen1}
            />
            <Text>Mi mascota</Text>
        </TouchableOpacity>
    </View>
  ) 
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#DDC4B8',
    },

    imagen1: {
        width: 60,
        height: 60,
    },

    boton1: {
        width: '35%',
        height: 160,
        backgroundColor: '#ffffff',
        elevation: 10,
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})