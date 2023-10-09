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

const MenuHorizontal = ({ openModal }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const [user, setUser] = useState("");

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
        <Image source={{ uri: user.image }} style={styles.menu} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={require("../Imagenes/mensaje.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={require("../Imagenes/notificacion.png")}
          style={styles.menu}
        />
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
    borderRadius: 20,
  },
});

export default MenuHorizontal;
