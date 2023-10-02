import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
} from "react-native";
import ListaValoresDiasMascota from "./ListaValoresDiasMascota";
import ListaValoresMesesMascota from "./ListaValoresMesesMascota";
import ListaValoresAñoMascota from "./ListaValoresAñoMascota";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
export default function EditarTurno({ visible, onClose, turno, mascotaId }) {
  const timeParts = turno.turnHour.split(":");
  const hor = parseInt(timeParts[0], 10);
  const min = parseInt(timeParts[1], 10);
  console.log(min, hor);
  const dateParts = turno.turnDate.split("-");
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10); // Restamos 1 porque los meses en JavaScript son 0-11
  const day = parseInt(dateParts[0], 10);
  const idTurn = turno.idTurn;
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedYear, setSelectedYear] = useState(year);
  const [hora, setHora] = useState(hor);
  const [minutos, setMinutos] = useState(min);
  const [titleTurn, setTitleTurn] = useState(turno.titleTurn);
  const [descriptionTurn, setDescriptionTurn] = useState(turno.descriptionTurn);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón

  const [turnData, setTurnData] = useState({
    titleTurn: "",
    descriptionTurn: "",
    turnDate: "",
    hora: hora, // Nuevo estado para la hora
    minutos: minutos, // Nuevo estado para los minutos
  });
  useEffect(() => {
    // Validar la hora y minutos
    const horaValida =
      /^\d+$/.test(turnData.hora) &&
      parseInt(turnData.hora, 10) >= 0 &&
      parseInt(turnData.hora, 10) <= 23;
    const minutosValidos =
      /^\d+$/.test(turnData.minutos) &&
      parseInt(turnData.minutos, 10) >= 0 &&
      parseInt(turnData.minutos, 10) <= 59;

    // Actualizar el estado de error y deshabilitar el botón en consecuencia
    if (horaValida && minutosValidos) {
      setTurnData({ ...turnData, error: null });
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
      setTurnData({
        ...turnData,
        error: "Ingrese una hora válida (00-23) y minutos válidos (00-59)",
      });
    }
  }, [turnData.hora, turnData.minutos]);
  const updatedData = {
    titleTurn: titleTurn,
    descriptionTurn: descriptionTurn, // Agregar a los datos actualizados
    turnDate: `${selectedYear}-${selectedMonth}-${selectedDay} ${hora}:${minutos}:00`,
  };
  const handleEditeTurno = async () => {
    const idTurn = turno.idTurn; // Obtén la ID de la mascota desde los props

    console.log(turno.idTurn);
    try {
      const response = await axios.put(
        ` https://buddy-app2.loca.lt/mypet/turn/${mascotaId}/${idTurn}`,
        {
          titleTurn: updatedData.titleTurn,
          descriptionTurn: updatedData.descriptionTurn,
          turnDate: updatedData.turnDate,
        }
      );
      console.log("Turno editado:", response.updatedDatadata);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al editar el turno:", error);
      setShowErrorModal(true);
    }

    setOverlayVisible(false); // Cierra el overlay después de eliminar
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Contenido de la tarjeta modal */}
          <Text style={styles.titulo}>EDITAR TURNO</Text>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={titleTurn}
              onChangeText={setTitleTurn}
              //   onFocus={() => Keyboard.show()}
            />
          </View>
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={descriptionTurn}
              onChangeText={setDescriptionTurn}
              // onFocus={() => Keyboard.show()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.horaInputContainer}>
              <TextInput
                style={styles.input}
                value={hora.toString()}
                onChangeText={(text) => {
                  // Realiza el setTurnData
                  setTurnData({ ...turnData, hora: text });
                  // Realiza el setHora
                  setHora(text);
                }}
                maxLength={2}
              />
              <Text style={styles.inputDivider}> : </Text>
              <TextInput
                style={styles.input}
                value={minutos.toString()}
                onChangeText={(text) => {
                  // Realiza el setTurnData
                  setTurnData({ ...turnData, minutos: text });
                  // Realiza el setMinutos
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
            <ListaValoresMesesMascota setSelectedMonth={setSelectedMonth} />
            {selectedMonth && (
              <ListaValoresDiasMascota
                selectedMonth={selectedMonth} // Pasa el mes seleccionado
                selectedValue={selectedDay} // Pasa el día seleccionado
                setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
              />
            )}
            <ListaValoresAñoMascota
              setSelectedValue={setSelectedYear}
              selectedValue={selectedYear}
            />
          </View>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor5]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                console.log("hora: ", hora);
                console.log("fecha y hora: ", turnData.turnDate);

                try {
                  const response = await axios.put(
                    ` https://buddy-app2.loca.lt/mypet/turn/${mascotaId}/${idTurn}`,
                    updatedData
                  );
                  console.log("Respuesta del servidor:", response.data);
                  setShowSuccessModal(true);
                } catch (error) {
                  setShowErrorModal(true);
                }
                // setOverlayVisible(false); // Cierra el overlay después de eliminar
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
          onClose(); // Cerrar el modal EditarTurno
        }}
        message="Turno editado correctamente"
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
    width: windowWidth * 0.95,
    height: windowHeight * 0.65,
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
