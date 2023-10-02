import React from "react";
import { View, Text, FlatList } from "react-native";

const ListaServicios = ({ serviciosFiltrados }) => {
  return (
    <View>
      <FlatList
        data={serviciosFiltrados}
        keyExtractor={(servicio) => servicio.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "gray" }}
          >
            <Text>{item.nombre}</Text>
            <Text>{item.categoria}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListaServicios;
