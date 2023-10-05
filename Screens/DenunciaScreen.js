import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute } from "@react-navigation/native";
import BotonMenu from "../componentes/BotonMenu";
import axios from "axios";

export default function DenunciaScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [denuncias, setDenuncias] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [denunciaToReject, setDenunciaToReject] = useState(null);
  const [bloquearModalVisible, setBloquearModalVisible] = useState(false);
  const [denunciaToBloquear, setDenunciaToBloquear] = useState(null);

  function loadDenuncias(token) {
    // Realiza una solicitud GET al servidor para obtener las denuncias
    axios
      .get("https://romibettiol.loca.lt/security/complaint/", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setDenuncias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener denuncias:", error);
      });
  }

  useEffect(() => {
    loadDenuncias(token);
  }, [token]);

  function handleOpenConfirmModal(idComplaint) {
    setDenunciaToReject(idComplaint);
    setConfirmModalVisible(true);
  }

  function handleCloseConfirmModal() {
    setDenunciaToReject(null);
    setConfirmModalVisible(false);
  }

  function handleOpenBloquearModal(idComplaint) {
    setDenunciaToBloquear(idComplaint);
    setBloquearModalVisible(true);
  }

  function handleRechazar() {
    if (denunciaToReject) {
      // Configurar el encabezado con el token de autenticación
      const headers = {
        "auth-token": token, // Utiliza el token que tienes en el ámbito superior
      };

      // Realizar una solicitud DELETE al servidor para eliminar la denuncia con el encabezado personalizado
      axios
        .delete(
          `https://romibettiol.loca.lt/security/complaint/${denunciaToReject}`,
          { headers }
        )
        .then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log("Denuncia rechazada con éxito");
          // Puedes actualizar la lista de denuncias si es necesario
          // por ejemplo, eliminando la denuncia de la lista denuncias
          // setDenuncias((prevDenuncias) =>
          //   prevDenuncias.filter((denuncia) => denuncia.idComplaint !== denunciaToReject)
          // );
          loadDenuncias(token);
          handleCloseConfirmModal();
        })
        .catch((error) => {
          console.error("Error al rechazar la denuncia:", error);
          handleCloseConfirmModal();
        });
    }
  }

  function handleBloquear(idComplaint, token) {
    const data = { validate: true };
    console.log("id Denuncia: ", idComplaint);
    console.log("true or false: ", data.validate);
    console.log("token desde bloquear: ", token);

    const headers = {
      "auth-token": token, // Agrega el encabezado auth-token con el valor proporcionado
    };

    axios
      .post(
        `https://romibettiol.loca.lt/security/complaint/execute/${data.validate}/${idComplaint}`,
        null,
        {
          headers: headers, // Pasa los encabezados con la solicitud
        }
      )
      .then((response) => {
        // Manejar la respuesta del servidor si es necesario
        loadDenuncias(token);
        console.log("Denuncia bloqueada con éxito");
      })
      .catch((error) => {
        console.error("Error al bloquear la denuncia:", error);
      });
  }

  console.log("Denuncias: ", token);

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView>
        <Text style={styles.titulo}>Denuncias Pendientes</Text>
        {denuncias.map((denuncia) => (
          <View key={denuncia.idComplaint} style={styles.denuncia}>
            <Text style={styles.tituloDenuncia}>Publicación Denunciada:</Text>
            <Text style={styles.motivoTexto}>Motivo de la denuncia:</Text>
            <Text style={styles.textoDenuncia}>
              {denuncia.complaintDescription}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.botonRechazar}
                onPress={() => handleOpenConfirmModal(denuncia.idComplaint)}
              >
                <Text>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonBloquear}
                onPress={() => handleOpenBloquearModal(denuncia.idComplaint)}
              >
                <Text>Bloquear</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Modal
          visible={confirmModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseConfirmModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseConfirmModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.tituloModal}>
              ¿Seguro que quieres rechazar la denuncia?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.botonModal}
                onPress={handleRechazar(token)}
              >
                <Text>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonModal}
                onPress={handleCloseConfirmModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={bloquearModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setBloquearModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setBloquearModalVisible(false)}
          >
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.tituloModal}>
              ¿Seguro que quieres bloquear la denuncia?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.botonModal}
                onPress={() => {
                  handleBloquear(denunciaToBloquear, token);
                  setBloquearModalVisible(false);
                }}
              >
                <Text>Bloquear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonModal}
                onPress={() => setBloquearModalVisible(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <BotonMenu token={token} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 5,
  },

  denuncia: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#EEE9E9",
    elevation: 5,
  },

  tituloDenuncia: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 5,
  },

  motivoTexto: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },

  textoDenuncia: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
  },

  botonRechazar: {
    backgroundColor: "#FF584E",
    width: "30%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 2,
    marginLeft: 50,
  },

  botonBloquear: {
    backgroundColor: "#8ADC58",
    width: "30%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 2,
    marginLeft: 50,
  },

  botonModal: {
    backgroundColor: "#EEE9E9",
    width: "40%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 2,
    marginLeft: 15,
    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#DDC4B8", // Fondo blanco
    padding: 20,
    borderRadius: 10,
    alignItems: "center", // Centra el contenido horizontalmente
    width: "65%", // Ancho del modal, puedes ajustarlo según tus necesidades
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.32 },
      { translateY: -Dimensions.get("window").height * 0.05 },
    ],
  },

  tituloModal: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
