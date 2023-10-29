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

const ModalAgregarTipoAnimal = ({
  isVisible,
  onClose,
  onAdd,
  newTypeName,
  setNewTypeName,
  legsNumber,
  setLegsNumber,
  diet,
  setDiet,
  enviroment,
  setEnviroment,
  coat,
  setCoat,
  weather,
  setWeather,
  token,
}) => {

  const handleAgregarTipoAnimalClick = () => {
    const tipoAnimalData = {
      nombre: newTypeName,
      weather: weather,
      legsNumber: legsNumber,
      diet: diet,
      enviroment: enviroment,
      coat: coat,
      weather: weather,
    };

    onAdd(tipoAnimalData); // Pasar los datos de la nueva provincia a la función para agregar
    onClose(); // Cerrar el modal después de agregar
    setNewTypeName("");
    setLegsNumber("");
    setDiet("");
    setEnviroment("");
    setCoat("");
    setWeather("");
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tituloModal}>Agregar</Text>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nombre</Text>
            <TextInput
              style={styles.inputLocalities}
              value={newTypeName}
              onChangeText={setNewTypeName}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.valorFiltro]}>
            <Text style={styles.valorTexto}>Nº Patas</Text>
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
              onPress={handleAgregarTipoAnimalClick}
            >
              <Text>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text>Cancelar</Text>
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

export default ModalAgregarTipoAnimal;
