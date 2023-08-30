import React,{useState, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import ListaValoresDias from '../Busqueda/ListaValoresDias';
import ListaValoresMeses from '../Busqueda/ListaValoresMeses';
import ListaValoresAño from '../Busqueda/ListaValoresAño';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AltaTurno({ visible, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [hora, setHora] = useState('');
  const [minutos, setMinutos] = useState('');
  const route = useRoute();
  const mascotaId = route.params?.mascotaId;
  console.log(mascotaId)

  
  const [turnData, setTurnData] = useState({
    titleTurn: '',
    descriptionTurn:'',
    turnDate:'',
    
  });


    const data = {
                  titleTurn: turnData.titleTurn,
                  descriptionTurn: turnData.descriptionTurn,
                  turnDate: `${selectedYear}-${selectedMonth}-${selectedDay}T${hora}-${minutos}:25.000Z`,
                 
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
                    <Text style={styles.titulo}>AGREGAR TURNO</Text>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput 
              style={styles.inputTexto}
              value={turnData.titleTurn}
              onChangeText={(text) => setTurnData({ ...turnData, titleTurn: text })}
               />
          </View>
          <View style={[{ flexDirection: 'column' }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: 'row' }, styles.tituloDescripcion]}>Descripcion</Text>
            <TextInput 
              style={[{ flexDirection: 'row' }, styles.inputTextoDescripcion]}
              value={turnData.descriptionTurn}
              onChangeText={(text) => setTurnData({ ...turnData, descriptionTurn: text })}
              />
          </View>
          <View style={styles.inputContainer}>
                        <Text style={styles.label}>Hora:</Text>
                        <View style={styles.horaInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="HH"
                                value={hora}
                                onChangeText={setHora}
                                maxLength={2}
                            />
                            <Text style={styles.inputDivider}> : </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM"
                                value={minutos}
                                onChangeText={setMinutos}
                                maxLength={2}
                            />
                        </View>
            </View>
          <Text style={styles.textoFecha}>Fecha de turno</Text>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
            <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
            {selectedMonth && <ListaValoresDias
              selectedMonth={selectedMonth} // Pasa el mes seleccionado
              selectedValue={selectedDay} // Pasa el día seleccionado
              setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
            />}
          <ListaValoresAño setSelectedValue={setSelectedYear} selectedValue={selectedYear} />
          </View>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor5]}>
            <TouchableOpacity
                          style={styles.closeButton}
                          onPress={async () => {
                            console.log(data.turnDate) 
                      
                            try {
                                                 
                              const response = await axios.post(`https://buddy-app.loca.lt/mypet/turn/${mascotaId}`, data);
                          
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
    