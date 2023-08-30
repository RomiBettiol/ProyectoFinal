import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Mascotas from '../Busqueda/Mascotas';
import ListaValoresDias from '../Busqueda/ListaValoresDias';
import ListaValoresMeses from '../Busqueda/ListaValoresMeses';
import ListaValoresAño from '../Busqueda/ListaValoresAño';
import AgregarImagen from '../AgregarImagen';
import axios from 'axios';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
export default function EditarMascota({ navigation, mascota, token, onCloseEditarMascota}) {
  const [nombre, setNombre] = useState(mascota.petName || '');
  const [selectedMonth, setSelectedMonth] = useState(null);
  // Agregar estados para día y año
  const [selectedDay, setSelectedDay] = useState(mascota.day || null);
  const [selectedYear, setSelectedYear] = useState(mascota.year || null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const updateMascota = async () => {
    const idPet = mascota.idPet; // Obtén la ID de la mascota desde los props
    const updatedData = {
      petName: nombre,
      day: selectedDay, // Agregar a los datos actualizados
      month: selectedMonth, // Agregar a los datos actualizados
      year: selectedYear, // Agregar a los datos actualizados
      // Otras propiedades que quieras actualizar
      birthDate: `${selectedDay}/${selectedMonth}/${selectedYear}`,
    };
    console.log({idPet})
    try {
      const response = await axios.put(`https://buddy-app.loca.lt/mypet/pet/${mascota.idPet}`,{
        headers: {
          'auth-token': token
        },
      
        petName: updatedData.petName,
        birthDate: updatedData.birthDate,
        // Otros datos que puedas necesitar
      
      }
      
      );
      setShowSuccessModal(true);
      console.log(response.data); 
      console.log(response.data); // Mensaje de éxito desde el backend
      // Puedes hacer algo aquí después de la actualización exitosa, como navegar a otra pantalla
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      setShowErrorModal(true);
    }
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCloseEditarMascota(); // Cierra el modal NuevaMascota
  };

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>EDITAR MASCOTA</Text>
          <AgregarImagen/>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Nombre</Text>
            <TextInput
              style={styles.inputTexto}
              value={nombre}
              onChangeText={setNombre}
            />
         </View>
      {/* Campo de edición para la fecha */}
      <Text style={styles.textoFecha}>Fecha de nacimiento</Text>
      <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
        <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
        {selectedMonth && <ListaValoresDias
          selectedMonth={selectedMonth} // Pasa el mes seleccionado
          selectedValue={selectedDay} // Pasa el día seleccionado
          setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
        />}
       <ListaValoresAño setSelectedValue={setSelectedYear} selectedValue={selectedYear} />
      </View>
      {/* Botón para actualizar */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={updateMascota}
      >
        <Text style={styles.closeButtonText}>Actualizar Mascota</Text>
      </TouchableOpacity>
      </View>
        </View>
        <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          handleSuccessModalClose(); // Cerrar el modal EditarTurno
        }}
        message="Mascota editada correctamente"
      />
      <ErrorModal
        visible={showErrorModal}
        errorMessage="Hubo un error al editar el turno."
        onClose={() => setShowErrorModal(false)}
      />
      </View>
   
  );
}            

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF",
    marginTop:35,
  },
  titulo: {
    marginTop: 10,
    fontSize: 22,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 0,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  inputTexto: {
    backgroundColor: '#EEE9E9',
    width: '70%',
    height: 32,
    borderRadius: 100,
    textAlign: 'center',
  },
  tituloPublicacion: {
    marginRight: 20,
    fontSize: 16,
  },
  textoFecha: {
    marginLeft: 37,
    fontSize: 16,
    marginTop: 10,
  },
  subcontenedor1: {
    marginTop: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontenedor2: {
    marginTop: 25,
    width: '100%',
    justifyContent: 'center',
  },

 
  subcontenedor3: {
    marginTop: 25,
    marginLeft: 30,
  },
  subcontenedor4: {
    marginTop: 15,
    justifyContent: 'center',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    elevation: 10,
    borderRadius: 25,
    alignItems: 'center',
    margin: 15,
    padding: 15,
  },
  subcontenedor5:{
    alignItems: 'center'
  },
  closeButton: {
    backgroundColor: '#FFB984',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:35,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

