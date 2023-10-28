import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useRoute } from "@react-navigation/native";
import axios from 'axios';

const SearchBarExample = ({ data, onSearch, onFilterChangeHora }) => {
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [zones, setZones] = useState([]); // Estado para almacenar las zonas
  const [zonesModalVisible, setZonesModalVisible] = useState(false);
  const [filtroSeleccionadoHora, setFiltroSeleccionadoHora] = useState(null);
  const [idlocalidad, setIdlocalidad] = useState("")

  console.log('token desde barra servicios: ', token);

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterPress = (filtro, tipo) => {
    if(tipo == "Limpiar"){
      const nuevoFiltro = null
      setFiltroSeleccionadoHora(nuevoFiltro);
      onFilterChangeHora(nuevoFiltro, "Limpiar");
      setZonesModalVisible(false)
    } else if(tipo == "24HS"){
      const nuevoFiltro = filtro === filtroSeleccionadoHora ? null : filtro;
      setFiltroSeleccionadoHora(nuevoFiltro);
      onFilterChangeHora(nuevoFiltro, "24HS");
    }else{
      const nuevoFiltro = filtro 
      setFiltroSeleccionadoHora(nuevoFiltro);
      onFilterChangeHora(nuevoFiltro, "Localidad")
      setZonesModalVisible(false)
    }
  };

  const handleFilterLocalidad = (id) => {
    console.log(id);
    // setZonesModalVisible(false)
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('https://buddy-app2.loca.lt/parameters/locality', {
        headers: {
          'auth-token': token, // Agrega el token de autenticación en el encabezado
        },
      });
      if (response && response.data) {
        setZones(response.data); // Almacena las zonas en el estado
      } else {
        console.log('No se encontraron zonas.');
      }
    } catch (error) {
      console.error('Error al obtener las zonas:', error);
    }finally{
      setZonesModalVisible(true); // Abre el modal con las zonas
    }
  };
  

  return (
    <View>
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={[{ flexDirection: "row" }, styles.filtrosExtra]}>
            <Image
              source={require("../../Imagenes/filtrar.png")}
              style={styles.iconoFiltro}
            />
            <TouchableOpacity onPress={fetchZones}>
              <Text>Zona</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ flexDirection: "row" }, styles.filtrosExtra]}>
            <Image
              source={require("../../Imagenes/filtrar.png")}
              style={styles.iconoFiltro}
            />
            <TouchableOpacity onPress={() => handleFilterPress(1, "24HS")} style={filtroSeleccionadoHora === 1}>
              <Text>Abierto 24hs</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={[styles.container, { flexDirection: 'row' }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity onPress={handleToggleFilters}>
          <Image
            source={require("../../Imagenes/filtros.png")}
            style={styles.imagenFiltrar}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={zonesModalVisible}
        onRequestClose={() => setZonesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccione una zona:</Text>
            <FlatList
              data={zones.localities}
              renderItem={({ item }) => (
                <View key={item.idLocality}>
                  <TouchableOpacity onPress={()=> {handleFilterPress(item.idLocality, "Localidad")}}>
                    <Text style={styles.zoneItem}>
                      {item.localityName}
                    </Text>
                  </TouchableOpacity>
                </View>
                
              )}
              keyExtractor={(item) => item.idLocality}
            />
          <TouchableOpacity style={styles.closeButton} onPress={() => handleFilterPress(null, "Limpiar")}>
            <Text style={[styles.closeButtonText, {padding:1}]}>Limpiar</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },

  modalContent: {
    backgroundColor: '#fff', // Fondo blanco para el contenido del modal
    padding: 20, // Espaciado interno para el contenido del modal
    borderRadius: 10, // Bordes redondeados
    height: "35%",
  },

 zoneItem: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },

  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  
  container: {
    padding: 5,
    marginTop: 15,
  },
  searchInput: {
    height: 40,
    width: '88%',
    borderColor: '#EEE9E9',
    backgroundColor: '#EEE9E9',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 5,
  },
  imagenFiltrar: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  iconoFiltro: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  filtrosExtra: {
    backgroundColor: "#DDC4B8",
    marginLeft: 10,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
    width: 125,
    height: 25,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 2,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#DDC4B8",
    width: "30%",
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    marginLeft: 0,
    padding: 2,
    elevation: 5,
    marginLeft: 50,
  },
});

export default SearchBarExample;
