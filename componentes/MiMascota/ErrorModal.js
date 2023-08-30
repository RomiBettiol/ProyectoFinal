import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function ErrorModal({ visible, errorMessage, onClose }) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity onPress={onClose} style={[styles.confirmButton, styles.confirmButtonCancel]}>
            <Text style={styles.confirmButtonText}>Cerrar</Text>
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
      confirmButton: {
        flex: 1,
        backgroundColor: '#FFB984',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
      },
      confirmButtonAccept: {
        marginRight: 5,
      },
      confirmButtonCancel: {
        marginLeft: 5,
      },
      confirmButtonText: {
        fontSize: 16,
      },
});
