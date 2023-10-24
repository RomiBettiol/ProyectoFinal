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
import ListaValoresDiasMascota from "./ListaValoresDiasMascota";
import ListaValoresMesesMascota from "./ListaValoresMesesMascota";
import ListaValoresAñoMascota from "./ListaValoresAñoMascota";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import axios from "axios";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook

export default function AltaVaccin({ visible, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hora, setHora] = useState("");
  const [minutos, setMinutos] = useState("");
  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  console.log(mascotaId);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);

  const [vaccinData, setVaccinData] = useState({
    titleVaccin: "",
    descriptionVaccin: "",
    vaccinDate: "",
    hora: "", // Nuevo estado para la hora
    minutos: "", // Nuevo estado para los minutos
  });

  const data = {
    titleVaccine: vaccinData.titleVaccin,
    descriptionVaccine: vaccinData.descriptionVaccin,
    vaccineDate: `${selectedYear}-${selectedMonth}-${selectedDay} ${hora}:${minutos}:00`,
  };
  console.log("DATA: ", data);
  useEffect(() => {
    // Validar la hora y minutos
    const horaValida =
      /^\d+$/.test(vaccinData.hora) &&
      parseInt(vaccinData.hora, 10) >= 0 &&
      parseInt(vaccinData.hora, 10) <= 23;
    const minutosValidos =
      /^\d+$/.test(vaccinData.minutos) &&
      parseInt(vaccinData.minutos, 10) >= 0 &&
      parseInt(vaccinData.minutos, 10) <= 59;

    // Actualizar el estado de error y deshabilitar el botón en consecuencia
    if (horaValida && minutosValidos) {
      setVaccinData({ ...vaccinData, error: null });
      setIsButtonDisabled(false);
    } else {
      setVaccinData({
        ...vaccinData,
        error: "Ingrese una hora válida (00-23) y minutos válidos (00-59)",
      });
      setIsButtonDisabled(true);
    }

    // Habilitar o deshabilitar el botón según la validación
    setIsButtonDisabled(!(horaValida && minutosValidos));
  }, [vaccinData.hora, vaccinData.minutos]);
  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Contenido de la tarjeta modal */}
          <Text style={styles.titulo}>AGREGAR VACUNA</Text>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={vaccinData.titleVaccin}
              onChangeText={(text) =>
                setVaccinData({ ...vaccinData, titleVaccin: text })
              }
            />
          </View>
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={vaccinData.descriptionVaccin}
              onChangeText={(text) =>
                setVaccinData({ ...vaccinData, descriptionVaccin: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.horaInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="HH"
                value={hora}
                onChangeText={(text) => {
                  // Realiza el setVaccinData
                  setVaccinData({ ...vaccinData, hora: text });
                  // Realiza el setHora
                  setHora(text);
                }}
                maxLength={2}
              />
              <Text style={styles.inputDivider}> : </Text>
              <TextInput
                style={styles.input}
                placeholder="MM"
                value={minutos}
                onChangeText={(text) => {
                  // Realiza el setVaccinData
                  setVaccinData({ ...vaccinData, minutos: text });
                  // Realiza el setMinutos
                  setMinutos(text);
                }}
                maxLength={2}
              />
            </View>
          </View>
          {/* Mostrar el error debajo del campo de entrada */}
          {vaccinData.error && (
            <Text style={styles.errorText}>{vaccinData.error}</Text>
          )}
          <Text style={styles.textoFecha}>Fecha de vacuna</Text>
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
                console.log("fecha y hora: ", data.vaccineDate);
                setIsButtonDisabled1(true);
                if (isButtonDisabled) {
                  return; // Si el botón está deshabilitado, no hacer nada
                }

                setIsButtonDisabled(true); // Deshabilitar el botón
                try {
                  const response = await axios.post(
                    `https://buddy-app2.loca.lt/mypet/vaccine/${mascotaId}`,
                    data
                  );
                  console.log("Respuesta del servidor:", response.data);
                  setShowSuccessModal(true);
                } catch (error) {
                  setShowErrorModal(true);
                }
                setTimeout(() => {
                  setIsButtonDisabled(false); // Habilitar el botón nuevamente después de 2 segundos
                }, 2000);
                //  setOverlayVisible(false); // Cierra el overlay después de eliminar
              }}
              disabled={isButtonDisabled && isButtonDisabled1}
            >
              <Text style={styles.closeButtonText} disabled={isButtonDisabled1}>
                Aceptar
              </Text>
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
        message="Vacuna creado correctamente"
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
