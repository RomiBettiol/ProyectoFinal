import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import HeaderScreen from '../HeaderScreen';
import ListaValoresColor from '../Busqueda/ListaValoresColor';
import ListaValoresAnimal from '../Busqueda/ListaValoresAnimal';
import ListaValoresZona from '../Busqueda/ListaValoresZona';
import ListaValoresRazaPerros from '../Busqueda/ListaValoresRazaPerros';
import ListaValoresRazaGatos from '../Busqueda/ListaValoresRazaGatos';
import Mascotas from '../Busqueda/Mascotas';
import ListaValoresDias from '../Busqueda/ListaValoresDias';
import ListaValoresMeses from '../Busqueda/ListaValoresMeses';
import ListaValoresAño from '../Busqueda/ListaValoresAño';
import AgregarImagen from '../AgregarImagen';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import axios from 'axios'; // Importa la librería axios


export default function NuevaMascota({ navigation, token, onCloseNuevaMascota  }) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showModal, setShowModal] = useState(false); // Agrega el estado para el modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addPetSuccess, setAddPetSuccess] = useState(false);


  const authtoken = token;
  console.log("token en agregarmascota: "+ token)
  console.log("authtoken: "+ authtoken)


  const [petData, setPetData] = useState({
    petName: '',
    birthDate: '',
  });


  
  const toggleModal = () => {
    setShowModal(!showModal); // Cambiar el estado del modal
  };

  useEffect(() => {
    if (addPetSuccess) {
      // Espera un breve momento antes de mostrar el modal de éxito
      const timer = setTimeout(() => {
        setShowSuccessModal(true);
        setAddPetSuccess(false); // Reinicia la variable de éxito
      }, 500); // Puedes ajustar el tiempo según tus preferencias
  
      // Limpia el temporizador si el componente se desmonta antes de que se complete
      return () => clearTimeout(timer);
    }
  }, [addPetSuccess]);
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCloseNuevaMascota(); // Cierra el modal NuevaMascota
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>AGREGAR MASCOTA</Text>
          <AgregarImagen/>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Nombre</Text>
            <TextInput
              style={styles.inputTexto}
              value={petData.petName}
              onChangeText={(text) => setPetData({ ...petData, petName: text })}
            />
          </View>
            
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
            <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
            {selectedMonth && <ListaValoresDias
              selectedMonth={selectedMonth} // Pasa el mes seleccionado
              selectedValue={selectedDay} // Pasa el día seleccionado
              setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
            />}
          <ListaValoresAño setSelectedValue={setSelectedYear} selectedValue={selectedYear} />
          </View>
          <View style={styles.subcontenedor5}>
                  <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
              
                      
                try {
                  const config = {
                    headers: {
                      'auth-token': authtoken
                    }
                  };
                  
                  const data = {
                    // Aquí debes definir los datos que deseas enviar en el body de la solicitud POST
                    petName: petData.petName,
                    birthDate: `${selectedDay}-${selectedMonth}-${selectedYear}`,
                  };

                  const response = await axios.post('https://buddy-app1.loca.lt/mypet/pet/', data, config);
              
                  console.log('Respuesta del servidor:', response.data);
              
                  // Cierra el modal de "NuevaMascota" primero
                  toggleModal();
              
                  // Luego, establece la variable de éxito en true para mostrar el modal de éxito
                  setAddPetSuccess(true);
                } catch (error) {
                  // Si hay un error, muestra el modal de error con el mensaje de error
                  setErrorMessage(error.message);
                  setShowErrorModal(true);
              
                  console.error('Error al hacer la solicitud POST:', error);
                }
              }}
              
            >
              <Text style={styles.closeButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SuccessModal visible={showSuccessModal} onClose={handleSuccessModalClose} message="Mascota creada correctamente" />
      <ErrorModal visible={showErrorModal} errorMessage={errorMessage} onClose={() => setShowErrorModal(false)} />
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