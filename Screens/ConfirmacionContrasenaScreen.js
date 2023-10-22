import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function ConfirmacionContrasenaScreen({}) {
  const route = useRoute();
  const email = route.params && route.params.email;

  const navigation = useNavigation();

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
        <Image
          source={require("../Imagenes/confirmar.png")}
          style={styles.imagenConfirmar}
        />
        <Text style={styles.textoAgradecimiento}>
          ¡Enviamos un correo a {email}, sigue el enlace del mismo para
          finalizar el cambio de contraseña!
        </Text>
      </View>
      <View style={styles.footerBoton}>
        <TouchableOpacity
          style={[styles.botonRegistro]}
          onPress={() => navigation.navigate("InicioScreen")} // Utiliza una función de flecha
        >
          <Text style={styles.textoBoton}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
  },
  logoContainer: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },

  contenedor2: {
    height: 350,
    alignItems: "center",
    //justifyContent: 'center',
    backgroundColor: "#DDC4B8",
    width: 370,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    marginTop: 80,
  },

  imagen: {
    width: 200,
    height: 200,
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
    fontSize: 14,
    marginTop: 15,
  },

  textoBoton: {
    fontSize: 20,
  },

  footerBoton: {
    width: "100%",
    backgroundColor: "#FFB988",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },

  botonRegistro: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});
