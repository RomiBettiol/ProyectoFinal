import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

const Header = (token) => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtiene la prop route
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NotificacionesScreen',  token={token})}
        >
        <Image
          source={require('../Imagenes/notificacion.png')}
          style={styles.imagen1}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen',  token={token})}
      >
        <Image
          source={require('../Imagenes/logoHeader.png')}
          style={styles.imagen2}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => navigation.navigate('MisChats',  token={token})}
      >
        <Image
          source={require('../Imagenes/mensaje.png')}
          style={styles.imagen1}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#DDC4B8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imagen1: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
    marginTop: '110%',
  },
  imagen2: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
    marginTop: '55%',
  },
});

export default Header;
