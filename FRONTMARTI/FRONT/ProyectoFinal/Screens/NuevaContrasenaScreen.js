import React from 'react';
import { StyleSheet,FlatList,ScrollView, Text,TextInput, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import { Image, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import { navigation } from '@react-navigation/native'; 
import { useNavigation } from '@react-navigation/native';
import ConfirmacionContrasenaScreen from './ConfirmacionContrasenaScreen';
import InicioSesionScreen from './InicioSesionScreen';


export default function NuevaContrasenaScreen({}){

  const [contrasena, setContrasena] = React.useState('');
  const [contrasena2, setContrasena2] = React.useState('');
  const [mostrarTexto, setMostrarTexto] = React.useState(false);
  const [mostrarTextoContrasena2, setMostrarTextoContrasena2] = React.useState(false);
  

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
  const navigation = useNavigation();

  const isFormValid =
  contrasena !== '' &&
  contrasena === contrasena2 &&
  requisitosContrasena.every((requisito) => requisito.cumplido);


  return(
           
    <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
       <View style={styles.logoContainer}>
              <Image
              source={require('../Imagenes/logo2.png'
              )}
              style={styles.imagen}
              />          
              <Text style={styles.titulo}>Recuperar contraseña</Text>
        </View>
        <View style={styles.contenedor2}> 

        <View>
                
                <View style={styles.inputContainer}>
            
                    <Image
                        source={require('../Imagenes/candado.png')}
                        style={styles.logo}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder="Nueva contraseña"
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
                          <Text style={styles.textoContrasena2}>Las contraseñas no coinciden</Text>
                      )}
                
              </View>
        </View>
        <View style={(styles.footerBoton)}>
                    
        <TouchableOpacity 
          style={[styles.botonRegistro, !isFormValid && styles.disabledBotonRegistro]}
          onPress={() => {
            if (isFormValid) {
              navigation.navigate('ConfirmacionContrasenaScreen');
            }
          }}
          disabled={!isFormValid}
        >
          <Text style={styles.textoBoton}>Confirmar</Text>
        </TouchableOpacity>

        </View>
        
    </KeyboardAwareScrollView>
             
      
  );
}

const styles = StyleSheet.create({
  titulo:{
    fontSize:24,
    marginTop:10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
    container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:80,
    backgroundColor: 'white',
   },

   contenedor2: {
    //flex: 1,
    height: 300,
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
    marginTop:90,
    marginBottom:150,
  },

  imagen: {
    width: 200, 
    height: 200, 
  },
  textoBoton: {
    fontSize: 20,
  } ,
  
  footerBoton:{
    width: '100%',
    backgroundColor: '#FFFF8',
    
  },
  
  botonRegistro:{
    marginTop: 3000,
    backgroundColor: '#FFB988',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width:'100%',    
    marginBottom:0,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  controlContainer:{
    alignItems:'center',
  },

});