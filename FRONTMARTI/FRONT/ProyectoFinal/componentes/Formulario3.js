import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const Formulario3 = ({ pdf1, pdf2, pdf3, setPdf1, setPdf2, setPdf3 }) => {
  const [textPdf1, setTextPdf1] = useState('ADJUNTAR HABILITACION MUNICIPAL');
  const [textPdf2, setTextPdf2] = useState('ADJUNTAR REGISTRO DE ASOCIACION O FUNDACION');
  const [textPdf3, setTextPdf3] = useState('CONSTANCIA DE CUIT');

  const selectPdf = async (pdfIndex) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Limitar a archivos PDF
      });
      switch (pdfIndex) {
        case 1:
          setPdf1(result);
          if (result.type === 'success') {
            setTextPdf1(result.name);
          }
          break;
        case 2:
          setPdf2(result);
          if (result.type === 'success') {
            setTextPdf2(result.name);
          }
          break;
        case 3:
          setPdf3(result);
          if (result.type === 'success') {
            setTextPdf3(result.name);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error al seleccionar el PDF:', error);
    }
  };

  

  return (
    <View style={styles.contenedor2}>
      <TouchableOpacity style={styles.container} onPress={() => selectPdf(1)}>
        <Text style={styles.texto}>{textPdf1}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={() => selectPdf(2)}>
        <Text style={styles.texto}>{textPdf2}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={() => selectPdf(3)}>
        <Text style={styles.texto}>{textPdf3}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor2: {
   // flex: 1,
    height: 350,
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
    marginBottom:15,
    paddingTop:30,
  },
  texto: {
    fontSize: 16,
    marginTop: 10,
    color:'#9d9d9d',
    textAlign:'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    //elevation: 10,
    borderRadius: 20,
    height:80,
    width:'90%',
    textAlign:'center',
  },
});

export default Formulario3;
