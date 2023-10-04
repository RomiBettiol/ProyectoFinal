  import React, { useState } from 'react';
  import { View, Text, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Image, Pressable } from 'react-native';
  import * as ImagePicker from 'expo-image-picker'; // Importa la librería de selección de imágenesimport HeaderScreen from '../HeaderScreen';
  import HeaderScreen from '../HeaderScreen';
  import ListaValoresColor from '../Busqueda/ListaValoresColor';
  import ListaValoresAnimal from '../Busqueda/ListaValoresAnimal';
  import ListaValoresZona from '../Busqueda/ListaValoresZona';
  import ListaValoresRazaPerros from '../Busqueda/ListaValoresRazaPerros';
  import ImagePickerComponent from '../Busqueda/ImagePickerComponent';  
  import BotonPublicar from '../Busqueda/BotonPublicar';
  import axios from 'axios';
  import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
  import { useNavigation } from '@react-navigation/native';

  import { Amplify, Storage } from 'aws-amplify';
  import awsconfig from '../../src/aws-exports';
  Amplify.configure(awsconfig);

  export default function EditarPublicacionAdopcion({ route }) {
    const [isValid, setIsValid] = useState(true);
    const { publicationToEdit } = route.params;
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    console.log('publicationToEdit.title:', publicationToEdit.title);
    const [title, setTitle] = useState(publicationToEdit.title);
    const [description, setDescription] = useState(publicationToEdit.description);
    const [contactPhone, setContactPhone] = useState(String(publicationToEdit.contactPhone));
    const [selectedColorId, setSelectedColorId] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');
    const [selectedBreedId, setSelectedBreedId] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);
    const { token } = route.params;
    const navigation = useNavigation();

  const idPublicationAdoption = publicationToEdit.idPublicationAdoption;
  console.log("Publicacion adopcion: ", idPublicationAdoption);

    //donde guardo las imagenes
    const [selectedImages, setSelectedImages] = useState([]);

    ///// upload image ////
    const fetchImageUri = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    }
  
    const uploadFile = async (file) => {
      const img = await fetchImageUri(file);
      return Storage.put(`my-image-filename${Math.random()}.jpg`, img, {
        level: 'public',
        contentType: file.type,
        progressCallback(uploadProgress) {
          console.log('PROGRESS--', uploadProgress.loaded + '/' + uploadProgress.total);
        },
      })
        .then((res) => {
          // Retorna la clave (key) de la imagen en Amazon S3
          return res.key;
        })
        .catch((e) => {
          console.log(e);
          throw e; // Lanza una excepción para manejar errores en la función llamante
        });
    };
      // Función para manejar la selección de imágenes
    const handleImagesSelected = (images) => {
      console.log("probando esto: ", images);
      setSelectedImages(images);
      console.log("probando esto: ", selectedImages);
    };

    const handleEndEditing = () => {
      if (4 < title.length) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      console.log(isValid)
    };

    const handlePut = async (imagenes) => {
      try {
        console.log('Información a actualizar:', {
          title,
          description,
          contactPhone,
          selectedColorId,
          selectedAnimalId,
          selectedBreedId,
          selectedLocality,
          idPublicationAdoption,
          imagenes,
        });
    
        const response = await axios.put(
          `https://buddy-app1.loca.lt/publications/publication/${idPublicationAdoption}?modelType=adoption`,
          {
            title: title,
            description: description,
            contactPhone: contactPhone,
            idPetColor: selectedColorId,
            idPetType: selectedAnimalId,
            idPetBreed: selectedBreedId,
            idLocality: selectedLocality,
            idPublicationAdoption: idPublicationAdoption,
            images: imagenes,
          },
          {
            headers: {
              'auth-token': token,
            },
          }
        );
    
        setIsModalVisible(true);

        if (response.status === 200) {
          setIsSuccessful(true);
          setModalMessage('Publicación actualizada con éxito');
        } else {
          setIsSuccessful(false);
          setModalMessage('Hubo un error al actualizar la publicación');
        }

        setTimeout(() => {
          setIsModalVisible(false); // Cierra el modal después de 1 segundo
          navigation.navigate('HomeScreen', {token}); // Redirige al perfil
        }, 1000); // 1000 milisegundos = 1 segundo
      } catch (error) {
        setIsSuccessful(false);
        setModalMessage('Hubo un error al actualizar la publicación');
        setIsModalVisible(true);
        console.error('Error al actualizar la publicación:', error);
      }
    };

    //imagenes

    const handleSubAddPut = async () => {
      console.log("Al presionar el boton: ", selectedImages);
      try {
        if (selectedImages && selectedImages.length > 0) {
          console.log("Antes de subirlas: ", selectedImages);
          let imageUrls = [];
          
          // Subir las imágenes a AWS S3 y obtener las URLs
          for (const selectedImage of selectedImages) {
            // Subir la imagen a Amazon S3 y obtener el enlace
            const awsImageKey = await uploadFile(selectedImage);
            
            // Construye el enlace completo a la imagen en Amazon S3
            const awsImageLink = `https://proyfinalbuddybucket201616-dev.s3.sa-east-1.amazonaws.com/public/${awsImageKey}`;
            
            // Guarda el enlace en el estado
            imageUrls.push(awsImageLink);
            console.log("Después de subirlas: ", imageUrls);
          }
          
          // Continúa con la solicitud PUT al backend
          await handlePut(imageUrls);
        } else {
          // Si no hay imágenes seleccionadas, solo envía la solicitud PUT sin el enlace de la imagen
          await handlePut(null);
        }
      } catch (error) {
        console.error('Error:', error);
        // Maneja el error, si es necesario
      }
    };

  //FIN imagenes

    return (
      <View style={styles.container}>
        <HeaderScreen  token={token} />
        <ScrollView style={styles.scroll}>
          <View style={styles.contenedor1}>
            <Text style={styles.titulo}>Edita tu mascota</Text>
            <ImagePickerComponent onImagesSelected={handleImagesSelected} />
            <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
              <Text style={styles.tituloPublicacion}>Titulo</Text>
              <TextInput
                style={styles.inputTexto}
                value={title}
                onChangeText={setTitle}
                onEndEditing={handleEndEditing}
              />
            </View>
            {!isValid && <Text style={styles.errorTextCaracteres}>Ingresa al menos 4 caracteres.</Text>}
            <View style={styles.subcontenedor2}>
              <Text style={styles.descripcionPublicacion}>Descripción</Text>
              <TextInput
                style={styles.inputDescripcion}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                textAlignVertical="top"
                maxLength={1000}
              />
            </View>
              <View style={styles.subcontenedor3}>
                <Text style={styles.tipoAnimal}>Tipo de animal</Text>
                <ScrollView
                  horizontal={true} // Hace que el ScrollView sea horizontal
                  contentContainerStyle={{ flexDirection: 'row' }} // Establece la dirección de los elementos hijos como horizontal
                >
                  <ListaValoresAnimal selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} setSelectedAnimalId={setSelectedAnimalId} />
                </ScrollView>
                  <ListaValoresColor selectedColorId={selectedColorId} setSelectedColorId={setSelectedColorId} />
                  <ListaValoresZona selectedLocality={selectedLocality} setSelectedLocality={setSelectedLocality} />
                  {selectedAnimal && (
                    <ListaValoresRazaPerros selectedAnimal={selectedAnimal} setSelectedBreedId={setSelectedBreedId} />
                  )}
              </View>
              <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
                <Text style={styles.tituloPublicacion}>Celular</Text>
                <TextInput
                  style={styles.inputTexto}
                  value={contactPhone}
                  onChangeText={text => {
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setContactPhone(numericValue);
                  }}
                />
              </View>
          </View>
          {!isValid && (
            <Text style={styles.errorTextCaracteres}>
              Ingresa al menos 4 caracteres.
            </Text>
          )}
          <View style={styles.subcontenedor2}>
            <Text style={styles.descripcionPublicacion}>Descripción</Text>
            <TextInput
              style={styles.inputDescripcion}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              textAlignVertical="top"
              maxLength={1000}
            />
          </View>
          <View style={styles.subcontenedor3}>
            <Text style={styles.tipoAnimal}>Tipo de animal</Text>
            <ScrollView
              horizontal={true} // Hace que el ScrollView sea horizontal
              contentContainerStyle={{ flexDirection: "row" }} // Establece la dirección de los elementos hijos como horizontal
            >
              <ListaValoresAnimal
                selectedAnimal={selectedAnimal}
                setSelectedAnimal={setSelectedAnimal}
                setSelectedAnimalId={setSelectedAnimalId}
              />
            </ScrollView>
            <ListaValoresColor
              selectedColorId={selectedColorId}
              setSelectedColorId={setSelectedColorId}
            />
            <ListaValoresZona
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
            />
            {selectedAnimal && (
              <ListaValoresRazaPerros
                selectedAnimal={selectedAnimal}
                setSelectedBreedId={setSelectedBreedId}
              />
            )}
          </View>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Celular</Text>
            <TextInput
              style={styles.inputTexto}
              value={contactPhone}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setContactPhone(numericValue);
              }}
            />
        </View>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View
            style={[
              styles.modalContainer,
              isSuccessful
                ? styles.successModalBackground
                : styles.errorModalBackground,
            ]}
          >
            <View style={[styles.modalContent, styles.bottomModalContent]}>
              <Text
                style={[
                  styles.modalMessage,
                  isSuccessful
                    ? styles.successModalText
                    : styles.errorModalText,
                ]}
              >
                {modalMessage}
              </Text>
            </View>
            </View>
          </Modal>
        </ScrollView>
        <BotonPublicar disabled={!isValid} onPress={handleSubAddPut} />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 20,
    fontSize: 22,
    marginLeft: 15,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
  },
  inputTexto: {
    backgroundColor: "#EEE9E9",
    width: "70%",
    height: 32,
    borderRadius: 100,
    textAlign: "center",
  },
  tituloPublicacion: {
    marginRight: 20,
    fontSize: 16,
  },
  textoFecha: {
    marginLeft: 37,
    fontSize: 16,
  },
  subcontenedor1: {
    marginTop: 25,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontenedor2: {
    marginTop: 25,
    width: "100%",
    justifyContent: "center",
  },
  descripcionPublicacion: {
    fontSize: 16,
    marginLeft: "8%",
  },
  inputDescripcion: {
    backgroundColor: "#EEE9E9",
    width: "85%",
    height: 100,
    borderRadius: 30,
    padding: 20,
    marginTop: 15,
    marginLeft: "8%",
  },
  subcontenedor3: {
    marginTop: 25,
    marginLeft: 30,
  },
  subcontenedor4: {
    margin: 15,
    justifyContent: "center",
  },
  successModalBackground: {
    backgroundColor: "green",
    marginTop: "180%",
  },
  successModalText: {
    color: "white",
  },
  errorModalBackground: {
    backgroundColor: "red", // Cambiar a azul o el color que desees
    marginTop: "180%",
    margin: 20,
    borderRadius: 10,
  },
  errorModalText: {
    color: "white", // Cambiar a blanco o el color de texto deseado
  },
  bottomModalContent: {
    alignItems: "flex-end", // Alinea el contenido del modal en el extremo inferior
    padding: 20,
  },
  errorTextCaracteres: {
    color: "red",
    marginLeft: 40,
  },
  tipoAnimal: {
    marginLeft: "3%",
    fontSize: 16,
  },
});
