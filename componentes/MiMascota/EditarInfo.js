import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function EditarInfo({ visible, onClose, info, mascotaId }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [titleInformation, setTitleInformation] = useState(
    info.titleInformation || ""
  );
  const [descriptionInformation, setDescriptionInformation] = useState(
    info.descriptionInformation || ""
  );

  const handleEditeInfo = async () => {
    const idInformation = info.idInformation; // Obtén la ID de la mascota desde los props
    const updatedData = {
      titleInformation: titleInformation,
      descriptionInformation: descriptionInformation, // Agregar a los datos actualizados
    };
    console.log(info.idInformation);
    try {
      const response = await axios.put(
        `https://8396-191-82-3-33.ngrok-free.app/mypet/information/${mascotaId}/${idInformation}`,
        {
          titleInformation: updatedData.titleInformation,
          descriptionInformation: updatedData.descriptionInformation,
        }
      );
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    }

    setOverlayVisible(false); // Cierra el overlay después de eliminar
  };

  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Contenido de la tarjeta modal */}
          <Text style={styles.titulo}>EDITAR INFO</Text>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={titleInformation}
              onChangeText={setTitleInformation}
              editable={true}
            />
          </View>
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={descriptionInformation}
              onChangeText={setDescriptionInformation}
            />
          </View>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor5]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleEditeInfo}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose(); // Cerrar el modal EditarTurno
        }}
        message="Información editada correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage="Complete todos los campos"
        onClose={() => setShowErrorModal(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    elevation: 10,
    borderRadius: 25,
    padding: 20,
    width: windowWidth * 0.95,
    height: windowHeight * 0.45,
    textAlign: "center",
    alignItems: "center", // Para centrar horizont
  },
  titulo: {
    fontSize: 22,
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
  inputTexto: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    height: 32,
    borderRadius: 100,
    paddingStart: 5,
    marginHorizontal: 2,
    textAlign: "center",
  },
  inputTextoDescripcion: {
    backgroundColor: "#EEE9E9",
    width: "100%",
    height: 60,
    borderRadius: 10,
    textAlign: "center",
    marginVertical: 20,
  },
  textoFecha: {
    fontSize: 16,
    marginTop: 10,
  },
  subcontenedor4: {
    flexDirection: "row",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#FFB984",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 40,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
  },
  subcontenedor1: {
    textAlign: "center",
    alignItems: "center", // Para centrar horizontal
    width: "95%",
  },
  horaInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    backgroundColor: "#EEE9E9",
    padding: 5,
    borderRadius: 20,
    width: "35%",
    fontSize: 18,
    textAlign: "center",
  },
  inputDivider: {
    fontSize: 24,
    marginRight: 5,
  },
  tituloDescripcion: {
    marginStart: 0,
    marginTop: 10,
  },
});
