import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import HeaderScreen from '../componentes/HeaderScreen';
import ListaValoresColor from '../componentes/Busqueda/ListaValoresColor';
import ListaValoresAnimal from '../componentes/Busqueda/ListaValoresAnimal';
import ListaValoresZona from '../componentes/Busqueda/ListaValoresZona';
import ListaValoresRazaPerros from '../componentes/Busqueda/ListaValoresRazaPerros';
import ListaValoresRazaGatos from '../componentes/Busqueda/ListaValoresRazaGatos';
import Mascotas from '../componentes/Busqueda/Mascotas';
import ListaValoresDias from '../componentes/Busqueda/ListaValoresDias';
import ListaValoresMeses from '../componentes/Busqueda/ListaValoresMeses';
import ListaValoresAño from '../componentes/Busqueda/ListaValoresAño';
import ImagePickerComponent from '../componentes/Busqueda/ImagePickerComponent';  
import BotonPublicar from '../componentes/Busqueda/BotonPublicar';
import axios from 'axios';

export default function PublicacionBusqueda({ navigation }) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  const handlePost = async () => {
    const postData = {
      title,
      description,
      breed: {
        petBreedName: selectedBreed,
        type: {
          petTypeName: selectedAnimal,
        },
      },
      color: {
        petColorName: selectedColor,
      },
      locality: {
        localityName: selectedLocality,
      },
      isFound: Mascotas === 1 ? true : false,
    };

    console.log('Datos a publicar:', postData);

    try {
      const response = await axios.post('http://10.0.2.2:4000/publications/publication/search', postData);
      console.log('Solicitud POST exitosa:', response.data);
      // Maneja el éxito, muestra un mensaje de éxito, navega, etc.
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Maneja el error, muestra un mensaje de error, etc.
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView style={styles.scroll}>
        <View style={styles.contenedor1}>
          <Text style={styles.titulo}>Publica tu mascota</Text>
          <ImagePickerComponent />
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor1]}>
            <Text style={styles.tituloPublicacion}>Titulo</Text>
            <TextInput
              style={styles.inputTexto}
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
            />
          </View>
          <View style={styles.subcontenedor2}>
            <Text style={styles.descripcionPublicacion}>Descripción</Text>
            <TextInput
              style={styles.inputDescripcion}
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
              multiline={true}
              textAlignVertical="top"
              maxLength={1000}
            />
          </View>
            <View style={styles.subcontenedor3}>
              <ListaValoresAnimal selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} />
              <ListaValoresColor selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
              <ListaValoresZona selectedLocality={selectedLocality} setSelectedLocality={setSelectedLocality} />

              {selectedAnimal === 'perro' && <ListaValoresRazaPerros selectedRaza={selectedBreed} setSelectedRaza={setSelectedBreed} />}
              {selectedAnimal === 'gato' && <ListaValoresRazaGatos selectedRaza={value} setSelectedRaza={value}/>}
            </View>
          <Mascotas />
          <Text style={styles.textoFecha}>Fecha de extravío</Text>
          <View style={[{ flexDirection: 'row' }, styles.subcontenedor4]}>
          <ListaValoresMeses setSelectedMonth={setSelectedMonth} />
          {selectedMonth && <ListaValoresDias selectedMonth={selectedMonth} />}
          <ListaValoresAño />
          </View>
        </View>
      </ScrollView>
      <BotonPublicar onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 20,
    fontSize: 22,
    marginLeft: 15,
  },
  scroll: {
    flex: 1,
  },
  contenedor1: {
    paddingTop: 10,
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
  descripcionPublicacion: {
    fontSize: 16,
    marginLeft: '8%',
  },
  inputDescripcion: {
    backgroundColor: '#EEE9E9',
    width: '85%',
    height: 100,
    borderRadius: 30,
    padding: 20,
    marginTop: 15,
    marginLeft: '8%',
  },
  subcontenedor3: {
    marginTop: 25,
    marginLeft: 30,
  },
  subcontenedor4: {
    margin: 15,
    justifyContent: 'center',
  },
});