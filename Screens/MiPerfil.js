import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Header from '../componentes/HeaderScreen'

export default function MiPerfil({navigation}) {
  return (
    <View>
      <Header />
      <View style={[styles.principal, {flexDirection: 'row'}]}>
        <Image
          source={require('../Imagenes/usuario.png')}
          style={styles.imagenUsuario}
        />
        <View>
        <Text>Nombre del usuario</Text>
        <Text style={styles.titulo}>MI PERFIL</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagenUsuario: {
    width: 70,
    height: 70,
  },
  titulo: {
    marginLeft: 15,
    fontSize: 25,
    marginTop: 10,
  },
});