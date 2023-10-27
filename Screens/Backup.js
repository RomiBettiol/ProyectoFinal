import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute } from "@react-navigation/native";

export default function Backup({ navigation }) {
  const route = useRoute();
  const { token } = route.params;

  const handleButtonPress = () => {
    // Abre la URL en el navegador del dispositivo cuando se hace clic en el botón
    Linking.openURL("https://www.cleardb.com/login.view");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderScreen />
      <Text style={styles.titulo}>BackUp</Text>
      <Text style={styles.introduccion}>
        Ingresa al siguiente botón y sigue los pasos para obtener los backUp necesarios
        siendo usuario administrador:
      </Text>
      <TouchableOpacity onPress={handleButtonPress} style={styles.boton}>
        <Text style={styles.botonTexto}>Ir a ClearDB</Text>
      </TouchableOpacity>
      <Text style={styles.paso}>
        Paso 1: Ingresar al link: https://id.heroku.com/login
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textoNegro}>
          Para obtener las credenciales, se debe consultar a los administradores
          de la aplicación.
        </Text>
      </View>

      <Image
        source={require("../Imagenes/Backup-1.png")}
        style={styles.imagenPaso}
      />
      <Text style={styles.paso}>Paso 2: Elegir la opción buddy-bd</Text>
      <Image
        source={require("../Imagenes/Backup-2.png")}
        style={styles.imagenPaso}
      />
      <Text style={styles.paso}>Paso 3: Ingresar a ClearDB MySQL</Text>
      <Text style={styles.aclaracion}>
        La opción que se debe elegir está subrayada en rojo.
      </Text>
      <Image
        source={require("../Imagenes/Backup-3.png")}
        style={styles.imagenPaso}
      />
      <Text style={styles.paso}>
        Paso 4: Elegir la opción heroku_e82a625715a153f
      </Text>
      <Text style={styles.aclaracion}>
        La opción que se debe elegir está subrayada en rojo.
      </Text>
      <Image
        source={require("../Imagenes/Backup-4.png")}
        style={styles.imagenPaso}
      />
      <Text style={styles.paso}>
        Paso 5: Ingresar a la pestaña Backups & jobs
      </Text>
      <Text style={styles.aclaracion}>
        La opción que se debe elegir está subrayada en rojo.
      </Text>
      <Image
        source={require("../Imagenes/Backup-5.png")}
        style={styles.imagenPaso}
      />
      <Text style={styles.paso}>
        Paso 6: En esta pantalla verá la lista de backUps existentes, se podrá
        elegir la opción de exportar o de reestablecer el último backUp.{" "}
      </Text>
      <Image
        source={require("../Imagenes/Backup-6.png")}
        style={styles.imagenPaso}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 5,
  },
  introduccion: {
    fontSize: 16,
    padding: 5,
    margin: 10,
    marginLeft: 35,
  },
  paso: {
    marginLeft: 35,
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
  textoNegro: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 35,
    marginRight: 10,
    marginTop: 10,
  },
  textoNormal: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 10,
  },
  imagenPaso: {
    width: "95%",
    height: 300,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 20,
  },
  aclaracion: {
    marginLeft: 35,
    padding: 5,
  },
  boton: {
    backgroundColor: "#DDC4B8", // Color de fondo del botón
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
  },
  botonTexto: {
    color: "black", // Color del texto del botón
    fontSize: 18,
  },
});
