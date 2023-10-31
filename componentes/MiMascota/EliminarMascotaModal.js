import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import axios from "axios";

const EliminarMascotaModal = ({
  visible,
  onCancel,
  onConfirm,
  mascotaId,
  token,
}) => {
  const eliminarMascota = async () => {
    try {
      await axios.delete(
        `https://37e1-186-12-32-189.ngrok-free.app/mypet/pet/${mascotaId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      onConfirm();
    } catch (error) {
      console.error("Error eliminando la mascota:", error);
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>¿Estás seguro de que deseas eliminarlo?</Text>
          <View style={styles.confirmButtons}>
            <TouchableOpacity
              onPress={eliminarMascota}
              style={[styles.confirmButton, styles.confirmButtonAccept]}
            >
              <Text style={styles.confirmButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.confirmButton, styles.confirmButtonCancel]}
            >
              <Text style={styles.confirmButtonText}>Cancelar</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  confirmButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#FFB984",
    alignItems: "center",
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

export default EliminarMascotaModal;
