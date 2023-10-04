import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionModalService = ({ visible, onClose, onEdit, onDelete, route }) => {
  const { idService } = route.params;
  const navigation = useNavigation();

  console.log('IdServicio: ', idService);
  
  return (
    <Modal>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.opcionesModal}
              >
                <Text>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
              >
                <Text>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
              >
                <Text>Ver publicación</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarModal}
              >
                <Text>Cancelar</Text>
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
