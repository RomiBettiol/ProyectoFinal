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

const ModalEditarRaza = ({
  isVisible,
  onClose,
  onEdit,
  editingBreed,
  onSuccessUpdate,
  onErrorUpdate,
  token,
}) => {
  const [breedName, setBreedName] = useState("");
  const [esperanzaVida, setEsperanzaVida] = useState("");
  const [temperamento, setTemperamento] = useState("");
  const [tamaño, setTamaño] = useState("");

  const handleEditBreed = () => {
    axios
      .put(
        `https://romibettiol.loca.lt/parameters/petBreed/${editingBreed.idPetBreed}`,
        {
          petBreedName: breedName,
          size: tamaño,
          temperament: temperamento,
          lifespan: esperanzaVida
        },
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        onEdit(breedName);
        setBreedName(""); // Vaciar el TextInput
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
          <Text style={styles.tituloModal}>Editar Raza</Text>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nombre</Text>
            <TextInput
              style={styles.inputLocalities}
              value={breedName}
              onChangeText={setBreedName}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Esperanza de vida</Text>
            <TextInput
              style={styles.inputVida}
              value={esperanzaVida}
              onChangeText={setEsperanzaVida}
              keyboardType="numeric"
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Temperamento</Text>
            <TextInput
              style={styles.inputTemperamento}
              value={temperamento}
              onChangeText={setTemperamento}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Tamaño</Text>
            <TextInput
              style={styles.inputLocalities}
              value={tamaño}
              onChangeText={setTamaño}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.botonesDecidir]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleEditBreed}
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
  inputVida: {
    backgroundColor: "#EEE9E9",
    width: "40%",
    height: 32,
    borderRadius: 100,
    textAlign: "center",
    marginLeft: 20,
  },
  inputTemperamento: {
    backgroundColor: "#EEE9E9",
    width: "50%",
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

export default ModalEditarRaza;
