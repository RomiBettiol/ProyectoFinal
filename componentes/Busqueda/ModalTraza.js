import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function ModalTraza({ navigation }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        console.log('Ubicación actual:', location.coords.latitude, location.coords.longitude);
        setLocation(location);
      } catch (error) {
        console.error(error);
      }
    };

    getLocationAsync();
  }, []);

  const handleAgregarUbicacion = () => {
    // Cerrar el modal y volver a la pantalla anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../Imagenes/logo2.png')}
          style={styles.logo}
        />
        <Text style={styles.textoTitulo}>¡Agrega una ubicación!</Text>
      </View>
      {location && (
        <View style={{ flex: 1, margin: 5 }}>
          <View style={styles.mapa}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Mi ubicación"
                description="Estoy aquí"
              />
            </MapView>
          </View>
          <TouchableOpacity style={styles.botonAgregarUbicacion} onPress={handleAgregarUbicacion}>
            <Text>Agregar ubicación</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDC4B8',
  },
  textoTitulo: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 80,
  },
  mapa: {
    flex: 1,
    margin: 5,
    elevation: 5,
  },
  botonAgregarUbicacion: {
    margin: 10,
    backgroundColor: '#FFB984',
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '60%',
    elevation: 5,
  },
  logo: {
    height: 80,
    width: 80,
    marginTop: 50,
  },
});
