import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useRoute } from "@react-navigation/native";
import axios from 'axios';

const SearchBarExample = ({ data, onSearch, onFilterChange }) => {
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [zones, setZones] = useState([]); // Estado para almacenar las zonas
  const [zonesModalVisible, setZonesModalVisible] = useState(false);

  console.log('token desde barra servicios: ', token);

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('https://romibettiol.loca.lt/parameters/locality', {
        headers: {
          'auth-token': token, // Agrega el token de autenticación en el encabezado
        },
      });
      if (response && response.data) {
        setZones(response.data); // Almacena las zonas en el estado
        setZonesModalVisible(true); // Abre el modal con las zonas
        console.log(response.data);
      } else {
        console.log('No se encontraron zonas.');
      }
    } catch (error) {
      console.error('Error al obtener las zonas:', error);
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
            <TouchableOpacity onPress={fetchZones}>
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
        token={token}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={zones}
            renderItem={({ item }) => <Text style={styles.zoneItem}>{item.localityName}</Text>}
            keyExtractor={(item) => item.idLocality}
          />
          <Text>ROMI</Text>
          <TouchableOpacity onPress={() => setZonesModalVisible(false)}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default SearchBarExample;
