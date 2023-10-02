import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import axios from "axios"; // Importar Axios
import { useRoute } from "@react-navigation/native";
import BotonesFiltroServicios from "../componentes/Serivicios/BotonesFiltroServicios";
import BarraBusquedaServicios from "../componentes/Serivicios/BarraBusquedaServicios";
import BotonFlotante from "../componentes/BotonFlotante";

export default function ServiciosScreen({ navigation }) {
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;
  const [servicios, setServicios] = useState([]);
  const [buttonTransform, setButtonTransform] = useState(0);

  console.log("Token servicios: ", token);

  useEffect(() => {
    const config = {
      headers: {
        "auth-token": token,
      },
    };

    // Realizar la solicitud GET al backend cuando el componente se monta
    axios
      .get("https://buddy-app2.loca.lt/services/service/", config)
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
      });
  }, []);

  // Función para manejar la navegación a ServiciosDetalle y pasar el servicio seleccionado
  const navigateToServicioDetalle = (servicio) => {
    console.log("Probando Token: ", token);
    navigation.navigate("ServiciosDetalle", { servicio, token });
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

  return (
    <View>
      <HeaderScreen />
      <View style={styles.contenedor1}>
        <Text style={styles.titulo}>Servicios para tu mascota</Text>
        <BotonesFiltroServicios />
        <BarraBusquedaServicios />

        {Object.keys(serviciosAgrupados).map((typeName) => (
          <View key={typeName}>
            <Text style={styles.tipoServicios}>{typeName}</Text>
            <ScrollView horizontal={true}>
              {serviciosAgrupados[typeName].map((servicio) => (
                <TouchableOpacity
                  key={servicio.idService}
                  style={styles.contenedorServicio}
                  onPress={() => navigateToServicioDetalle(servicio)}
                >
                  <Image
                    source={require("../Imagenes/imagenPublicaciones.jpg")}
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
      <TouchableOpacity
        onPress={() => navigation.navigate("PublicarServicio", { token })}
      >
        <Text>Publicar servicio</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonFlotante token={token} />
      </View>
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
});
