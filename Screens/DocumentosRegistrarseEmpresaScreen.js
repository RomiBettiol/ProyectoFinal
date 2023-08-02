import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text,TextInput, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import { Image, Button, CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import {ConfirmacionRegistroScreen} from './ConfirmacionRegistroScreen';
import { useNavigation } from '@react-navigation/native'; // Solo necesitas esta importación
import * as DocumentPicker from 'expo-document-picker';
import ConfirmacionRegistroEmpresaScreen from './ConfirmacionRegistroEmpresaScreen';

import Formulario1 from '../componentes/Formulario1';
import Formulario2 from '../componentes/Formulario2';
import Formulario3 from '../componentes/Formulario3';

export default function DocumentosRegistrarseEmpresaScreen({ route }) {
  const { checkBoxData, formValid } = route.params;
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
  const [isFormValid, setFormValid] = useState(false);
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
  const renderFormulario = () => {
    if (checkBoxData.servicioSalud && formValid) {
      return <Formulario1 
      pdf1={pdf1}
      pdf2={pdf2}
      pdf3={pdf3}
      setPdf1={setPdf1}
      setPdf2={setPdf2}
      setPdf3={setPdf3}
      onFormValidChange={handleFormValidChange} />;
    } else if (checkBoxData.tiendasMascotas && formValid) {
      return <Formulario2 
        pdf1={pdf1}
        pdf2={pdf2}
        pdf3={pdf3}
        setPdf1={setPdf1}
        setPdf2={setPdf2}
        setPdf3={setPdf3}
        onFormValidChange={handleFormValidChange} />;
    } else if (checkBoxData.refugioMascotas && formValid) {
      return <Formulario3 
        pdf1={pdf1}
        pdf2={pdf2}
        pdf3={pdf3}
        setPdf1={setPdf1}
        setPdf2={setPdf2}
        setPdf3={setPdf3}
        onFormValidChange={handleFormValidChange} />;
    } else {
      return <Text>No se ha seleccionado un formulario válido</Text>;
    }
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
        <View >
          {renderFormulario()}
        </View>
        <TouchableOpacity
        style={[styles.botonRegistro, arePdfsLoaded() ? null : styles.disabledButton]}
        onPress={() => {
          if (arePdfsLoaded()) {
            navigation.navigate('ConfirmacionRegistroEmpresaScreen');
          }
        }}
        disabled={!arePdfsLoaded()}
      >
        <Text style={styles.textoBoton}>SIGUIENTE</Text>
      </TouchableOpacity>
      {/* Resto del código del componente */}
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
      marginTop:110,
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
