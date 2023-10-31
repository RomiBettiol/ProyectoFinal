import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importa la librería de selección de imágenesimport HeaderScreen from '../HeaderScreen';
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import axios, { AxiosError } from "axios";
import BotonImagenRegis from "../componentes/BotonImagenRegis";
import TerminosCondiciones from "../componentes/TerminosCondiciones";

import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AgregarImagen from "../componentes/AgregarImagen";
Amplify.configure(awsconfig);

export function RegistrarseScreen({ navigation }) {
  const [formValid, setFormValid] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado
  const [showAlertServer, setShowAlertServer] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado del back-end
  const [error, setError] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    usuario: "",
    contrasena: "",
    contrasena2: "",
    image: "",
    domicilio: "",
    nroTelefono: "",
    fechaNacimiento: "",
    cuitCuil: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleTerminos = () => {
    setModalVisible(true); // Abre el modal de términos y condiciones
  };

  const handleAceptarTerminos = (resultado) => {
    setAceptoTerminos(resultado);
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (formValid && aceptoTerminos) {
      const data = {
        userName: datosFormulario.usuario,
        mail: datosFormulario.email,
        password: datosFormulario.contrasena,
        name: `${datosFormulario.nombre} ${datosFormulario.apellidos}`,
        phoneNumber: datosFormulario.nroTelefono,
        cuitCuil: datosFormulario.cuitCuil,
        address: datosFormulario.domicilio,
        birthDate: datosFormulario.fechaNacimiento,
        image: datosFormulario.image,
        userType: "BÁSICO",
        documents: null,
      };
      // Hacer la petición POST al backend usando axios
      try {
        const response = await axios.post(
          "https://37e1-186-12-32-189.ngrok-free.app/security/user/register",
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
      setErrorMessage("");
      let errorText = "Revise todos los campos";
      if (datosFormulario.nombre.trim() === "") {
        errorText = "Por favor, complete el nombre.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.contrasena !== datosFormulario.contrasena2) {
        errorText = "Las contraseñas no coinciden.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.usuario.trim() === "") {
        errorText = "Por favor, complete el nombre de usuario.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.email.trim() === "") {
        errorText = "Por favor, complete el mail.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.apellidos.trim() === "") {
        errorText = "Por favor, complete lo/s apellido/s.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.domicilio.trim() === "") {
        errorText = "Por favor, complete el domicilio.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.fechaNacimiento.trim() === "") {
        errorText = "Por favor, complete la fecha de nacimiento.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.cuitCuil.trim() === "") {
        errorText = "Por favor, complete el Cuit/Cuil.";
        setErrorMessage(errorText);
        return;
      } else if (datosFormulario.nroTelefono.trim() === "") {
        errorText = "Por favor, complete el número de teléfono.";
        setErrorMessage(errorText);
        return;
      }
      console.log(aceptoTerminos, formValid);
      if (!aceptoTerminos && formValid) {
        errorText = "Debe aceptar los terminos y condiciones";
        setErrorMessage(errorText);
        return;
      }
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
      <TouchableOpacity
        style={styles.terminos}
        onPress={() => {
          handleTerminos();
        }}
      >
        <Text style={styles.textoTerminos}>Aceptar términos y condiciones</Text>
      </TouchableOpacity>

      <TerminosCondiciones
        visible={modalVisible}
        onClose={handleAceptarTerminos}
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
    marginTop: 50,
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
    bottom: 0,
    position: "absolute",
    // marginTop: 25,
  },

  botonRegistro: {
    marginTop: 10,
    backgroundColor: "#FFB984",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
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
  terminos: {
    marginBottom: 60,
    marginTop: 10,
  },
  textoTerminos: {
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default RegistrarseScreen;
