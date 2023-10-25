import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const DenunciasModalServicio = ({
  visible,
  onClose,
  selectedPublicationToReport,
  token,
  selectedUserToReport,
}) => {
  const [motivo, setMotivo] = useState("");

  console.log("idPublication desde denuncia: ", selectedPublicationToReport);
  console.log("idUser desde denuncia: ", selectedUserToReport);

  const handleDenunciar = (token) => {
    const complaintData = {
      category: "SERVICE",
      complaintDescription: motivo,
      idUserReported: selectedUserToReport,
      idReference: selectedPublicationToReport,
    };

    console.log("Datos de denuncia:", complaintData); // Imprimir los datos de la denuncia

    // Realizar la solicitud POST utilizando Axios
    axios
      .post("https://romibettiol.loca.lt/security/complaint/", complaintData, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data); // Imprimir la respuesta del servidor
        onClose();
      })
      .catch((error) => {
        console.error("Error al enviar la denuncia:", error); // Imprimir detalles del error
      });
  };

  const handleCancelar = () => {
    setMotivo(""); // Restablecer el estado del motivo a una cadena vacía
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>MOTIVO DE DENUNCIA</Text>
          <TextInput
            placeholder="Ingrese texto"
            value={motivo}
            onChangeText={(text) => setMotivo(text)}
            style={[styles.input, { maxHeight: 100 }]}
            multiline={true}
            numberOfLines={10}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => handleDenunciar(token)}
              style={styles.denunciarButton}
            >
              <Text style={styles.cancelarButtonText}>Denunciar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelar}
              style={styles.denunciarButton}
            >
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DenunciasModalServicio;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#DDC4B8",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 150,
    width: 300,
    backgroundColor: "#ffffff",
  },
  denunciarButton: {
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 5,
    elevation: 5,
    marginLeft: 40,
    height: 30,
    width: 80,
    justifyContent: "center",
    marginTop: 10,
  },
  cancelarButtonText: {
    color: "black",
    textAlign: "center",
  },
};
