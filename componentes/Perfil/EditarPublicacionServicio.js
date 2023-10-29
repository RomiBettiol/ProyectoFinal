import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderScreen from "../../componentes/HeaderScreen";
import ImagePickerComponent from "../../componentes/Busqueda/ImagePickerComponent";
import ListaValoresZona from "../../componentes/Busqueda/ListaValoresZona";
import BotonPublicar from "../../componentes/Busqueda/BotonPublicar";
import ListaValoresTipoServicios from "../../componentes/Serivicios/ListaValoresTipoServicios";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../../src/aws-exports";
Amplify.configure(awsconfig);

export default function PublicarServicio() {
  const navigation = useNavigation();
  const route = useRoute(); // Obtiene la prop route
  const { token, servicio } = route.params;
  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [numero3, setNumero3] = useState("");
  const [numero4, setNumero4] = useState("");
  const [abierto24h, setAbierto24h] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHourValid, setIsHourValid] = useState(true);
  const [isMinuteValid, setIsMinuteValid] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const idService = servicio.idService;

  console.log("ID Service desde editar servicio: ", idService);

  //donde guardo las imagenes
  const [selectedImages, setSelectedImages] = useState([]);

  ///// upload image ////
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadFile = async (file) => {
    const img = await fetchImageUri(file);
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
  // Función para manejar la selección de imágenes
  const handleImagesSelected = (images) => {
    console.log("probando esto: ", images);
    setSelectedImages(images);
    console.log("probando esto: ", selectedImages);
  };

  const handlePublicarClick = async (imagenes) => {
    // Formatear los números para tener dos dígitos
    const formattedNumero1 = numero1.padStart(2, "0");
    const formattedNumero2 = numero2.padStart(2, "0");
    const formattedNumero3 = numero3.padStart(2, "0");
    const formattedNumero4 = numero4.padStart(2, "0");
    const openTime = `${formattedNumero1}:${formattedNumero2}:00`;
    const closeTime = `${formattedNumero3}:${formattedNumero4}:00`;
    const petTypesData = [
      { idPetType: "a44fd4a2-2287-4605-9a69-46929d0dfa84" },
    ];
    const images = imagenes;

    // Mostrar la información que se va a enviar en la consola
    console.log("Información que se va a enviar:", {
      serviceTitle: title,
      serviceDescription: description,
      address: address,
      open24hs: abierto24h,
      emailService: email,
      images: images,
      idServiceType: selectedServiceTypeId,
      idLocality: selectedLocality,
      openTime: openTime,
      closeTime: closeTime,
      petTypes: petTypesData,
    });

    try {
      const response = await axios.put(
        `https://62ed-190-177-142-160.ngrok-free.app /services/service/${idService}`,
        {
          serviceTitle: title,
          serviceDescription: description,
          address: address,
          open24hs: abierto24h,
          emailService: email,
          images: imagenes,
          idServiceType: selectedServiceTypeId,
          idLocality: selectedLocality,
          openTime: openTime,
          closeTime: closeTime,
          petTypes: petTypesData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      console.log("Información que se envía:", response.data);
      console.log("Éxito", "El servicio ha sido editado correctamente.");

      setIsModalVisible(true);

      if (response.status === 200) {
        setIsSuccessful(true);
        setModalMessage("Publicación actualizada con éxito");
      } else {
        setIsSuccessful(false);
        setModalMessage("Hubo un error al actualizar la publicación");
      }

      setTimeout(() => {
        setIsModalVisible(false); // Cierra el modal después de 1 segundo
        navigation.navigate("HomeScreen", { token }); // Redirige al perfil
      }, 1000); // 1000 milisegundos = 1 segundo
    } catch (error) {
      if (error.response) {
        setIsSuccessful(false);
        setModalMessage("Por favor, complete todos los campos");
        setIsModalVisible(true);
      } else if (error.request) {
        setIsSuccessful(false);
        setModalMessage("Por favor, complete todos los campos");
        setIsModalVisible(true);
        //console.error("No se recibió respuesta del servidor");
      } else {
        setIsSuccessful(false);
        setModalMessage("Por favor, complete todos los campos");
        setIsModalVisible(true);
        //console.error("Error al realizar la solicitud:", error.message);
      }
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
        await handlePublicarClick(imageUrls);
      } else {
        // Si no hay imágenes seleccionadas, solo envía la solicitud PUT sin el enlace de la imagen
        await handlePublicarClick(null);
      }
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, si es necesario
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const isValidHour = (hour) => {
    return /^(0[0-9]|1[0-9]|2[0-3])$/.test(hour);
  };

  const isValidMinute = (minute) => {
    return /^[0-5]?[0-9]$/.test(minute);
  };

  const handleEndEditing = () => {
    const isTitleValid = title.length >= 4;
    const isEmailValid = isValidEmail(email);

    setIsValid(isTitleValid && isEmailValid);
    setIsEmailValid(isEmailValid);

    if (!isTitleValid) {
      console.log("Error", "El título debe tener al menos 4 caracteres.");
    }

    if (!isEmailValid && email.length > 0) {
      console.log("Error", "Por favor, escriba un e-mail válido.");
    }
  };

  const handleNumero1Change = (text) => {
    console.log("handleNumero1Change:", text);
    if (isValidHour(text)) {
      setNumero1(text);
      setIsHourValid(true);
    } else {
      setNumero1(text);
      setIsHourValid(false);
    }
    console.log("isHourValid:", isHourValid);
  };

  const handleNumero2Change = (text) => {
    if (isValidMinute(text)) {
      setNumero2(text);
      setIsMinuteValid(true);
    } else {
      setNumero2(text);
      setIsMinuteValid(false);
    }
  };

  const handleNumero3Change = (text) => {
    if (isValidHour(text)) {
      setNumero3(text);
      setIsHourValid(true);
    } else {
      setNumero3(text);
      setIsHourValid(false);
    }
  };

  const handleNumero4Change = (text) => {
    if (isValidMinute(text)) {
      setNumero4(text);
      setIsMinuteValid(true);
    } else {
      setNumero4(text);
      setIsMinuteValid(false);
    }
  };

  useEffect(() => {
    // Hacer la solicitud GET al servidor con el idService
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `https://62ed-190-177-142-160.ngrok-free.app /services/service/${idService}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        // Manejar los datos de la respuesta aquí
        const serviceDetails = response.data;
        console.log("Detalles del servicio:", serviceDetails);
        setTitle(serviceDetails[0].serviceTitle);
        setDescription(serviceDetails[0].serviceDescription);
        setAddress(serviceDetails[0].address);
        console.log("titulo: ", title);
      } catch (error) {
        console.error("Error al obtener detalles del servicio:", error);
      }
    };

    fetchServiceDetails();
  }, []);

  console.log("Titulo: ", title);

  const handleTipoServicioSeleccionado = (idServiceType) => {
    // Manejar el ID del tipo de servicio seleccionado aquí
    setSelectedServiceTypeId(idServiceType);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Editá tu servicio</Text>
          <ImagePickerComponent onImagesSelected={handleImagesSelected} />
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={[styles.inputTexto, !isValid && styles.inputError]}
              value={title} // Usar el estado local 'title' como valor del input
              onChangeText={setTitle} // Puedes eliminar esta línea si no necesitas que el input sea editable
              onEndEditing={handleEndEditing}
            />
          </View>
          {!isValid && (
            <Text style={styles.errorTextCaracteres}>
              Ingresa al menos 4 caracteres.
            </Text>
          )}
        </View>
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
        <View style={styles.subcontenedor4}>
          <Text style={styles.tituloPublicacion}>E-mail</Text>
          <TextInput
            style={styles.inputTextoDireccion}
            value={email}
            onChangeText={setEmail}
            onEndEditing={handleEndEditing}
          />
          {!isEmailValid && (
            <Text style={styles.errorText}>
              Por favor, escriba un e-mail válido.
            </Text>
          )}
        </View>
        <View style={styles.zona}>
          <ListaValoresZona
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
          />
        </View>
        <View style={styles.subcontenedor4}>
          <Text style={styles.tituloPublicacion}>Dirección</Text>
          <TextInput
            style={styles.inputTextoDireccion}
            value={address}
            onChangeText={setAddress}
            onEndEditing={handleEndEditing}
          />
        </View>
        <Text style={styles.descripcionPublicacion}>Tipo de servicio</Text>
        <ListaValoresTipoServicios
          selectedServiceType={selectedServiceType}
          setSelectedServiceType={setSelectedServiceType}
          setSelectedServiceTypeId={setSelectedServiceTypeId}
        />
        <Text style={styles.descripcionPublicacion}>Horario de atención</Text>
        <View style={[styles.hora, { flexDirection: "row" }]}>
          <TextInput
            style={[styles.inputTexto2, !isHourValid && styles.inputError]}
            value={numero1}
            onChangeText={handleNumero1Change}
            keyboardType="numeric"
            maxLength={2}
            placeholder="HH"
          />
          <Text style={styles.separadorHora}>:</Text>
          <TextInput
            style={[styles.inputTexto2, !isMinuteValid && styles.inputError]}
            value={numero2}
            onChangeText={handleNumero2Change}
            keyboardType="numeric"
            maxLength={2}
            placeholder="MM"
          />
          <Text style={styles.separadorHora}>-</Text>
          <TextInput
            style={[styles.inputTexto2, !isHourValid && styles.inputError]}
            value={numero3}
            onChangeText={handleNumero3Change}
            keyboardType="numeric"
            maxLength={2}
            placeholder="HH"
          />
          <Text style={styles.separadorHora}>:</Text>
          <TextInput
            style={[styles.inputTexto2, !isMinuteValid && styles.inputError]}
            value={numero4}
            onChangeText={handleNumero4Change}
            keyboardType="numeric"
            maxLength={2}
            placeholder="MM"
          />
        </View>
        {!isHourValid && (
          <Text style={styles.errorText}>
            El formato de la hora debe ser HH (0 a 24).
          </Text>
        )}
        {!isMinuteValid && (
          <Text style={styles.errorText}>
            El formato de los minutos debe ser MM (0 a 59).
          </Text>
        )}
        <View style={[styles.switchContainer, { flexDirection: "row" }]}>
          <Switch
            value={abierto24h}
            onValueChange={setAbierto24h}
            trackColor={{ false: "#EB2727", true: "#8ADC58" }}
            thumbColor={abierto24h ? "#ffffff" : "#ffffff"}
          />
          <Text style={styles.open24hs}>Abierto 24hs</Text>
        </View>
      </ScrollView>
      <BotonPublicar
        onPress={handleSubAddPut}
        disabled={!isValid || !isEmailValid || !isHourValid || !isMinuteValid}
      />
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
          <View
            style={[
              styles.bottomModalContent,
              isSuccessful
                ? styles.successModalContent
                : styles.errorModalContent,
            ]}
          >
            <Text
              style={[
                styles.modalMessage,
                isSuccessful ? styles.successModalText : styles.errorModalText,
              ]}
            >
              {modalMessage}
            </Text>
          </View>
        </View>
      </Modal>
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
  subcontenedor4: {
    marginTop: 20,
    fontSize: 22,
    marginLeft: 40,
    marginBottom: 15,
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
  inputTextoDireccion: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    height: 35,
    borderRadius: 100,
    textAlign: "center",
    marginTop: 10,
  },
  tituloPublicacion: {
    marginRight: 20,
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
  errorTextCaracteres: {
    color: "red",
    marginLeft: 40,
  },
  zona: {
    marginLeft: 28,
  },
  inputTexto2: {
    backgroundColor: "#EEE9E9",
    width: "20%",
    height: 50,
    borderRadius: 100,
    textAlign: "center",
  },
  separadorHora: {
    fontSize: 22,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  hora: {
    marginLeft: 10,
    marginTop: 15,
  },
  open24hs: {
    marginTop: 12,
    fontSize: 16,
  },
  switchContainer: {
    marginTop: 16,
    marginLeft: 28,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo borroso semi-transparente
    justifyContent: "flex-end", // Alinear en la parte inferior
  },
  modalContentError: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  errorModalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo rojo para el modal de error
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: "white",
    textAlign: "right",
  },
  modalButton: {
    fontSize: 16,
    color: "#007BFF", // Color del enlace para cerrar el modal
  },
  successModal: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50, // Ajusta el margen inferior según tus preferencias
  },
  successModalContent: {
    backgroundColor: "#8ADC58",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  errorModalContent: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  errorModalText: {
    color: "white",
  },
});
