import React,{useState, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import ListaValoresDias from '../Busqueda/ListaValoresDias';
import ListaValoresMeses from '../Busqueda/ListaValoresMeses';
import ListaValoresAño from '../Busqueda/ListaValoresAño';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AltaInformacion({ visible, onClose }) {
    const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  console.log(mascotaId)

  
  const [informationData, setInformationData] = useState({
    titleInformation: '',
    descriptionInformation:'',
   
    
  });


    const data = {
                  titleInformation: informationData.titleInformation,
                  descriptionInformation: informationData.descriptionInformation,
                 
                };
    

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Contenido de la tarjeta modal */}
                    <Text style={styles.titulo}>AGREGAR INFORMACION</Text>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput 
              style={styles.inputTexto}
              value={informationData.titleInformation}
              onChangeText={(text) => setInformationData({ ...informationData, titleInformation: text })}
               />
          </View>
          <View style={[{ flexDirection: 'column' }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: 'row' }, styles.tituloDescripcion]}>Descripcion</Text>
            <TextInput 
              style={[{ flexDirection: 'row' }, styles.inputTextoDescripcion]}
              value={informationData.descriptionInformation}
              onChangeText={(text) => setInformationData({ ...informationData, descriptionInformation: text })}
              />
          </View>
          
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor5]}>
            <TouchableOpacity
                          style={styles.closeButton}
                          onPress={async () => {
                            console.log(data.informationDate) 
                      
                            try {
                                                 
                              const response = await axios.post(`https://buddy-app.loca.lt/mypet/information/${mascotaId}`, data);
                          
                              console.log('Respuesta del servidor:', response.data);
                          
                            } catch (error) {
                             
                              console.error('Error al hacer la solicitud POST:', error);
                            }
                          }}
                      >
                          <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                          style={styles.closeButton}
                          onPress={onClose}
                      >
                          <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    elevation: 10,
    borderRadius: 25,
    padding: 20,
    width: windowWidth * 0.95,
    height:windowHeight * 0.65,
    textAlign: 'center',
    alignItems: 'center', // Para centrar horizont
},
  titulo: {
      fontSize: 22,
      marginVertical:20,
  },
  inputContainer: {
      marginTop: 25,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',

  },
  label: {
      fontSize: 16,
  },
  inputTexto: {
      backgroundColor: '#EEE9E9',
      width: '90%',
      height: 32,
      borderRadius: 100,
      textAlign: 'center',
      paddingStart:5,
      marginHorizontal:2,
  },
  inputTextoDescripcion: {
      backgroundColor: '#EEE9E9',
      width: '100%',
      height: 60,
      borderRadius: 10,
      textAlign: 'center',
      marginVertical:20,
  },
  textoFecha: {
      fontSize: 16,
      marginTop: 10,
  },
  subcontenedor4: {
      flexDirection: 'row',
      marginTop: 10,
  },
  closeButton: {
      backgroundColor: '#FFB984',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 40,
      alignSelf: 'center',
      marginHorizontal:10,
  },
  closeButtonText: {
      fontSize: 16,
      color: 'black',

  },
  subcontenedor1:{
    textAlign: 'center',
    alignItems: 'center', // Para centrar horizontal
   width:'95%',
  },
  horaInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
},
input: {
  height: 40,
  backgroundColor: '#EEE9E9',
  padding: 5,
  borderRadius: 20,
  width: '35%',
  fontSize:18,
  textAlign:'center',
},
inputDivider: {
    fontSize: 24,
    marginRight: 5,
},
tituloDescripcion:{
  marginStart:0,
  marginTop:10,
},
});
    