import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Header from '../componentes/HeaderScreen';
import axios from 'axios';
import ModalEditar from '../componentes/Parametrizacion/ModalEditar';
import ModalAgregar from '../componentes/Parametrizacion/ModalAgregar';
import ModalEliminar from '../componentes/Parametrizacion/ModalEliminar';

export default function ParametrizacionScreen({ navigation }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEliminarModalVisible, setEliminarModalVisible] = useState(false);
  const [petColors, setPetColors] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [petBreeds, setPetBreeds] = useState([]);

  const handleAddModalPress = () => {
    setAddModalVisible(true);
  };

  const handleEliminarModalPress = () => {
    setEliminarModalVisible(true);
  };
 
  const handleEditPress = (zone) => {
    setEditingZone(zone);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const handleZoneEdit = (editedLocality) => {
    const updatedZones = zoneOptions.map((zone) =>
      zone.localityName === editingZone.localityName
        ? { ...zone, localityName: editedLocality }
        : zone
    );
    setZoneOptions(updatedZones);
  }; 
  
  const getZonas = () => {
    axios
      .get('http://10.0.2.2:4000/parameters/locality/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Zonas exitosas:', response.data);
        const localities = response.data.localities;
        if (localities && Array.isArray(localities)) {
          setZoneOptions(localities);
        } else {
          setZoneOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setZoneOptions([]);
      });
  };

  const getPetColors = () => {
    axios
      .get('http://10.0.2.2:4000/parameters/petColor/')
      .then((response) => {
        console.log('Colores exitosos:', response.data);
        const colors = response.data.petColors;
        if (colors && Array.isArray(colors)) {
          setPetColors(colors);
        } else {
          setPetColors([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de colores:', error);
        setPetColors([]);
      });
  };

  const getPetTypes = () => {
    axios
      .get('http://10.0.2.2:4000/parameters/petType/')
      .then((response) => {
        console.log('Tipos de animales exitosos:', response.data);
        const types = response.data.petTypes;
        if (types && Array.isArray(types)) {
          setPetTypes(types);
        } else {
          setPetTypes([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de tipos de animales:', error);
        setPetTypes([]);
      });
  };

  const getPetBreeds = () => {
    axios
      .get('http://10.0.2.2:4000/parameters/petBreed/')
      .then((response) => {
        console.log('Razas exitosas:', response.data);
        const breeds = response.data.petBreeds;
        if (breeds && Array.isArray(breeds)) {
          setPetBreeds(breeds);
        } else {
          setPetBreeds([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de razas de animales:', error);
        setPetBreeds([]);
      });
  }; 
  
  useEffect(() => {
    getZonas();
    getPetColors();
    getPetTypes();
    getPetBreeds();
  }, []);
  
  return (
    <View>
      <Header />
      <Text style={styles.titulo}>Parametrización de filtros</Text>
      <ScrollView style={styles.scrollView}>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/marcador-de-posicion.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Zona</Text>
          <TouchableOpacity onPress={handleAddModalPress}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {zoneOptions.map((zone, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center'},styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {zone.localityName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditPress(zone)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEliminarModalPress}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/perroFiltro.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Razas</Text>
          <TouchableOpacity onPress={handleAddModalPress}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petBreeds.map((breed, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {breed.petBreedName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditPress()}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEliminarModalPress}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/paleta-de-color.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Colores</Text>
          <TouchableOpacity onPress={handleAddModalPress}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petColors.map((color, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {color.petColorName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditPress()}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEliminarModalPress}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/huella.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Tipo animal</Text>
          <TouchableOpacity onPress={handleAddModalPress}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petTypes.map((type, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {type.petTypeName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditPress()}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEliminarModalPress}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ModalEditar isVisible={isModalVisible} onClose={handleCloseModal} onEdit={handleZoneEdit} editingZone={editingZone} />
      <ModalAgregar isVisible={isAddModalVisible} onClose={() => setAddModalVisible(false)} />
      <ModalEliminar isVisible={isEliminarModalVisible} onClose={() => setEliminarModalVisible(false)} />
    </View>
  );
};  

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 6,
  },
  imagenTitulo: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 5,
  },
  nombreFiltros: {
    fontSize: 20,
    marginTop: 15,
    marginRight: 30,
  },
  filtrosZona: {
    marginTop: 25,
    marginLeft: 25,
  },
  imagenAgregar: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
  zoneItem: {
    fontSize: 16,
  },
  imagenbotones: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  botones: {
    marginLeft: 30,
    marginTop: 2,
  },
  containerTexto: {
    backgroundColor: '#DDC4B8',
    width: '50%',
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 83,
    marginTop: 10,
    paddingLeft: 10,
  },
});