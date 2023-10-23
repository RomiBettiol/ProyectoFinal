import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SlideModal from './SlideModal';

const BotonFlotante = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptionsPublications, setModalOptionsPublications] = useState(false);
  const route = useRoute();
  const { token } = route.params;

  const handleNavigateToPublicacion = () => {
    console.log("Nombre de la pantalla actual: " + route.name);
    console.log("handleNavigateToPublicacion se ejecutó");
    if (route.name === 'BusquedaScreen') {
      navigation.navigate('PublicacionBusqueda', { token });
    } else if (route.name === 'AdoptarScreen') {
      navigation.navigate('PublicacionAdopcion', { token });
    } else if (route.name === 'MiPerfil') {
      handleOpenModalOptionsPublications();
    } else if (route.name === 'ServiciosScreen') { 
      navigation.navigate('PublicarServicio', { token });
    }
  };

  const handleOpenModalOptionsPublications = () => {
    setModalOptionsPublications(true);
  };

  const handleCloseModalOptionsPublications = () => {
    setModalOptionsPublications(false); 
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
        onPress={() => {
          console.log("Botón Agregar presionado");
          handleNavigateToPublicacion();
        }}
      >
        <View style={styles.fab2}>
          <Image
            source={require('../Imagenes/agregar.png')}
            style={styles.imagenBoton}
          />
        </View>
      </TouchableOpacity>

      {/* Modal de opciones de publicación */}
      <Modal
        animationType="slide" // Puedes cambiar el tipo de animación según tus preferencias
        transparent={true}
        visible={modalOptionsPublications}
        onRequestClose={handleCloseModalOptionsPublications} // Maneja el cierre con el botón Atrás en Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicacionAdopcion', {token})
                handleCloseModalOptionsPublications();
              }}
            >
              <Text style={styles.opcionModal}>Publicación Adopción</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicacionBusqueda', {token})
                handleCloseModalOptionsPublications();
              }}
            >
              <Text style={styles.opcionModal}>Publicación Búsqueda</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicarServicio', {token})
                handleCloseModalOptionsPublications();
              }}
            >
              <Text style={styles.opcionModal}>Publicación Servicio</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.botonCloseText} onPress={handleCloseModalOptionsPublications}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  botonMenu: {
    marginBottom: 10,
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
    marginTop: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
  },
  modalContent: {
    backgroundColor: 'white',
    width: '50%', // Ajusta el ancho según tus preferencias
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeText: {
    backgroundColor: '#FFB984',
    borderRadius: 5,
    width: 80,
    height: 20,
    textAlign: 'center',
  },
  botonCloseText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
  },
  opcionModal: {
    marginLeft: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    padding: 5,
  },
});

export default BotonFlotante;