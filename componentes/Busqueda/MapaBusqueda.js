import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

const MapaBusqueda = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825, // Latitud de ejemplo
    longitude: -122.4324, // Longitud de ejemplo
  });

  useEffect(() => {
    // Obtener la ubicación actual al montar el componente
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleMapPress = event => {
    // Manejar el evento de pulsación en el mapa para colocar el marcador
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCurrentLocation({ latitude, longitude });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Mostrar Ubicación</Text>
      </TouchableOpacity>
      
      <Modal isVisible={modalVisible}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation?.latitude || 0,
            longitude: currentLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              draggable
            />
          )}
        </MapView>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MapaBusqueda;
