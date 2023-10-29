import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import axios from "axios"; // Importar Axios
import { useRoute } from "@react-navigation/native";
import BotonesFiltroServicios from "../componentes/Serivicios/BotonesFiltroServicios";
import BarraBusquedaServicios from "../componentes/Serivicios/BarraBusquedaServicios";
import BotonFlotante from "../componentes/BotonFlotante";
import { useFocusEffect } from "@react-navigation/native";
import DenunciasModalServicio from "../componentes/Denuncias/DenunciasModalServcios";

export default function ServiciosScreen({ navigation }) {
  const route = useRoute(); // Obtiene la prop route
  const { token, permisos } = route.params;
  const [servicios, setServicios] = useState([]);
  const [buttonTransform, setButtonTransform] = useState(0);
  const [originalServicios, setOriginalServicios] = useState([]);
  const [denunciaModalVisible, setDenunciaModalVisible] = useState(false);
  const [selectedPublicationToReport, setSelectedPublicationToReport] =
    useState(null);
  const [selectedUserToReport, setSelectedUserToReport] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [filteredType, setFilteredType] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        setisLoading(true);
        const response = await axios.get(
          "https://buddy-app2.loca.lt/services/service/",
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response && response.data) {
          const data = response.data;
          setServicios(data);
          setOriginalServicios(data); // Almacena la copia original
        } else {
          console.log("No hay servicios disponibles.");
        }
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setisLoading(false);
      }
    };

    obtenerServicios();
  }, [token]);

  // Función para manejar la navegación a ServiciosDetalle y pasar el servicio seleccionado
  const navigateToServicioDetalle = (servicio) => {
    navigation.navigate("ServiciosDetalle", { servicio, token, permisos });
  };

  // Agrupar servicios por serviceTypeName
  const serviciosAgrupados = servicios.reduce((agrupados, servicio) => {
    const { serviceTypeName } = servicio;
    if (!agrupados[serviceTypeName]) {
      agrupados[serviceTypeName] = [];
    }
    agrupados[serviceTypeName].push(servicio);
    return agrupados;
  }, {});

  const handleSearch = (text) => {
    // Si el campo de búsqueda está vacío, mostrar todos los servicios
    if (!text || text.trim() === "") {
      setServicios(originalServicios); // Restaura la lista original
    } else {
      // Filtrar los servicios por título
      const serviciosFiltrados = originalServicios.filter((servicio) =>
        servicio.serviceTitle.toLowerCase().includes(text.toLowerCase())
      );
      // Actualizar el estado con los servicios filtrados
      setServicios(serviciosFiltrados);
    }
  };

  const handleFilterChange = (filtro) => {
    // Si filtro es null, muestra todos los servicios originales
    if (filtro === null) {
      setServicios(originalServicios);
    } else {
      // Filtra los servicios según el tipo de servicio seleccionado
      const serviciosFiltrados = originalServicios.filter(
        (servicio) => servicio.serviceTypeName === filtro
      );
      // Actualiza el estado con los servicios filtrados
      setServicios(serviciosFiltrados);
    }
  };

  const handleFilterChangeHora = (filtro, tipo) => {
    console.log("Mostras desde handleFilterChangeHora: ", filtro);
    // Si filtro es null, muestra todos los servicios originales
    if (tipo == "Limpiar" || filtro == null) {
      setServicios(originalServicios);
      return;
    }
    if (tipo == "24HS") {
      const serviciosFiltrados = originalServicios.filter(
        (servicio) => servicio.open24hs === filtro
      );
      // Actualiza el estado con los servicios filtrados
      setServicios(serviciosFiltrados);
      return;
    } else {
      // Filtra los servicios según el tipo de servicio seleccionado
      const serviciosFiltrados = originalServicios.filter(
        (servicio) => servicio.idLocality === filtro
      );
      // Actualiza el estado con los servicios filtrados
      setServicios(serviciosFiltrados);
      return;
    }
  };

  const handleDenunciar = () => {
    setDenunciaModalVisible(true);
    setReportModalVisible(false); // Cierra el modal de reporte
  };

  const handleReportModal = (servicio) => {
    setSelectedPublicationToReport(servicio.idService);
    setSelectedUserToReport(servicio.idUser);
    console.log("selectedPublicationToReport: ", selectedPublicationToReport);
    console.log("selectedUserToReport: ", selectedUserToReport);
    setSelectedService(servicio);
    setDenunciaModalVisible(true);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    // Aplicar el filtro por zona seleccionada
    if (zone) {
      const serviciosFiltradosPorZona = originalServicios.filter(
        (servicio) => servicio.zone === zone
      );
      setServicios(serviciosFiltradosPorZona);
    } else {
      // Si no se selecciona ninguna zona, mostrar todas las publicaciones originales
      setServicios(originalServicios);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <View style={styles.contenedor1}>
        <Text style={styles.titulo}>Servicios para tu mascota</Text>
        <BotonesFiltroServicios onFilterChange={handleFilterChange} />
        <BarraBusquedaServicios
          onSearch={handleSearch}
          onFilterChangeHora={handleFilterChangeHora}
          token={token}
        />

        {Object.keys(serviciosAgrupados).map((typeName) => (
          <View key={typeName}>
            <Text style={styles.tipoServicios}>{typeName}</Text>
            <ScrollView horizontal={true}>
              {serviciosAgrupados[typeName].map((servicio) => (
                <TouchableOpacity
                  key={servicio.idService}
                  style={styles.contenedorServicio}
                  onPress={() => navigateToServicioDetalle(servicio)}
                  onLongPress={() => handleReportModal(servicio)}
                >
                  <Image
                    source={{ uri: servicio.images[0] }}
                    style={styles.imagenServicio}
                  />
                  <Text>{servicio.serviceTitle}</Text>

                  {servicio.open24hs === 1 && (
                    <View style={styles.cartelito24hs}>
                      <Text style={styles.cartelitoTexto}>24hs</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
      <DenunciasModalServicio
        visible={denunciaModalVisible}
        onClose={() => setDenunciaModalVisible(false)}
        selectedPublicationToReport={
          selectedService ? selectedService.idService : null
        }
        token={token}
        selectedUserToReport={selectedService ? selectedService.idUser : null}
      />

      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonFlotante
          token={token}
          permisos={permisos}
          permisosNecesario={"CREATE_SERVICIOS"}
        />
      </View>
      <Modal visible={isLoading} transparent>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 5,
    fontSize: 22,
    marginLeft: 15,
    marginBottom: 20,
  },
  contenedor1: {
    paddingTop: 10,
  },
  tipoServicios: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  contenedorServicio: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  imagenServicio: {
    width: 105,
    height: 105,
    borderRadius: 50,
  },
  cartelito24hs: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#F7C4B7", // Puedes cambiar el color de fondo
    padding: 5,
    borderRadius: 5,
  },
  cartelitoTexto: {
    color: "black", // Puedes cambiar el color del texto
    fontWeight: "bold",
  },
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  imagenFiltrar: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});
