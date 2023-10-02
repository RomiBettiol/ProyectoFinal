import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function InicioScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth-token");

        if (token !== null) {
          const response = await axios.get(
            ` https://romibettiol.loca.lt/security/auth/expire`,
            { headers: { "auth-token": token } }
          );
          if (response.status === 200) {
            navigation.navigate("HomeScreen", { token });
          } else {
            navigation.navigate("InicioScreen");
          }
        } else {
          navigation.navigate("InicioScreen");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    verificarAuthToken();
  }, []);

  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : null /* No muestra nada cuando isLoading es false */
      }
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
