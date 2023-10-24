import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import { format } from "date-fns";

export default function ModalTraza({ navigation, route }) {
  const [initialLocation, setInitialLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapViewRef = useRef(null); // Agregar una referencia al MapView
  const { idPublicationSearch, token, userNamePublicacion } = route.params;
  const [traces, setTraces] = useState([]);
  const [selectedTrace, setSelectedTrace] = useState(null);
  const [user, setUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [userNameTraza, setUserNameTraza] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (traces.length > 0 && user && initialLocation) {
      // Inicializa el mapa aquí
      setMapRegion({
        ...initialLocation,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      setMarkers(
        traces.map((trace) => ({
          latitude: trace.latitude,
          longitude: trace.longitude,
        }))
      );
    }
  }, [traces, user, initialLocation]);

  console.log("ModalTraza: ", token);
  console.log("userName: ", userNamePublicacion);

  //Trae info del usuario
  const fetchNombre = () => {
    axios
      .get(`  https://buddy-app2.loca.lt/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIdUser(response.data[0].idUser);
        setUserNameTraza(response.data[0].userName);

        // Mueve cualquier lógica que dependa de los datos del usuario aquí dentro
        console.log("userModal: ", user);
        console.log("idUserModal: ", idUser);
        console.log("userNameModal: ", userNameTraza);

        // Luego puedes usar idUser como desees en tu componente.
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchNombre();
  }, [token, idUser, initialLocation]);

  console.log("userModal2: ", user);
  console.log("idUserModal2: ", idUser);
  console.log("userNameModal2: ", userNameTraza);

  const fetchTraces = async () => {
    try {
      const response = await axios.get(
        `  https://buddy-app2.loca.lt/publications/trace/${idPublicationSearch}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (response.data.traces) {
        setTraces(response.data.traces);

        // Agrega un console.log para mostrar las trazas en la consola
        console.log("Trazas obtenidas:", response.data.traces);
      }
    } catch (error) {
      console.error("Error fetching traces:", error);
    }
  };

  useEffect(() => {
    fetchTraces();
    const getLocationAsync = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Permiso de ubicación denegado");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const initialCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log("Ubicación actual:", initialCoords);
        setInitialLocation(initialCoords);
        setSelectedLocation(initialCoords); // Inicialmente, establece la ubicación seleccionada en la ubicación actual
        console.log("ID de la publicación: ", idPublicationSearch);
      } catch (error) {
        console.error(error);
      }
    };

    getLocationAsync();
  }, [idPublicationSearch]);

  const onDeleteTrace = async () => {
    console.log("información:", selectedTrace.idTrace);
    try {
      const response = await axios.delete(
        `  https://buddy-app2.loca.lt/publications/trace/${selectedTrace.idTrace}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      // Check the response and handle it accordingly
      console.log("Response from delete request:", response.data);

      // If the deletion was successful, you can update the UI or take any other actions as needed

      // Close the modal and navigate back
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting trace:", error);
    }
  };

  const handleAgregarUbicacion = async () => {
    let locationToSend = selectedLocation || initialLocation; // Utiliza la ubicación seleccionada si está definida, de lo contrario, utiliza la ubicación inicial

    // Verificar si se ha seleccionado una ubicación diferente a la inicial
    if (locationToSend) {
      // Puedes utilizar locationToSend para hacer algo con la ubicación seleccionada o inicial
      console.log("Ubicación a enviar:", locationToSend);

      // Crear un objeto con los datos que deseas enviar en la solicitud POST
      const data = {
        latitude: locationToSend.latitude,
        longitude: locationToSend.longitude,
        idPublicationSearch: idPublicationSearch, // Asegúrate de que idPublicationSearch esté definido
      };

      try {
        // Realizar la solicitud POST
        const response = await axios.post(
          "https://buddy-app2.loca.lt/publications/trace/",
          data,
          {
            headers: {
              "auth-token": token, // Asegúrate de que token esté definido
            },
          }
        );

        // Comprobar la respuesta y realizar acciones adicionales si es necesario
        console.log("Respuesta del servidor:", response.data);

        // Cerrar el modal y volver a la pantalla anterior
        navigation.goBack();
      } catch (error) {
        console.error("Error al agregar ubicación:", error);
      }
    } else {
      // Mostrar un mensaje de error si no se ha seleccionado una ubicación diferente a la inicial
      console.warn(
        "Selecciona una ubicación diferente a la ubicación actual antes de agregarla."
      );
    }
  };

  const handleMapPress = (event) => {
    // Actualizar la ubicación seleccionada al hacer clic en el mapa
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handlePlaceSelected = (data, details = null) => {
    // 'data' contiene la información de la dirección seleccionada
    const { location } = details.geometry;
    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
    });

    // Mover el mapa a la ubicación seleccionada
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  console.log("id de la publicación1: ", idPublicationSearch);

  const sortedTraces = [...traces].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Crea un array de coordenadas a partir de las trazas ordenadas
  const coordinates = sortedTraces.map((trace) => ({
    latitude: trace.latitude,
    longitude: trace.longitude,
  }));

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../Imagenes/logo2.png")}
          style={styles.logo}
        />
        <Text style={styles.textoTitulo}>¡Agregá una ubicación!</Text>
      </View>
      <Text style={styles.informacionModal}>
        Si viste una mascota perdida, no dudes en indicar el lugar en el mapa.
        ¡Haz click en el lugar que la viste!
      </Text>
      {initialLocation && (
        <View style={styles.mapaContainer}>
          <View style={styles.mapa}>
            <MapView
              ref={mapViewRef} // Asignar la referencia al MapView
              style={{ flex: 1 }}
              initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              onPress={handleMapPress} // Manejar el clic en el mapa
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Ubicación seleccionada"
                  description="Ubicación seleccionada"
                />
              )}

              {/* Agrega una línea que conecte las trazas */}
              <Polyline
                coordinates={coordinates}
                strokeColor="#FFB984" // Cambia el color de la línea según tus preferencias
                strokeWidth={2} // Ancho de la línea
              />

              {sortedTraces.map((trace) => (
                <Marker
                  key={trace.idTrace}
                  coordinate={{
                    latitude: trace.latitude,
                    longitude: trace.longitude,
                  }}
                  title={`Fecha: ${format(
                    new Date(trace.createdAt),
                    "dd/MM/yyyy"
                  )}`}
                  onPress={() => setSelectedTrace(trace)}
                />
              ))}
            </MapView>
          </View>
          <GooglePlacesAutocomplete
            placeholder="Buscar dirección"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={(row) => row.description}
            onPress={handlePlaceSelected} // Manejar la selección de lugares
            query={{
              key: "AIzaSyC14cgWnZc4xRfWmML_l5Xo-S8pQ3ihQLw",
              language: "es", // Puedes cambiar el idioma según tus preferencias
            }}
            styles={{
              textInputContainer: {
                width: "100%",
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.botonAgregarUbicacion}
              onPress={handleAgregarUbicacion}
            >
              <Text>Agregar traza</Text>
            </TouchableOpacity>
            {userNameTraza === userNamePublicacion && (
              <TouchableOpacity
                style={styles.botonEliminarTraza}
                onPress={onDeleteTrace}
              >
                <Text>Eliminar traza</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDC4B8",
  },
  textoTitulo: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 80,
  },
  mapa: {
    flex: 5,
    margin: 5,
    elevation: 5,
  },
  botonAgregarUbicacion: {
    margin: 10,
    backgroundColor: "#FFB984",
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "5%",
    elevation: 5,
  },
  botonEliminarTraza: {
    margin: 10,
    backgroundColor: "#EF491F",
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    marginLeft: "15%",
  },
  logo: {
    height: 80,
    width: 80,
    marginTop: 50,
  },
  mapaContainer: {
    flex: 1, // Asegúrate de que mapaContainer tenga flex: 1
    margin: 5,
  },
  informacionModal: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});
