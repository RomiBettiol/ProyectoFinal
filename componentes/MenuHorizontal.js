import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const MenuHorizontal = ({ openModal, notificacionReaded }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const [user, setUser] = useState("");

  console.log("notificaciones sin leer: ", notificacionReaded);

  const sendNotificationRequest = async () => {
    try {
      const response = await axios.post(
        "https://buddy-app2.loca.lt/reports/notification/",
        null,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Solicitud POST exitosa");
        // Después de una solicitud exitosa, navega a 'NotificacionesScreen'
        navigation.navigate("NotificacionesScreen", { token });
      } else {
        console.error("Error al hacer la solicitud POST");
        // Maneja el error de acuerdo a tus necesidades
        console.log(
          "Error",
          "Hubo un error al cargar las notificaciones. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
      // Maneja el error de red de acuerdo a tus necesidades
      console.log(
        "Error",
        "Hubo un error de red. Por favor, verifica tu conexión e inténtalo de nuevo."
      );
    }
  };

  // Función para abrir el modal desde MenuHorizontal
  const handleOpenModal = () => {
    openModal();
  };

  useEffect(() => {
    axios
      .get(`https://buddy-app2.loca.lt/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuContainer}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MiPerfil", { token })}
      >
        <Image source={{ uri: user.image }} style={styles.imagenMenu} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MisChats", { token })}
      >
        <Image
          source={require("../Imagenes/mensaje.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={sendNotificationRequest}
      >
        <Image
          source={require("../Imagenes/notificacion.png")}
          style={styles.menu}
        />
        {notificacionReaded > 0 && (
          <View style={styles.notificacionBadge}>
            <Text style={styles.notificacionText}>{notificacionReaded}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleOpenModal}>
        <Image
          source={require("../Imagenes/opciones.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingBottom: 8,
    paddingTop: 8,
    width: "90%",
    height: "65%",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#DDC4B8",
  },

  menuItem: {
    marginHorizontal: 30,
    height: 80,
    paddingTop: 20,
  },

  menu: {
    width: 40,
    height: 40,
    // borderRadius: 20,
  },

  imagenMenu: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  notificacionBadge: {
    position: "absolute",
    top: 5,
    right: -10,
    backgroundColor: "#FFB984",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  notificacionText: {
    color: "black", // Color del texto del badge
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MenuHorizontal;
