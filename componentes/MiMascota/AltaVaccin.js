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
import ListaValoresDiasM from "./ListaValoresDiasM";
import ListaValoresMesM from "./ListaValoresMesM";
import ListaValoresAñoM from "./ListaValoresAñoM";
import ListaValoresDiasMascotaProx from "./ListaValoresDiasMascotaProx";
import ListaValoresMesesMascotaProx from "./ListaValoresMesesMascotaProx";
import ListaValoresAñoMascotaProx from "./ListaValoresAñoMascotaProx";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import axios from "axios";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook

export default function AltaVaccin({ visible, onClose}) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedMonthProx, setSelectedMonthProx] = useState(null);
  const [selectedDayProx, setSelectedDayProx] = useState(null);
  const [selectedYearProx, setSelectedYearProx] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hora, setHora] = useState("");
  const [minutos, setMinutos] = useState("");

  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  // Agregar un estado para rastrear si se debe mostrar la fecha de próxima dosis
  const [showNextDoseDate, setShowNextDoseDate] = useState(false);
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [isDescriptionComplete, setIsDescriptionComplete] = useState(false);

   
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  
  // En tu componente EditarVaccin, dentro de la función return, antes de usarlos:
 
const formattedDay = selectedDay ? selectedDay.toString().padStart(2, '0') : '';
const formattedMonth = selectedMonth ? selectedMonth.toString().padStart(2, '0') : '';
const formattedYear = selectedYear ? selectedYear.toString().padStart(4, '0') : '';

const formattedYearProx = selectedYearProx ? selectedYearProx.toString().padStart(4, '0') : '';
const formattedMonthProx = selectedMonthProx ? selectedMonthProx.toString().padStart(2, '0') : '';
const formattedDayProx = selectedDayProx ? selectedDayProx.toString().padStart(2, '0') : '';


  const formattedMinutes = minutos.toString().padStart(2, '0');
  const formattedHour = hora.toString().padStart(2, '0');
  
  const [vaccinData, setVaccinData] = useState({
    titleVaccin: "",
    descriptionVaccin: "",
    vaccinDate: "",
    hora: "", // Nuevo estado para la hora
    minutos: "", // Nuevo estado para los minutos
    doseQuantity: "",

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
 

 

  const data = {
    titleVaccine: vaccinData.titleVaccin,
    descriptionVaccine: vaccinData.descriptionVaccin,
    vaccineDate: `${formattedYear}-${formattedMonth}-${formattedDay} ${hora}:${minutos}:00`,
    doseQuantity: vaccinData.doseQuantity,
    nextVaccineDate: ''
  };
  
  // Agregar nextVaccineDate solo si hay datos válidos
  
  if (formattedYearProx && formattedMonthProx && formattedDayProx) {
    data.nextVaccineDate = `${formattedYearProx}-${formattedMonthProx}-${formattedDayProx} 00:00:00`;
  }
  
  console.log("DATA: ", data);
  const [doseQuantityError, setDoseQuantityError] = useState("");

  useEffect(() => {
    // Validar la hora, minutos y cantidad de dosis
    const horaValida =
      /^\d+$/.test(vaccinData.hora) &&
      parseInt(vaccinData.hora, 10) >= 0 &&
      parseInt(vaccinData.hora, 10) <= 23;
    const minutosValidos =
      /^\d+$/.test(vaccinData.minutos) &&
      parseInt(vaccinData.minutos, 10) >= 0 &&
      parseInt(vaccinData.minutos, 10) <= 59;

    // Validar la cantidad de dosis
    const doseQuantityValid =
      /^\d+$/.test(vaccinData.doseQuantity) &&
      parseInt(vaccinData.doseQuantity, 10) >= 1 &&
      parseInt(vaccinData.doseQuantity, 10) <= 10;

    // Actualizar el estado de error y deshabilitar el botón en consecuencia
    if (horaValida && minutosValidos && doseQuantityValid) {
      setVaccinData({ ...vaccinData, error: null });
      setIsButtonDisabled(false);
    } else {
      setVaccinData({
        ...vaccinData,
        error: "Ingrese una hora válida (00-23) y minutos válidos (00-59)",
      });

      // Mensaje de error para la cantidad de dosis
      if (!doseQuantityValid) {
        setDoseQuantityError("La cantidad de dosis debe ser un número del 1 al 10");
      } else {
        setDoseQuantityError(""); // Borrar el mensaje de error si la cantidad es válida
      }

      setIsButtonDisabled(true);
    }

    setIsButtonDisabled(!(horaValida && minutosValidos && doseQuantityValid));
  }, [vaccinData.hora, vaccinData.minutos, vaccinData.doseQuantity]);

  useEffect(() => {
    // Validar la cantidad de dosis
    const doseQuantityValid =
      /^\d+$/.test(vaccinData.doseQuantity) &&
      parseInt(vaccinData.doseQuantity, 10) >= 1 &&
      parseInt(vaccinData.doseQuantity, 10) <= 10;

    if (doseQuantityValid) {
      setDoseQuantityError("");
      setIsButtonDisabled(false);

      // Mostrar la fecha de próxima dosis si la cantidad de dosis es mayor que 1
      setShowNextDoseDate(parseInt(vaccinData.doseQuantity, 10) > 1);
    } else {
      setDoseQuantityError("La cantidad de dosis debe ser un número del 1 al 10");
      setIsButtonDisabled(true);
      setShowNextDoseDate(false); // Ocultar la fecha de próxima dosis si no cumple la condición
    }
  }, [vaccinData.doseQuantity]);
  const validateFecha = (year, month, day) => {
    if (
      year === currentYear &&
      month === currentMonth &&
      day === currentDay
    ) {
      return true; // La fecha es igual a la fecha actual
    } else {
      const selectedDate = new Date(
        year,
        parseInt(month, 10) - 1,
        day
      );
  
      
        // Validar que el mes esté entre 1 y 12
        if (parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12) {
          // Validar los días según el mes
          const daysInMonth = new Date(year, month, 0).getDate();
          if (day >= 1 && day <= daysInMonth) {
            return true;
          }
        
      }
      return false;
    }
  };
  
  useEffect(() => {
    const horaValida = validateHoraMinutos(vaccinData.hora, vaccinData.minutos);
    const fechaValida = validateFecha(selectedYear, selectedMonth, selectedDay);
    
    if (horaValida && fechaValida ) {
      setVaccinData({ ...vaccinData, error: null });
      setIsButtonDisabled(false);
    } else {
      let errorMessage = "";
  
      if (!horaValida) {
        errorMessage = "Ingrese una hora válida (00-23) y minutos válidos (00-59)";
      }
  
      if (!fechaValida) {
        errorMessage += errorMessage ? "\n" : "";
        errorMessage += "La fecha debe tener el mes entre 1 y 12 y días válidos.";
      }
  
     
  
      setVaccinData({
        ...vaccinData,
        error: errorMessage,
      });
  
      setIsButtonDisabled(true);
    }
  }, [vaccinData.hora, vaccinData.minutos, selectedYear, selectedMonth, selectedDay, selectedYearProx, selectedMonthProx, selectedDayProx]);
  
  
 
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
              onChangeText={(text) => {
                setVaccinData({ ...vaccinData, titleVaccin: text });
                setIsTitleComplete(!!text); // Establece isTitleComplete en verdadero si el texto no está vacío
              }}
            />
          </View>
          {!isTitleComplete ? (
            <Text style={styles.errorText}>Completar campo</Text>
          ) : null}
          <View style={[{ flexDirection: "column" }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: "row" }, styles.tituloDescripcion]}>
              Descripcion
            </Text>
            <TextInput
              style={[{ flexDirection: "row" }, styles.inputTextoDescripcion]}
              value={vaccinData.descriptionVaccin}
              onChangeText={(text) => {
                setVaccinData({ ...vaccinData, descriptionVaccin: text });
                setIsDescriptionComplete(!!text); // Establece isDescriptionComplete en verdadero si el texto no está vacío
              }}
            />
          </View>
          {!isDescriptionComplete ? (
            <Text style={styles.errorText}>Completar campo</Text>
          ) : null}
          <View style={styles.cantVaccin}>
            <Text>Cantidad de dosis</Text>
            <TextInput
              style={styles.inputTextoCant}
              value={vaccinData.doseQuantity}
              onChangeText={(text) => {
                setDoseQuantityError("");
                setVaccinData({ ...vaccinData, doseQuantity: text });
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
               placeholder="YYYY"
               value={selectedYearProx}
               onChangeText={(text) => setSelectedYearProx(text)}
             />
             <Text style={styles.textoFecha}>/</Text>
             <TextInput
               style={styles.input}
               placeholder="MM"
               value={selectedMonthProx}
               onChangeText={(text) => setSelectedMonthProx(text)}
             />
             <Text style={styles.textoFecha}>/</Text>
             <TextInput
               style={styles.input}
               placeholder="DD"
               value={selectedDayProx}
               onChangeText={(text) => setSelectedDayProx(text)}
             />
           </View>
         </>
          )}
        
          <Text style={styles.textoFecha}>Fecha de vacuna</Text>
          <View style={[{ flexDirection: "row" }, styles.subcontenedor4]}>
          <TextInput
            style={styles.input}
            placeholder="YYYY"
            minLengh={4}
            value={selectedYear}
            onChangeText={(text) => setSelectedYear(text)}
          />
          <Text style={styles.textoFecha}>/</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            value={selectedMonth}
            minLengh={2}
            onChangeText={(text) => setSelectedMonth(text)}
          />
          <Text style={styles.textoFecha}>/</Text>
          <TextInput
            style={styles.input}
            placeholder="DD"
            value={selectedDay}
            minLengh={2}
            onChangeText={(text) => setSelectedDay(text)}
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
                minLengh={2}
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
                minLengh={2}
              />
            </View>
          </View>
          {/* Mostrar el error debajo del campo de entrada */}
          {vaccinData.error && (
            <Text style={styles.errorText}>{vaccinData.error}</Text>
          )}
          
          <View style={[{ flexDirection: "row" }, styles.subcontenedor5]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                console.log("hora: ", hora);
                console.log("fecha y hora: ", data.vaccineDate);
                setIsButtonDisabled1(true);
                if (isButtonDisabled || !isTitleComplete || !isDescriptionComplete) {
                  return; // Si el botón está deshabilitado, no hacer nada
                }

                setIsButtonDisabled(true); // Deshabilitar el botón
                try {
                  const response = await axios.post(
                    `https://buddy-app2.loca.lt/mypet/vaccine/${mascotaId}`,
                    data,
                    {
                      headers: {
                        "auth-token": token,
                      },
                    }
                  );
                  console.log("Respuesta del servidor:", response.data);
                  setShowSuccessModal(true);
                } catch (error) {
                  setShowErrorModal(true);
                
                }
                setTimeout(() => {
                  setIsButtonDisabled(false); // Habilitar el botón nuevamente después de 2 segundos
                }, 2000);
                //  setOverlayVisible(false); // Cierra el overlay después de elcompletshowerriminar
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
    height: Dimensions.get("window").height * 0.9,
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
  inputTextoCant: {
    backgroundColor: "#EEE9E9",
    width: "50%",
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
  cantVaccin:{
    textAlign: "center",
    alignItems: "center", // Para centrar horizontal
    width: "100%",
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
