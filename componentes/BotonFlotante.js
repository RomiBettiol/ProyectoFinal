import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SlideModal from './SlideModal';

const BotonFlotante = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { token } = route.params;
  
  console.log("prueba en boton flotante: "+ token);
  const handleNavigateToPublicacion = () => {
    if (route.name === 'BusquedaScreen') {
      navigation.navigate('PublicacionBusqueda', {token});
    } else if (route.name === 'AdoptarScreen') {
      navigation.navigate('PublicacionAdopcion', {token});
    }
  };
  
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonMenu} onPress={handleOpenModal}>
        <View style={styles.fab}>
          <Image
            source={require('../Imagenes/menu.png')}
            style={styles.imagenBoton}
          />
        </View>
      </TouchableOpacity>
      <SlideModal visible={modalVisible} onClose={handleCloseModal} />
      <TouchableOpacity
        style={styles.botonCrear}
        onPress={handleNavigateToPublicacion}
      >
        <View style={styles.fab2}>
          <Image
            source={require('../Imagenes/agregar.png')}
            style={styles.imagenBoton}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // Para posicionar el contenedor en la esquina inferior derecha
    bottom: 20, // Margen inferior para ajustar la posición vertical de los botones
    right: 20, // Margen derecho para ajustar la posición horizontal de los botones
  },
  botonMenu: {
    marginBottom: 10, // Ajustar el espacio vertical entre los botones
  },
  fab: {
    backgroundColor: '#DDC4B8',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  botonCrear: {
    marginTop: 10, // Ajustar el espacio vertical entre los botones
  },
  fab2: {
    backgroundColor: '#FFB984',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  imagenBoton: {
    width: 40,
    height: 40,
  },
});

export default BotonFlotante;
