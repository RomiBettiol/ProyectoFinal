import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import HeaderScreen from "../componentes/HeaderScreen";

export default function NotificacionesScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          "https://buddy-app2.loca.lt/reports/notification/",
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (response.status === 200) {
          setNotifications(response.data.notifications);
          console.log(response.data);
        } else {
          console.error("Error al obtener las notificaciones");
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setisLoading(false);
      }
    };

    fetchNotifications();
    setNotifications([]);
  }, [token]);

  const countUnreadNotifications = () => {
    return notifications.filter((notification) => !notification.readed).length;
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString(undefined, options)
      .replace(/\//g, "-");
  };

  const unreadNotificationsCount = countUnreadNotifications();
  console.log("Cant. de notificaciones: ", unreadNotificationsCount);
  console.log(notifications);

  return (
    <View style={styles.container}>
      <HeaderScreen
        token={token}
        unreadNotificationsCount={unreadNotificationsCount}
      />
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificaciones</Text>
        {countUnreadNotifications() > 0 && (
          <View style={styles.circuloRojoContainer}>
            <View style={styles.circuloRojo}>
              <Text style={styles.textoCirculo}>
                {countUnreadNotifications()}
              </Text>
            </View>
          </View>
        )}
      </View>
      {notifications.length == 0 && (
        <Text style={{ marginLeft: 30, marginTop: 10, fontSize: 20 }}>
          No hay notificaciones
        </Text>
      )}
      <ScrollView>
        {notifications.map((notification) => (
          <View
            key={notification.idNotification}
            style={styles.contenedorNotificacion}
          >
            <View style={styles.contenidoNotificacion}>
              <Text style={styles.textoNotificacion}>
                {notification.content}
              </Text>
              {!notification.readed && <View style={styles.circuloRojo} />}
              <Text style={styles.textoFecha}>
                {formatDate(notification.createdAt)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal visible={isLoading} transparent>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  titulo: {
    fontSize: 25,
    marginRight: 10,
  },
  circuloRojoContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFB984",
    justifyContent: "center",
    alignItems: "center",
  },
  circuloRojo: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: "#FFB984",
    justifyContent: "center",
    alignItems: "center",
  },
  textoCirculo: {
    color: "black",
    fontSize: 14,
  },
  contenedorNotificacion: {
    marginLeft: 30,
    marginTop: 25,
    width: "80%",
  },
  textoNotificacion: {
    fontSize: 14,
    borderBottomWidth: 0.5,
    padding: 5,
    borderBottomColor: "gray",
    textAlign: "justify",
  },
  contenidoNotificacion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textoFecha: {
    fontSize: 12,
    color: "gray",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
