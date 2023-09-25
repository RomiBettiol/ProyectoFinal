import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";

const ModalAgregarLocalidad = ({
  isVisible,
  onClose,
  onAdd,
  regions,
  onSuccess,
  onError,
}) => {
  const [localityName, setLocalityName] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [showRegionList, setShowRegionList] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAddLocalidad = () => {
    if (!localityName || !selectedRegionId) {
      console.log(
        "Error",
        "Por favor, ingresa el nombre de la localidad y selecciona una región."
      );
      onError();
      return;
    }

    const newLocalidad = {
      localityName: localityName,
      idRegion: selectedRegionId,
    };

    axios
      .post(
        ` https://e860-181-91-230-36.ngrok-free.app/parameters/locality`,
        newLocalidad
      )
      .then((response) => {
        onAdd(newLocalidad);
        setLocalityName("");
        setSelectedRegionId("");
        setShowSuccess(true);
        onSuccess();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error en la solicitud POST:", error.response.data);
          onError();
        } else {
          console.error("Error en la solicitud POST:", error.message);
          onError();
        }
      });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tituloModal}>Agregar localidad</Text>
          <Text style={styles.valorTexto}>Nombre de la localidad</Text>
          <TextInput
            style={styles.inputRegion}
            value={localityName}
            onChangeText={setLocalityName}
          />
          <TouchableOpacity
            style={styles.inputPicker}
            onPress={() => setShowRegionList(!showRegionList)}
          >
            <Text style={styles.regionDropdownText}>
              {selectedRegionId
                ? regions.find((region) => region.idRegion === selectedRegionId)
                    .regionName
                : "Seleccionar Región"}
            </Text>
          </TouchableOpacity>
          {showRegionList && (
            <ScrollView style={styles.provinceList}>
              {regions.map((region) => (
                <TouchableOpacity
                  key={region.idRegion}
                  style={styles.regionDropdownItem}
                  onPress={() => {
                    setSelectedRegionId(region.idRegion);
                    setShowRegionList(false);
                  }}
                >
                  <Text>{region.regionName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={[styles.botonesDecidir, { flexDirection: "row" }]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleAddLocalidad}
            >
              <Text style={styles.addButtonLabel}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text style={styles.closeButtonLabel}>Cerrar</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.6,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  tituloModal: {
    fontSize: 20,
    textAlign: "center",
  },
  inputRegion: {
    backgroundColor: "#EEE9E9",
    width: "100%",
    height: 32,
    borderRadius: 5,
    paddingLeft: 8,
  },
  valorTexto: {
    marginTop: 15,
    marginBottom: 5,
  },
  valorFiltro: {
    marginTop: 20,
  },
  inputPicker: {
    backgroundColor: "#EEE9E9",
    width: "100%",
    height: 32,
    borderRadius: 5,
    paddingLeft: 8,
    justifyContent: "center",
    marginTop: 10,
  },
  provinceList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    marginTop: 5,
  },
  botonesDecidir: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "#FFB984",
  },
});

export default ModalAgregarLocalidad;
