import React,{useState} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import ListaValoresDias from '../Busqueda/ListaValoresDias';
import ListaValoresMeses from '../Busqueda/ListaValoresMeses';
import ListaValoresAño from '../Busqueda/ListaValoresAño';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
export default function EditarTurno({ visible, onClose, turno, mascotaId }) {
 
 
  const [selectedMonth, setSelectedMonth] = useState( );
  const [selectedDay, setSelectedDay] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [hora, setHora] = useState('');
  const [minutos, setMinutos] = useState('');
  const [titleTurn, setTitleTurn] = useState(turno.titleTurn );
  const [descriptionTurn, setDescriptionTurn] = useState(turno.descriptionTurn );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handleEditeTurno = async () => {
    const idTurn = turno.idTurn; // Obtén la ID de la mascota desde los props
    const updatedData = {
      titleTurn: titleTurn,
      descriptionTurn: descriptionTurn, // Agregar a los datos actualizados
      turnDate: `${selectedDay}/${selectedMonth}/${selectedYear}T${hora}:${minutos}`,
    };
    console.log(turno.idTurn)
    try {
        const response = await axios.put(`https://buddy-app1.loca.lt/mypet/turn/${mascotaId}/${idTurn}`,{
          titleTurn: updatedData.titleTurn,
          descriptionTurn: updatedData.descriptionTurn,
          turnDate: updatedData.turnDate
        
        }
        
        );
        console.log('Turno editado:', response.data);
        setShowSuccessModal(true);
    } catch (error) {
        console.error('Error al editar el turno:', error);
        setShowErrorModal(true);
    }
    
    setOverlayVisible(false); // Cierra el overlay después de eliminar
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
                    <Text style={styles.titulo}>EDITAR TURNO</Text>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput 
              style={styles.inputTexto}
              value={titleTurn}
              onChangeText={setTitleTurn}
              />
          </View>
          <View style={[{ flexDirection: 'column' }, styles.subcontenedor1]}>
            <Text style={[{ flexDirection: 'row' }, styles.tituloDescripcion]}>Descripcion</Text>
            <TextInput 
              style={[{ flexDirection: 'row' }, styles.inputTextoDescripcion]}
              value={descriptionTurn}
              onChangeText={setDescriptionTurn}
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
                          onPress={handleEditeTurno}
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
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose(); // Cerrar el modal EditarTurno
        }}
        message="Turno editado correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage="Hubo un error al editar el turno."
        onClose={() => setShowErrorModal(false)}
      />
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
    