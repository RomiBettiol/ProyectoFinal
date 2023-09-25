import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Image, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import { navigation } from "@react-navigation/native";

export function ConfirmacionRegistroScreen({ navigation }) {
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
      </View>
      <View style={styles.contenedor2}>
        <Image
          source={require("../Imagenes/confirmar.png")}
          style={styles.imagenConfirmar}
        />
        <Text style={styles.textoAgradecimiento}>
          ¡Cuenta creada correctamente!
        </Text>
        <Text style={styles.textoAviso}>
          Por favor, ingresa a tu correo para validar la misma.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.botonRegistro}
        onPress={() => {
          navigation.navigate("InicioScreen");
        }}
      >
        <Text style={styles.textoBoton}>Regresar al inicio</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1, // Ocupa todo el espacio vertical
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  contenedor2: {
    height: 350,
    alignItems: "center",
    backgroundColor: "#DDC4B8",
    width: 370,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    marginTop: 30,
  },

  imagen: {
    width: 300,
    height: 300,
  },

  imagenConfirmar: {
    width: 80,
    height: 80,
    marginTop: 40,
  },

  textoAgradecimiento: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  textoAviso: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },

  botonRegistro: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFB988",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    paddingHorizontal: 20,
  },

  textoBoton: {
    fontSize: 20,
  },
});
