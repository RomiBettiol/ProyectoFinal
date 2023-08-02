import React from 'react';
import { StyleSheet,FlatList,ScrollView, Text,TextInput, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import { Image, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
//import { navigation } from '@react-navigation/native'; 
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function ConfirmacionContrasenaScreen({}){
  const route = useRoute();
  const email = route.params && route.params.email;
    
  const navigation = useNavigation();

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
            <Image
              source={require('../Imagenes/confirmar.png'
              )}
              style={styles.imagenConfirmar}
              /> 
            <Text style={styles.textoAgradecimiento}>
                ¡Enviamos un correo a {email}, sigue el enlace del mismo para finalizar cambio de contraseña!
            </Text>
            
        </View>
        
        
    </KeyboardAwareScrollView>
             
      
  );
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:24,
      },
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
        backgroundColor: '#DDC4B8',
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
    
});