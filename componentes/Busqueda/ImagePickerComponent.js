import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ onImagesSelected }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(null);

  const options = {
    title: 'Seleccionar imagen',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Elegir de la galería',
    mediaType: 'photo',
    quality: 1,
  };

  const openGallery = async () => {
    if (selectedImages.length < 4) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("estoy adentro del distinto a cancelado")
        const updatedImages = [...selectedImages, result.uri];
        console.log("mostrando los url: ", updatedImages)
        setSelectedImages(updatedImages);
        console.log("mostrando los ya setteados : ", selectedImages)
        // Si no se ha seleccionado una imagen principal, establecer la primera como principal
        if (mainImageIndex === null) {
          setMainImageIndex(0);
        }

        // Llama a la función onImagesSelected con el nuevo arreglo de imágenes seleccionadas
        onImagesSelected(updatedImages);
      }
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    // Si la imagen principal es eliminada, seleccionar una nueva imagen principal si es posible
    if (mainImageIndex === index) {
      setMainImageIndex(null);
    }
  };

  const setMainImage = (index) => {
    setMainImageIndex(index);
  };

  return (
    <TouchableOpacity style={styles.botonGaleria} onPress={openGallery}>
      <Image
        source={require('../../Imagenes/fotos.png')}
        style={styles.foto}
      />
      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((uri, index) => (
          <TouchableOpacity
            key={uri}
            onPress={() => removeImage(index)}
            onLongPress={() => setMainImage(index)} // Establecer imagen como principal al mantener presionado
          >
            <Image
              source={{ uri }}
              style={[
                styles.selectedImage,
                mainImageIndex === index && styles.mainImage, // Aplicar estilo especial si es la imagen principal
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Ya elegiste 4 fotos!</Text>
            <Text style={styles.modalText}>Son suficientes para reconocer a tu mascota</Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  botonGaleria: {
    backgroundColor: '#DDC4B8',
    height: 100,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 100,
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
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  selectedImage: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
  },
  mainImage: {
    borderWidth: 2,
    borderColor: 'white', 
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
