import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View, Image, TouchableWithoutFeedback} from 'react-native';

const Registro = () => {
  const [usuario, setUsuario] = React.useState('');
  const [contrasena, setContrasena] = React.useState('');


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
      <TouchableOpacity style={[styles.boton,styles.shadowProp]}>
        <Text>Ingresar</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback>
        <Text>¿Olvidaste tu contraseña?</Text>
      </TouchableWithoutFeedback>
      <View style={styles.redes}>
        <Text style={styles.parrafo}>Ingresa con</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../Imagenes/facebook.png')}
            style={styles.imagen1}
          />
          <Image
            source={require('../Imagenes/social.png')}
            style={styles.imagen2}
          />
        </View>
      </View>
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
  }
});

export default Registro;