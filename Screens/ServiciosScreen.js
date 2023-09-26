import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HeaderScreen from '../componentes/HeaderScreen';
import axios from 'axios'; // Importar Axios
import { useRoute } from '@react-navigation/native'; 
import BotonesFiltroServicios from '../componentes/Serivicios/BotonesFiltroServicios';
import BarraBusquedaServicios from '../componentes/Serivicios/BarraBusquedaServicios';

export default function ServiciosScreen() {
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;
  const [servicios, setServicios] = useState([]);

  console.log('Servicios: ', token);

  useEffect(() => {
    // Configurar un objeto de opciones que incluye el encabezado de autorización
    const config = {
      headers: {
        'auth-token': token,
      },
    };

    // Realizar la solicitud GET al backend cuando el componente se monta
    axios.get('https://buddy-app2.loca.lt/services/service/', config)
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los servicios:', error);
      });
  }, []);

  return (
    <View>
      <HeaderScreen />
      <View style={styles.contenedor1}>
        <Text style={styles.titulo}>Servicios para tu mascota</Text>
        <BotonesFiltroServicios />
        <BarraBusquedaServicios />
        {/* Mostrar la lista de servicios */}
        {servicios.map((servicio) => (
          <View key={servicio.idService}>
            <Text>{servicio.serviceTitle}</Text>
            <Text>{servicio.serviceDescription}</Text>
            {/* Puedes mostrar más detalles del servicio aquí */}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 5,
    fontSize: 22,
    marginLeft: 15,
    marginBottom: 20,
  },
  contenedor1: {
    paddingTop: 10,
  },
});
