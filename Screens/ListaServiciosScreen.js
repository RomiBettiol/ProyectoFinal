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

const ListaServiciosScreen = () => {
  const [services, setServices] = useState([]);
  const route = useRoute();
  const { token } = route.params;
  const [serviceId, setServiceId] = useState(null);
  const [serviceState, setServiceState] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isPageRefreshing, setPageRefreshing] = useState(false);
  const [isConfirming, setConfirming] = useState(false);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const response = await axios.get(
        "https://62ed-190-177-142-160.ngrok-free.app /services/service/every",
        config
      );

      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services data:", error);
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

  const handleConfirmation = async () => {
    if (!serviceId || !serviceState || isConfirming) {
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
      if (serviceState === "ACTIVO") {
        response = await axios.delete(
          `https://62ed-190-177-142-160.ngrok-free.app /services/service/${serviceId}`,
          config
        );
      } else {
        response = await axios.post(
          `https://62ed-190-177-142-160.ngrok-free.app /services/serviceState/changeState/${serviceId}/ACTIVO`,
          {},
          config
        );
      }

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error al cambiar de estado al servicio:", error);
    } finally {
      setTimeout(() => {
        setConfirming(false);
        setConfirmationModalVisible(false);
        setServiceId(null);
      }, 2000);
    }
  };

  const renderItem = ({ item }) => {
    const isServiceActive = item.serviceStateName === "ACTIVO";
    const imagenes = JSON.parse(item.images);

    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItem}>
          <Image source={{ uri: imagenes[0] }} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.serviceTitle}</Text>
            <Text style={styles.serviceInfoText}>{item.emailService}</Text>
            <Text style={styles.serviceInfoText}>
              Estado: {item.serviceStateName}
            </Text>
            <Text style={styles.serviceInfoText}>
              Tipo: {item.serviceTypeName}{" "}
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setServiceState(item.serviceStateName);
                setServiceId(item.idService);
                setConfirmationModalVisible(true);
              }}
            >
              <Text style={styles.optionButtonText}>
                {isServiceActive ? "Dar de Baja" : "Activar Servicio"}
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
      <Text style={styles.title}>Lista de Servicios</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.idService.toString()}
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
              {serviceState === "ACTIVO"
                ? "¿Estás seguro de que quieres dar de baja a este servicio?"
                : "¿Estás seguro de que quieres activar a este servicio?"}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
    fontWeight: "bold",
    color: "#333",
  },
  serviceItem: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    marginHorizontal: 15,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },
  serviceItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  serviceInfoText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: "#FFB988",
    padding: 5,
    marginHorizontal: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#FFB988",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ListaServiciosScreen;
