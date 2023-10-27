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

export function RegistrarseEmpresaScreen({}) {
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidNro, setIsValidNro] = React.useState(true);
  const [isValidCuit, setIsValidCuit] = React.useState(true);
  const [isValidFecha, setIsValidFecha] = React.useState(true);
  const [usuario, setUsuario] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");
  const [contrasena2, setContrasena2] = React.useState("");
  const [domicilio, setDomicilio] = React.useState("");
  const [nroTelefono, setNroTelefono] = React.useState("");
  const [fechaNacimiento, setFechaNacimiento] = React.useState("");
  const [cuitCuil, setCuitCuil] = React.useState("");
  const [servicioSalud, setServicioSalud] = React.useState(false);
  const [tiendasMascotas, setTiendasMascotas] = React.useState(false);
  const [refugioMascotas, setRefugioMascotas] = React.useState(false);
  const [checkBox1, setCheckBox1] = React.useState(false);
  const [checkBox2, setCheckBox2] = React.useState(false);
  const [checkBox3, setCheckBox3] = React.useState(false);
  const [linkAWS, setLinkAWS] = useState(null); // Nuevo estado para almacenar el enlace de la imagen en Amazon S3

  const [nombreError, setNombreError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [usuarioError, setUsuarioError] = React.useState(false);
  const [contrasenaError, setContrasenaError] = React.useState(false);
  const [contrasena2Error, setContrasena2Error] = React.useState(false);
  const [checkBoxError, setCheckBoxError] = React.useState(false);
  const [formValid, setFormValid] = React.useState(true);
  const [domicilioError, setDomicilioError] = React.useState(false);
  const [fechaNacimientoError, setFechaNacimientoError] = React.useState(false);
  const [cuitCuilError, setCuitCuilError] = React.useState(false);
  const [nroTelefonoError, setNroTelefonoError] = React.useState(false);
  const [linkAWSError, setLinkAWSError] = React.useState(false);

  const [mostrarTexto, setMostrarTexto] = React.useState(false);
  const [mostrarTextoContrasena2, setMostrarTextoContrasena2] =
    React.useState(false);

  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [requisitosContrasena, setRequisitosContrasena] = React.useState([
    { texto: "Mínimo 8 caracteres", cumplido: false },
    { texto: "Al menos 1 número", cumplido: false },
    { texto: "Un carácter especial", cumplido: false },
  ]);
  const verificarRequisitosContrasena = (contrasena) => {
    const regexNumero = /\d/;
    const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    const nuevosRequisitos = requisitosContrasena.map((requisito) => {
      let cumplido = false;

      if (requisito.texto === "Mínimo 8 caracteres") {
        cumplido = contrasena.length >= 8;
      } else if (requisito.texto === "Al menos 1 número") {
        cumplido = regexNumero.test(contrasena);
      } else if (requisito.texto === "Un carácter especial") {
        cumplido = regexCaracterEspecial.test(contrasena);
      }

      return { ...requisito, cumplido };
    });

    setRequisitosContrasena(nuevosRequisitos);
  };

  useEffect(() => {
    const isEmailValid = email !== "" && isValidEmail;
    const isNombreValid = nombre !== "";
    const isUsuarioValid = usuario !== "";
    const isContrasenaValid =
      contrasena !== "" && requisitosContrasena.every((req) => req.cumplido);
    const isContrasena2Valid = contrasena2 !== "" && contrasena2 === contrasena;
    const isCheckboxValid = checkBox1 || checkBox2 || checkBox3;
    const isDomicilioValid = domicilio !== "";
    const isNroTelefonoValid = nroTelefono !== "";
    const isFechaNacimientoValid = fechaNacimiento !== "";
    const isCuitCuilValid = cuitCuil !== "";
    const isLinkAWSValid = linkAWS !== "";

    const isFormValid =
      isEmailValid &&
      isNombreValid &&
      isUsuarioValid &&
      isContrasenaValid &&
      isContrasena2Valid &&
      isCheckboxValid &&
      isDomicilioValid &&
      isLinkAWSValid &&
      isNroTelefonoValid &&
      isFechaNacimientoValid &&
      isCuitCuilValid;

    setFormValid(isFormValid);
  }, [
    email,
    isValidEmail,
    nombre,
    usuario,
    contrasena,
    contrasena2,
    domicilio,
    nroTelefono,
    fechaNacimiento,
    linkAWS,
    cuitCuil,
    checkBox1,
    checkBox2,
    checkBox3,
    requisitosContrasena,
  ]);

  const handleCheckBox1 = () => {
    setCheckBox1(true);
    setCheckBox2(false);
    setCheckBox3(false);
  };
  const handleCheckBox2 = () => {
    setCheckBox1(false);
    setCheckBox2(true);
    setCheckBox3(false);
  };
  const handleCheckBox3 = () => {
    setCheckBox1(false);
    setCheckBox2(false);
    setCheckBox3(true);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    // Verificar si el email es válido utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
  };

  const handleFechaChange = (fecha) => {
    setFechaNacimiento(fecha);
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
      setIsValidFecha(false);
      return;
    }

    const partesFecha = fecha.split("-");
    const año = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10);
    const dia = parseInt(partesFecha[2], 10);

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();

    if (año > añoActual || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      setIsValidFecha(false);
      return;
    }

    setIsValidFecha(true);
  };

  const handleNroChange = (nro) => {
    const numeroRegex = /^[0-9]{10}$/;
    setNroTelefono(nro);

    if (numeroRegex.test(nro)) {
      setIsValidNro(true);
    } else {
      setIsValidNro(false);
    }
  };

  const handleCuitChange = (cuit) => {
    const cuitRegex = /^[0-9]{11,12}$/;
    setCuitCuil(cuit);

    if (cuitRegex.test(cuit)) {
      setIsValidCuit(true);
    } else {
      setIsValidCuit(false);
    }
  };

  const validateForm = () => {
    const isEmailValid = email !== "" && isValidEmail;
    const isNombreValid = nombre !== "";
    const isUsuarioValid = usuario !== "";
    const isContrasenaValid =
      contrasena !== "" && requisitosContrasena.every((req) => req.cumplido);
    const isContrasena2Valid = contrasena2 !== "" && contrasena2 === contrasena;
    const isCheckboxValid = checkBox1 || checkBox2 || checkBox3;
    const isDomicilioValid = domicilio !== "";
    const isNroTelefonoValid = nroTelefono !== "";
    const isFechaNacimientoValid = fechaNacimiento !== "";
    const isCuitCuilValid = cuitCuil !== "";
    const isLinkAWSValid = linkAWS !== "";

    setEmailError(!isEmailValid);
    setNombreError(!isNombreValid);
    setUsuarioError(!isUsuarioValid);
    setContrasenaError(!isContrasenaValid);
    setContrasena2Error(!isContrasena2Valid);
    setCheckBoxError(!isCheckboxValid);
    setDomicilio(!isDomicilioValid);
    setNroTelefono(!isNroTelefonoValid);
    setFechaNacimiento(!isFechaNacimientoValid);
    setCuitCuil(!isCuitCuilValid);
    setLinkAWS(!isLinkAWSValid);

    const isFormValid =
      isEmailValid &&
      isNombreValid &&
      isUsuarioValid &&
      isContrasenaValid &&
      isContrasena2Valid &&
      isCheckboxValid &&
      isDomicilioValid &&
      isLinkAWSValid &&
      isNroTelefonoValid &&
      isFechaNacimientoValid &&
      isCuitCuilValid;

    setFormValid(isFormValid);
  };

  ///// upload image ////
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  ////end upload img ////

  const [petData, setPetData] = useState({
    petName: "",
    birthDate: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal); // Cambiar el estado del modal
  };

  const uploadFile = async (file) => {
    const img = await fetchImageUri(file.uri);
    return Storage.put(`my-image-filename${Math.random()}.jpg`, img, {
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
  const handleSubAddPet = async (checkBoxData) => {
    try {
      if (selectedImage) {
        // Subir la imagen a Amazon S3 y obtener el enlace
        const awsImageKey = await uploadFile(selectedImage);

        // Construye el enlace completo a la imagen en Amazon S3
        const awsImageLink = `https://proyfinalbuddybucket201616-dev.s3.sa-east-1.amazonaws.com/public/${awsImageKey}`;

        // Guarda el enlace en el estado
        setLinkAWS(awsImageLink);
        setTimeout(() => {
          handleNavegar(checkBoxData, awsImageLink);
        }, 2000);
        // Continúa con la solicitud POST al backend
      } else {
        // Si no hay imagen seleccionada, solo envía la solicitud POST sin el enlace de la imagen
        console.log("ERRORRRRRRRRRRRR");
      }

      // Habilita el botón nuevamente después de dos segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);

      handleNavegar(checkBoxData);
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, si es necesario
    }
  };
  const options = {
    title: "Seleccionar imagen",
    cancelButtonTitle: "Cancelar",
    takePhotoButtonTitle: "Tomar foto",
    chooseFromLibraryButtonTitle: "Elegir de la galería",
    mediaType: "photo",
    quality: 1,
  };
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setSelectedImage(result);
    }
  };

  const handleNavegar = (checkBoxData, awsImageLink) => {
    console.log(
      "antes de navegar:",
      checkBoxData,
      email,
      isValidEmail,
      nombre,
      usuario,
      contrasena,
      domicilio,
      nroTelefono,
      fechaNacimiento,
      cuitCuil,
      awsImageLink
    );
    navigation.navigate("DocumentosRegistrarseEmpresaScreen", {
      checkBoxData: checkBoxData,
      email,
      isValidEmail,
      nombre,
      usuario,
      contrasena,
      domicilio,
      nroTelefono,
      fechaNacimiento,
      cuitCuil,
      awsImageLink,
    });
  };

  return (
    <View style={styles.general}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../Imagenes/logo2.png")}
          style={styles.imagen}
        />
        <Text style={styles.titulo}>REGISTRARSE</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contenedor2}>
          <TouchableOpacity style={styles.botonGaleria} onPress={openGallery}>
            {selectedImage ? (
              <Image source={{ uri: linkAWS }} style={styles.selectedImage} />
            ) : (
              <>
                <Image
                  source={require("../Imagenes/fotos.png")}
                  style={styles.foto}
                />
                <Text style={styles.botonFoto}>Seleccionar foto</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.contenVentanaTexto}>
            <Text style={styles.textoVentana}>Tipo de establecimiento:</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Servicio de salud para una mascota"
              checked={checkBox1}
              onPress={handleCheckBox1} // Agregar esta línea
              containerStyle={styles.checkboxItem}
              textStyle={styles.checkboxText}
              checkedColor="black"
              uncheckedColor="black"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <CheckBox
              title="Tiendas de mascotas"
              checked={checkBox2}
              onPress={handleCheckBox2} // Agregar esta línea
              containerStyle={styles.checkboxItem}
              textStyle={styles.checkboxText}
              checkedColor="black"
              uncheckedColor="black"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <CheckBox
              title="Refugio para mascotas"
              checked={checkBox3}
              onPress={handleCheckBox3} // Agregar esta línea
              containerStyle={styles.checkboxItem}
              textStyle={styles.checkboxText}
              checkedColor="black"
              uncheckedColor="black"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/usuario.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, nombreError && styles.inputError]} // Aplicar estilo de error si hay un error en el nombre
              placeholder="Nombre del establecimiento"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View>
            <View View style={styles.inputContainer}>
              <Image
                source={require("../Imagenes/usuario.png")}
                style={styles.logo}
              />
              <TextInput
                style={[styles.input, emailError && styles.inputError]} // Aplicar estilo de error si hay un error en el email
                placeholder="E-mail"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.controlContainer}>
              {!isValidEmail && (
                <Text style={styles.textoContrasena2}>
                  Ingrese un correo electrónico válido
                </Text>
              )}
            </View>
          </View>
          <View View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/usuario.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
              placeholder="Usuario"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/domicilio.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
              placeholder="Domicilio"
              value={domicilio}
              onChangeText={setDomicilio}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/telefono.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
              placeholder="Numero de teléfono"
              value={nroTelefono}
              onChangeText={handleNroChange}
            />
          </View>
          <View style={styles.controlContainer}>
            {!isValidNro && (
              <Text style={styles.textoContrasena2}>
                Ingrese un número válido
              </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/fechNac.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
              placeholder="Fecha de fundación"
              value={fechaNacimiento}
              onChangeText={handleFechaChange}
            />
          </View>
          <View style={styles.controlContainer}>
            {!isValidFecha && (
              <Text style={styles.textoContrasena2}>
                Ingrese una fecha válida
              </Text>
            )}
          </View>
          <Text style={styles.textoContrasena}>
            El formato de fecha debe ser aaaa-mm-dd
          </Text>

          <View style={styles.inputContainer}>
            <Image
              source={require("../Imagenes/licencia.png")}
              style={styles.logo}
            />
            <TextInput
              style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
              placeholder="Cuit / Cuil"
              value={cuitCuil}
              onChangeText={handleCuitChange}
            />
          </View>
          <View style={styles.controlContainer}>
            {!isValidCuit && (
              <Text style={styles.textoContrasena2}>
                Ingrese un CUIT/CUIL válido
              </Text>
            )}
          </View>
          <Text style={styles.textoContrasena}>
            El CUIT/CUIL debe ingresarlo sin guiones
          </Text>

          <View>
            <View style={styles.inputContainer}>
              <Image
                source={require("../Imagenes/candado.png")}
                style={styles.logo}
              />
              <TextInput
                style={[styles.input, contrasenaError && styles.inputError]} // Aplicar estilo de error si hay un error en la contraseña
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={(value) => {
                  setContrasena(value);
                  verificarRequisitosContrasena(value);
                }}
                secureTextEntry={true}
                onFocus={() => setMostrarTexto(true)}
                onBlur={() => setMostrarTexto(false)}
              />
            </View>
            <View style={styles.controlContainer}>
              {mostrarTexto &&
                requisitosContrasena
                  .filter((requisito) => !requisito.cumplido)
                  .map((requisito, index) => (
                    <Text key={index} style={styles.textoRequisito}>
                      &#8226; {requisito.texto}
                    </Text>
                  ))}
            </View>
          </View>
          <View>
            <View View style={styles.inputContainer}>
              <Image
                source={require("../Imagenes/candado.png")}
                style={styles.logo}
              />
              <TextInput
                style={[styles.input, contrasena2Error && styles.inputError]} // Aplicar estilo de error si hay un error en la confirmación de contraseña
                placeholder="Repetir contraseña"
                value={contrasena2}
                onChangeText={setContrasena2}
                secureTextEntry={true}
                onFocus={() => setMostrarTextoContrasena2(true)}
                onBlur={() => setMostrarTextoContrasena2(false)}
              />
            </View>
            <View style={styles.controlContainer}>
              {mostrarTextoContrasena2 && contrasena2 !== contrasena && (
                <Text style={styles.textoContrasena2}>
                  Las contraseñas no coinciden
                </Text>
              )}
            </View>
          </View>
        </View>
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
