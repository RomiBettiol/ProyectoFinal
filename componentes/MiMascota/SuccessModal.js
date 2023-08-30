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
        <Text style={styles.modalText}>! {message} ¡</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}> Cerrar</Text>
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
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
      },
      confirmButtons: {
        flexDirection: 'row',
        marginTop: 10,
      },
      modalText:{
        fontSize: 16,
        padding:5,
      },
      confirmButton: {
        flex: 1,
        backgroundColor: '#FFB984',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
      },
      closeButton: {
        flex: 1,
        backgroundColor: '#FFB984',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 5,
        
      },
      confirmButtonAccept: {
        marginRight: 5,
      },
      closeButtonText: {
        marginLeft: 5,
        color: 'black',
      },
      confirmButtonText: {
        fontSize: 16,
      },
});
