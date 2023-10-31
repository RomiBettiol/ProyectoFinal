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

const ModalEditarProvincia = ({
  isVisible,
  onClose,
  onEdit,
  editingProvince,
  onSuccessUpdate,
  onErrorUpdate,
  token,
}) => {
  const [provinceName, setProvinceName] = useState("");
  const [clima, setClima] = useState("");
  const [densidad, setDensidad] = useState("");
  const [extension, setExtension] = useState("");
  const [poblacion, setPoblacion] = useState("");

  const handleEditProvince = () => {
    axios
      .put(
        `https://37e1-186-12-32-189.ngrok-free.app/parameters/province/${editingProvince.idProvince}`,
        {
          provinceName: provinceName,
          weather: clima,
          population: poblacion,
          surface: extension,
          populationDensity: densidad,
        },
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        onEdit(provinceName);
        setProvinceName(""); // Vaciar el TextInput
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
          <Text style={styles.tituloModal}>Editar Provincia</Text>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nombre</Text>
            <TextInput
              style={styles.inputLocalities}
              value={provinceName}
              onChangeText={setProvinceName}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Clima</Text>
            <TextInput
              style={styles.inputLocalities}
              value={clima}
              onChangeText={setClima}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Densidad</Text>
            <TextInput
              style={styles.inputLocalities}
              value={densidad}
              onChangeText={setDensidad}
              keyboardType="numeric"
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
              value={poblacion}
              onChangeText={setPoblacion}
              keyboardType="numeric"
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.botonesDecidir]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleEditProvince}
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

export default ModalEditarProvincia;
