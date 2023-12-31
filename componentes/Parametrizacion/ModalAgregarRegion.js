import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

const ModalAgregarRegion = ({ isVisible, onClose, onAdd }) => {
  const [regionName, setRegionName] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [showProvinceList, setShowProvinceList] = useState(false);

  useEffect(() => {
    axios
      .get('http://buddy-app.loca.lt/parameters/province')
      .then((response) => {
        setProvinces(response.data.provinces);
      })
      .catch((error) => {
        console.error('Error al obtener provincias:', error);
      });
  }, []);

  const handleAddRegion = () => {
    if (!regionName || !selectedProvinceId) {
      Alert.alert('Error', 'Por favor, ingresa el nombre de la región y selecciona una provincia.');
      return;
    }

    const newRegion = {
      regionName: regionName,
      idProvince: selectedProvinceId,
    };

    axios
      .post('http://buddy-app.loca.lt/parameters/region', newRegion)
      .then((response) => {
        onAdd(newRegion);
        setRegionName('');
        setSelectedProvinceId('');
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error en la solicitud POST:', error.response.data);
        } else {
          console.error('Error en la solicitud POST:', error.message);
        }
      });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tituloModal}>Agregar Región</Text>

          <View style={styles.valorFiltro}>
            <Text style={styles.valorTexto}>Nombre de la Región</Text>
            <TextInput
              style={styles.inputRegion}
              value={regionName}
              onChangeText={setRegionName}
            />
          </View>

          <View style={styles.valorFiltro}>
            <TouchableOpacity
              style={styles.inputPicker}
              onPress={() => setShowProvinceList(!showProvinceList)}
            >
              <Text>{selectedProvinceId ? provinces.find(province => province.idProvince === selectedProvinceId).provinceName : 'Selecciona una provincia'}</Text>
            </TouchableOpacity>
            {showProvinceList && (
              <ScrollView style={styles.provinceList}>
                {provinces.map(province => (
                  <TouchableOpacity
                    key={province.idProvince}
                    onPress={() => {
                      setSelectedProvinceId(province.idProvince);
                      setShowProvinceList(false);
                    }}
                  >
                    <Text>{province.provinceName}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <View style={styles.botonesDecidir}>
            <TouchableOpacity style={styles.botonesEditar} onPress={handleAddRegion}>
              <Text>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  tituloModal: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputRegion: {
    backgroundColor: '#EEE9E9',
    width: '100%',
    height: 32,
    borderRadius: 5,
    paddingLeft: 8,
  },
  valorTexto: {
    marginTop: 5,
    marginBottom: 5,
  },
  valorFiltro: {
    marginTop: 20,
  },
  inputPicker: {
    backgroundColor: '#EEE9E9',
    width: '100%',
    height: 32,
    borderRadius: 5,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  provinceList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginTop: 5,
  },
  botonesDecidir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonesEditar: {
    width: '40%',
    backgroundColor: 'red',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: '#FFB984',
  },
});

export default ModalAgregarRegion;
