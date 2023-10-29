import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../componentes/HeaderScreen";
import BarraBusquedaMascota from "../componentes/MiMascota/BarraBusquedaMascota";
import BotonVaccine from "../componentes/MiMascota/BotonVaccine";
import BotonFlotante from "../componentes/BotonFlotante";
import { Popover, Overlay } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AltaVaccin from "../componentes/MiMascota/AltaVaccin";
import EditarVaccin from "../componentes/MiMascota/EditarVaccin";
import VaccinModal from "../componentes/MiMascota/VaccinModal";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook
import axios from "axios";
import SuccessModal from "../componentes/MiMascota/SuccessModal";
import ErrorModal from "../componentes/MiMascota/ErrorModal";
import { dismissBrowser } from "expo-web-browser";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MisVacunas() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedVaccinIndex, setSelectedVaccinIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchText, setSearchText] = useState("");
  const [showAltaVaccinModal, setShowAltaVaccinModal] = useState(false);
  const [showEditarVaccinModal, setShowEditarVaccinModal] = useState(false);
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [vaccin, setVaccin] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  const { token } = route.params;
  const [showVaccinModal, setShowVaccinModal] = useState(false);
  const [buttonTransform, setButtonTransform] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [error404, setError404] = useState(false);
  const [image, setImage] = useState('');
  const [mascotas, setMascotas] = useState('');
  const color  = route.params?.color;
  

  async function fetchVaccines() {
    try {
      const response = await axios.get(
        `https://buddy-app2.loca.lt/mypet/vaccine/${mascotaId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log("Después de hacer la solicitud GET");
      if (response.data && Array.isArray(response.data.vaccines)) {
        setVaccines(response.data.vaccines);
      } else {
        console.error(
          'API response does not have a valid "vaccines" array:',
          response.data
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si el error es 404, establece el estado error404 en true
        setError404(true);
      }
    }
  }

  useEffect(() => {
    fetchVaccines();
  }, [mascotaId, token]);

  const filterAndSearchVaccines = () => {
    return vaccines
      .filter((vaccin) => {
        console.log(vaccin.vaccineDate);
        const dateParts = vaccin.vaccineDate.split("-");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
        const year = parseInt(dateParts[2], 10);
        console.log(year);
        console.log(month);
        console.log(day);
        const vaccineDate = new Date(year, month, day);
        console.log("vaccineDate: ", vaccineDate);
        const vaccinYear = vaccineDate.getFullYear();
        console.log("vaccinYear: ", vaccinYear);
        const searchTextLower = searchText.toLowerCase();
        console.log("searchTextLower: ", searchTextLower);
        const titleLower = vaccin.titleVaccine.toLowerCase();
        console.log("titleLower: ", titleLower);
        console.log("hora:", vaccin.vaccineHour);
        return (
          (selectedYear === null || vaccinYear === selectedYear) &&
          (searchText === "" || titleLower.includes(searchTextLower))
        );
      })
      .sort((a, b) => {
        const fechaA = new Date(a.vaccineDate);
        const fechaB = new Date(b.vaccineDate);

        return fechaA - fechaB;
      });
  };

  const filteredAndSortedVaccines = filterAndSearchVaccines();
  function groupVaccinesByMonth(vaccines) {
    const groupedVaccines = {};

    vaccines.forEach((vaccin) => {
      const dateParts = vaccin.vaccineDate.split("-");
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
      const day = parseInt(dateParts[0], 10);
      const fecha = new Date(year, month, day);
      const mes = fecha.toLocaleString("default", { month: "long" });

      if (!groupedVaccines[mes]) {
        groupedVaccines[mes] = [];
      }

      groupedVaccines[mes].push(vaccin);
    });

    return groupedVaccines;
  }

  const filteredVaccinesAgrupados = groupVaccinesByMonth(
    filteredAndSortedVaccines
  );

  const toggleEditarVaccinModal = () => {
    setShowEditarVaccinModal(!showEditarVaccinModal);
    fetchVaccines();
  };

  const toggleAltaVaccinModal = () => {
    setShowAltaVaccinModal(!showAltaVaccinModal);
    fetchVaccines();
  };

  function dia(vaccin) {
    const dateParts = vaccin.vaccineDate.split("-");
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
    const day = parseInt(dateParts[0], 10);
    return day;
  }

  // Dentro de la función que maneja la opción "Eliminar"
  const handleDeleteVaccin = async () => {
    console.log(vaccin.idVaccin);
    try {
      const response = await axios.delete(
        `https://buddy-app2.loca.lt/mypet/vaccine/${mascotaId}/${vaccin.idVaccine}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log("Vaccin  eliminado:", response.data);
      setMensaje("Vacuna eliminada correctamente");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error eliminando la vacuna:", error);
      setMensaje("Vacuna eliminada correctamente");
      setShowErrorModal(true);
    }

    setOverlayVisible(false); // Cierra el overlay después de eliminar
    fetchVaccines();
  };

  const handleSuccessModalClose = () => {
    fetchVaccines();
    setShowSuccessModal(false);
    setShowVaccinModal(false);
    setOverlayVisible(false); // Cierra el modal NuevaMascota
  };

  useEffect(() => {
    console.log("vaccines: ");
    console.log(vaccines);
  }, [vaccines]);

  
  useEffect(() => {
    const fetchMascotas= async () => {
      try {
        const response = await axios.get(`https://buddy-app2.loca.lt/mypet/pet/${mascotaId}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response.status === 200) {
          setMascotas(response.data);
          console.log("mascota: ",mascotas);
          setImage(response.data.pet[0].image);
          console.log("image: ", image);
        } else {
          setMascotas(response.data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchMascotas();
  }, [token]);


  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <ScrollView style={styles.scroll}>
        <View style={styles.contentContainer1}>
         <View style={[styles.container1 , {backgroundColor: color} ]}>
            <Image
              source={{uri: image}}
              style={styles.imagMascota}
            />
            <View style={styles.containerTitulo}>
              <Text style={styles.titulo}>MIS VACUNAS</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.containerBarra}>
            <BarraBusquedaMascota
              searchText={searchText}
              onSearchTextChange={setSearchText}
            />
          </View>

          <View style={styles.yearPickerContainer}>
            <Text>Seleccionar año: </Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedYear(itemValue)
              }
              style={{ height: 50, width: 130 }}
            >
              {/* Generar las opciones de años dinámicamente */}
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() + i
              ).map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
          </View>
        </View>
        {error404 ? (
          <View style={styles.contentContainer22}>
            <Text style={styles.sinInfo}>NO HAY VACUNAS CARGADAS</Text>
          </View>
        ) : (
          <View style={styles.contentContainer2}>
            {Object.keys(filteredVaccinesAgrupados)
              .sort((a, b) => {
                const mesesOrdenados = [
                  "enero",
                  "febrero",
                  "marzo",
                  "abril",
                  "mayo",
                  "junio",
                  "julio",
                  "agosto",
                  "septiembre",
                  "octubre",
                  "noviembre",
                  "diciembre",
                ];
                return mesesOrdenados.indexOf(a) - mesesOrdenados.indexOf(b);
              })
              .map((mes) => (
                <View style={styles.contentContainer3} key={mes}>
                  <Text style={styles.subtitulo}>{mes}</Text>
                  <ScrollView horizontal={true}>
                    {filteredVaccinesAgrupados[mes].map((vaccin, index) => (
                      <View style={styles.contenedorVaccin} key={index}>
                        <TouchableOpacity
                          style={styles.containerVaccin}
                          onPress={() => {
                            setVaccin(vaccin); // Esto ya lo tienes en tu código
                            setShowVaccinModal(true); // Abre el modal TurnoModal
                          }}
                        >
                          <TouchableOpacity
                            style={styles.botonOpc}
                            onPress={() => {
                              setSelectedVaccinIndex(index);
                              setOverlayVisible(true);
                              setVaccin(vaccin);
                            }}
                          >
                            <Image
                              source={require("../Imagenes/opciones.png")}
                              style={styles.opciones}
                            />
                          </TouchableOpacity>

                          <View style={[styles.dia , {backgroundColor: color}]}>
                            <Text style={styles.numero}>{dia(vaccin)}</Text>
                          </View>
                          <Text>{vaccin.vaccineHour}</Text>
                          <Text style={styles.detalle}>
                            {vaccin.titleVaccine}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ))}
          </View>
        )}

        {/* Overlay para opciones */}
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => {
            setOverlayVisible(false);
            setSelectedVaccinIndex(null);
          }}
          overlayStyle={styles.overlayContent}
        >
          <TouchableOpacity
            style={styles.overlayOption}
            onPress={toggleEditarVaccinModal}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
          {/* Modal de edición de mascota */}
          <Modal
            visible={showEditarVaccinModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <EditarVaccin
                  mascotaId={mascotaId}
                  vaccin={vaccin}
                  onClose={toggleEditarVaccinModal}
                  token={token}
                />
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.overlayOption}
            onPress={handleDeleteVaccin} // Llama a la función de eliminación
          >
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </Overlay>
        {/* Modal (tarjeta flotante) */}
        <Modal
          visible={showAltaVaccinModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <AltaVaccin onClose={toggleAltaVaccinModal} token={token} />
            </View>
          </View>
        </Modal>
        <SuccessModal
          visible={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            handleSuccessModalClose(); // Cerrar el modal EditarTurno
          }}
          message={mensaje}
        />
        <ErrorModal
          visible={showErrorModal}
          errorMessage={mensaje}
          onClose={() => setShowErrorModal(false)}
        />
        <Modal
          visible={showVaccinModal}
          animationType="slide"
          transparent={true}
          onClose={() => {
            setShowVaccinModal(false);
            handleSuccessModalClose();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <VaccinModal
                vaccin={vaccin}
                onClose={() => setShowVaccinModal(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonVaccine onAddVaccin={toggleAltaVaccinModal} token={token} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sinInfo: {
    fontSize: 14,
    color: "grey",
  },
  contentContainer22: {
    marginTop: 200,
    justifyContent: "center", // Para centrar vertical
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
  scroll: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    
  },
  contentContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Añade espacios a los lados si es necesario
    marginTop: 20,
  },
  contentContainer2: {
    marginHorizontal: 15,
  },
  contentContainer3: {
    // marginTop: 10,
  },
  container1: {
    width: "100%",
    height: 70,
    borderRadius: 20,
    justifyContent: "flex-start", // Para centrar vertical
    alignItems: "center", // Para centrar horizontal
    flexDirection: "row",
    elevation: 20,
  },
  containerTitulo: {
    alignItems: "center", // Para centrar horizontal
    width: "90%",
    height:"100%",
    justifyContent: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 10,
  },
  imagMascota: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  contenedorVaccin: {
    backgroundColor: "white",
    width: 100,
    height: 145,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderRadius: 15,
    elevation: 3,
    alignItems: "center", // Para centrar horizontal
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 4,
  },
  botonOpc: {
    margin: 2,
  },
  opciones: {
    height: 15,
    width: 15,
    marginLeft: 60,
    marginTop: 5,
  },
  dia: {
    backgroundColor: "#47D3CB",
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center", // Para centrar vertical
    alignItems: "center", // Para centrar horizontal
    marginBottom: 10,
  },
  numero: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  detalle: {
    fontSize: 12,
  },
  overlayContent: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    elevation: 4,
  },
  overlayOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  yearPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginLeft: 20,
  },
  containerBarra: {
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  containerVaccin: {
    alignSelf: "center",
    alignItems: "center",
  },
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
});
