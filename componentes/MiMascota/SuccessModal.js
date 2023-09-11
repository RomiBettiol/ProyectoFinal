import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function SuccessModal({ visible, onClose, message}) {
  
  
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalText}>¡ {message} !</Text>
            <TouchableOpacity style={styles.botonesEditar} onPress={onClose}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
      },
     
      modalText:{
        fontSize: 16,
        padding:5,
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
