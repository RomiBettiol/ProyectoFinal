import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../componentes/HeaderScreen";
import BotonMenu from "../componentes/BotonMenu";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function ReportesScreen() {
  const [quantity, setQuantity] = useState("");
  const [servicesActiveQuantity, setServicesActiveQuantity] = useState("");
  const [usersActiveQuantity, setUsersActiveQuantity] = useState("");
  const [lostPetsQuantity, setLostPetsQuantity] = useState("");
  const [adoptionPetsQuantity, setAdoptionPetsQuantity] = useState("");
  const [adoptionQuantity, setAdoptionQuantity] = useState("");
  const route = useRoute();
  const { token } = route.params;

  useEffect(() => {
    // Realizar la solicitud GET utilizando Axios
    axios
      .get("https://romibettiol.loca.lt/reports/count/founds-success", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Servicios activos
    axios
      .get("https://romibettiol.loca.lt/reports/count/services-actives", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setServicesActiveQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Usuarios activos
    axios
      .get("https://romibettiol.loca.lt/reports/count/users-actives", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setUsersActiveQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Mascotas perdidas
    axios
      .get("https://romibettiol.loca.lt/reports/count/losts-actives", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setLostPetsQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Mascotas en adopción
    axios
      .get("https://romibettiol.loca.lt/reports/count/adoptions-actives", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setAdoptionPetsQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Mascotas adoptadas
    axios
      .get("https://romibettiol.loca.lt/reports/count/adoptions-success", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setAdoptionQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });
  }, []);

  return (
    <View>
      <Header />
      <Text style={styles.titulo}>Reportes</Text>
      <View style={styles.Container}>
        <View style={[styles.informeUsuariosActivos, { flexDirection: "row" }]}>
          <Text style={styles.textoInforme}>Usuarios activos</Text>
          <Text style={styles.textoInforme}>{usersActiveQuantity}</Text>
        </View>
        <View
          style={[styles.informeMascotasPerdidas, { flexDirection: "row" }]}
        >
          <Text style={styles.textoInforme}>Mascotas perdidas</Text>
          <Text style={styles.textoInforme}>{lostPetsQuantity}</Text>
        </View>
        <View
          style={[styles.informeMascotasAdopcion, { flexDirection: "row" }]}
        >
          <Text style={styles.textoInforme}>Mascotas en adopción</Text>
          <Text style={styles.textoInforme}>{adoptionPetsQuantity}</Text>
        </View>
        <View
          style={[
            styles.informeEstablecimientosActivos,
            { flexDirection: "row" },
          ]}
        >
          <Text style={styles.textoInforme}>Establecimientos activos</Text>
          <Text style={styles.textoInforme}>{servicesActiveQuantity}</Text>
        </View>
        <View
          style={[styles.informeMascotasEncontradas, { flexDirection: "row" }]}
        >
          <Text style={styles.textoInforme}>Mascotas encontradas</Text>
          <Text style={styles.textoInforme}>{quantity}</Text>
        </View>
        <View
          style={[styles.informeMascotasAdoptadas, { flexDirection: "row" }]}
        >
          <Text style={styles.textoInforme}>Mascotas adoptadas</Text>
          <Text style={styles.textoInforme}>{adoptionQuantity}</Text>
        </View>
      </View>
      <BotonMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    marginTop: 10,
  },
  titulo: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 5,
  },
  informeUsuariosActivos: {
    backgroundColor: "#8ADC58",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
  textoInforme: {
    fontSize: 18,
  },
  informeMascotasPerdidas: {
    backgroundColor: "#FFB984",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
  informeMascotasAdopcion: {
    backgroundColor: "#58DCD4",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
  informeEstablecimientosActivos: {
    backgroundColor: "#B6A7A7",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
  informeMascotasEncontradas: {
    backgroundColor: "#5B58DC",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
  informeMascotasAdoptadas: {
    backgroundColor: "#FFEA2D",
    marginTop: 30,
    width: "80%",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
  },
});
