import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const ListaValoresZona = ({ setSelectedLocality }) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneOptions, setZoneOptions] = useState([]);

  const getZonas = () => {
    axios
      .get('http://buddy-app.loca.lt/parameters/locality/', {
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

  useEffect(() => {
    getZonas();
  }, []);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={zoneOptions}
      search
      maxHeight={300}
      labelField="localityName"
      valueField="localityName"
      placeholder="Zona"
      searchPlaceholder="Buscar"
      value={selectedZone}
      onChange={(item) => {
        setSelectedZone(item); // Guardar el objeto completo de la zona seleccionada
        setSelectedLocality(item.idLocality); // Llamar a setSelectedLocality con el ID de la zona
      }}
    />
  );
};

export default ListaValoresZona;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#EEE9E9',
    padding: 25,
    borderRadius: 40,
    width: '93%',
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 16,
  },
});
