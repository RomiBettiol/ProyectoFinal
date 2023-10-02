import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../componentes/HeaderScreen";
import BotonesFiltrosServicios from "../componentes/Servicios/BotonesFiltrosServicios";
import ListaServicios from "../componentes/Servicios/ListaServicios";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function ServiciosScreen() {
  const route = useRoute();
  const { token } = route.params;
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
  const [types, setTypes] = useState();
  const [servicios, setServicios] = useState([
    { id: 1, nombre: "Servicio 1", categoria: "Comida" },
    { id: 2, nombre: "Servicio 2", categoria: "Limpieza" },
    { id: 3, nombre: "Servicio 3", categoria: "Comida" },
    { id: 4, nombre: "Servicio 4", categoria: "Transporte" },
  ]);

  const handleFiltroChange = (categoria) => {
    // Actualiza el estado filtroSeleccionado
    setFiltroSeleccionado(categoria);
  };

  const serviciosFiltrados = filtroSeleccionado
    ? servicios.filter((servicio) => servicio.categoria === filtroSeleccionado)
    : servicios;

  useEffect(() => {
    const serviceTypes = getServiceType();
    console.log(serviceTypes);
  }, []);

  const getServiceType = async () => {
    try {
      const types = await axios.get(
        `https://buddy-app2.loca.lt/parameters/serviceType/`
      );
      console.log(types.data.serviceTypes);
      return types.data.serviceTypes;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Servicios para tu mascota</Text>
          {/* <BotonesFiltrosServicios
            categorias={}
            filtroSeleccionado={filtroSeleccionado}
            onFiltroChange={handleFiltroChange}
          /> */}
          <ListaServicios serviciosFiltrados={serviciosFiltrados} />
        </View>
      </ScrollView>
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
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
  },
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
});
