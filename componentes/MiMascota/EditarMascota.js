import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ListaValoresDiasMascota from "../MiMascota/ListaValoresDiasMascota";
import ListaValoresMesesMascota from "../MiMascota/ListaValoresMesesMascota";
import ListaValoresAñoMascota from "../MiMascota/ListaValoresAñoMascota";
import ListaValoresRazaPerros from "../Busqueda/ListaValoresRazaPerros";
import ListaValoresAnimal from "../Busqueda/ListaValoresAnimal";
import AgregarImagen from "../AgregarImagen";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

export default function EditarMascota({
  navigation,
  mascota,
  token,
  onCloseEditarMascota,
}) {
  const [nombre, setNombre] = useState(mascota.petName || "");
  const [raza, setRaza] = useState(mascota.petBreed || "");
  const [tipo, setTipo] = useState(mascota.petType || "");
  const [selectedMonth, setSelectedMonth] = useState(
    mascota.birthDate.month || null
  ); // Agregar estados para día y año
  const [selectedDay, setSelectedDay] = useState(mascota.birthDate.day || null);
  const [selectedYear, setSelectedYear] = useState(
    mascota.birthDate.year || null
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [petTypeOptions, setPetTypeOptions] = useState([]);
  const [petBreedOptions, setPetBreedOptions] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [idPetBreed, setIdPetBreed] = useState("");
  const [idPetType, setIdPetType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const updateMascota = async () => {
    setIsButtonDisabled(true);
    const idPet = mascota.idPet; // Obtén la ID de la mascota desde los props
    const updatedData = {
      petName: nombre,
      day: selectedDay, // Agregar a los datos actualizados
      idPetType: selectedAnimalId,
      idPetBreed: selectedBreedId,
      month: selectedMonth, // Agregar a los datos actualizados
      year: selectedYear, // Agregar a los datos actualizados
      // Otras propiedades que quieras actualizar
      birthDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
    };
    console.log({ idPet });
    console.log(updatedData);
    try {
      const response = await axios.put(
        `  https://buddy-app2.loca.lt/mypet/pet/${mascota.idPet}`,
        {
          headers: {
            "auth-token": token,
          },

          petName: updatedData.petName,
          birthDate: updatedData.birthDate,
          idPetType: updatedData.idPetType,
          idPetBreed: updatedData.idPetBreed,
          // Otros datos que puedas necesitar
        }
      );
      setShowSuccessModal(true);
      console.log(response.data);
      console.log(response.data); // Mensaje de éxito desde el backend
      // Puedes hacer algo aquí después de la actualización exitosa, como navegar a otra pantalla
    } catch (error) {
      setShowErrorModal(true);
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCloseEditarMascota(); // Cierra el modal NuevaMascota
  };
  useEffect(() => {
    console.log(tipo);
    console.log(raza);
    // Obtener tipos de mascotas
    axios
      .get("  https://buddy-app2.loca.lt/parameters/petType")
      .then((response) => {
        // Mapear los datos para obtener un array de opciones
        const petTypeOptions = response.data.petTypes.map((petType) => ({
          label: petType.petTypeName,
          value: petType.idPetType,
        }));
        // Guardar las opciones en el estado
        setPetTypeOptions(petTypeOptions);
        console.log(petTypeOptions);
        console.log("tipo de mascota obtenido con exito");
      })
      .catch((error) => {
        console.error("Error al obtener tipos de mascotas:", error);
      });

    // Obtener razas de mascotas
    axios
      .get("http://buddy-app2.loca.lt/parameters/petBreed")
      .then((response) => {
        // Mapear los datos para obtener un array de opciones
        const petBreedOptions = response.data.petBreeds.map((petBreed) => ({
          label: petBreed.petBreedName,
          value: petBreed.idPetBreed,
        }));
        // Guardar las opciones en el estado
        setPetBreedOptions(petBreedOptions);
        console.log(petBreedOptions);
        console.log("tipo de raza obtenido con exito");
      })
      .catch((error) => {
        console.error("Error al obtener razas de mascotas:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>EDITAR MASCOTA</Text>
          <AgregarImagen />
          <View style={[{ flexDirection: "row" }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Nombre</Text>
            <TextInput
              style={styles.inputTexto}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          {/* Campo de edición para la fecha */}
          <Text style={styles.textoFecha}>Fecha de nacimiento:</Text>
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
          <ScrollView horizontal={true}>
            <View>
              <ListaValoresAnimal
                selectedAnimal={selectedAnimal}
                setSelectedAnimal={setSelectedAnimal}
                setSelectedAnimalId={setSelectedAnimalId}
              />
            </View>
          </ScrollView>

          <View style={[styles.dropdown, { borderRadius: 100 }]}>
            {selectedAnimal && (
              <ListaValoresRazaPerros
                selectedAnimal={selectedAnimal}
                setSelectedBreedId={setSelectedBreedId}
              />
            )}
          </View>
          {/* Botón para actualizar */}

          <View style={styles.subcontenedor5}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={updateMascota}
            >
              <Text style={styles.closeButtonText} disabled={isButtonDisabled}>
                Actualizar Mascota
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          handleSuccessModalClose(); // Cerrar el modal EditarTurno
        }}
        message="Mascota editada correctamente"
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 35,
  },

  dropdown: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    height: 50,
    margin: 10,
    padding: 0,
    justifyContent: "center",
  },
  titulo: {
    marginTop: 10,
    fontSize: 22,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  inputTexto: {
    backgroundColor: "#EEE9E9",
    width: "70%",
    height: 32,
    borderRadius: 100,
    textAlign: "center",
  },
  tituloPublicacion: {
    marginRight: 20,
    fontSize: 16,
  },
  textoFecha: {
    marginLeft: 37,
    fontSize: 16,
    marginTop: 10,
  },
  subcontenedor1: {
    marginTop: 25,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontenedor2: {
    marginTop: 25,
    width: "100%",
    justifyContent: "center",
  },

  subcontenedor3: {
    marginTop: 25,
    marginLeft: 30,
  },
  subcontenedor4: {
    marginTop: 15,
    justifyContent: "center",
  },
  tarjeta: {
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 15,
    padding: 15,
  },
  subcontenedor5: {
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#FFB984",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 35,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
