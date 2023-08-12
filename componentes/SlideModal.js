import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, TouchableWithoutFeedback, Image} from 'react-native';
import BusquedaScreen from '../Screens/BusquedaScreen';
import InicioScreen from '../Screens/InicioScreen';

const SlideModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const handleModalOpen = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleModalClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const handleBackgroundPress = () => {
    // Close the modal when the background is pressed
    handleModalClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleModalClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0], // Adjust the value to control the slide distance
                  }),
                },
              ],
            },
          ]}
        >
          {/* Content of the modal */}
          <View style={[styles.usuario]}>
            <Image
                source={require('../Imagenes/usuario.png')}
                style={styles.imagenUsuario}
            />
            <TouchableOpacity>
                <Text style={styles.textoUsuario}>Nombre del usuario</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.opciones} onPress={() => navigation.navigate('BusquedaScreen')}>
                <View style={[{flexDirection: 'row'}, styles.view]}>
                <Image
                    source={require('../Imagenes/lupa.png')}
                    style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Buscar mascota</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opciones}>
                <View style={[{flexDirection: 'row'}, styles.view]}>
                <Image
                    source={require('../Imagenes/mascota.png')}
                    style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Adoptar mascota</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opciones}>
                <View style={[{flexDirection: 'row'}, styles.view]}>
                <Image
                    source={require('../Imagenes/perro.png')}
                    style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Servicios</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opciones}>
                <View style={[{flexDirection: 'row'}, styles.view]}>
                <Image
                    source={require('../Imagenes/huella.png')}
                    style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Mi mascota</Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewCerrarSesion}>
            <TouchableOpacity style={styles.touchableCerrarSesion} onPress={() => navigation.navigate('InicioScreen')}>
                <View style={styles.viewCerrarSesion}>
                    <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
                </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#DDC4B8',
    padding: 16,
    width: 650,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'right',
  },
  textoModal: {
    color: 'black',
    textAlign: 'right',
    fontSize: 20,
  },
  imagenMenu: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 3,
  },
  opciones: {
    marginTop: 25,
  },
  viewCerrarSesion: {
    marginTop: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  cerrarSesion: {
    fontSize: 14,
    marginRight: 45,
  },
  textoUsuario: {
    fontSize: 20,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 20,
  },
  usuario: {
    width: 210,
    height: 100,
    alignItems: 'center',
    marginBottom: 140,
  },
  imagenUsuario:{
    width: 60,
    height: 60,
    marginLeft: 8,
    backgroundColor: '#DDC4B8',
    borderRadius: 30,
    marginBottom: 10,
  },
});

export default SlideModal;