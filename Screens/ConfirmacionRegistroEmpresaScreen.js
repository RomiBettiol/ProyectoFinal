import React from 'react';
import { StyleSheet,ScrollView, Text,TextInput, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import { Image, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import { navigation } from '@react-navigation/native'; 
import InicioScreen from './InicioScreen';

export default function ConfirmacionRegistroEmpresaScreen({navigation}){
  
  
  return(
           
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
              <Image
              source={require('../Imagenes/logo2.png'
              )}
              style={styles.imagen}
              />          
        </View>
        <View style={styles.contenedor2}>
            <Image
              source={require('../Imagenes/confirmar.png'
              )}
              style={styles.imagenConfirmar}
              /> 
            <Text style={styles.textoAgradecimiento}>
                ¡Muchas gracias!
            </Text>
            <Text style={styles.textoAviso}>
                Tus datos serán verificados por un administrador.
            </Text>
            <Text style={styles.textoAviso}>
                Te llegara un mail cuando tu cuenta esté activa.
            </Text>
        </View>
        <TouchableOpacity
          style={styles.botonRegistro}
          onPress={() => {                 
              navigation.navigate('InicioScreen');
          }}
        >
          <Text style={styles.textoBoton}>REGRESAR AL INICIO</Text>
        </TouchableOpacity>
        
    </KeyboardAwareScrollView>
             
      
  );
}

const styles = StyleSheet.create({
   
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
    container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
    backgroundColor: 'white',
   },

   contenedor2: {
    height: 350,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FFB988',
    width: 370,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    marginTop:80,
  },

  imagen: {
    width: 200, 
    height: 200, 
  },
  imagenConfirmar: {
    width: 80, 
    height: 80,
    marginTop:40, 
  },
  textoAgradecimiento:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:40,
  },
  textoAviso:{
    textAlign: 'center',
    fontSize: 14,
    marginTop:15,
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
    marginTop:220,
  },
  textoAviso:{
    textAlign: 'center',
    fontSize: 14,
    marginTop:15,
  },

});