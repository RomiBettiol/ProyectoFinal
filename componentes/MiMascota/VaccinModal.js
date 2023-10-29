import React,{useState, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VaccinModal = ({ visible, vaccinContent, onClose, vaccin }) => {
    const timeParts = vaccin.vaccineHour.split(':');
    const hor = parseInt(timeParts[0], 10) ;
    const min= parseInt(timeParts[1], 10);
    const dateParts = vaccin.vaccineDate.split('-');
    const year= parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) ; // Restamos 1 porque los meses en JavaScript son 0-11
    const  day= parseInt(dateParts[0], 10);
    console.log('ATENTE:', day)
    const [hora, setHora] = useState(hor);
    const [minutos, setMinutos] = useState(min);


    const datePartsProx = vaccin.nextVaccineDate ? vaccin.nextVaccineDate.split('-') : [null, null, null];
    const yearProx = datePartsProx[2] ? parseInt(datePartsProx[2], 10) : null;
    const monthProx = datePartsProx[1] ? parseInt(datePartsProx[1], 10) : null;
    const dayProx = datePartsProx[0] ? parseInt(datePartsProx[0], 10) : null;

    const [showNextDoseDate, setShowNextDoseDate] = useState(false);

   // En tu componente EditarVaccin, dentro de la función return, antes de usarlos:
 
const formattedDay = day ? day.toString().padStart(2, '0') : '';
const formattedMonth =month ? month.toString().padStart(2, '0') : '';
const formattedYear = year ? year.toString().padStart(4, '0') : '';

const formattedYearProx = yearProx ? yearProx.toString().padStart(4, '0') : '';
const formattedMonthProx = monthProx ? monthProx.toString().padStart(2, '0') : '';
const formattedDayProx = dayProx  ? dayProx .toString().padStart(2, '0') : '';

    useEffect(() => {
        
        console.log("DOSISSSSSS ", vaccin.doseQuantity )      
        // Actualizar el estado para mostrar u ocultar la fecha de próxima dosis
        setShowNextDoseDate(parseInt(vaccin.doseQuantity, 10) > 1);
      }, [vaccin.doseQuantity]);
    return (
        <View>
          <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Contenido de la tarjeta modal */}
                    <Text style={styles.titulo}> VACUNA</Text>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput 
                style={styles.inputTexto}
                editable={false} // Campo de solo lectura
                value={vaccin.titleVaccine}
                
             />
           </View>
          <View style={[{ flexDirection: 'column' }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: 'row' }, styles.tituloDescripcion]}>Descripcion</Text>
            <TextInput 
            style={[{ flexDirection: 'row' }, styles.inputTextoDescripcion]}
            editable={false} // Campo de solo lectura
            value={vaccin.descriptionVaccine}
            />
          </View>

          <View style={styles.subcontenedor1}>
            <Text style={styles.tituloDescripcion}>Cantidad de dosis</Text>
            <TextInput
              style={styles.inputTextoCant}
              value={vaccin.doseQuantity.toString()}
              editable={false} // Campo de solo lectura
            />
          </View>
          {/* Mostrar los elementos relacionados con la fecha de próxima dosis si es necesario */}
          {showNextDoseDate &&(
            <>
            <View style={styles.subcontenedor1}>
                <Text style={styles.tituloDescripcion}>Fecha de próxima dosis</Text>
                <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
                                <TextInput
                                    style={styles.input}
                                    value={formattedYearProx.toString()}
                                    maxLength={2}
                                    minLength={2}
                                    editable={false} // Campo de solo lectura
                                />
                                <Text style={styles.inputDivider}> - </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formattedMonthProx.toString()}
                                    maxLength={2}
                                    minLength={2}
                                    editable={false} // Campo de solo lectura
                                />
                                <Text style={styles.inputDivider}> - </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formattedDayProx.toString()}
                                    maxLength={4}
                                    minLength={4}
                                    editable={false} // Campo de solo lectura
                                />
                    </View>
            </View>
              
            </>
          )}
          
          <Text style={styles.tituloDescripcion}>Fecha de turno</Text>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
                            <TextInput
                                style={styles.input}
                                value={formattedDay.toString()}
                                maxLength={2}
                                minLength={2}
                                editable={false} // Campo de solo lectura
                            />
                            <Text style={styles.inputDivider}> - </Text>
                            <TextInput
                                style={styles.input}
                                value={formattedMonth.toString()}
                                maxLength={2}
                                minLength={2}
                                editable={false} // Campo de solo lectura
                            />
                            <Text style={styles.inputDivider}> - </Text>
                            <TextInput
                                style={styles.input}
                                value={formattedYear.toString()}
                                maxLength={4}
                                minLength={4}
                                editable={false} // Campo de solo lectura
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
      height:windowHeight * 0.9,
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
    cantVaccin:{
        width: '100%',
    },
    inputTexto: {
        backgroundColor: '#EEE9E9',
        width: '90%',
        height: 32,
        borderRadius: 100,
        textAlign: 'center',
        paddingStart:5,
        marginHorizontal:2,
        color:'black'
    },
    inputTextoCant: {
        backgroundColor: '#EEE9E9',
        width: '100%',
        height: 32,
        borderRadius: 100,
        textAlign: 'center',
        paddingStart:5,
        marginHorizontal:2,
        color:'black'
    },
    inputTextoDescripcion: {
        backgroundColor: '#EEE9E9',
        width: '100%',
        height: 60,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical:10,        
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
  input: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 5,
    borderRadius: 20,
    width: '30%',
    fontSize:18,
    textAlign:'center',
    color:'black',
  },
  inputDivider: {
      fontSize: 24,
      marginRight: 5,
  },
  tituloDescripcion:{
    marginStart:0,
    marginTop:10,
    marginBottom:10,
  },
  });
      

export default VaccinModal;
