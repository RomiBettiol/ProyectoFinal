import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import axios, { AxiosError } from 'axios';

import bcrypt from 'react-native-bcrypt';

import BotonImagenRegis from '../componentes/BotonImagenRegis';



export function RegistrarseScreen({ navigation }) {
  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    usuario: '',
    contrasena: '',
    contrasena2: '',
  });

  const handleSubmit = async () => {
    if (formValid) {
      const data = {
        name: datosFormulario.nombre,
        mail: datosFormulario.email,
        userName: datosFormulario.usuario,
        
      };
      try {
        // Hash the password with a salt of 10 rounds
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(datosFormulario.contrasena, salt);
        
      } catch (error) {
        console.error('hola')
        //console.error('Error al hashear la contraseña:', error);
      //  setErrorMessage('Hubo un error al registrar el usuario.');
        return;
      }
      // Hacer la petición POST al backend usando axios
      axios
        .post('https://buddyproyecto.loca.lt/security/user/register', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Registro exitoso:', response.data);
          navigation.navigate('ConfirmacionRegistroScreen');
        })
        .catch((error) => {
          console.error('Error en el registro:', error);
          console.error('Error en el registro:', Request.response);
          setErrorMessage('Hubo un error al registrar el usuario.');
        });
    }
  };

  const handleDatosChange = (datos) => {
    setDatosFormulario(datos);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../Imagenes/logo2.png')}
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
          style={[styles.botonRegistro, !formValid && styles.disabledBotonRegistro]}
          disabled={!formValid}
          onPress={handleSubmit} // Llamamos a la función handleSubmit al presionar el botón "Registrarse"
        >
          <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  titulo: {
    fontSize: 35,
    marginBottom: 30,
  },

  contenedor2: {
    height: 57,
    backgroundColor: '#DDC4B8',
    width: 90,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
  },

  textoBoton: {
    fontSize: 20,
  },

  imagen: {
    width: 200,
    height: 200,
  },

  footerBoton: {
    width: '100%',
  },

  botonRegistro: {
    marginTop: 40,
    backgroundColor: '#FFB988',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '100%',
    marginBottom: 0,
    paddingHorizontal: 20,
  },
});

export default RegistrarseScreen;
