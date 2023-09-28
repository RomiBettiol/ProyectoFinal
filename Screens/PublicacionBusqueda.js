import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import ListaValoresColor from "../componentes/Busqueda/ListaValoresColor";
import ListaValoresAnimal from "../componentes/Busqueda/ListaValoresAnimal";
import ListaValoresZona from "../componentes/Busqueda/ListaValoresZona";
import ListaValoresRazaPerros from "../componentes/Busqueda/ListaValoresRazaPerros";
import Mascotas from "../componentes/Busqueda/Mascotas";
import ListaValoresDias from "../componentes/Busqueda/ListaValoresDias";
import ListaValoresMeses from "../componentes/Busqueda/ListaValoresMeses";
import ListaValoresAño from "../componentes/Busqueda/ListaValoresAño";
import ImagePickerComponent from "../componentes/Busqueda/ImagePickerComponent";
import BotonPublicar from "../componentes/Busqueda/BotonPublicar";
import axios from "axios";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook

export default function PublicacionBusqueda({ navigation }) {
  const [isValid, setIsValid] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [selectedIsFound, setSelectedIsFound] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;

  const handleEndEditing = () => {
    if (4 < title.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log(isValid);
  };

  const handlePost = async () => {
    const images = "";
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    try {
      const postData = {
        title,
        description,
        images,
        idPetType: selectedAnimalId,
        idPetBreed: selectedBreedId,
        idPetColor: selectedColorId,
        idLocality: selectedLocality,
        isFound: selectedIsFound,
        lostDate: formattedDate,
      };

      console.log("Datos a publicar:", postData);
      const config = {
        headers: {
          "auth-token": token,
        },
      };
      const response = await axios.post(
        "  https://2f6b-181-91-230-36.ngrok-free.app/publications/publication/search",
        postData,
        config
      );
      console.log("Solicitud POST exitosa:", response.data);
      setIsSuccessful(true);
      setIsModalVisible(true);
      setModalMessage("¡Publicación exitosa!");
      setTimeout(() => {
        setIsModalVisible(false); // Cierra el modal después de 2 segundos
        setTimeout(() => {
          navigation.navigate("HomeScreen", { token }); // Navega a 'HomeScreen' después de 5 segundos
        }, 1000); // 1000 milisegundos = 1 segundos
      }, 2000); // 2000 milisegundos = 2 segundos
      // Maneja el éxito, muestra un mensaje de éxito, navega, etc.
    } catch (error) {
      //console.error('Error al realizar la solicitud POST:', error);
      setIsSuccessful(false);
      setIsModalVisible(true);
      setModalMessage(
        "Publicación fallida, por favor complete todos los campos"
      );
      setTimeout(() => {
        setIsModalVisible(false); // Cierra el modal después de 3 segundos
      }, 2000); // 2000 milisegundos = 2 segundos
      // Maneja el error, muestra un mensaje de error, etc.
      // Maneja el error, muestra un mensaje de error, etc.
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Publica tu mascota</Text>
          <ImagePickerComponent />
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={[styles.inputTexto, !isValid && styles.inputError]}
              value={title}
              onChangeText={setTitle}
              onEndEditing={handleEndEditing}
            />
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
          <Mascotas
            selectedIsFound={selectedIsFound}
            onOptionSelect={setSelectedIsFound}
          />
          <Text style={styles.textoFecha}>Fecha de extravío</Text>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
            <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
            {selectedMonth && (
              <ListaValoresDias
                selectedMonth={selectedMonth}
                setSelectedDay={setSelectedDay}
              />
            )}
            <ListaValoresAño setSelectedYear={setSelectedYear} />
          </View>
        </View>
      </ScrollView>
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
                isSuccessful ? styles.successModalText : styles.errorModalText,
              ]}
            >
              {modalMessage}
            </Text>
          </View>
        </View>
      </Modal>
      <BotonPublicar disabled={!isValid} onPress={handlePost} />
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
  tipoAnimal: {
    marginLeft: "3%",
    fontSize: 16,
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
  iconos: {
    height: 30,
    width: 30,
  },
});
