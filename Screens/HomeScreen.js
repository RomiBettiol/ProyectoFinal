import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MenuHorizontal from "../componentes/MenuHorizontal";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const route = useRoute(); // Obtiene la prop route
  const [quantity, setQuantity] = useState("");
  const [permisos, setPermisos] = useState("");
  const [adoptionQuantity, setAdoptionQuantity] = useState("");
  const [lostPetsQuantity, setLostPetsQuantity] = useState("");

  const buttons = [
    {
      title: "Encontrar mi mascota",
      image: require("../Imagenes/lupa.png"),
      permission: "READ_PUBLICACION_BUSQUEDA",
      onPress: () => navigation.navigate("BusquedaScreen", { token }),
    },
    {
      title: "Adoptar una mascota",
      image: require("../Imagenes/mascota.png"),
      permission: "READ_PUBLICACION_ADOPCION",
      onPress: () => navigation.navigate("AdoptarScreen", { token }),
    },
    {
      title: "Servicios para mi mascota",
      image: require("../Imagenes/perro.png"),
      permission: "READ_SERVICIOS",
      onPress: () => navigation.navigate("ServiciosScreen", { token }),
    },
    {
      title: "Mi mascota",
      image: require("../Imagenes/huella.png"),
      permission: "READ_MI_MASCOTA",
      onPress: () => navigation.navigate("MiMascotaScreen", { token }),
    },
    {
      title: "Reportes",
      image: require("../Imagenes/analitica.png"),
      permission: "READ_REPORTES",
      onPress: () => navigation.navigate("ReportesScreen", { token }),
    },
    {
      title: "Denuncias",
      image: require("../Imagenes/denuncia.png"),
      permission: "READ_DENUNCIAS",
      onPress: () => navigation.navigate("DenunciaScreen", { token }),
    },
    {
      title: "Lista de usuarios",
      image: require("../Imagenes/usuario_screen.png"),
      permission: "READ_LISTA_USUARIOS",
      onPress: () => navigation.navigate("ListUsuariosScreen", { token }),
    },
    {
      title: "Lista de servicios",
      image: require("../Imagenes/servicios.png"),
      permission: "READ_LISTA_SERVICIOS",
      onPress: () => navigation.navigate("ListaServiciosScreen", { token }),
    },
    {
      title: "Back Up",
      image: require("../Imagenes/backup.png"),
      permission: "READ_BACKUP",
      onPress: () => navigation.navigate("BackUpScreen", { token }),
    },
    {
      title: "Parametrización",
      image: require("../Imagenes/configuracion.png"),
      permission: "READ_PARAMETROS",
      onPress: () =>
        navigation.navigate("ParametrizacionScreen", { token, permisos }),
    },

    // Agrega más botones aquí
  ];

  useEffect(() => {
    obtenerPermisos();

    axios
      .get(
        ` https://e860-181-91-230-36.ngrok-free.app/reports/count/founds-success`
      )
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Mascotas perdidas
    axios
      .get(
        ` https://e860-181-91-230-36.ngrok-free.app/reports/count/losts-actives`
      )
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setLostPetsQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });

    // Mascotas adoptadas
    axios
      .get(
        ` https://e860-181-91-230-36.ngrok-free.app/reports/count/adoptions-success`
      )
      .then((response) => {
        // Extraer el valor quantity de la respuesta
        const { quantity } = response.data;
        setAdoptionQuantity(quantity); // Actualizar el estado con el valor quantity
      })
      .catch((error) => {
        console.error("Error al obtener el contador:", error);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerPermisos();
    }, [])
  );

  async function obtenerPermisos() {
    try {
      const token = await AsyncStorage.getItem("auth-token");

      const response = await axios.get(
        ` https://e860-181-91-230-36.ngrok-free.app/security/user/permissions`,
        { headers: { "auth-token": token } }
      );

      if (!response.data.permisos[0]) {
        return;
      }

      const permisos = JSON.stringify(response.data.permisos);

      await AsyncStorage.setItem("permisos", permisos);

      setPermisos(response.data.permisos);

      return;
    } catch (error) {
      console.error("Error al obtener los permisos:", error);
    }
  }

  // Accede al parámetro token
  const { token } = route.params;

  const renderButtons = () => {
    const rows = [];
    let currentRow = [];

    if (!permisos[0] || permisos.length === 0) {
      return null;
    }

    buttons.forEach((button, index) => {
      if (button && permisos.includes(button.permission)) {
        currentRow.push(
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <Image source={button.image} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        );

        // Agrega un máximo de 2 botones por fila
        if (currentRow.length === 2 || index === buttons.length - 1) {
          rows.push(
            <View key={rows.length} style={styles.buttonRow}>
              {currentRow}
            </View>
          );
          currentRow = [];
        }
      }
    });
    rows.push(
      <View key={rows.length} style={styles.buttonRow}>
        {currentRow}
      </View>
    );
    return rows;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.home}>
        <Image source={require("../Imagenes/logo2.png")} style={styles.logo} />
        <MenuHorizontal token={token} />
        {!permisos[0] ? <Text></Text> : renderButtons()}
        <View style={[styles.informe1, { flexDirection: "row" }]}>
          <Text style={styles.textoInforme}>
            Mascotas encontradas: {quantity}
          </Text>
        </View>
        <View style={[styles.informe2, { flexDirection: "row" }]}>
          <Text style={styles.textoInforme}>
            Mascotas adoptadas: {adoptionQuantity}
          </Text>
        </View>
        <View style={[styles.informe3, { flexDirection: "row" }]}>
          <Text style={styles.textoInforme}>
            Mascotas perdidas: {lostPetsQuantity}
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          // onPress={() => navigation.navigate("FAQScreen", { token })}
        >
          <Text style={{ marginTop: 5, fontSize: 20 }}>
            Preguntas Frecuentes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#DDC4B8",
    alignItems: "center",
  },

  logo: {
    marginTop: 50,
    width: 350,
    height: 350,
  },

  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 180,
    width: 180,
  },

  buttonImage: {
    width: 70,
    height: 70,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },

  informe1: {
    backgroundColor: "#8ADC58",
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  informe2: {
    backgroundColor: "#58DCD4",
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  informe3: {
    backgroundColor: "#9258DC",
    marginTop: 10,
    marginBottom: 20,
    width: "70%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  textoInforme: {
    fontSize: 20,
  },
});
