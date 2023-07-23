import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function BotonPublicar() {
  return (
    <TouchableOpacity style={styles.botonPublicar}>
        <Text style={styles.textoTouch}>Publicar</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    botonPublicar: {
        backgroundColor: '#FFB984',
        marginTop: 2,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textoTouch: {
        fontSize: 18,
      },
});
