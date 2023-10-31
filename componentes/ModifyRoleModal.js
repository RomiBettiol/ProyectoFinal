import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ModifyRoleModal = ({
  isVisible,
  onClose,
  onConfirm,
  selectedUserRole,
}) => {
  const [selectedRole, setSelectedRole] = useState(""); // Estado para almacenar el rol seleccionado
  const [roles, setRoles] = useState([]);
  const [isModalVisible, setModalVisible] = useState(isVisible);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("auth-token");

      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const response = await axios.get(
        "https://37e1-186-12-32-189.ngrok-free.app/security/role/",
        config
      );

      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setModalVisible(isVisible);
    setSelectedRole(selectedUserRole);
  }, [isVisible, selectedUserRole]);

  const rolesToExclude = ["REFUGIO", "VETERINARIA", "PETSHOP"];

  const renderItem = ({ item }) => {
    // if (rolesToExclude.includes(item.roleName)) {
    //   // No renderizar el elemento
    //   return null;
    // }

    return (
      <TouchableOpacity
        style={[
          styles.optionItem,
          item.roleName === selectedRole && styles.selectedOption,
        ]}
        onPress={() => setSelectedRole(item.roleName)}
      >
        <Text
          style={[
            styles.optionText,
            item.roleName === selectedRole && styles.selectedOptionText,
          ]}
        >
          {item.roleName}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    setIsConfirming(true); // Establecer el estado como confirmación en progreso
    setTimeout(() => {
      // Simular un retraso de 2 segundos (puedes ajustar el tiempo según tus necesidades)
      onConfirm(selectedRole); // Confirmar la selección después del retraso
      setConfirmationMessage("Cambio exitoso"); // Establecer el mensaje de confirmación
      setConfirmationModalVisible(true); // Mostrar el modal de confirmación
      setIsConfirming(false); // Establecer el estado como confirmación completada
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  // Función para cerrar el modal de confirmación
  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
    onClose(); // Cerrar también el modal principal si es necesario
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Rol actual: {selectedUserRole}</Text>
          <Text style={styles.modalText}>Selecciona un nuevo rol:</Text>
          <FlatList
            data={roles}
            keyExtractor={(item) => item.idRole}
            renderItem={renderItem}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} disabled={isConfirming}>
              <Text style={styles.confirmButton}>
                {isConfirming ? "Confirmando..." : "Confirmar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModalContent}>
            <Text style={styles.confirmationModalText}>
              {confirmationMessage}
            </Text>
            <TouchableOpacity onPress={closeConfirmationModal}>
              <Text style={styles.confirmationModalButton}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: 380,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center", // Esto centra los botones horizontalmente
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: "white",
  },
  confirmButton: {
    backgroundColor: "#FFB988",
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  optionItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#CCCCCC",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#FFB988",
  },
  selectedOptionText: {
    color: "white",
  },
  confirmationModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  confirmationModalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  confirmationModalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  confirmationModalButton: {
    backgroundColor: "#FFB988",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});

export default ModifyRoleModal;
