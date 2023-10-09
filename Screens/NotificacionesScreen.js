import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import HeaderScreen from '../componentes/HeaderScreen';

export default function NotificacionesScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://romibettiol.loca.lt/reports/notification/', {
          headers: {
            'auth-token': token,
          },
        });

        if (response.status === 200) {
          setNotifications(response.data.notifications);
          console.log(response.data);
        } else {
          console.error('Error al obtener las notificaciones');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchNotifications();
  }, [token]);

  const countUnreadNotifications = () => {
    return notifications.filter(notification => !notification.readed).length;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options).replace(/\//g, '-');
  };

  const unreadNotificationsCount = countUnreadNotifications();
  console.log('Cant. de notificaciones: ', unreadNotificationsCount);
  console.log(notifications);

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} unreadNotificationsCount={unreadNotificationsCount} />
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificaciones</Text>
        {countUnreadNotifications() > 0 && (
          <View style={styles.circuloRojoContainer}>
            <View style={styles.circuloRojo}>
              <Text style={styles.textoCirculo}>{countUnreadNotifications()}</Text>
            </View>
          </View>
        )}
      </View>
      <ScrollView>
        {notifications.map(notification => (
          <View key={notification.idNotification} style={styles.contenedorNotificacion}>
            <View style={styles.contenidoNotificacion}>
              <Text style={styles.textoNotificacion}>{notification.content}</Text>
              {!notification.readed && <View style={styles.circuloRojo} />}
              <Text style={styles.textoFecha}>{formatDate(notification.createdAt)}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 10,
    marginTop: 10,
    marginLeft: 42,
  },
  titulo: {
    fontSize: 25,
    marginRight: 10,
  },
  circuloRojoContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFB984',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuloRojo: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: '#FFB984',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCirculo: {
    color: 'black',
    fontSize: 14,
  },
  contenedorNotificacion: {
    marginLeft: 40,
    marginTop: 25,
  },
  textoNotificacion: {
    fontSize: 18,
    borderBottomWidth: 0.5,
    padding: 5,
    borderBottomColor: 'gray',
  },
  contenidoNotificacion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textoFecha: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
});
