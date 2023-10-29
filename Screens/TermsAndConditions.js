import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importa la librería de selección de imágenesimport HeaderScreen from '../HeaderScreen';
import { Image, Button, CheckBox } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import DocumentosRegistrarseEmpresaScreen from "./DocumentosRegistrarseEmpresaScreen";
import { ConfirmacionRegistroScreen } from "./ConfirmacionRegistroScreen";
import { useNavigation } from "@react-navigation/native";
//import bcrypt from 'bcrypt';

import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

export function TermsAndConditional({}) {
  
 

  return (
    <View style={styles.general}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../Imagenes/logo2.png")}
          style={styles.imagen}
        />
        <Text style={styles.titulo}>TÈRMINOS Y CONDICIONES</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
            Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.
            Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
            Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.
        </Text>
       
      </ScrollView>
      <View style={styles.footerBoton}>
        <TouchableOpacity
          style={[
            styles.botonRegistro,
            formValid ? null : styles.disabledButton,
          ]}
          onPress={() => {
            validateForm();
            if (formValid) {
              const checkBoxData = {
                servicioSalud: checkBox1,
                tiendasMascotas: checkBox2,
                refugioMascotas: checkBox3,
              };
              handleSubAddPet(checkBoxData);
            }
          }}
          disabled={!formValid && isButtonDisabled}
        >
          <Text style={styles.textoBoton}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  general: {
    flex: 1,
    alignItems: "center",
  },
  inputError: {
    borderColor: "red",
  },

  container: {
    paddingBottom: 15,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  titulo: {
    fontSize: 35,
    marginBottom: 40,
  },
  imagen: {
    width: 200,
    height: 200,
  },
  contenedor2: {
    //flex: 1,
    // height: 450,
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
    marginBottom: 25,
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
    marginBottom: 5,
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
  textoBoton: {
    fontSize: 20,
  },

  footerBoton: {
    width: "100%",
    backgroundColor: "#FFFF8",
  },

  botonRegistro: {
    backgroundColor: "#FFB988",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 35,
    marginBottom: 0,
    marginTop: 5,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  checkboxItem: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 0,
    marginTop: 0,
    padding: 0,
  },
  checkboxText: {
    marginLeft: 8,
  },
  textoVentana: {
    fontSize: 24,
  },
  contenVentanaTexto: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
    flexDirection: "row",
  },
  botonGaleria: {
    backgroundColor: "#DDC4B8",
    height: 100,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 30,
    elevation: 3,
  },
  foto: {
    width: 30,
    height: 30,
  },
  botonFoto: {
    fontSize: 14,
    marginTop: 10,
  },
  selectedImage: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 40,
  },
  foto: {
    width: 30,
    height: 30,
  },
});
