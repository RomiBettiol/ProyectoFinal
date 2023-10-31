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
import EditarInfo from "../componentes/MiMascota/EditarInfo";
import BotonInformacion from "../componentes/MiMascota/BotonInformacion";
import { Popover, Overlay } from "react-native-elements";

import { useRoute } from "@react-navigation/native"; // Import the useRoute hook
import axios from "axios";
import SuccessModal from "../componentes/MiMascota/SuccessModal";
import ErrorModal from "../componentes/MiMascota/ErrorModal";
import AltaInformacion from "../componentes/MiMascota/AltaInformacion";
import BarraBusquedaMascota from "../componentes/MiMascota/BarraBusquedaMascota";
import InfoModal from "../componentes/MiMascota/InfoModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MiInfoImportante() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedInformationIndex, setSelectedInformationIndex] =
    useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showAltaInfoModal, setShowAltaInfoModal] = useState(false);
  const [showEditarInfoModal, setShowEditarInfoModal] = useState(false);
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [informacion, setInformacion] = useState([]);
  const [info, setInfo] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [buttonTransform, setButtonTransform] = useState(0);
  const [error404, setError404] = useState(false);
  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  const { token } = route.params;
  const [mensaje, setMensaje] = useState("");
  const [image, setImage] = useState("");
  const [mascotas, setMascotas] = useState("");
  const color = route.params?.color;
  async function fetchInformacion() {
    try {
      const response = await axios.get(
        `https://37e1-186-12-32-189.ngrok-free.app/mypet/information/${mascotaId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (Array.isArray(response.data.information)) {
        setInformacion(response.data.information);
      } else {
        console.error(
          'API response does not have a valid "information" array:',
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
    fetchInformacion();
  }, [showSuccessModal]);

  const filterAndSearchInformacion = () => {
    return informacion.filter((info) => {
      const searchTextLower = searchText.toLowerCase();
      const titleLower = info.titleInformation.toLowerCase();

      return searchText === "" || titleLower.includes(searchTextLower);
    });
  };

  const filteredInformacionAgrupados = filterAndSearchInformacion();

  const toggleEditarInfoModal = () => {
    setShowEditarInfoModal(!showEditarInfoModal);
    fetchInformacion();
  };

  const toggleAltaInfoModal = async () => {
    await fetchInformacion(); // Espera a que se complete la actualización del estado
    setShowAltaInfoModal(!showAltaInfoModal);
  };

  // Dentro de la función que maneja la opción "Eliminar"
  const handleDeleteInfo = async () => {
    console.log(info.idInformation);
    try {
      const response = await axios.delete(
        `https://37e1-186-12-32-189.ngrok-free.app/mypet/information/${mascotaId}/${info.idInformation}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log("Info eliminado:", response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error eliminando la mascota:", error);
      setShowErrorModal(true);
    }

    setOverlayVisible(false); // Cierra el overlay después de eliminar
    fetchInformacion();
  };
  const handleSuccessModalClose = () => {
    fetchInformacion();
    setShowSuccessModal(false);
    setOverlayVisible(false); // Cierra el modal NuevaMascota
  };
  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get(
          `https://37e1-186-12-32-189.ngrok-free.app/mypet/pet/${mascotaId}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response.status === 200) {
          setMascotas(response.data);
          console.log("mascota: ", mascotas);
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
          <View style={[styles.container1, { backgroundColor: color }]}>
            <Image source={{ uri: image }} style={styles.imagMascota} />
            <View style={styles.containerTitulo}>
              <Text style={styles.titulo}>INFORMACIÓN IMPORTANTE</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerBarra}>
          <BarraBusquedaMascota
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
        </View>
        <Text style={styles.titulo}>Mi información</Text>
        {error404 ? (
          <View style={styles.contentContainer22}>
            <Text style={styles.sinInfo}>NO HAY INFORMACION CARGADA</Text>
          </View>
        ) : (
          <View style={styles.contentContainer2}>
            <View style={styles.contentContainer3}>
              <ScrollView>
                {filteredInformacionAgrupados.map((info, index) => (
                  <View style={styles.contenedorInfo} key={index}>
                    <TouchableOpacity
                      style={styles.containerInfo}
                      onPress={() => {
                        setInfo(info); // Esto ya lo tienes en tu código
                        setShowInfoModal(true); // Abre el modal TurnoModal
                      }}
                    >
                      <View style={styles.infoContainer}>
                        <View style={styles.info}>
                          <Text style={styles.titleInformation}>
                            {info.titleInformation}
                          </Text>
                          <Text style={styles.detalle}>
                            {info.descriptionInformation}
                          </Text>
                        </View>
                        <View style={styles.botonOpc}>
                          <TouchableOpacity
                            // style={styles.botonOpc}
                            onPress={() => {
                              setSelectedInformationIndex(index);
                              setOverlayVisible(true);
                              setInfo(info);
                            }}
                          >
                            <Image
                              source={require("../Imagenes/opciones.png")}
                              style={styles.opciones}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Overlay para opciones */}
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => {
            setOverlayVisible(false);
            setSelectedInformationIndex(null);
          }}
          overlayStyle={styles.overlayContent}
        >
          <TouchableOpacity
            style={styles.overlayOption}
            onPress={toggleEditarInfoModal}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
          {/* Modal de edición de mascota */}
          <Modal
            visible={showEditarInfoModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <EditarInfo
                  mascotaId={mascotaId}
                  info={info}
                  onClose={toggleEditarInfoModal}
                  token={token}
                />
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.overlayOption}
            onPress={handleDeleteInfo} // Llama a la función de eliminación
          >
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </Overlay>
        {/* Modal (tarjeta flotante) */}
      </ScrollView>
      <Modal
        visible={showAltaInfoModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AltaInformacion
              onClose={() => setShowAltaInfoModal(false)}
              token={token}
            />
          </View>
        </View>
      </Modal>
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          handleSuccessModalClose(); // Cerrar el modal EditarTurno
        }}
        message="Información eliminada correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage="Hubo un error al eliminar la información."
        onClose={() => setShowErrorModal(false)}
      />
      <Modal visible={showInfoModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <InfoModal info={info} onClose={() => setShowInfoModal(false)} />
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonInformacion onAddInfo={toggleAltaInfoModal} token={token} />
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
    height: windowHeight * 0.45,
    textAlign: "center",
    alignItems: "center", // Para centrar horizont
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    marginHorizontal: 10,
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
    marginVertical: 10,
  },
  contentContainer3: {
    marginTop: 10,
    height: "100%",
    marginVertical: 10,
  },
  container1: {
    width: "100%",
    height: 70,
    borderRadius: 20,
    justifyContent: "flex-start", // Para centrar vertical
    alignItems: "center", // Para centrar horizontal
    flexDirection: "row",
    // elevation: 20,
    marginBottom: 10,
  },
  containerTitulo: {
    alignItems: "center", // Para centrar horizontal
    width: "80%",
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
  contenedorInfo: {
    elevation: 3,
    backgroundColor: "#FFFFFF",
    width: "95%",
    height: 70,
    borderRadius: 18,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 4,
    // Add shadow styles
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
  },
  containerInfo: {
    alignSelf: "center",
    width: "100%",
    padding: 3,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Divides the container into two columns
    width: "100%",
    marginBottom: 10,
  },
  botonOpc: {
    width: "15%",
    justifyContent: "flex-end",
    // alignItems: 'center',
  },
  info: {
    flexDirection: "column",
    width: "80%", // Takes up 90% of the width within infoContainer
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  opciones: {
    height: 20,
    width: 20,
  },

  titleInformation: {
    fontSize: 16,
    fontWeight: "bold",
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
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
});
