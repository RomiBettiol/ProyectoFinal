import React, { useEffect } from 'react';
import { StyleSheet,ScrollView, Text,TextInput, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import { Image, Button, CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import DocumentosRegistrarseEmpresaScreen from './DocumentosRegistrarseEmpresaScreen';
import {ConfirmacionRegistroScreen} from './ConfirmacionRegistroScreen';
import { useNavigation } from '@react-navigation/native';
//import bcrypt from 'bcrypt';

export function RegistrarseEmpresaScreen({}){
  const [nombre, setNombre] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [usuario, setUsuario] = React.useState('');
  const [contrasena, setContrasena] = React.useState('');
  const [contrasena2, setContrasena2] = React.useState('');
  const [servicioSalud, setServicioSalud] = React.useState(false);
  const [tiendasMascotas, setTiendasMascotas] = React.useState(false);
  const [refugioMascotas, setRefugioMascotas] = React.useState(false);
  const [checkBox1, setCheckBox1] = React.useState(false);
  const [checkBox2, setCheckBox2] = React.useState(false);
  const [checkBox3, setCheckBox3] = React.useState(false);

  const [nombreError, setNombreError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [usuarioError, setUsuarioError] = React.useState(false);
  const [contrasenaError, setContrasenaError] = React.useState(false);
  const [contrasena2Error, setContrasena2Error] = React.useState(false);
  const [checkBoxError, setCheckBoxError] = React.useState(false);
  const [formValid, setFormValid] = React.useState(true);

  const [mostrarTexto, setMostrarTexto] = React.useState(false);
  const [mostrarTextoContrasena2, setMostrarTextoContrasena2] = React.useState(false);

  const navigation = useNavigation();

  const [requisitosContrasena, setRequisitosContrasena] = React.useState([
    { texto: 'Mínimo 8 caracteres', cumplido: false },
    { texto: 'Al menos 1 número', cumplido: false },
    { texto: 'Un carácter especial', cumplido: false },
  ]);
  const verificarRequisitosContrasena = (contrasena) => {
    const regexNumero = /\d/;
    const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  
    const nuevosRequisitos = requisitosContrasena.map((requisito) => {
      let cumplido = false;
  
      if (requisito.texto === 'Mínimo 8 caracteres') {
        cumplido = contrasena.length >= 8;
      } else if (requisito.texto === 'Al menos 1 número') {
        cumplido = regexNumero.test(contrasena);
      } else if (requisito.texto === 'Un carácter especial') {
        cumplido = regexCaracterEspecial.test(contrasena);
      }
  
      return { ...requisito, cumplido };
    });
  
    setRequisitosContrasena(nuevosRequisitos);
  };
  
  useEffect(() => {
    const isEmailValid = email !== '' && isValidEmail;
    const isNombreValid = nombre !== '';
    const isUsuarioValid = usuario !== '';
    const isContrasenaValid = contrasena !== '' && requisitosContrasena.every((req) => req.cumplido);
    const isContrasena2Valid = contrasena2 !== '' && contrasena2 === contrasena;
    const isCheckboxValid = checkBox1 || checkBox2 || checkBox3;

    const isFormValid =
      isEmailValid && isNombreValid && isUsuarioValid && isContrasenaValid && isContrasena2Valid && isCheckboxValid;

    setFormValid(isFormValid);
  }, [email, isValidEmail, nombre, usuario, contrasena, contrasena2, checkBox1, checkBox2, checkBox3, requisitosContrasena]);

  
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

  const validateForm = () => {
    const isEmailValid = email !== '' && isValidEmail;
    const isNombreValid = nombre !== '';
    const isUsuarioValid = usuario !== '';
    const isContrasenaValid = contrasena !== '' && requisitosContrasena.every((req) => req.cumplido);
    const isContrasena2Valid = contrasena2 !== '' && contrasena2 === contrasena;
    const isCheckboxValid = checkBox1 || checkBox2 || checkBox3;

    setEmailError(!isEmailValid);
    setNombreError(!isNombreValid);
    setUsuarioError(!isUsuarioValid);
    setContrasenaError(!isContrasenaValid);
    setContrasena2Error(!isContrasena2Valid);
    setCheckBoxError(!isCheckboxValid);

    const isFormValid =
      isEmailValid && isNombreValid && isUsuarioValid && isContrasenaValid && isContrasena2Valid && isCheckboxValid;

    setFormValid(isFormValid);

    console.log('Email Error:', emailError);
    console.log('Nombre Error:', nombreError);
    console.log('Usuario Error:', usuarioError);
    console.log('Contraseña Error:', contrasenaError);
    console.log('Confirmación de Contraseña Error:', contrasena2Error);
    console.log('Checkbox Error:', checkBoxError);
    console.log('Form Valid:', isFormValid);

  
};


  return(
           
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
       <View style={styles.logoContainer}>
              <Image
              source={require('../Imagenes/logo2.png'
              )}
              style={styles.imagen}
              />          
              <Text style={styles.titulo}>REGISTRARSE</Text>
        </View>
        <View style={styles.contenedor2}> 
        
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
                        source={require('../Imagenes/usuario.png')}
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
                          source={require('../Imagenes/usuario.png')}
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
                     {!isValidEmail && <Text style={styles.textoContrasena2}>Ingrese un correo electrónico válido</Text>}
                  </View>
                
            </View>
            <View View style={styles.inputContainer}>
                <Image
                    source={require('../Imagenes/usuario.png')}
                    style={styles.logo}
                />
                <TextInput
                  style={[styles.input, usuarioError && styles.inputError]} // Aplicar estilo de error si hay un error en el usuario
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
                          source={require('../Imagenes/candado.png')}
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
                          <Text style={styles.textoContrasena2}>Las contraseñas no coinciden</Text>
                      )}
                  </View>
                </View>
            </View>
       
            <View style={(styles.footerBoton)}>
              <TouchableOpacity
                style={[styles.botonRegistro, formValid ? null : styles.disabledButton]}
                onPress={() => {
                  validateForm();
                  if (formValid) {
                    const checkBoxData = {
                      servicioSalud: checkBox1,
                      tiendasMascotas: checkBox2,
                      refugioMascotas: checkBox3,
                    };
                    navigation.navigate('DocumentosRegistrarseEmpresaScreen', { checkBoxData, formValid }); // Pasar formValid como prop
                  }
                }}
                disabled={!formValid}>
                <Text style={styles.textoBoton}>SIGUIENTE</Text>
              </TouchableOpacity>
            </View>
    </KeyboardAwareScrollView>
    
  );
}

const styles = StyleSheet.create({
  inputError: {
    borderColor: 'red',
  },
 
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
       marginBottom: 40,   
     },
     imagen: {
      width: 200, 
      height: 200, 
    },
    contenedor2: {
      //flex: 1,
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
      alignItems:'center',
      marginBottom:25,
    },
    input: {
      // flexDirection: 'row',
       height: 40,
       width: 250,
       //marginBottom: 15,
       borderWidth: 1,
       padding: 10,
       backgroundColor: '#ffffff',
       borderColor: '#ffffff',
       textAlign: 'center',
       fontSize: 16,
       elevation: 10,
       borderTopRightRadius: 10,
       borderBottomRightRadius:10,
   
     },
     inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
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
    textoContrasena:{
      fontSize: 11,
      marginTop: 2,
      marginBottom:0,
    },
    textoContrasena2:{  
      fontSize: 11,
      marginTop: 2,
      color:`#ff0000`,
    },
    textoBoton: {
      fontSize: 20,
    } ,
    
    footerBoton:{
      width: '100%',
      backgroundColor: '#FFFF8',
      
    },
    
    botonRegistro:{
      backgroundColor: '#FFB988',
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width:'100%',    
      marginBottom:0,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      marginLeft: 35,
      marginBottom: 0,
      marginTop: 5,
      flexDirection: 'column',
      alignItems: 'flex-start',
      
      
    },
    checkboxItem: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      marginLeft: 0,
      marginTop: 0,
      padding:0
    },
    checkboxText: {
      marginLeft: 8,
    },
    textoVentana:{
      fontSize:24
      ,
    },
    contenVentanaTexto:{
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop:5,
    
    },
    errorText: {
      fontSize: 12,
      color: 'red',
      marginTop: 5,
      flexDirection: 'row',
    },
});