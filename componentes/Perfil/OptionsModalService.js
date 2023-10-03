import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionModalService = ({ visible, onClose, onEdit, onDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.optionButton} onPress={onEdit}>
            <Text style={styles.optionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
            <Text style={styles.optionText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.optionText}>Cancelar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default OptionModalService;
