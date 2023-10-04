import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import axios, { AxiosError } from "axios";
import BotonImagenRegis from "../componentes/BotonImagenRegis";

export function RegistrarseScreen({ navigation }) {
  const [formValid, setFormValid] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado
  const [showAlertServer, setShowAlertServer] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado del back-end
  const [error, setError] = React.useState("");
  const [datosFormulario, setDatosFormulario] = useState({
    email: "",
    usuario: "",
    contrasena: "",
    contrasena2: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async () => {
    if (formValid) {
      const data = {
        userName: datosFormulario.usuario,
        mail: datosFormulario.email,
        password: datosFormulario.contrasena,
      };
      // Hacer la petición POST al backend usando axios
      try {
        const response = await axios.post(
          `  https://buddy-app2.loca.lt/security/user/register`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log("Registro exitoso:", response.data);
          navigation.navigate("ConfirmacionRegistroScreen");
        } else {
          setError(response.data.message || "Error desconocido");
          setShowAlertServer(true);
        }
      } catch (error) {
        console.log("Error:", error);
        setError(error.response?.data?.message || "Error desconocido");
        setShowAlertServer(true);
      }
    } else {
      let errorText = "Revise todos los campos";
      if (datosFormulario.nombre.trim() === "") {
        errorText = "Por favor, complete el nombre.";
      } else if (datosFormulario.contrasena !== datosFormulario.contrasena2) {
        errorText = "Las contraseñas no coinciden.";
      } else if (datosFormulario.usuario.trim() === "") {
        errorText = "Por favor, complete el nombre de usuario.";
      } else if (datosFormulario.email.trim() === "") {
        errorText = "Por favor, complete el mail.";
      }

      setErrorMessage(errorText);
      console.log(errorMessage);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../Imagenes/logo2.png")}
          style={styles.imagen}
        />
        <Text style={styles.titulo}>REGISTRARSE</Text>
      </View>

      <FormularioRegistrarse
        key="formularioRegistrarse"
        onFormValidChange={setFormValid}
        datosFormulario={datosFormulario}
        onDatosChange={setDatosFormulario} // Aquí ahora pasamos el setter directamente
      />

      <View style={styles.footerBoton}>
        <TouchableOpacity
          style={[
            styles.botonRegistro,
            !formValid && styles.disabledBotonRegistro,
          ]}
          //  disabled={!formValid}
          onPress={handleSubmit} // Llamamos a la función handleSubmit al presionar el botón "Registrarse"
        >
          <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
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
            <Text style={styles.alertText}> {error}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlertServer(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Nuevo modal de error */}
      <Modal
        visible={!!errorMessage} // Mostrar modal si errorMessage tiene un valor
        animationType="fade"
        transparent={true}
        onRequestClose={() => setErrorMessage("")}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setErrorMessage("")}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  titulo: {
    fontSize: 35,
    marginBottom: 30,
  },

  textoBoton: {
    fontSize: 20,
  },

  imagen: {
    width: 200,
    height: 200,
  },

  footerBoton: {
    width: "100%",
  },

  botonRegistro: {
    marginTop: 70,
    backgroundColor: "#FFB984",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    marginBottom: 0,
    paddingHorizontal: 20,
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

export default RegistrarseScreen;
