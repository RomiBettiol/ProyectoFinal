import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Registro = () => {
  const [usuario, setUsuario] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");
  const [formValid, setFormValid] = React.useState(false); // Variable de estado para rastrear el estado de validación del formulario
  const [showAlert, setShowAlert] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado
  const [showAlertServer, setShowAlertServer] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado del back-end
  const [error, setError] = React.useState("");
  const navigation = useNavigation();

  const handleValidation = () => {
    const isValid = usuario.trim() !== "" && contrasena.trim() !== "";
    return isValid;
  };

  useEffect(() => {
    setFormValid(handleValidation());
  }, [usuario, contrasena]);

  const handleIngresarPress = async () => {
    if (formValid) {
      try {
        const response = await axios.post(
<<<<<<< HEAD
          `  https://buddy-app2.loca.lt/security/auth/login`,
=======
          ` https://e860-181-91-230-36.ngrok-free.app/security/auth/login`,
>>>>>>> feature/servicios
          {
            headers: {
              "Content-Type": "application/json",
            },
            mail: usuario,
            password: contrasena,
          }
        );

        if (response.status === 200) {
          const token = response.data.data.token;

          try {
            await AsyncStorage.setItem("auth-token", token);
          } catch (error) {
            console.error("Error al guardar datos:", error);
          }

          navigation.navigate("HomeScreen", { token });
        } else {
          setError(response.data.message || "Error desconocido");
          setShowAlertServer(true);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error desconocido");
        setShowAlertServer(true);
      }
    } else {
      setShowAlert(true);
    }
  };

  return (
    <SafeAreaView style={styles.contenedor2}>
      <Text style={[{ fontSize: 16 }]}>Complete los siguientes campos</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsuario}
        value={usuario}
        placeholder="Mail"
      />
      <TextInput
        style={styles.input}
        onChangeText={setContrasena}
        value={contrasena}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.boton, styles.shadowProp]}
        onPress={handleIngresarPress}
      >
        <Text>Ingresar</Text>
      </TouchableOpacity>

      {/* Cuadro de diálogo personalizado */}
      <Modal
        visible={showAlert}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              Por favor, completa ambos campos.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlert(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showAlertServer}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAlertServer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{error}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlertServer(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => navigation.navigate("RecuperarContrasenaScreen")}
      >
        <Text style={[{ fontSize: 16 }]}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "70%",
    marginBottom: "1%",
    marginTop: "5%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
  },

  contenedor2: {
    marginTop: "18%",
    backgroundColor: "#DDC4B8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "25%",
    borderTopLeftRadius: 140,
    width: "85%",
    height: "60%",
    marginLeft: "15%",
    elevation: 30,
  },

  boton: {
    borderRadius: 10,
    marginTop: "5%",
    backgroundColor: "#FFB984",
    width: "50%",
    height: 45,
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "center",
    marginBottom: "5%",
    alignItems: "center",
    elevation: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  alertContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },

  alertText: {
    fontSize: 18,
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: "#FFB984",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Registro;
