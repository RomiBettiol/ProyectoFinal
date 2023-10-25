import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import ListaValoresDias from "../componentes/Busqueda/ListaValoresDias";
import ListaValoresMeses from "../componentes/Busqueda/ListaValoresMeses";
import Header from "../componentes/HeaderScreen";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ListaValoresAñoEstablecimiento from "../componentes/ListaValoresAñoEstablecimiento";

const EstablecimientoDetalleScreen = () => {
  const [establishment, setEstablishment] = useState("");
  const [document1, setDocument1] = useState("");
  const [document2, setDocument2] = useState("");
  const [document3, setDocument3] = useState("");
  const [isWebViewVisible, setWebViewVisble] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDay2, setSelectedDay2] = useState("");
  const [selectedMonth2, setSelectedMonth2] = useState("");
  const [selectedYear2, setSelectedYear2] = useState("");
  const [selectedDay3, setSelectedDay3] = useState("");
  const [selectedMonth3, setSelectedMonth3] = useState("");
  const [selectedYear3, setSelectedYear3] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const route = useRoute();
  const [isAcceptButtonDisabled, setAcceptButtonDisabled] = useState(false);
  const { token, establishmentId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
    fetchDocuments();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const response = await axios.get(
        `https://romibettiol.loca.lt/security/establishment/${establishmentId}`,
        config
      );

      setEstablishment(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const response = await axios.get(
        `https://romibettiol.loca.lt/security/establishment/document/${establishmentId}`,
        config
      );

      setDocument1(response.data[0]);
      setDocument2(response.data[1]);
      setDocument3(response.data[2]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAceptar = async () => {
    if (
      !selectedDay ||
      !selectedDay2 ||
      !selectedDay3 ||
      !selectedMonth ||
      !selectedMonth2 ||
      !selectedMonth3 ||
      !selectedYear ||
      !selectedYear2 ||
      !selectedYear3
    ) {
      setError("Complete todas las fechas");
      return;
    }

    setError("");
    setAcceptButtonDisabled(true);

    try {
      const validDate1 = `${selectedDay}-${selectedMonth}-${selectedYear}`;
      const validDate2 = `${selectedDay2}-${selectedMonth2}-${selectedYear2}`;
      const validDate3 = `${selectedDay3}-${selectedMonth3}-${selectedYear3}`;

      const fechaActual = new Date();
      const fechaIngresada1 = new Date(
        selectedYear,
        selectedMonth,
        selectedDay
      );

      const fechaIngresada2 = new Date(
        selectedYear2,
        selectedMonth2,
        selectedDay2
      );

      const fechaIngresada3 = new Date(
        selectedYear3,
        selectedMonth3,
        selectedDay3
      );

      if (fechaIngresada1 < fechaActual) {
        setError(
          `La fecha en el documento: ${document1.title} deben ser mayores a las actuales`
        );
        return;
      }

      if (fechaIngresada2 < fechaActual) {
        setError(
          `La fecha en el documento: ${document2.title} deben ser mayores a las actuales`
        );
        return;
      }

      if (fechaIngresada3 < fechaActual) {
        setError(
          `La fecha en el documento: ${document3.title} deben ser mayores a las actuales`
        );
        return;
      }

      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const data = {
        approved: "TRUE",
        documents: [
          {
            idDocument: document1.idDocument,
            validDate: validDate1,
          },
          {
            idDocument: document2.idDocument,
            validDate: validDate2,
          },
          {
            idDocument: document3.idDocument,
            validDate: validDate3,
          },
        ],
      };

      const response = await axios.post(
        `https://romibettiol.loca.lt/security/establishment/validateEstablishment/${establishmentId}`,
        data,
        config
      );

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setTimeout(() => {
        setAcceptButtonDisabled(false);
      }, 4000);
    }
  };

  const handleRechazar = async () => {
    setAcceptButtonDisabled(true);
    console.log("object");
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const data = {
        approved: "FALSE",
      };

      const response = await axios.post(
        `https://romibettiol.loca.lt/security/establishment/validateEstablishment/${establishmentId}`,
        data,
        config
      );

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setTimeout(() => {
        setAcceptButtonDisabled(false);
      }, 4000);
    }
  };

  const handleCerrarModal = () => {
    setResponseMessage("");
    navigation.navigate("HomeScreen", { token });
  };

  return (
    <ScrollView>
      <Header />
      <Image
        source={{ uri: establishment.image }}
        style={styles.imagenPublicacion}
      />
      <View style={styles.informacion}>
        <View style={[{ flexDirection: "row" }, styles.contenedorTitulo]}>
          <Text style={styles.tituloServicio}>{establishment.userName}</Text>
        </View>
        <View style={styles.containerDescripcion}>
          <Text style={styles.descripcionServicio}>{establishment.mail}</Text>
        </View>
        <View style={styles.containerDescripcion}>
          <Text style={styles.documentHeader}>Documentos:</Text>
          <View style={styles.documentItem}>
            <Text style={styles.documentTitle}>{document1.title}</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setWebViewVisble(true);
              }}
            >
              <Text>Descargar documento</Text>
            </TouchableOpacity>
            {isWebViewVisible && (
              <WebView
                source={{
                  uri: document1.file,
                }}
              />
            )}
            <Text style={styles.descripcionServicio}>
              Establecer fecha de validez del documento: {document1.title}
            </Text>
            <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
              <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
              {selectedMonth && (
                <ListaValoresDias
                  selectedMonth={selectedMonth}
                  setSelectedDay={setSelectedDay}
                />
              )}
              <ListaValoresAñoEstablecimiento
                setSelectedYear={setSelectedYear}
              />
            </View>
          </View>
          <View style={styles.documentItem}>
            <Text style={styles.documentTitle}>{document2.title}</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setWebViewVisble(true);
              }}
            >
              <Text>Descargar documento</Text>
            </TouchableOpacity>
            {isWebViewVisible && (
              <WebView
                source={{
                  uri: document2.file,
                }}
              />
            )}
            <Text style={styles.descripcionServicio}>
              Establecer fecha de validez del documento: {document2.title}
            </Text>
            <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
              <ListaValoresMeses setSelectedMonth={setSelectedMonth2} />
              {selectedMonth2 && (
                <ListaValoresDias
                  selectedMonth={selectedMonth2}
                  setSelectedDay={setSelectedDay2}
                />
              )}
              <ListaValoresAñoEstablecimiento
                setSelectedYear={setSelectedYear2}
              />
            </View>
          </View>
          <View style={styles.documentItem}>
            <Text style={styles.documentTitle}>{document3.title}</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setWebViewVisble(true);
              }}
            >
              <Text>Descargar documento</Text>
            </TouchableOpacity>
            {isWebViewVisible && (
              <WebView
                source={{
                  uri: document3.file,
                }}
              />
            )}
            <Text style={styles.descripcionServicio}>
              Establecer fecha de validez del documento: {document3.title}
            </Text>
            <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
              <ListaValoresMeses setSelectedMonth={setSelectedMonth3} />
              {selectedMonth3 && (
                <ListaValoresDias
                  selectedMonth={selectedMonth3}
                  setSelectedDay={setSelectedDay3}
                />
              )}
              <ListaValoresAñoEstablecimiento
                setSelectedYear={setSelectedYear3}
              />
            </View>
          </View>
        </View>
        {error && <Text style={styles.textError}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.optionButton, styles.rejectButton]}
            onPress={() => {
              handleRechazar();
            }}
          >
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, styles.acceptButton]}
            disabled={isAcceptButtonDisabled}
            onPress={() => {
              handleAceptar();
            }}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={responseMessage !== ""}
        onRequestClose={() => {
          setResponseMessage("");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{responseMessage}</Text>
            <TouchableOpacity
              disabled={isAcceptButtonDisabled}
              onPress={() => {
                handleCerrarModal();
              }}
            >
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagenPublicacion: {
    height: 250,
  },
  informacion: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 15,
  },
  tituloServicio: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
  descripcionServicio: {
    fontSize: 14,
  },
  contenedorTitulo: {
    marginTop: 15,
  },
  documentSection: {
    margin: 20,
  },
  documentHeader: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  documentItem: {
    marginBottom: 10,
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  documentValidDate: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
  },
  optionButton: {
    backgroundColor: "#FFB988",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#00CC00", // Color para "Aceptar"
  },
  rejectButton: {
    backgroundColor: "#FF0000", // Color para "Rechazar"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateInputs: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  dateButton: {
    backgroundColor: "#FFB988",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    color: "red",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default EstablecimientoDetalleScreen;
