import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const BotonesFiltrosServicios = ({
  categorias,
  filtroSeleccionado,
  onFiltroChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      {categorias.map((categoria) => (
        <TouchableOpacity
          key={categoria}
          onPress={() => onFiltroChange(categoria)}
          style={[
            styles.filterButton,
            {
              backgroundColor:
                filtroSeleccionado === categoria ? "#DDC4B8" : "#f0f0f0",
            },
          ]}
        >
          <Image
            // source={require("../../Imagenes/.png")}
            style={styles.imagenFiltro}
          />
          <Text style={styles.filterButtonText}>{categoria}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BotonesFiltrosServicios;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    elevation: 7,
  },
  filterButtonText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  imagenFiltro: {
    width: 60,
    height: 60,
    margin: 5,
  },
});
