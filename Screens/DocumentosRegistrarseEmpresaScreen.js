import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Image, Button, CheckBox } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImageBackground } from "react-native";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import { ConfirmacionRegistroScreen } from "./ConfirmacionRegistroScreen";
import { useNavigation } from "@react-navigation/native"; // Solo necesitas esta importación
import * as DocumentPicker from "expo-document-picker";
import ConfirmacionRegistroEmpresaScreen from "./ConfirmacionRegistroEmpresaScreen";
import axios from "axios";

Amplify.Logger.LOG_LEVEL = "DEBUG";
import { Amplify, Storage, Logger } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

import Formulario1 from "../componentes/Formulario1";
import Formulario2 from "../componentes/Formulario2";
import Formulario3 from "../componentes/Formulario3";

export default function DocumentosRegistrarseEmpresaScreen({ route }) {
  //const {formulario} = route.params;

  const checkBoxData = route.params?.checkBoxData;
  const formValid = route.params?.isValidEmail;
  const email = route.params?.email;
  const isValidEmail = route.params?.isValidEmail;
  const nombre = route.params?.nombre;
  const usuario = route.params?.usuario;
  const contrasena = route.params?.contrasena;
  const images = route.params?.awsImageLink;
  const domicilio = route.params?.domicilio;
  const nroTelefono = route.params?.nroTelefono;
  const cuitCuil = route.params?.cuitCuil;
  const fechaNacimiento = route.params?.fechaNacimiento;

  console.log(
    "despues de navegar:",
    checkBoxData,
    email,
    isValidEmail,
    nombre,
    usuario,
    contrasena,
    images,
    domicilio,
    nroTelefono,
    fechaNacimiento,
    cuitCuil
  );
  console.log("despues de navegar refugio:", checkBoxData.refugioMascotas);
  console.log("despues de navegar servicioSalud:", checkBoxData.servicioSalud);
  console.log(
    "despues de navegar tiendasMascotas:",
    checkBoxData.tiendasMascotas
  );
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
  const [nombrePdf1, setNombrePdf1] = useState(
    "ADJUNTAR HABILITACION MUNICIPAL"
  );
  const [nombrePdf2, setNombrePdf2] = useState("");
  const [nombrePdf3, setNombrePdf3] = useState("CONSTANCIA DE CUIT");
  const [isFormValid, setFormValid] = useState(false);
  const pdfs = [pdf1, pdf2, pdf3];
  const navigation = useNavigation();
  const checkAllFormsValidity = (arePdfsLoaded) => {
    // Agregar aquí cualquier otra validación de formularios si es necesario
    return formValid && arePdfsLoaded;
  };
  const handleFormValidChange = (isValid) => {
    setFormValid(isValid);
  };
  const arePdfsLoaded = () => {
    return pdf1 !== null && pdf2 !== null && pdf3 !== null;
  };

  useEffect(() => {
    // Lógica condicional para cambiar el nombre del PDF
    if (checkBoxData.servicioSalud) {
      setNombrePdf2("REGISTRO NACIONAL DEL ESTABLECIMIENTO");
    } else if (checkBoxData.tiendasMascotas) {
      setNombrePdf2("REGISTRO COMERCIAL");
    } else if (checkBoxData.refugioMascotas) {
      setNombrePdf2("REGISTRO DE ASOCIACION O FUNDACION");
    } else {
      setNombrePdf2("");
    }
  }, [
    checkBoxData.servicioSalud,
    checkBoxData.tiendasMascotas,
    checkBoxData.refugioMascotas,
  ]);

  const renderFormulario = () => {
    console.log("formValid:", formValid);
    console.log("checkBoxData:", checkBoxData);

    if (formValid) {
      if (checkBoxData.servicioSalud) {
        console.log("Mostrar Formulario1");
        return (
          <View>
            <Formulario1
              pdf1={pdf1}
              pdf2={pdf2}
              pdf3={pdf3}
              setPdf1={setPdf1}
              setPdf2={setPdf2}
              setPdf3={setPdf3}
              onFormValidChange={handleFormValidChange}
            />
          </View>
        );
      } else if (checkBoxData.tiendasMascotas) {
        console.log("Mostrar Formulario2");
        //  setNombrePdf2('REGISTRO COMERCIAL')
        return (
          <View>
            <Formulario2
              pdf1={pdf1}
              pdf2={pdf2}
              pdf3={pdf3}
              setPdf1={setPdf1}
              setPdf2={setPdf2}
              setPdf3={setPdf3}
              onFormValidChange={handleFormValidChange}
            />
          </View>
        );
      } else if (checkBoxData.refugioMascotas) {
        console.log("Mostrar Formulario3");
        //setNombrePdf2('REGISTRO DE ASOCIACION O FUNDACION')
        return (
          <View>
            <Formulario3
              pdf1={pdf1}
              pdf2={pdf2}
              pdf3={pdf3}
              setPdf1={setPdf1}
              setPdf2={setPdf2}
              setPdf3={setPdf3}
              onFormValidChange={handleFormValidChange}
            />
          </View>
        );
      } else {
        console.log("No se ha seleccionado un formulario válido");
        return <Text>No se ha seleccionado un formulario válido</Text>;
      }
    } else {
      console.log("formValid es falso");
      return <Text>Formulario no válido</Text>;
    }
  };
  ///// upload documentos ////

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  ///// upload image ////
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadFile = async (file) => {
    const doc = await fetchImageUri(file.uri);
    return Storage.put(`my-doc-filename${Math.random()}.pdf`, doc, {
      level: "public",
      contentType: file.type,
      progressCallback(uploadProgress) {
        console.log(
          "PROGRESS--",
          uploadProgress.loaded + "/" + uploadProgress.total
        );
      },
    })
      .then((res) => {
        // Retorna la clave (key) de la imagen en Amazon S3
        return res.key;
      })
      .catch((e) => {
        console.log(e);
        throw e; // Lanza una excepción para manejar errores en la función llamante
      });
  };

  const handleSubAddUser = async () => {
    console.log(pdfs);
    try {
      if (pdfs && pdfs.length > 0) {
        let docsUrls = [];

        for (const pdf of pdfs) {
          // Subir la imagen a Amazon S3 y obtener el enlace
          const awsDocKey = await uploadFile(pdf);

          // Construye el enlace completo a la imagen en Amazon S3
          const awsDocLink = `https://proyfinalbuddybucket201616-dev.s3.sa-east-1.amazonaws.com/public/${awsDocKey}`;

          // Guarda el enlace en el estado
          docsUrls.push(awsDocLink);
          console.log("Después de subirlas: ", docsUrls);
        }
        // Continúa con la solicitud POST al backend
        await sendDocData(docsUrls);
      } else {
        // Si no hay imagen seleccionada, solo envía la solicitud POST sin el enlace de la imagen
        await sendDocData(null);
      }

      // Habilita el botón nuevamente después de dos segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, si es necesario
    }
  };

  const sendDocData = async (docLink) => {
    const arrayPdf = [
      {
        title: nombrePdf1,
        file: docLink[0] || "",
      },
      {
        title: nombrePdf2,
        file: docLink[1] || "",
      },
      {
        title: nombrePdf3,
        file: docLink[2] || "",
      },
    ];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Determina cuál es el checkbox que está marcado como verdadero
    let checkboxDatas = null;

    if (checkBoxData.refugioMascotas) {
      checkboxDatas = "VETERINARIA";
    } else if (checkBoxData.servicioSalud) {
      checkboxDatas = "PETSHOP";
    } else if (checkBoxData.tiendasMascotas) {
      checkboxDatas = "REFUGIO";
    }
    const data = {
      mail: email,
      password: contrasena,
      userName: usuario,
      name: nombre,
      image: images,
      phoneNumber: nroTelefono,
      cuitCuil: cuitCuil,
      address: domicilio,
      birthDate: fechaNacimiento,
      userType: "ESTABLECIMIENTO",
      documents: arrayPdf,
      serviceType: checkboxDatas,
    };

    console.log(data);

    const response = await axios.post(
      "https://romibettiol.loca.lt/security/user/register",
      data,
      config
    );
    if (response.status === 201) {
      console.log("Respuesta del servidor:", response.data);
      // Después de una solicitud exitosa, navega a 'NotificacionesScreen'
      navigation.navigate("ConfirmacionRegistroEmpresaScreen");
    } else {
      console.error("Error al hacer la solicitud POST");
      // Maneja el error de acuerdo a tus necesidades
      console.log(
        "Error",
        "Hubo un error al cargar las notificaciones. Por favor, inténtalo de nuevo."
      );
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
      <View>{renderFormulario()}</View>
      <TouchableOpacity
        style={[
          styles.botonRegistro,
          arePdfsLoaded() ? null : styles.disabledButton,
        ]}
        onPress={() => {
          if (arePdfsLoaded()) {
            handleSubAddUser();
          }
        }}
        disabled={!arePdfsLoaded() && isButtonDisabled}
      >
        <Text style={styles.textoBoton}>SIGUIENTE</Text>
      </TouchableOpacity>
      {/* Resto del código del componente */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputError: {
    borderColor: "red",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 35,
    marginBottom: 40,
  },
  imagen: {
    width: 200,
    height: 200,
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
    marginTop: 150,
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
});
