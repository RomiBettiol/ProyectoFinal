import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importa la librería de selección de imágenesimport HeaderScreen from '../HeaderScreen';
import ListaValoresColor from "../Busqueda/ListaValoresColor";
import ListaValoresAnimal from "../Busqueda/ListaValoresAnimal";
import ListaValoresZona from "../Busqueda/ListaValoresZona";
import ListaValoresRazaPerros from "../Busqueda/ListaValoresRazaPerros";
import ListaValoresRazaGatos from "../Busqueda/ListaValoresRazaGatos";
import Mascotas from "../Busqueda/Mascotas";
import ListaValoresDiasMascota from "../MiMascota/ListaValoresDiasMascota";
import ListaValoresMesesMascota from "../MiMascota/ListaValoresMesesMascota";
import ListaValoresAñoMascota from "../MiMascota/ListaValoresAñoMascota";
import AgregarImagen from "../AgregarImagen";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import axios from "axios"; // Importa la librería axios
import { Dropdown } from "react-native-element-dropdown";

import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../../src/aws-exports";
Amplify.configure(awsconfig);

export default function NuevaMascota({
  navigation,
  token,
  onCloseNuevaMascota,
}) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showModal, setShowModal] = useState(false); // Agrega el estado para el modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addPetSuccess, setAddPetSuccess] = useState(false);
  const [idPetBreed, setIdPetBreed] = useState("");
  const [idPetType, setIdPetType] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [petTypeOptions, setPetTypeOptions] = useState();
  const [petBreedOptions, setPetBreedOptions] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const [linkAWS, setLinkAWS] = useState(null); // Nuevo estado para almacenar el enlace de la imagen en Amazon S3

  ///// upload image ////
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  ////end upload img ////

  const authtoken = token;
  console.log("token en agregarmascota: " + token);
  console.log("authtoken: " + authtoken);

  const [petData, setPetData] = useState({
    petName: "",
    birthDate: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal); // Cambiar el estado del modal
  };

  useEffect(() => {
    if (addPetSuccess) {
      // Espera un breve momento antes de mostrar el modal de éxito
      const timer = setTimeout(() => {
        setShowSuccessModal(true);
        setAddPetSuccess(false); // Reinicia la variable de éxito
      }, 500); // Puedes ajustar el tiempo según tus preferencias

      // Limpia el temporizador si el componente se desmonta antes de que se complete
      return () => clearTimeout(timer);
    }
  }, [addPetSuccess]);
  useEffect(() => {
    console.log(idPetType);
    console.log(idPetBreed);
    // Obtener tipos de mascotas
    axios
      .get("https://8396-191-82-3-33.ngrok-free.app/parameters/petType")
      .then((response) => {
        // Mapear los datos para obtener un array de opciones
        const petTypeOptions = response.data.petTypes.map((petType) => ({
          label: petType.petTypeName,
          value: petType.idPetType,
        }));
        // Guardar las opciones en el estado
        setPetTypeOptions(petTypeOptions);
        console.log(petTypeOptions);
        console.log("tipo de mascota obtenido con exito");
      })
      .catch((error) => {
        console.log("Error al obtener tipos de mascotas:", error);
      });
    console.log(linkAWS);
  }, []);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCloseNuevaMascota(); // Cierra el modal NuevaMascota
  };

  const uploadFile = async (file) => {
    const img = await fetchImageUri(file.uri);
    return Storage.put(`my-image-filename${Math.random()}.jpg`, img, {
      level: "public",
      contentType: file.type,
      progressCallback(uploadProgress) {
        console.log(
          "PROGRESS--",
          uploadProgress.loaded + "/" + uploadProgress.total
        );
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

  const handleImageSelected = (imageUri) => {
    setSelectedImage(imageUri); // Almacena la imagen seleccionada en el estado
    console.log("hola imag ", selectedImage);
  };

  const handleSubAddPet = async () => {
    try {
      if (selectedImage) {
        // Subir la imagen a Amazon S3 y obtener el enlace
        const awsImageKey = await uploadFile(selectedImage);

        // Construye el enlace completo a la imagen en Amazon S3
        const awsImageLink = `https://proyfinalbuddybucket201616-dev.s3.sa-east-1.amazonaws.com/public/${awsImageKey}`;

        // Guarda el enlace en el estado
        setLinkAWS(awsImageLink);

        // Continúa con la solicitud POST al backend
        await sendPetData(awsImageLink);
      } else {
        // Si no hay imagen seleccionada, solo envía la solicitud POST sin el enlace de la imagen
        await sendPetData(null);
      }

      // Habilita el botón nuevamente después de dos segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, si es necesario
    }
  };

  const sendPetData = async (imageLink) => {
    const authtoken = token;
    const config = {
      headers: {
        "auth-token": authtoken,
      },
    };

    const data = {
      petName: petData.petName,
      birthDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
      idPetType: selectedAnimalId,
      idPetBreed: selectedBreedId,
      image: imageLink, // Agrega el enlace de la imagen al objeto data
    };

    console.log(data);

    const response = await axios.post(
      "https://8396-191-82-3-33.ngrok-free.app/mypet/pet/",
      data,
      config
    );

    console.log("Respuesta del servidor:", response.data);

    toggleModal();

    setAddPetSuccess(true);
  };

  const options = {
    title: "Seleccionar imagen",
    cancelButtonTitle: "Cancelar",
    takePhotoButtonTitle: "Tomar foto",
    chooseFromLibraryButtonTitle: "Elegir de la galería",
    mediaType: "photo",
    quality: 1,
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>AGREGAR MASCOTA</Text>
          <TouchableOpacity style={styles.botonGaleria} onPress={openGallery}>
            {selectedImage ? (
              <Image source={{ uri: linkAWS }} style={styles.selectedImage} />
            ) : (
              <>
                <Image
                  source={require("../../Imagenes/fotos.png")}
                  style={styles.foto}
                />
                <Text style={styles.botonFoto}>Seleccionar foto</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Nombre</Text>
            <TextInput
              style={styles.inputTexto}
              value={petData.petName}
              onChangeText={(text) => setPetData({ ...petData, petName: text })}
            />
          </View>
          <View style={styles.subtitulo}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
          </View>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
            <ListaValoresMesesMascota setSelectedMonth={setSelectedMonth} />
            {selectedMonth && (
              <ListaValoresDiasMascota
                selectedMonth={selectedMonth} // Pasa el mes seleccionado
                selectedValue={selectedDay} // Pasa el día seleccionado
                setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
              />
            )}
            <ListaValoresAñoMascota
              setSelectedValue={setSelectedYear}
              selectedValue={selectedYear}
            />
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.label}>Tipo de Animal</Text>
          </View>

          <ScrollView horizontal={true}>
            <View>
              <ListaValoresAnimal
                selectedAnimal={selectedAnimal}
                setSelectedAnimal={setSelectedAnimal}
                setSelectedAnimalId={setSelectedAnimalId}
              />
            </View>
          </ScrollView>

          <View style={[styles.dropdown, { borderRadius: 100 }]}>
            {selectedAnimal && (
              <ListaValoresRazaPerros
                selectedAnimal={selectedAnimal}
                setSelectedBreedId={setSelectedBreedId}
              />
            )}
          </View>

          <View style={styles.subcontenedor5}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleSubAddPet}
              disabled={isButtonDisabled}
            >
              <Text style={styles.closeButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        message="Mascota creada correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 2,
  },
  subtitulo: {
    textAlign: "left",
    width: "90%",
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 35,
    padding: 5,
  },
  dropdown: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    margin: 10,
    padding: 0,
    justifyContent: "center",
  },

  titulo: {
    marginTop: 10,
    fontSize: 22,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
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
    marginTop: 10,
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

  subcontenedor3: {
    marginTop: 25,
    marginLeft: 30,
  },
  subcontenedor4: {
    marginTop: 15,
    justifyContent: "center",
    marginBottom: 25,
  },
  tarjeta: {
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 15,
    padding: 15,
  },
  subcontenedor5: {
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#FFB984",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 35,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  botonGaleria: {
    backgroundColor: "#DDC4B8",
    height: 100,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#DDC4B8",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#EEE9E9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  modalButtonText: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "center",
  },
});
