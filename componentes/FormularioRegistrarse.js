import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Image, StyleSheet } from 'react-native';

const FormularioRegistrarse = ({ onFormValidChange, datosFormulario, onDatosChange }) => {
  const [email, setEmail] = useState(datosFormulario.email);
  const [nombre, setNombre] = useState(datosFormulario.nombre)
  const [usuario, setUsuario] = useState(datosFormulario.usuario);
  const [contrasena, setContrasena] = useState(datosFormulario.contrasena);
  const [contrasena2, setContrasena2] = useState(datosFormulario.contrasena2);
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [mostrarTextoContrasena2, setMostrarTextoContrasena2] = useState(false);
  const [emailValido, setEmailValido] = useState(true);
  const [formValid, setFormValid] = useState(false);

  const [requisitosContrasena, setRequisitosContrasena] = useState([
    { texto: 'Mínimo 8 caracteres', cumplido: false },
    { texto: 'Al menos 1 número', cumplido: false },
    { texto: 'Un carácter especial', cumplido: false },
  ]);

  useEffect(() => {
    setFormValid(isFormValid());
    onFormValidChange(isFormValid());
  }, [nombre, email, usuario, contrasena, contrasena2, onFormValidChange]);

  useEffect(() => {
    onDatosChange({
      ...datosFormulario,
      nombre,
      email,
      usuario,
      contrasena,
      contrasena2,
    });
  }, [nombre, email, usuario, contrasena, contrasena2, onDatosChange]);


  const verificarRequisitosContrasena = (contrasena) => {
    const regexNumero = /\d/;
    const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    setRequisitosContrasena((prevRequisitos) =>
      prevRequisitos.map((requisito) => {
        let cumplido = false;

        if (requisito.texto === 'Mínimo 8 caracteres') {
          cumplido = contrasena.length >= 8;
        } else if (requisito.texto === 'Al menos 1 número') {
          cumplido = regexNumero.test(contrasena);
        } else if (requisito.texto === 'Un carácter especial') {
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
      nombre.trim() !== '' &&
      email.trim() !== '' &&
      usuario.trim() !== '' &&
      contrasena.trim() !== '' &&
      contrasena === contrasena2 &&
      emailValido &&
      requisitosContrasena.every((requisito) => requisito.cumplido)
    );
  };

  return (
    <View style={styles.contenedor2}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../Imagenes/usuario.png')}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../Imagenes/usuario.png')}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
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
          source={require('../Imagenes/usuario.png')}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Image
            source={require('../Imagenes/candado.png')}
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
            source={require('../Imagenes/candado.png')}
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
        {mostrarTextoContrasena2 && contrasena2 !== contrasena && (
          <Text style={styles.textoContrasena2}>
            Las contraseñas no coinciden
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    elevation: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  contenedor2: {
    height: 450,
    backgroundColor: '#DDC4B8',
    width: 350,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    marginTop: 10,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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
    alignItems: 'center',
  },
});

export default FormularioRegistrarse;
