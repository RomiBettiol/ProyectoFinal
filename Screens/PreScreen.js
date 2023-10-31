import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function InicioScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  const verificarAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("auth-token");

      if (token !== null) {
        const response = await axios.get(
          `https://buddy-app2.loca.lt/security/auth/expire`,
          { headers: { "auth-token": token } }
        );
        if (response.status === 200) {
          navigation.navigate("HomeScreen", { token });
        }
      } else {
        navigation.navigate("InicioScreen");
      }
    } catch (error) {
      navigation.navigate("InicioScreen");
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    const delay = 10000; // 10 segundos en milisegundos

    const timer = setTimeout(() => {
      verificarAuthToken();
    }, delay);

    // Asegúrate de limpiar el temporizador cuando el componente se desmonte o cuando el efecto se vuelva a ejecutar.
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../Imagenes/logo2.png")}
        style={{ width: 350, height: 350, marginBottom: 20 }}
      ></Image>
      <Text
        style={{
          marginBottom: 20,
          width: "70%",
          fontSize: 25,
          textAlign: "justify",
        }}
      >
        Actualmente, el uso de la aplicación solo está disponible en la
        provincia de Mendoza, Argentina. Próximamente se ampliará su
        disponibilidad para el resto del país.
      </Text>
      {
        isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : null /* No muestra nada cuando isLoading es false */
      }
      <Text>Cargando...</Text>
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
