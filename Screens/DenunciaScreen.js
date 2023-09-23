import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HeaderScreen from '../componentes/HeaderScreen'

export default function DenunciaScreen({navigation}) {
  return (
    <View>
        <HeaderScreen />
      <Text style={styles.titulo}>Denuncias Pendientes</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 25,
        marginTop: 20,
        marginLeft: 35,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        padding: 5,
    },
})