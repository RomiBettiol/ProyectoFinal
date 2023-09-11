import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import { Image, CheckBox } from 'react-native-elements';
import { ImageBackground} from 'react-native';
import { navigation } from '@react-navigation/native';
import {InicioSesionScreen} from './InicioSesionScreen';

export default function InicioScreen({navigation}){

  const [modalVisible, setModalVisible] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  const handleRegistro = () => {
    setModalVisible(true);
  };

  const handleCheckBox1 = () => {
    setCheckBox1(true);
    setCheckBox2(false);
  };

  const handleCheckBox2 = () => {
    setCheckBox1(false);
    setCheckBox2(true);
  };

  const handleAceptar = () => {
    setModalVisible(false);
    // Navegar a la página correspondiente según el checkbox seleccionado
    if (checkBox1) {
      navigation.navigate('RegistrarseScreen');
    } else if (checkBox2) {
      navigation.navigate('RegistrarseEmpresaScreen');
    }
    
  };

  const handleCancelar = () => {
    setModalVisible(false);
  };


  return(
    <ImageBackground
      source={require('../Imagenes/Fondo.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
            source={require('../Imagenes/logo.png')}
            style={styles.imagen}
          />
        <View style={styles.container2}>
          <Text style={styles.subtitulo1}>Una aplicación para mascotas</Text>
          <TouchableOpacity style={[styles.boton,styles.shadowProp]}
            onPress = {()=> (
              navigation.navigate('InicioSesionScreen')
            )}
          >
            <Text style={styles.texto}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.texto}>¿Todavía no te unis?</Text>
            <TouchableOpacity onPress={handleRegistro}>
              <Text>Regístrate</Text>
            </TouchableOpacity>
            
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.contenVentanaTexto}>
            <Text style={styles.textoVentana}>¿Qué deseas hacer en Buddy?</Text>
          </View>
          
          <CheckBox
            title="Publicar mascota en adopción/perdida"
            checked={checkBox1}
            onPress={handleCheckBox1}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor="black"
            uncheckedColor="black"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            title="Publicar establecimiento para mascota"
            checked={checkBox2}
            onPress={handleCheckBox2}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor="black"
            uncheckedColor="black"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"    
          />
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.botonVentana} onPress={handleAceptar} disabled={!checkBox1 && !checkBox2} >
            <Text>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonVentana} onPress={handleCancelar}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },

  boton:{
    borderRadius: 10,
    marginTop: '10%',
    backgroundColor: '#FFB984',
    width: '50%',
    height: '15%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    marginBottom: '10%',
    alignItems: 'center',
    elevation: 10,
  },

  container2: {
    marginTop: '30%',
    backgroundColor: '#DDC4B8',
    alignItems:'center',
    justifyContent: 'flex-start',
    paddingTop: '17%',
    borderTopRightRadius: 160,
    borderTopLeftRadius: 160,
    width: '100%',
    height: '50%'
  },

  imagen: {
    width: '100%', 
    height: '100%',
    marginRight: '10%',
  },

  container: {
    justifyContent: 'space-around',
  },

  subtitulo1: {
    fontSize: 20,
  },

  texto: {
    fontSize: 16,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#FFB984',
    width: '90%',
    height: '35%',
    paddingHorizontal: 20,
    paddingVertical:5,
    justifyContent: 'center',
    borderRadius:10,
    alignItems: 'center',
    elevation: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 8,
  },
  textoVentana:{
    fontSize:24
    ,
  },
  contenVentanaTexto:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    height:'20%',
  },
  botonVentana:{
    backgroundColor: '#FFB984',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
    width:'55%',
    margin:1,
  },
});





