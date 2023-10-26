import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import axios from "axios";

const ModalEditarTipoAnimal = ({
  isVisible,
  onClose,
  onEdit,
  editingType,
  onSuccessUpdate,
  onErrorUpdate,
  token,
}) => {
  const [typeName, setTypeName] = useState("");
  const [legsNumber, setLegsNumber] = useState("");
  const [diet, setDiet] = useState("");
  const [enviroment, setEnviroment] = useState("");
  const [coat, setCoat] = useState("");
  const [weather, setWeather] = useState("");

  const handleEditType = () => {
    axios
      .put(
        `https://romibettiol.loca.lt/parameters/petType/${editingType.idPetType}`,
        {
          petTypeName: typeName,
          legsNumber: legsNumber,
          diet: diet,
          enviroment: enviroment,
          coat: coat,
          weather: weather,
        },
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        onEdit(typeName);
        setTypeName(""); // Vaciar el TextInput
        setLegsNumber("");
        setDiet("");
        setEnviroment("");
        setCoat("");
        setWeather("");
        onSuccessUpdate();
        onClose(); // Cerrar el modal
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error en la solicitud PUT:", error.response.data);
          onErrorUpdate();
        } else {
          console.error("Error en la solicitud PUT:", error.message);
          onErrorUpdate();
        }
      });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tituloModal}>Editar Tipo de Animal</Text>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nombre</Text>
            <TextInput
              style={styles.inputLocalities}
              value={typeName}
              onChangeText={setTypeName}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>N° Patas</Text>
            <TextInput
              style={styles.inputLocalities}
              value={legsNumber}
              onChangeText={setLegsNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Dieta</Text>
            <TextInput
              style={styles.inputLocalities}
              value={diet}
              onChangeText={setDiet}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Habitad</Text>
            <TextInput
              style={styles.inputLocalities}
              value={enviroment}
              onChangeText={setEnviroment}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Pelaje</Text>
            <TextInput
              style={styles.inputLocalities}
              value={coat}
              onChangeText={setCoat}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Clima</Text>
            <TextInput
              style={styles.inputLocalities}
              value={weather}
              onChangeText={setWeather}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.botonesDecidir]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleEditType}
            >
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.6, // 60% del ancho de la pantalla
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  tituloModal: {
    fontSize: 20,
    textAlign: "center",
  },
  inputLocalities: {
    backgroundColor: "#EEE9E9",
    width: "70%",
    height: 32,
    borderRadius: 100,
    textAlign: "center",
    marginLeft: 20,
  },
  valorTexto: {
    marginTop: 5,
  },
  valorFiltro: {
    marginTop: 20,
  },
  botonesEditar: {
    width: "40%",
    backgroundColor: "red",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 30,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: "#FFB984",
  },
});

export default ModalEditarTipoAnimal;
