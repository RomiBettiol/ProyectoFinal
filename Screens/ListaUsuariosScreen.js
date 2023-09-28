import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import MessiImage from "../Imagenes/MESSI.jpg";
import ModifyRoleModal from "../componentes/ModifyRoleModal";

const ListaUsuariosScreen = () => {
  const [users, setUsers] = useState([]);
  const route = useRoute();
  const { token } = route.params;
  const [userId, setUserId] = useState(null);
  const [userState, setUserState] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isPageRefreshing, setPageRefreshing] = useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const [isModifyRoleModalVisible, setModifyRoleModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const response = await axios.get(
        "https://2f6b-181-91-230-36.ngrok-free.app/security/user/every",
        config
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isPageRefreshing) {
        fetchData();
        setPageRefreshing(false); // Restablece el estado después de la recarga
      }
    }, [isPageRefreshing])
  );

  const handlePageRefresh = () => {
    setPageRefreshing(true);
  };

  const showModifyRoleModal = (selectedUserRole) => {
    setSelectedRole(selectedUserRole);
    setModifyRoleModalVisible(true);
  };

  const closeModifyRoleModal = () => {
    setModifyRoleModalVisible(false);
  };

  const handleModifyRole = async (selectedRole) => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      await axios.post(
        `https://2f6b-181-91-230-36.ngrok-free.app/security/user/changeRole/${userId}/${selectedRole}`,
        {},
        config
      );

      closeModifyRoleModal();
      handlePageRefresh();
    } catch (error) {
      console.error("Error al cambiar de estado al usuario:", error);
    }
  };

  const handleConfirmation = async () => {
    if (!userId || !userState || isConfirming) {
      return;
    }

    setConfirming(true);

    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      let response;

      if (userState === "ACTIVO") {
        response = await axios.delete(
          `https://2f6b-181-91-230-36.ngrok-free.app/security/user/${userId}`,
          config
        );
      } else {
        response = await axios.post(
          `https://2f6b-181-91-230-36.ngrok-free.app/security/user/changeState/${userId}/ACTIVO`,
          {},
          config
        );
      }

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }

      setTimeout(() => {
        setConfirming(false);
        setConfirmationModalVisible(false);
        setUserId(null);
      }, 2000);
    } catch (error) {
      console.error("Error al cambiar de estado al usuario:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isUserActive = item.userStateName === "ACTIVO";

    return (
      <View style={styles.userItemContainer}>
        <View style={styles.userItem}>
          <Image source={MessiImage} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.userInfoText}>{item.mail}</Text>
            <Text style={styles.userInfoText}>
              Estado: {item.userStateName}
            </Text>
            <Text style={styles.userInfoText}>Rol: {item.roleName}</Text>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setUserId(item.idUser);
                showModifyRoleModal(item.roleName);
              }}
            >
              <Text style={styles.optionButtonText}>Modificar Rol</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setUserState(item.userStateName);
                setUserId(item.idUser);
                setConfirmationModalVisible(true);
              }}
            >
              <Text style={styles.optionButtonText}>
                {isUserActive ? "Dar de Baja" : "Activar Usuario"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <Text style={styles.titulo}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.idUser.toString()}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={() => {
          setConfirmationModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {userState === "ACTIVO"
                ? "¿Estás seguro de que quieres dar de baja a este usuario?"
                : "¿Estás seguro de que quieres activar a este usuario?"}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setConfirmationModalVisible(false)}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmation}
                disabled={isConfirming}
              >
                <Text
                  style={[
                    styles.confirmButton,
                    isConfirming && styles.disabledButton,
                  ]}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={responseMessage !== ""}
        onRequestClose={() => {
          setResponseMessage("");
          handlePageRefresh();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{responseMessage}</Text>
            <TouchableOpacity
              onPress={() => {
                setResponseMessage("");
                handlePageRefresh();
              }}
            >
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ModifyRoleModal
        isVisible={isModifyRoleModalVisible}
        onClose={closeModifyRoleModal}
        onConfirm={handleModifyRole}
        selectedUserRole={selectedRole}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 5,
  },
  userItem: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 1,
    marginHorizontal: 5,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  userItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfoText: {
    fontSize: 14,
    color: "#888",
  },
  optionsContainer: {
    flexDirection: "row",
  },
  optionButton: {
    backgroundColor: "#FFB988",
    padding: 4,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  optionButtonText: {
    fontSize: 13,
    color: "#fff",
  },
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
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#FFB988",
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    color: "white",
  },
  closeButton: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});

export default ListaUsuariosScreen;
