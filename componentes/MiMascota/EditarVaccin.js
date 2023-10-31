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
import ListaValoresDiasM from "./ListaValoresDiasM";
import ListaValoresMesM from "./ListaValoresMesM";
import ListaValoresAñoM from "./ListaValoresAñoM";
import ListaValoresDiasMascotaProx from "./ListaValoresDiasMascotaProx";
import ListaValoresMesesMascotaProx from "./ListaValoresMesesMascotaProx";
import ListaValoresAñoMascotaProx from "./ListaValoresAñoMascotaProx";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
export default function EditarVaccin({
  visible,
  onClose,
  vaccin,
  mascotaId,
  token,
}) {
  const timeParts = vaccin.vaccineHour.split(":");
  const hor = parseInt(timeParts[0], 10);
  const min = parseInt(timeParts[1], 10);
  console.log(min, hor);
  const dateParts = vaccin.vaccineDate.split("-");
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10); // Restamos 1 porque los meses en JavaScript son 0-11
  const day = parseInt(dateParts[0], 10);
  const idVaccin = vaccin.idVaccine;
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedYear, setSelectedYear] = useState(year);

  const datePartsProx = vaccin.nextVaccineDate
    ? vaccin.nextVaccineDate.split("-")
    : [null, null, null];
  const [doseQuantityError, setDoseQuantityError] = useState("");
  const yearProx = datePartsProx[2] ? parseInt(datePartsProx[2], 10) : null;
  const monthProx = datePartsProx[1] ? parseInt(datePartsProx[1], 10) : null;
  const dayProx = datePartsProx[0] ? parseInt(datePartsProx[0], 10) : null;

  const [selectedMonthProx, setSelectedMonthProx] = useState(month);
  const [selectedYearProx, setSelectedYearProx] = useState(year);
  const [selectedDayProx, setSelectedDayProx] = useState(year);
  // Agregar un estado para rastrear si se debe mostrar la fecha de próxima dosis
  const [showNextDoseDate, setShowNextDoseDate] = useState(false);
  const [hora, setHora] = useState(hor);
  const [minutos, setMinutos] = useState(min);
  const [titleVaccin, setTitleVaccin] = useState(vaccin.titleVaccine);
  const [doseQuantity, setDoseQuantity] = useState(vaccin.doseQuantity);
  console.log("cant dosis:   ", doseQuantity);
  const [nextVaccineDate, setNextVaccineDate] = useState(
    vaccin.nextVaccineDate
  );
  const [descriptionVaccin, setDescriptionVaccin] = useState(
    vaccin.descriptionVaccine
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón

  // En tu componente EditarVaccin, dentro de la función return, antes de usarlos:
  const formattedDay = selectedDay.toString().padStart(2, "0");
  const formattedMonth = selectedMonth.toString().padStart(2, "0");
  const formattedMinutes = minutos.toString().padStart(2, "0");
  const formattedHour = hora.toString().padStart(2, "0");
  // En tu componente EditarVaccin, dentro de la función return, antes de usarlo:
  const formattedYear = selectedYear.toString().padStart(4, "0");

  const formattedYearProx = selectedYearProx
    ? selectedYearProx.toString().padStart(4, "0")
    : "";
  const formattedMonthProx = selectedMonthProx
    ? selectedYearProx.toString().padStart(2, "0")
    : "";
  const formattedDayProx = selectedDayProx
    ? selectedYearProx.toString().padStart(2, "0")
    : "";

  const [vaccinData, setVaccinData] = useState({
    titleVaccin: "",
    descriptionVaccin: "",
    vaccinDate: "",
    hora: formattedHour, // Nuevo estado para la hora
    minutos: formattedMinutes, // Nuevo estado para los minutos
    doseQuantity: doseQuantity,
    nextVaccineDate: nextVaccineDate,
  });
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
      setIsButtonDisabled(true);
      setVaccinData({
        ...vaccinData,
        error: "Ingrese una hora válida (00-23) y minutos válidos (00-59)",
      });
    }
  }, [vaccinData.hora, vaccinData.minutos]);

  const updatedData = {
    titleVaccine: titleVaccin,
    descriptionVaccine: descriptionVaccin, // Agregar a los datos actualizados
    vaccineDate: `${formattedYear}-${formattedMonth}-${formattedDay} ${hora}:${minutos}:00`,
    nextVaccineDate:
      formattedYearProx && formattedDayProx && formattedMonthProx
        ? `${formattedYearProx}-${formattedMonthProx}-${formattedDayProx} 00:00:00`
        : null,
    doseQuantity: doseQuantity,
  };
  // ...

  // En la función useEffect que valida la cantidad de dosis
  useEffect(() => {
    // Validar la cantidad de dosis
    const doseQuantityValid =
      /^\d+$/.test(doseQuantity) &&
      parseInt(doseQuantity, 10) >= 1 &&
      parseInt(doseQuantity, 10) <= 10;

    if (doseQuantityValid) {
      setDoseQuantityError("");
      setIsButtonDisabled(false);
    } else {
      setDoseQuantityError(
        "La cantidad de dosis debe ser un número del 1 al 10"
      );
      setIsButtonDisabled(true);
    }

    // Actualizar el estado para mostrar u ocultar la fecha de próxima dosis
    setShowNextDoseDate(parseInt(doseQuantity, 10) > 1);
  }, [doseQuantity]);

  // ...

  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Contenido de la tarjeta modal */}
          <Text style={styles.titulo}>EDITAR VACUNA</Text>

          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={titleVaccin}
              onChangeText={setTitleVaccin}
              // onFocus={() => Keyboard.show()}
            />
          </View>
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={descriptionVaccin}
              onChangeText={setDescriptionVaccin}
              //   onFocus={() => Keyboard.show()}
            />
          </View>

          <View style={styles.cantVaccin}>
            <Text>Cantidad de dosis</Text>
            <TextInput
              style={styles.inputTextoCant}
              value={doseQuantity.toString()}
              onChangeText={(text) => {
                setDoseQuantityError(
                  "La cantidad de dosis debe ser un número del 1 al 10"
                );
                setDoseQuantity(text);
              }}
            />
            {doseQuantityError ? (
              <Text style={styles.errorText}>{doseQuantityError}</Text>
            ) : null}
          </View>
          {/* Mostrar los elementos relacionados con la fecha de próxima dosis si es necesario */}
          {showNextDoseDate && (
            <>
              <Text style={styles.textoFecha}>Fecha de próxima dosis</Text>
              <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
                <TextInput
                  style={styles.input}
                  value={yearProx.toString()}
                  maxLength={4}
                  minLength={4}
                  onChangeText={(text) => setSelectedYearProx(text)}
                />
                <Text style={styles.textoFecha}>/</Text>
                <TextInput
                  style={styles.input}
                  maxLength={2}
                  minLength={2}
                  value={monthProx.toString()}
                  onChangeText={(text) => setSelectedMonthProx(text)}
                />
                <Text style={styles.textoFecha}>/</Text>
                <TextInput
                  style={styles.input}
                  maxLength={2}
                  minLength={2}
                  value={dayProx.toString()}
                  onChangeText={(text) => setSelectedDayProx(text)}
                />
              </View>
            </>
          )}

          <Text style={styles.textoFecha}>Fecha de vacuna</Text>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
            <TextInput
              style={styles.input}
              minLength={4}
              value={formattedYear.toString()}
              onChangeText={(text) => setSelectedYear(text)}
            />
            <Text style={styles.textoFecha}>/</Text>
            <TextInput
              style={styles.input}
              minLength
              value={formattedMonth.toString()}
              onChangeText={(text) => setSelectedMonth(text)}
            />
            <Text style={styles.textoFecha}>/</Text>
            <TextInput
              style={styles.input}
              minLength
              value={formattedDay.toString()}
              onChangeText={(text) => setSelectedDay(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.horaInputContainer}>
              <TextInput
                style={styles.input}
                value={hora.toString()}
                onChangeText={(text) => {
                  // Realiza el setVaccinData
                  setVaccinData({ ...vaccinData, hora: text });
                  // Realiza el setHora
                  setHora(text);
                }}
                maxLength={2}
                minLength={2}
              />
              <Text style={styles.inputDivider}> : </Text>
              <TextInput
                style={styles.input}
                value={minutos.toString()}
                onChangeText={(text) => {
                  // Realiza el setVaccinData
                  setVaccinData({ ...vaccinData, hora: text });
                  // Realiza el setMinutos
                  setMinutos(text);
                }}
                maxLength={2}
                minLength={2}
              />
            </View>
          </View>
          {vaccinData.error && (
            <Text style={styles.errorText}>{vaccinData.error}</Text>
          )}
          <View style={[{ flexDirection: "row" }, styles.subcontenedor5]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                console.log("hora: ", hora);
                console.log("fecha y hora: ", updatedData.vaccineDate);

                try {
                  const response = await axios.put(
                    `https://buddy-app2.loca.lt/mypet/vaccine/${mascotaId}/${idVaccin}`,
                    updatedData,
                    {
                      headers: {
                        "auth-token": token,
                      },
                    }
                  );
                  console.log("Respuesta del servidor:", response.data);
                  setShowSuccessModal(true);
                } catch (error) {
                  console.log(error);
                  console.log(error.message);
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
          onClose(); // Cerrar el modal EditarVaccin
        }}
        message="Vacuna editada correctamente"
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
    height: windowHeight * 0.9,
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
  inputTextoCant: {
    backgroundColor: "#EEE9E9",
    width: "50%",
    height: 32,
    borderRadius: 100,
    textAlign: "center",
    paddingStart: 5,
    marginHorizontal: 2,
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
  cantVaccin: {
    textAlign: "center",
    alignItems: "center", // Para centrar horizontal
    width: "100%",
  },
});
