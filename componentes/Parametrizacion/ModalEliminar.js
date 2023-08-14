import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import axios from 'axios';

const ModalEliminar = ({ isVisible, onClose }) => {

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tituloModal}>¿Estas seguro?</Text>
          <View style={[{ flexDirection: 'row' }, styles.botonesDecidir]}>
            <TouchableOpacity style={styles.botonesEditar}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text>Cancelar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.6, // 60% del ancho de la pantalla
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  tituloModal: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputLocalities: {
    backgroundColor: '#EEE9E9',
    width: '70%',
    height: 32,
    borderRadius: 100,
    textAlign: 'center',
    marginLeft: 20,
  },
  valorTexto: {
    marginTop: 5,
  },
  valorFiltro: {
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

export default ModalEliminar;
