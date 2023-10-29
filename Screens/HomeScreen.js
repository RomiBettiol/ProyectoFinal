import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MenuHorizontal from "../componentes/MenuHorizontal";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const route = useRoute(); // Obtiene la prop route
  const [quantity, setQuantity] = useState("");
  const [permisos, setPermisos] = useState([]);
  const [adoptionQuantity, setAdoptionQuantity] = useState("");
  const [lostPetsQuantity, setLostPetsQuantity] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificacion, setNotifications] = useState(false);
  const [notificacionReaded, setNotificationsReaded] = useState(false);
  const [infoUsuario, setInfoUsuario] = useState(false);

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
      image: require("../Imagenes/denuncias.png"),
      permission: "READ_DENUNCIAS",
      onPress: () => navigation.navigate("DenunciaScreen", { token }),
    },
    {
      title: "Lista de usuarios",
      image: require("../Imagenes/usuario_screen.png"),
      permission: "READ_LISTA_USUARIOS",
      onPress: () => navigation.navigate("ListaUsuariosScreen", { token }),
    },
    {
      title: "Lista de servicios",
      image: require("../Imagenes/servicios.png"),
      permission: "READ_LISTA_SERVICIOS",
      onPress: () => navigation.navigate("ListaServiciosScreen", { token }),
    },
    {
      title: "Alta de establecimientos",
      image: require("../Imagenes/establecimiento.png"),
      permission: "READ_ALTA_ESTABLECIMIENTO",
      onPress: () =>
        navigation.navigate("AltaEstablecimientoScreen", { token }),
    },
    {
      title: "Roles y permisos",
      image: require("../Imagenes/roles.png"),
      permission: "READ_ROLES",
      onPress: () => navigation.navigate("RyPScreen", { token, permisos }),
    },
    {
      title: "Back Up",
      image: require("../Imagenes/backup.png"),
      permission: "READ_BACKUP",
      onPress: () => navigation.navigate("Backup", { token }),
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

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://62ed-190-177-142-160.ngrok-free.app /reports/notification/",
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        setNotifications(response.data.notifications);

        // Contar notificaciones con el atributo 'readed' en true
        const readNotificationsCount = response.data.notifications.filter(
          (notification) => notification.readed === false
        ).length;
        setNotificationsReaded(readNotificationsCount);
        // Mostrar la cantidad de notificaciones con 'readed' en true en la consola
        console.log(
          "Cantidad de notificaciones con readed en true:",
          readNotificationsCount
        );
      } else {
        console.error("Error al obtener las notificaciones");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    obtenerInformes();
    obtenerPermisos();
    fetchNotifications();
    //const intervalId = setInterval(() => {
    //fetchNotifications();
    //}, 5000); // 5000 milisegundos = 5 segundos

    // Limpia el intervalo cuando el componente se desmonta
    //return () => clearInterval(intervalId);
  }, [token]);

  const obtenerInformes = async () => {
    try {
      const responseFounds = await axios.get(
        `https://62ed-190-177-142-160.ngrok-free.app /reports/count/founds-success`,
        { headers: { "auth-token": token } }
      );
      const foundsQuantity = responseFounds.data.quantity;
      setQuantity(foundsQuantity);

      const responseLosts = await axios.get(
        `https://62ed-190-177-142-160.ngrok-free.app /reports/count/losts-actives`,
        { headers: { "auth-token": token } }
      );
      const lostsQuantity = responseLosts.data.quantity;
      setLostPetsQuantity(lostsQuantity);

      const responseAdoptions = await axios.get(
        `https://62ed-190-177-142-160.ngrok-free.app /reports/count/adoptions-success`,
        { headers: { "auth-token": token } }
      );
      const adoptionsQuantity = responseAdoptions.data.quantity;
      setAdoptionQuantity(adoptionsQuantity);
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
    }
  }; // No hay dependencias, se ejecutará en cada renderizado del componente

  useFocusEffect(
    React.useCallback(() => {
      obtenerPermisos();
      obtenerInformes();
      fetchNotifications();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth-token");
      navigation.navigate("InicioScreen");
    } catch (error) {
      setLogoutError("Hubo un error al cerrar sesión.");
    }
  };

  async function obtenerPermisos() {
    try {
      const token = await AsyncStorage.getItem("auth-token");

      const response = await axios.get(
        `https://62ed-190-177-142-160.ngrok-free.app /security/user/permissions`,
        { headers: { "auth-token": token } }
      );

      if (!response.data) {
        return;
      }

      const permisos = JSON.stringify(response.data);

      await AsyncStorage.setItem("permisos", permisos);

      setPermisos(response.data);

      return;
    } catch (error) {
      console.error("Error al obtener los permisos:", error);
    }
  }

  // Accede al parámetro token
  const { token } = route.params;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
        <MenuHorizontal
          token={token}
          openModal={openModal}
          notificacionReaded={notificacionReaded}
        />
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
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.botonAyuda}
            onPress={() =>
              navigation.navigate("PreguntasFrecuentes", { token })
            }
          >
            <Text style={styles.textAyuda}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonAyuda} onPress={handleLogout}>
            <Text style={styles.textAyuda}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#DDC4B8",
    alignItems: "center",
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

  logo: {
    marginTop: 50,
    width: 350,
    height: 350,
  },

  informe1: {
    backgroundColor: "#8ADC58",
    marginTop: 20,
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
    marginTop: 3,
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
    marginTop: 3,
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
    marginRight: 15,
  },

  scroll: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
  },

  modalContent: {
    backgroundColor: "white", // Fondo blanco
    padding: 20,
    borderRadius: 10,
    alignItems: "center", // Centra el contenido horizontalmente
    width: "35%", // Ancho del modal, puedes ajustarlo según tus necesidades
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.15 },
      { translateY: -Dimensions.get("window").height * 0.12 },
    ],
  },

  // Agrega un estilo para el contenido interno del modal
  modalInnerContent: {
    backgroundColor: "white", // Fondo blanco
    padding: 20,
    borderRadius: 10,
    alignItems: "center", // Centra el contenido horizontalmente
  },

  botonAyuda: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },

  textAyuda: {
    fontSize: 16,
    padding: 5,
  },
});
