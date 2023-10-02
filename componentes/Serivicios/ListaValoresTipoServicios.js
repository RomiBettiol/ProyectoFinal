import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ListaValoresTipoServicios = ({ selectedServiceType, setSelectedServiceType, setSelectedServiceTypeId }) => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);

  useEffect(() => {
    axios
      .get('https://romibettiol.loca.lt/parameters/serviceType')
      .then((response) => {
        console.log('Tipos de servicio exitosos:', response.data);
        setServiceTypeOptions(response.data.serviceTypes);
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setServiceTypeOptions([]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {serviceTypeOptions.map((serviceTypeOption, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedServiceType === serviceTypeOption.serviceTypeName && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedServiceType(serviceTypeOption.serviceTypeName);
              setSelectedServiceTypeId(serviceTypeOption.idServiceType); // Agrega el ID al estado
            }}
          >
            <Text
              style={[
                styles.optionText,
                selectedServiceType === serviceTypeOption.serviceTypeName && styles.selectedOptionText,
              ]}
            >
              {serviceTypeOption.serviceTypeName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDC4B8',
    borderRadius: 5,
    margin: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#DDC4B8',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default ListaValoresTipoServicios;
