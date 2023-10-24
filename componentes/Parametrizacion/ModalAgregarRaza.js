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

const ModalAgregarRaza = ({
  isVisible,
  onClose,
  onAdd,
  petTypes,
  onSuccess,
  onError,
}) => {
  const [breedName, setBreedName] = useState("");
  const [selectedPetTypeId, setSelectedPetTypeId] = useState("");
  const [showPetTypeList, setShowPetTypeList] = useState(false);

  const handleAddRaza = async () => {
    if (!breedName || !selectedPetTypeId) {
      console.log(
        "Error",
        "Por favor, ingresa el nombre de la raza y selecciona un tipo de animal."
      );
      onError();
      return;
    }

    const newBreed = {
      petBreedName: breedName,
      idPetType: selectedPetTypeId,
    };

    await axios
      .post("https://buddy-app2.loca.lt/parameters/petBreed", newBreed)
      .then((response) => {
        console.log(response);
        onAdd(newBreed);
        setBreedName("");
        setSelectedPetTypeId("");
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
          <Text style={styles.tituloModal}>Agregar raza</Text>
          <Text style={styles.valorTexto}>Nombre de la raza</Text>
          <TextInput
            style={styles.inputRegion}
            value={breedName}
            onChangeText={setBreedName}
          />
          <TouchableOpacity
            style={styles.inputPicker}
            onPress={() => setShowPetTypeList(!showPetTypeList)}
          >
            <Text style={styles.regionDropdownText}>
              {selectedPetTypeId
                ? petTypes.find((type) => type.idPetType === selectedPetTypeId)
                    .petTypeName
                : "Seleccionar Tipo de Animal"}
            </Text>
          </TouchableOpacity>
          {showPetTypeList && ( // Conditionally render the ScrollView
            <ScrollView style={styles.provinceList}>
              {petTypes.map((type) => (
                <TouchableOpacity
                  key={type.idPetType}
                  style={styles.regionDropdownItem}
                  onPress={() => {
                    setSelectedPetTypeId(type.idPetType);
                    setShowPetTypeList(false);
                  }}
                >
                  <Text>{type.petTypeName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={[styles.botonesDecidir, { flexDirection: "row" }]}>
            <TouchableOpacity
              style={styles.botonesEditar}
              onPress={handleAddRaza}
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

export default ModalAgregarRaza;
