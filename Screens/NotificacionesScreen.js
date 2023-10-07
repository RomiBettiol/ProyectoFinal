import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'; // Importa Axios
import HeaderScreen from '../componentes/HeaderScreen';

export default function NotificacionesScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Función para hacer la solicitud GET con Axios
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://romibettiol.loca.lt/reports/notification/', {
          headers: {
            'auth-token': token, 
          },
        });

        if (response.status === 200) {
          setNotifications(response.data.notifications); // Actualiza el estado con las notificaciones obtenidas
        } else {
          console.error('Error al obtener las notificaciones');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    // Llama a la función para hacer la solicitud cuando el componente se monta
    fetchNotifications();
  }, [token]); // La solicitud se hará cada vez que el token cambie

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <Text style={styles.titulo}>Notificaciones</Text>
      <ScrollView>
        {notifications.map(notification => (
          <View key={notification.idNotification}>
            <Text>{notification.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 5,
  },
});
