import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function InicioScreen() {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const route = useRoute();
  const { token } = route.params;

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const roles = await axios.get(
        "https://romibettiol.loca.lt/security/role/every",
        config
      );

      const permisos = await axios.get(
        "https://romibettiol.loca.lt/security/permission/",
        config
      );

      setRoles(roles.data);
      setPermisos(permisos.data);
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRoles = ({ item }) => {
    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItem}>
          <View style={styles.userInfo}>
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
                {isUserActive ? "Dar de Baja" : "Activar Rol"}
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
      <Text style={styles.titulo}>Roles</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.idRole.toString()}
        renderItem={renderRoles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
