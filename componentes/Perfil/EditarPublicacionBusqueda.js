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
} from "react-native";
import HeaderScreen from "../HeaderScreen";
import ListaValoresColor from "../Busqueda/ListaValoresColor";
import ListaValoresAnimal from "../Busqueda/ListaValoresAnimal";
import ListaValoresZona from "../Busqueda/ListaValoresZona";
import ListaValoresRazaPerros from "../Busqueda/ListaValoresRazaPerros";
import Mascotas from "../Busqueda/Mascotas";
import ListaValoresDias from "../Busqueda/ListaValoresDias";
import ListaValoresMeses from "../Busqueda/ListaValoresMeses";
import ListaValoresAño from "../Busqueda/ListaValoresAño";
import ImagePickerComponent from "../Busqueda/ImagePickerComponent";
import BotonPublicar from "../Busqueda/BotonPublicar";
import axios from "axios";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook
import { useNavigation } from "@react-navigation/native";

export default function EditarPublicacionBusqueda({ route }) {
  const [isValid, setIsValid] = useState(true);
  const { publicationToEdit } = route.params;
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [title, setTitle] = useState(publicationToEdit.title);
  const [description, setDescription] = useState(publicationToEdit.description);
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
  const { token } = route.params;
  const navigation = useNavigation();

  const idPublicationSearch = publicationToEdit.idPublicationSearch;
  console.log("Publicacion búsqueda: ", idPublicationSearch);

  const handleEndEditing = () => {
    if (4 < title.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log(isValid);
  };

  const actualizarPublicacion = async () => {
    const longitude = 12.09812;
    const latitude = 34.56789;
    const images = "";
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    try {
      console.log("Información a actualizar:", {
        title,
        description,
        selectedColorId,
        selectedAnimalId,
        selectedBreedId,
        selectedLocality,
        idPublicationSearch,
        formattedDate,
        latitude,
        longitude,
        selectedIsFound,
      });

      const response = await axios.put(
<<<<<<< HEAD
        `  https://buddy-app2.loca.lt/publications/publication/${idPublicationSearch}?modelType=search`,
=======
        ` https://e860-181-91-230-36.ngrok-free.app/publications/publication/${idPublicationSearch}?modelType=search`,
>>>>>>> feature/servicios
        {
          title,
          description,
          longitude,
          latitude,
          images,
          idPetType: selectedAnimalId,
          idPetBreed: selectedBreedId,
          idPetColor: selectedColorId,
          idLocality: selectedLocality,
          isFound: selectedIsFound,
          lostDate: formattedDate,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

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
      setIsSuccessful(false);
      setModalMessage("Hubo un error al actualizar la publicación");
      setIsModalVisible(true);
      console.error("Error al actualizar la publicación:", error);

      // Agregar este código para ocultar el modal después de 1 segundo en caso de error
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000); // 1000 milisegundos = 1 segundo
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
              style={styles.inputTexto}
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
      <BotonPublicar disabled={!isValid} onPress={actualizarPublicacion} />
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
