import React,{useState} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TurnoModal = ({ visible, turnoContent, onClose, turno }) => {
    const timeParts = turno.turnHour.split(':');
    const hor = parseInt(timeParts[0], 10) ;
    const min= parseInt(timeParts[1], 10);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [hora, setHora] = useState(hor);
    const [minutos, setMinutos] = useState(min);
    const dateParts = turno.turnDate.split('-');
    const  year= parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10); // Restamos 1 porque los meses en JavaScript son 0-11
    const day= parseInt(dateParts[0], 10);
    
    return (
        <View>
          <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Contenido de la tarjeta modal */}
                    <Text style={styles.titulo}> TURNO</Text>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput 
                style={styles.inputTexto}
                editable={false} // Campo de solo lectura
                value={turno.titleTurn}
                
             />
           </View>
          <View style={[{ flexDirection: 'column' }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: 'row' }, styles.tituloDescripcion]}>Descripcion</Text>
            <TextInput 
              style={[{ flexDirection: 'row' }, styles.inputTextoDescripcion]}
              editable={false} // Campo de solo lectura
              value={turno.descriptionTurn}
            />
          </View>
          <View style={styles.inputContainer}>
                        <Text style={styles.label}>Hora:</Text>
                        <View style={styles.horaInputContainer}>
                            <TextInput
                                style={styles.input}
                                value={hora.toString()}
                                maxLength={2}
                                editable={false} // Campo de solo lectura
                            />
                            <Text style={styles.inputDivider}> : </Text>
                            <TextInput
                                style={styles.input}
                                value={minutos.toString()}
                                maxLength={2}
                                editable={false} // Campo de solo lectura
                            />
                        </View>
            </View>
          <Text style={styles.textoFecha}>Fecha de turno</Text>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
                            <TextInput
                                style={styles.input}
                                value={day.toString()}
                                maxLength={2}
                                editable={false} // Campo de solo lectura
                            />
                            <Text style={styles.inputDivider}> - </Text>
                            <TextInput
                                style={styles.input}
                                value={month.toString()}
                                maxLength={2}
                                editable={false} // Campo de solo lectura
                            />
                            <Text style={styles.inputDivider}> - </Text>
                            <TextInput
                                style={styles.input}
                                value={year.toString()}
                                maxLength={4}
                                editable={false} // Campo de solo lectura
                            />
          </View>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor5]}>
            <TouchableOpacity
                          style={styles.closeButton}
                          onPress={onClose}
                      >
                          <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
};
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
    //    paddingStart:5,
        marginHorizontal:2,
        color:'black',
    },
    inputTextoDescripcion: {
        backgroundColor: '#EEE9E9',
        width: '100%',
        height: 60,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical:20,
        color:'black',
    },
    input: {
      height: 40,
      backgroundColor: '#EEE9E9',
      padding: 5,
      borderRadius: 20,
      width: '30%',
      fontSize:14,
      textAlign:'center',
      color:'black',
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
  inputDivider: {
      fontSize: 24,
      marginRight: 5,
  },
  tituloDescripcion:{
    marginStart:0,
    marginTop:10,
  },
  });
      

export default TurnoModal;
