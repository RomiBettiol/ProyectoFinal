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
import BarraBusqueda from "../componentes/BarraBusqueda";
import BotonesFiltros from "../componentes/BotonesFiltros";
import BotonFlotante from "../componentes/BotonFlotante";
import Mascotas from "../componentes/MiMascota/Mascotas";
import NuevaMascota from "../componentes/MiMascota/NuevaMascota";
import axios from "axios";
import EditarMascota from "../componentes/MiMascota/EditarMascota";
import EliminarMascotaModal from "../componentes/MiMascota/EliminarMascotaModal"; // Ruta a tu componente de modal de eliminación
import MisTurnos from "./MisTurnos";
import MisVacunas from "./MisVacunas";
import MiInfoImportante from "./MiInfoImportante";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook

import ImagePickerComponent from "../componentes/AgregarImagen";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos de Ionicons

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MiMascotaScreen() {
  const navigation = useNavigation();
  const [showTarjeta, setShowTarjeta] = useState(false); // Estado para mostrar la tarjeta
  const [showTarjetaEditar, setShowTarjetaEditar] = useState(false); // Estado para mostrar la tarjeta
  const [showModal, setShowModal] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [selectedMascotaId, setSelectedMascotaId] = useState();
  const [mascotas, setMascotas] = useState([]);
  const [botonesVisibles, setBotonesVisibles] = useState({}); // Usar un objeto en lugar de un array
  const [showNuevaMascotaModal, setShowNuevaMascotaModal] = useState(false);
  const [error404, setError404] = useState(false);
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;

  const toggleNuevaMascotaModal = () => {
    setShowNuevaMascotaModal(!showNuevaMascotaModal);
    setShowTarjeta(false); // Cierra el modal NuevaMascota
    setShowModalEliminar(false); // Cierra el modal de eliminación
    fetchMascotas();
  };

  const colores = ["#B8F7B7", "#DB3D63", "#6a89db"];
  let colorIndex = 0;

  const toggleTarjeta = () => {
    setShowTarjeta(!showTarjeta);
    toggleModalEliminar();
  };
  const [selectedMascota, setSelectedMascota] = useState(null);

  const openEditarModal = (mascota) => {
    setSelectedMascota(mascota);
    setShowTarjetaEditar(true);
  };

  //botones
  const [showBotonesFlotantes, setShowBotonesFlotantes] = useState(false);

  const mostrarBotonesFlotantes = () => {
    setShowBotonesFlotantes(!showBotonesFlotantes); // Cambia el valor opuesto
  };

  const toggleBotonesVisibles = (mascotaId) => {
    setBotonesVisibles((prevVisibles) => ({
      ...prevVisibles,
      [mascotaId]: !prevVisibles[mascotaId], // Invierte el valor de visibilidad para la mascota seleccionada
    }));
  };

  //Editar
  const toggleTarjetaEditar = () => {
    setShowTarjetaEditar(!showTarjetaEditar);
    setShowTarjeta(false); // Cierra el modal NuevaMascota
    setShowModalEliminar(false); // Cierra el modal de eliminación
    fetchMascotas();
  };
  //Eliminar

  const toggleModalEliminar = (mascotaId) => {
    setSelectedMascotaId(mascotaId);
    setShowModalEliminar(!showModalEliminar);
  };
  const eliminarMascota = () => {
    // Luego, cierra el modal de eliminación
    toggleModalEliminar();
    fetchMascotas();
  };

  const fetchMascotas = async () => {
    try {
      const response = await axios.get(
        ` https://e860-181-91-230-36.ngrok-free.app/mypet/pet`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      const mascotasData = response.data.pets;
      setMascotas(mascotasData);

      setBotonesVisibles(Array(mascotasData.length).fill(false)); // Inicializa el estado
    } catch (error) {
      if (error.response && error.response.status === 404) {
      }
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const idMascotaSeleccionada = (mascotaId) => {
    setSelectedMascotaId(mascotaId);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Mi Mascota</Text>
        </View>

        <View style={styles.contenedor2}>
          {mascotas.map((mascota, index) => (
            <View
              key={index}
              style={[
                styles.contenedor3,
                { backgroundColor: colores[index % colores.length] },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  idMascotaSeleccionada(mascota.idPet);
                  toggleBotonesVisibles(mascota.idPet); // Usa la función para mostrar/ocultar los botones
                }}
                style={styles.subcontenedor3}
              >
                <Image
                  source={require("../Imagenes/perrito.jpeg")}
                  style={styles.imagMascota}
                />
                <Text style={styles.nombreMascota}>{mascota.petName}</Text>
                <View style={styles.iconos}>
                  <TouchableOpacity
                    onPress={() => toggleModalEliminar(mascota.idPet)} // Pasa el idPet aquí
                  >
                    <Image
                      source={require("../Imagenes/basurin.png")}
                      style={styles.icono}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEditarModal(mascota)}>
                    <Image
                      source={require("../Imagenes/editar.png")}
                      style={styles.icono}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {/* Botones flotantes */}

              {botonesVisibles[mascota.idPet] && ( // Muestra los botones solo si están visibles para la mascota actual
                <View style={styles.botonesFlotantes}>
                  {/* Botón 1: Mis Vacunas */}
                  <TouchableOpacity
                    style={[
                      styles.botonFlotante,
                      { backgroundColor: colores[index % colores.length] },
                    ]}
                    onPress={() => {
                      navigation.navigate("MisTurnos", {
                        mascotaId: mascota.idPet, // Pasa el ID de la mascota seleccionada
                        token: token,
                      });
                    }}
                  >
                    <Image
                      source={require("../Imagenes/calendario.png")}
                      style={styles.botonFlot}
                    />
                  </TouchableOpacity>

                  {/* Botón 2: Mis Turnos */}
                  <TouchableOpacity
                    style={[
                      styles.botonFlotante2,
                      { backgroundColor: colores[index % colores.length] },
                    ]}
                    onPress={() => {
                      navigation.navigate("MisVacunas", {
                        mascotaId: mascota.idPet, // Pasa el ID de la mascota seleccionada
                        token: token,
                      });
                    }}
                  >
                    <Image
                      source={require("../Imagenes/jeringuilla.png")}
                      style={styles.botonFlot}
                    />
                  </TouchableOpacity>

                  {/* Botón 3: Mi Información */}
                  <TouchableOpacity
                    style={[
                      styles.botonFlotante,
                      { backgroundColor: colores[index % colores.length] },
                    ]}
                    onPress={() => {
                      navigation.navigate("MiInfoImportante", {
                        mascotaId: mascota.idPet, // Pasa el ID de la mascota seleccionada
                        token: token,
                      });
                    }}
                  >
                    <Image
                      source={require("../Imagenes/notas.png")}
                      style={styles.botonFlot}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          {/* Modal (tarjeta flotante Eliminar) */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={showModalEliminar}
            onRequestClose={() => toggleModalEliminar(null)} // Limpia el estado
          >
            <View style={styles.modalContainerEliminar}>
              <View style={styles.modalContentEliminar}>
                <EliminarMascotaModal
                  visible={showModalEliminar}
                  onCancel={() => toggleModalEliminar(null)}
                  onConfirm={eliminarMascota}
                  mascotaId={selectedMascotaId} // Pasa el idPet almacenado en selectedMascotaId
                />
              </View>
            </View>
          </Modal>

          {/* Modal (tarjeta flotante Editar) */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={showTarjetaEditar}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    setShowTarjetaEditar(false);
                    setSelectedMascota(null);
                  }}
                  style={styles.closeIcon}
                >
                  <Ionicons
                    style={styles.iconoCruz}
                    name="close-circle"
                    size={32}
                    color="gray"
                  />
                </TouchableOpacity>
                {/* Pasa la información de la mascota a EditarMascota */}
                {selectedMascota && (
                  <EditarMascota
                    mascota={selectedMascota}
                    token={token}
                    onCloseEditarMascota={toggleTarjetaEditar}
                  />
                )}
              </View>
            </View>
          </Modal>

          <View style={styles.contenedor3}>
            <TouchableOpacity
              onPress={toggleTarjeta} // Cambia el estado al presionar el botón
            >
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagAgregar}
              />
              <Text style={styles.nombreMascota}>Agregar una mascota</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal AGREGAR (tarjeta flotante) */}
        <Modal transparent={true} animationType="slide" visible={showTarjeta}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  toggleTarjeta();
                  setSelectedMascota(null);
                }}
                style={styles.closeIcon}
              >
                <Ionicons
                  style={styles.iconoCruz}
                  name="close-circle"
                  size={32}
                  color="gray"
                />
              </TouchableOpacity>
              <NuevaMascota
                token={token}
                onCloseNuevaMascota={toggleNuevaMascotaModal}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sinInfo: {
    fontSize: 14,
    color: "grey",
  },
  contentContainer22: {
    marginTop: 400,
    justifyContent: "center", // Para centrar vertical
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#DDC4B8",
  },
  titulo: {
    marginTop: 20,
    fontSize: 22,
    marginLeft: 15,
    marginBottom: 10,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
    alignItems: "center",
  },
  contenedor2: {
    alignItems: "center",
    marginTop: 5,
  },
  contenedor3: {
    width: 180,
    height: 180,
    flex: 1,
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
    alignItems: "center",
    position: "relative",
    marginTop: 15,
    marginBottom: 15,
  },
  imagAgregar: {
    borderRadius: 50,
    height: 100,
    width: 100,
    margin: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo con opacidad
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 15,
    padding: 5,
    width: windowWidth * 0.95, // Aproximadamente la mitad del ancho de la pantalla
    height: windowHeight * 0.75, // Aproximadamente la mitad del alto de la pantalla
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "gray",
  },
  closeIcon: {
    position: "absolute",
    top: 2,
    right: 10,
  },
  iconoCruz: {
    marginBottom: 10,
    // padding:0,
  },
  imagMascota: {
    borderRadius: 50,
    height: 100,
    width: 100,
    margin: 10,
    marginBottom: 2,
  },
  nombreMascota: {
    fontSize: 14,
    marginBottom: 35,
  },
  iconos: {
    width: "100%",
    flexDirection: "row", // Alinear los iconos en fila
    flex: 1,
    justifyContent: "space-between",
    alignContent: "flex-end",
    position: "absolute", // Posicionamiento absoluto para los iconos
    bottom: 0, // Alinear en la parte inferior
    //right: 0, // Alinear en la parte izquierda
  },
  icono: {
    height: 25,
    width: 25,
    margin: 5,
    padding: 3,
  },
  botonesFlotantes: {
    position: "absolute",
    right: 40,
    top: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  botonFlotante2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 120,
  },
  botonFlotante: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 100,
  },
  botonFlot: {
    height: 20,
    width: 20,
  },
  subcontenedor3: {
    alignItems: "center",
    width: "88%",
    height: "99%",
  },
  confirmButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonAccept: {
    backgroundColor: "green",
    marginRight: 5,
  },
  confirmButtonCancel: {
    backgroundColor: "red",
    marginLeft: 5,
  },
});
