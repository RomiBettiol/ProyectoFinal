import React from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { Image, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import { navigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ConfirmacionContrasenaScreen from "./ConfirmacionContrasenaScreen";
import axios from "axios";
import ErrorCard from "../componentes/ErrorCard";

export default function RecuperarContrasenaScreen({}) {
  const [email, setEmail] = React.useState("");
  const [emailValido, setEmailValido] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const validarEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const navigation = useNavigation();

  const isFormValid = email !== "" && validarEmail(email);

  const handleUpdate = async () => {
    if (!validarEmail(email)) {
      setEmailValido(false);
      return;
    }

    try {
      const response = await axios.post(
        ` https://e860-181-91-230-36.ngrok-free.app/security/auth/resetPassword`,
        {
          mail: email,
        }
      );

      if (response.status === 200) {
        navigation.navigate("ConfirmacionContrasenaScreen", { email: email });
      } else {
        setError(response.data.message || "Error desconocido");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.message || "Error desconocido");
      setShowErrorModal(true);
    }
  };

  //para mostrar los errores

  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [error, setError] = React.useState("");

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
        <Text style={styles.titulo}>Recuperar contraseña</Text>
      </View>
      <View style={styles.contenedor2}>
        <Text>Ingrese su mail</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require("../Imagenes/usuario.png")}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Mail"
            value={email}
            onChangeText={setEmail}
            onBlur={() => setEmailValido(validarEmail(email))}
            keyboardType="email-address" // Para indicar que el teclado será de tipo email
          />
        </View>
        <View style={styles.controlContainer}>
          {!emailValido && (
            <Text style={styles.textoContrasena2}>
              Ingrese un correo electrónico válido
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footerBoton}>
        <TouchableOpacity
          style={[
            styles.botonRegistro,
            !isFormValid && styles.disabledBotonRegistro,
          ]}
          onPress={handleUpdate}
          disabled={!isFormValid}
        >
          <Text style={styles.textoBoton}>Enviar</Text>
        </TouchableOpacity>
        <Modal
          visible={showErrorModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowErrorModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>{error}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowErrorModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    marginTop: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },

  contenedor2: {
    //flex: 1,
    height: 300,
    backgroundColor: "#DDC4B8",
    width: 350,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 160,
  },

  imagen: {
    width: 200,
    height: 200,
  },
  textoBoton: {
    fontSize: 20,
  },

  footerBoton: {
    width: "100%",
    backgroundColor: "#FFFF8",
  },

  botonRegistro: {
    marginTop: 60,
    backgroundColor: "#FFB988",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  input: {
    // flexDirection: 'row',
    height: 40,
    width: 250,
    //marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    elevation: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 10,
  },
  logo: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textoContrasena: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 0,
  },
  textoContrasena2: {
    fontSize: 11,
    marginTop: 2,
    color: `#ff0000`,
  },
  controlContainer: {
    alignItems: "center",
  },
  errorCard: {
    backgroundColor: "#ffcccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#ff0000",
    borderWidth: 1,
  },

  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
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
