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

const ModalEditarRegion = ({
  isVisible,
  onClose,
  onEdit,
  editingRegion,
  onSuccessUpdate,
  onErrorUpdate,
  token,
}) => {
  const [regionName, setRegionName] = useState("");
  const [extension, setExtension] = useState("");
  const [population, setPopulation] = useState("");

  const handleEditRegion = () => {
    axios
      .put(
        `https://romibettiol.loca.lt/parameters/region/${editingRegion.idRegion}`,
        {
          regionName: regionName,
          surface: extension,
          population: population
        },
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        onEdit(regionName);
        setRegionName(""); // Vaciar el TextInput
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
          <Text style={styles.tituloModal}>Editar Región</Text>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nombre</Text>
            <TextInput
              style={styles.inputLocalities}
              value={regionName}
              onChangeText={setRegionName}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Extension</Text>
            <TextInput
              style={styles.inputLocalities}
              value={extension}
              onChangeText={setExtension}
              keyboardType="numeric"
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Poblacion</Text>
            <TextInput
              style={styles.inputLocalities}
              value={population}
              onChangeText={setPopulation}
              keyboardType="numeric"
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.botonesDecidir]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleEditRegion}
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

export default ModalEditarRegion;
