import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importa la librería de selección de imágenesimport HeaderScreen from '../HeaderScreen';
import BotonImagenRegis from "./BotonImagenRegis";

import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AgregarImagenRegistro from "../componentes/AgregarImagenRegistro";

Amplify.configure(awsconfig);

const FormularioRegistrarse = ({
  onFormValidChange,
  datosFormulario,
  onDatosChange,
}) => {
  const [nombre, setNombre] = useState(datosFormulario.nombre);
  const [apellidos, setApellidos] = useState(datosFormulario.nombre);
  const [email, setEmail] = useState(datosFormulario.email);
  const [usuario, setUsuario] = useState(datosFormulario.usuario);
  const [contrasena, setContrasena] = useState(datosFormulario.contrasena);
  const [contrasena2, setContrasena2] = useState(datosFormulario.contrasena2);
  const [image, setImage] = useState(datosFormulario.image);
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [mostrarTextoContrasena2, setMostrarTextoContrasena2] = useState(false);
  const [emailValido, setEmailValido] = useState(true);
  const [domicilio, setDomicilio] = useState(datosFormulario.domicilio);
  const [nroTelefono, setNroTelefono] = useState(datosFormulario.nroTelefono);
  const [fechaNacimiento, setFechaNacimiento] = useState(
    datosFormulario.fechaNacimiento
  );
  const [cuitCuil, setCuitCuil] = useState(datosFormulario.cuitCuil);

  const [formValid, setFormValid] = useState(false);

  const [requisitosContrasena, setRequisitosContrasena] = useState([
    { texto: "Mínimo 8 caracteres", cumplido: false },
    { texto: "Al menos 1 número", cumplido: false },
    { texto: "Un carácter especial", cumplido: false },
  ]);

  //donde guardo las imagenes
  const [selectedImages, setSelectedImages] = useState("");

  ///// upload image ////
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadFile = async (file) => {
    const img = await fetchImageUri(file);
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

  // Función para manejar la selección de imágenes
  const handleImagesSelected = (images) => {
    setSelectedImages(images);

    handleSubAddPut();
  };

  useEffect(() => {
    setFormValid(isFormValid());
    onFormValidChange(isFormValid());
  }, [
    nombre,
    apellidos,
    email,
    usuario,
    contrasena,
    contrasena2,
    image,
    domicilio,
    nroTelefono,
    fechaNacimiento,
    cuitCuil,
    onFormValidChange,
  ]);

  useEffect(() => {
    onDatosChange({
      ...datosFormulario,
      nombre,
      apellidos,
      email,
      usuario,
      contrasena,
      contrasena2,
      image,
      domicilio,
      nroTelefono,
      fechaNacimiento,
      cuitCuil,
    });
  }, [
    nombre,
    apellidos,
    email,
    usuario,
    contrasena,
    contrasena2,
    image,
    domicilio,
    nroTelefono,
    fechaNacimiento,
    cuitCuil,
    onDatosChange,
  ]);

  const verificarRequisitosContrasena = (contrasena) => {
    const regexNumero = /\d/;
    const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    setRequisitosContrasena((prevRequisitos) =>
      prevRequisitos.map((requisito) => {
        let cumplido = false;

        if (requisito.texto === "Mínimo 8 caracteres") {
          cumplido = contrasena.length >= 8;
        } else if (requisito.texto === "Al menos 1 número") {
          cumplido = regexNumero.test(contrasena);
        } else if (requisito.texto === "Un carácter especial") {
          cumplido = regexCaracterEspecial.test(contrasena);
        }

        return { ...requisito, cumplido };
      })
    );
  };

  const validarEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      nombre.trim() !== "" &&
      apellidos.trim() !== "" &&
      email.trim() !== "" &&
      usuario.trim() !== "" &&
      contrasena.trim() !== "" &&
      image.trim() !== "" &&
      domicilio.trim() !== "" &&
      nroTelefono.trim() !== "" &&
      fechaNacimiento.trim() !== "" &&
      cuitCuil.trim() !== "" &&
      contrasena === contrasena2 &&
      emailValido &&
      requisitosContrasena.every((requisito) => requisito.cumplido)
    );
  };

  //imagenes

  const handleSubAddPut = async () => {
    try {
      if (selectedImages && selectedImages.length > 0) {
        // Subir las imágenes a AWS S3 y obtener las URLs

        // Subir la imagen a Amazon S3 y obtener el enlace
        const awsImageKey = await uploadFile(selectedImages);

        // Construye el enlace completo a la imagen en Amazon S3
        const awsImageLink = `https://proyfinalbuddybucket201616-dev.s3.sa-east-1.amazonaws.com/public/${awsImageKey}`;

        // Guarda el enlace en el estado

        setTimeout(() => {
          setImage(awsImageLink);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, si es necesario
    }
  };

  //FIN imagenes

  return (
    <View style={styles.contenedor2}>
      <View style={styles.botContainer}>
        <AgregarImagenRegistro
          onImagesSelected={handleImagesSelected}
          style={styles.botImag}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../Imagenes/usuario.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          onBlur={() => setEmailValido(validarEmail(nombre))}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require("../Imagenes/usuario.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={setApellidos}
        />
      </View>
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
        />
      </View>
      <View style={styles.controlContainer}>
        {!emailValido && (
          <Text style={styles.textoContrasena2}>
            Ingrese un correo electrónico válido
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../Imagenes/usuario.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
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
          style={styles.input}
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
          style={styles.input}
          placeholder="Numero de teléfono"
          value={nroTelefono}
          onChangeText={setNroTelefono}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require("../Imagenes/fechNac.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
      </View>
      <Text style={styles.textoContrasena2}>
        El formato de fecha debe ser aaaa-mm-dd
      </Text>

      <View style={styles.inputContainer}>
        <Image
          source={require("../Imagenes/licencia.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Cuit / Cuil"
          value={cuitCuil}
          onChangeText={setCuitCuil}
        />
      </View>
      <Text style={styles.textoContrasena2}>
        El CUIT/CUIL debe tener 11 dígitos numéricos
      </Text>

      <View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../Imagenes/candado.png")}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
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
        <View style={styles.inputContainer}>
          <Image
            source={require("../Imagenes/candado.png")}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
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
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    // elevation: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  contenedor2: {
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
    marginBottom: 80,
  },

  texto: {
    fontSize: 16,
    marginTop: 10,
  },

  textoContrasena: {
    fontSize: 12,
  },

  textoContrasena2: {
    fontSize: 16,
    marginTop: 2,
    color: `#ff0000`,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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

  controlContainer: {
    alignItems: "center",
  },

  textoModal: {
    fontSize: 20,
  },

  botContainer: {
    alignContent: "center",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  botImag: {
    backgroundColor: "#ffffff",
  },
});

export default FormularioRegistrarse;
