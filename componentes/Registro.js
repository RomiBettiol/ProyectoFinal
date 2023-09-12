import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Modal, TextInput, TouchableOpacity, Text, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { InicioSesionScreen } from '../Screens/InicioSesionScreen';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import RecuperarContrasenaScreen from '../Screens/RecuperarContrasenaScreen';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

const Registro = () => {
  const [usuario, setUsuario] = React.useState('');
  const [contrasena, setContrasena] = React.useState('');
  const [formValid, setFormValid] = React.useState(false); // Variable de estado para rastrear el estado de validación del formulario
  const [showAlert, setShowAlert] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado
  const [showAlertServer, setShowAlertServer] = React.useState(false); // Estado para mostrar/ocultar el cuadro de diálogo personalizado del back-end
  const [error, setError] = React.useState('');
  const navigation = useNavigation();
  
  const handleValidation = () => {
    const isValid = usuario.trim() !== '' && contrasena.trim() !== '';
    return isValid;
  };

  useEffect(() => {
    setFormValid(handleValidation());
  }, [usuario, contrasena]);

  const handleIngresarPress = async () => {
    if (formValid) {

      const data = {
        mail: usuario,
        password: contrasena
      }

      try {
        const response = await axios.post('https://buddy-app1.loca.lt/security/auth/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          mail: usuario,
          password: contrasena,
        });

  
        if (response.status === 200) {
          const token = response.data.data.token;
          // Aquí puedes hacer lo que necesites con el token, por ejemplo, guardar en AsyncStorage o Redux
          console.log('Token:', token);
          navigation.navigate('HomeScreen', { token }); // Pasa el token como parámetro
        } else {
          setError(response.data.message || 'Error desconocido');
          setShowAlertServer(true);
        }
      } catch (error) {
        console.log('Error:', error);
        setError(error.response?.data?.message || 'Error desconocido');
        setShowAlertServer(true);
      }
    } else {
      // Mostrar el cuadro de diálogo personalizado
      console.log("no entro")
      setShowAlert(true);
    }
  };
 

  return (
    <SafeAreaView style={styles.contenedor2}>
        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          value={usuario}
          placeholder='Usuario'
    
        />
        <TextInput
          style={styles.input}
          onChangeText={setContrasena}
          value={contrasena}
          placeholder='Contraseña'
          secureTextEntry={true}
        />
     <TouchableOpacity
        style={[styles.boton, styles.shadowProp]}
        onPress={handleIngresarPress}
        //onPress = {()=> (
         // navigation.navigate('HomeScreen')
         //)}
      >
        <Text>Ingresar</Text>
      </TouchableOpacity>

      {/* Cuadro de diálogo personalizado */}
      <Modal
        visible={showAlert}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Por favor, completa ambos campos.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlert(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showAlertServer}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAlertServer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Error: {error}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlertServer(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
              onPress = {()=> (
                navigation.navigate('RecuperarContrasenaScreen')
              )}
            >
              <Text>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
     
     
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '68%',
    marginBottom: '5%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
  },

  contenedor2: {
    marginTop: '18%',
    backgroundColor: '#DDC4B8',
    alignItems:'center',
    justifyContent: 'flex-start',
    paddingTop: '25%',
    borderTopLeftRadius: 140,
    width: '85%',
    height: '55%',
    marginLeft: '15%',
    elevation: 30,
  },

  boton:{
    borderRadius: 10,
    marginTop: '5%',
    backgroundColor: '#FFB984',
    width: '50%',
    height: 45,
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    marginBottom: '5%',
    alignItems: 'center',
    elevation: 10,
  },

  imagen1: {
    width: 42, 
    height: 42,
    marginRight: '10%',
    marginTop: '5%',
  },

  imagen2: {
    width: 43, 
    height: 43,
    marginTop: '5%',
  },

  parrafo:{
    marginBottom: '2%',
    marginLeft: '3%',
  },

  redes: {
    marginTop: '16%',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FFB984',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },

});

export default Registro;