import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import axios from "axios";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook

export default function AltaTurno({ visible, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hora, setHora] = useState("");
  const [minutos, setMinutos] = useState("");
  const [mensage, setMensage] = useState("");

  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  const { token } = route.params;

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  const [turnData, setTurnData] = useState({
    titleTurn: "",
    descriptionTurn: "",
    turnDate: "",
    hora: "",
    minutos: "",
  });

  const validateHoraMinutos = (hora, minutos) => {
    const horaValida =
      /^\d+$/.test(hora) && parseInt(hora, 10) >= 0 && parseInt(hora, 10) <= 23;
    const minutosValidos =
      /^\d+$/.test(minutos) &&
      parseInt(minutos, 10) >= 0 &&
      parseInt(minutos, 10) <= 59;

    return horaValida && minutosValidos;
  };

  const validateFecha = (year, month, day) => {
    if (year === currentYear && month === currentMonth && day === currentDay) {
      return true; // La fecha es igual a la fecha actual
    } else {
      const selectedDate = new Date(year, parseInt(month, 10) - 1, day);

      if (selectedDate >= currentDate) {
        // Validar que el mes esté entre 1 y 12
        if (parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12) {
          // Validar los días según el mes
          const daysInMonth = new Date(year, month, 0).getDate();
          if (day >= 1 && day <= daysInMonth) {
            return true;
          }
        }
      }
      return false;
    }
  };

  useEffect(() => {
    const horaValida = validateHoraMinutos(turnData.hora, turnData.minutos);
    const fechaValida = validateFecha(selectedYear, selectedMonth, selectedDay);

    if (horaValida && fechaValida) {
      setTurnData({ ...turnData, error: null });
      setIsButtonDisabled(false);
    } else {
      let errorMessage = "";
      if (!horaValida) {
        errorMessage =
          "Ingrese una hora válida (00-23) y minutos válidos (00-59)";
      }
      if (!fechaValida) {
        errorMessage += errorMessage ? "\n" : "";
        errorMessage +=
          "La fecha debe ser igual o mayor a la fecha actual, con mes entre 1 y 12 y días válidos.";
      }

      setTurnData({
        ...turnData,
        error: errorMessage,
      });

      setIsButtonDisabled(true);
    }
  }, [
    turnData.hora,
    turnData.minutos,
    selectedYear,
    selectedMonth,
    selectedDay,
  ]);

  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titulo}>AGREGAR TURNO</Text>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={turnData.titleTurn}
              onChangeText={(text) =>
                setTurnData({ ...turnData, titleTurn: text })
              }
            />
          </View>
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={turnData.descriptionTurn}
              onChangeText={(text) =>
                setTurnData({ ...turnData, descriptionTurn: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.horaInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="HH"
                value={turnData.hora}
                onChangeText={(text) => {
                  setTurnData({ ...turnData, hora: text });
                  setHora(text);
                }}
                maxLength={2}
              />
              <Text style={styles.inputDivider}> : </Text>
              <TextInput
                style={styles.input}
                placeholder="MM"
                value={turnData.minutos}
                onChangeText={(text) => {
                  setTurnData({ ...turnData, minutos: text });
                  setMinutos(text);
                }}
                maxLength={2}
              />
            </View>
          </View>
          {turnData.error && (
            <Text style={styles.errorText}>{turnData.error}</Text>
          )}
          <Text style={styles.textoFecha}>Fecha de turno</Text>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              value={selectedYear}
              onChangeText={(text) => setSelectedYear(text)}
            />
            <Text style={styles.textoFecha}>/</Text>
            <TextInput
              style={styles.input}
              placeholder="MM"
              value={selectedMonth}
              onChangeText={(text) => setSelectedMonth(text)}
            />
            <Text style={styles.textoFecha}>/</Text>
            <TextInput
              style={styles.input}
              placeholder="DD"
              value={selectedDay}
              onChangeText={(text) => setSelectedDay(text)}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor5]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                if (isButtonDisabled) {
                  return;
                }
                setIsButtonDisabled(true);
                try {
                  const response = await axios.post(
                    `https://buddy-app2.loca.lt/mypet/turn/${mascotaId}`,
                    {
                      titleTurn: turnData.titleTurn,
                      descriptionTurn: turnData.descriptionTurn,
                      turnDate: `${selectedYear}-${selectedMonth}-${selectedDay} ${turnData.hora}:${turnData.minutos}:00`,
                    },
                    {
                      headers: {
                        "auth-token": token,
                      },
                    }
                  );
                  console.log("Respuesta del servidor:", response.data);
                  setShowSuccessModal(true);
                } catch (error) {
                  console.log("Respuesta del servidor:", error);
                  setMensage(error.message);
                  setShowErrorModal(true);
                }

                setTimeout(() => {
                  setIsButtonDisabled(false);
                }, 2000);
              }}
              disabled={isButtonDisabled}
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
          onClose(); // Cerrar el modal EditarVacuna
        }}
        message="Turno creado correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage={mensage}
        onClose={() => setShowErrorModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
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
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.65,
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
    textAlign: "center",
    paddingStart: 5,
    marginHorizontal: 2,
  },
  inputTextoDescripcion: {
    backgroundColor: "#EEE9E9",
    width: "100%",
    height: 60,
    borderRadius: 10,
    textAlign: "center",
    marginVertical: 10,
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
