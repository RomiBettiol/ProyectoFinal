import React, { useRef, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SlideModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const [confirmLogoutModalVisible, setConfirmLogoutModalVisible] =
    useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const handleOptionPress = (screenName) => {
    // Verifica si la opción seleccionada coincide con la pantalla actual
    if (route.name === screenName) {
      handleModalClose(); // Cierra la modal si están en la misma pantalla
    } else {
      // Navega a la pantalla correspondiente si no están en la misma pantalla
      navigation.navigate(screenName, { token });
      handleModalClose(); // Cierra la modal después de navegar
    }
  };

  const handleModalClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const handleBackgroundPress = () => {
    // Close the modal when the background is pressed
    handleModalClose();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth-token");
      navigation.navigate("InicioScreen");
    } catch (error) {
      setLogoutError("Hubo un error al cerrar sesión.");
    }
  };

  const handleConfirmLogout = () => {
    setConfirmLogoutModalVisible(true);
  };

  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [user, setUser] = useState("");
  const [idUser, setIdUser] = useState("");

  //Trae info del usuario
  const fetchNombre = () => {
    axios
      .get(` https://e860-181-91-230-36.ngrok-free.app/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setNewName(response.data[0].name);
        setNewUserName(response.data[0].userName);

        // Declarar la constante idUser
        setIdUser(response.data[0].idUser);

        // Luego puedes usar idUser como desees en tu componente.
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchNombre();
  }, [token, idUser]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleModalClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0], // Adjust the value to control the slide distance
                  }),
                },
              ],
            },
          ]}
        >
          {/* Content of the modal */}
          <View style={[styles.usuario]}>
            <Image
              source={require("../Imagenes/usuario.png")}
              style={styles.imagenUsuario}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("MiPerfil", { token })}
            >
              <Text style={styles.textoUsuario}>{newUserName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.opciones}
              onPress={() => handleOptionPress("BusquedaScreen")}
            >
              <View style={[{ flexDirection: "row" }, styles.view]}>
                <Image
                  source={require("../Imagenes/lupa.png")}
                  style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Buscar mascota</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionPress("AdoptarScreen")}
              style={styles.opciones}
            >
              <View style={[{ flexDirection: "row" }, styles.view]}>
                <Image
                  source={require("../Imagenes/mascota.png")}
                  style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Adoptar mascota</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opciones}>
              <View style={[{ flexDirection: "row" }, styles.view]}>
                <Image
                  source={require("../Imagenes/perro.png")}
                  style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Servicios</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opciones}
              onPress={() => navigation.navigate("MiMascotaScreen", { token })}
            >
              <View style={[{ flexDirection: "row" }, styles.view]}>
                <Image
                  source={require("../Imagenes/huella.png")}
                  style={styles.imagenMenu}
                />
                <Text style={styles.textoModal}>Mi mascota</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viewCerrarSesion}>
            <TouchableOpacity
              style={styles.touchableCerrarSesion}
              onPress={handleConfirmLogout}
            >
              <View style={styles.viewCerrarSesion}>
                <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      {logoutError && (
        <View style={styles.errorContainer}>
          <Text>{logoutError}</Text>
          <TouchableOpacity onPress={() => setLogoutError(null)}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={confirmLogoutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Desea cerrar sesión?</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                onPress={() => {
                  setConfirmLogoutModalVisible(false);
                  handleLogout(); // Esta función aún no está definida, la agregaremos a continuación.
                }}
                style={[styles.confirmButton, styles.confirmButtonAccept]}
              >
                <Text style={styles.confirmButtonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setConfirmLogoutModalVisible(false)}
                style={[styles.confirmButton, styles.confirmButtonCancel]}
              >
                <Text style={styles.confirmButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#DDC4B8",
    padding: 16,
    width: 650,
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "right",
  },
  textoModal: {
    color: "black",
    textAlign: "right",
    fontSize: 20,
  },
  imagenMenu: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 3,
  },
  opciones: {
    marginTop: 25,
  },
  viewCerrarSesion: {
    marginTop: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  cerrarSesion: {
    fontSize: 14,
    marginRight: 45,
  },
  textoUsuario: {
    fontSize: 20,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 20,
  },
  usuario: {
    width: 210,
    height: 100,
    alignItems: "center",
    marginBottom: 140,
  },
  imagenUsuario: {
    width: 60,
    height: 60,
    marginLeft: 8,
    backgroundColor: "#DDC4B8",
    borderRadius: 30,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  confirmButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#FFB984",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonAccept: {
    marginRight: 5,
  },
  confirmButtonCancel: {
    marginLeft: 5,
  },
  confirmButtonText: {
    fontSize: 16,
  },
});

export default SlideModal;
