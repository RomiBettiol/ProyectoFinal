import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import HeaderScreen from '../HeaderScreen';
import ListaValoresColor from '../Busqueda/ListaValoresColor';
import ListaValoresAnimal from '../Busqueda/ListaValoresAnimal';
import ListaValoresZona from '../Busqueda/ListaValoresZona';
import ListaValoresRazaPerros from '../Busqueda/ListaValoresRazaPerros';
import ListaValoresRazaGatos from '../Busqueda/ListaValoresRazaGatos';
import Mascotas from '../Busqueda/Mascotas';
import ListaValoresDiasMascota from '../MiMascota/ListaValoresDiasMascota';
import ListaValoresMesesMascota from '../MiMascota/ListaValoresMesesMascota';
import ListaValoresAñoMascota from '../MiMascota/ListaValoresAñoMascota';
import AgregarImagen from '../AgregarImagen';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import axios from 'axios'; // Importa la librería axios
import { Dropdown } from 'react-native-element-dropdown';


export default function NuevaMascota({ navigation, token, onCloseNuevaMascota  }) {
  
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showModal, setShowModal] = useState(false); // Agrega el estado para el modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addPetSuccess, setAddPetSuccess] = useState(false);
  const[idPetBreed,setIdPetBreed]= useState('');
  const[idPetType, setIdPetType]=useState('');
  const[selectedAnimal, setSelectedAnimal]=useState([]);
  const[selectedAnimalId,setSelectedAnimalId] =useState('')
  const [petTypeOptions, setPetTypeOptions] = useState();
  const [petBreedOptions, setPetBreedOptions] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


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
  useEffect(() => {
    console.log(idPetType);
    console.log(idPetBreed);
    // Obtener tipos de mascotas
    axios.get('https://buddy-app1.loca.lt/parameters/petType')
      .then((response) => {
        // Mapear los datos para obtener un array de opciones
        const petTypeOptions = response.data.petTypes.map((petType) => ({
          label: petType.petTypeName,
          value: petType.idPetType,
        }));
        // Guardar las opciones en el estado
        setPetTypeOptions(petTypeOptions);
        console.log(petTypeOptions);
        console.log('tipo de mascota obtenido con exito');
      })
      .catch((error) => {
        console.log('Error al obtener tipos de mascotas:', error);
      });
  
  }, []);
  

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCloseNuevaMascota(); // Cierra el modal NuevaMascota
  };
  const handleAddPet = async () => {
    // Deshabilita el botón al principio de la función
     setIsButtonDisabled(true);
    try {
      const config = {
        headers: {
          'auth-token': authtoken,
        },
      };

      const data = {
        petName: petData.petName,
        birthDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
        idPetType: selectedAnimalId,
        idPetBreed: selectedBreedId,
      };
      console.log(data);
      const response = await axios.post('https://buddy-app1.loca.lt/mypet/pet/', data, config);

      console.log('Respuesta del servidor:', response.data);

      toggleModal();

      setAddPetSuccess(true);
    } catch (error) {
      setErrorMessage('Complete todos los campos');
      setShowErrorModal(true);

    }
    // Habilita el botón nuevamente después de dos segundos
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
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
          <View style={styles.subtitulo}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
          </View>
          
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
            <ListaValoresMesesMascota setSelectedMonth={setSelectedMonth} />
            {selectedMonth && <ListaValoresDiasMascota
              selectedMonth={selectedMonth} // Pasa el mes seleccionado
              selectedValue={selectedDay} // Pasa el día seleccionado
              setSelectedValue={setSelectedDay} // Pasa la función para actualizar el día
            />}
          <ListaValoresAñoMascota setSelectedValue={setSelectedYear} selectedValue={selectedYear} />
          </View>
          <View style={styles.subtitulo}>
            <Text style={styles.label}>Tipo de Animal</Text>
          </View>
          
          <ScrollView horizontal={true}>
          <View >
            
          <ListaValoresAnimal selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} setSelectedAnimalId={setSelectedAnimalId} />

          </View>
          </ScrollView>
          
          <View style={[styles.dropdown,{ borderRadius: 100 }]}>
           
          {selectedAnimal && (
                <ListaValoresRazaPerros selectedAnimal={selectedAnimal} setSelectedBreedId={setSelectedBreedId} />
              )}
          </View>

          <View style={styles.subcontenedor5}>
            <TouchableOpacity style={styles.closeButton} onPress={handleAddPet}  disabled={isButtonDisabled}>
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
  label: {
    fontSize: 16,
    marginBottom: 2,
    
    
  },
  subtitulo:{
    textAlign:'left',
    width:'90%',
    margin:5,
  },
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF",
    marginTop:35,
    padding:5,
  },
  dropdown: {
    backgroundColor: '#EEE9E9',
    width: '90%',
    margin: 10,
    padding:0,
    justifyContent:'center',
 
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
    width:'100%',
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
    marginBottom: 25,
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