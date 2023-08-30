import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AgregarImagen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const options = {
    title: 'Seleccionar imagen',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Elegir de la galería',
    mediaType: 'photo',
    quality: 1,
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <TouchableOpacity style={styles.botonGaleria} onPress={openGallery}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      ) : (
        <>
          <Image source={require('../Imagenes/fotos.png')} style={styles.foto} />
          <Text style={styles.botonFoto}>Seleccionar foto</Text>
        </>
      )}
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Ya elegiste una foto!</Text>
            <Text style={styles.modalText}>¿Deseas reemplazarla?</Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={removeImage}>
              <Text style={styles.modalButtonText}>Reemplazar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default AgregarImagen;

const styles = StyleSheet.create({
  botonGaleria: {
    backgroundColor: '#DDC4B8',
    height: 100,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    elevation: 3,
  },
  foto: {
    width: 30,
    height: 30,
  },
  botonFoto: {
    fontSize: 14,
    marginTop: 10,
  },
  selectedImage: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#DDC4B8',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#EEE9E9',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});