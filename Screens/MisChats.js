import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { format, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusqueda from '../componentes/BarraBusqueda';
import BotonSlide from '../componentes/BotonSlide';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';
import NuevoChat from '../componentes/ChatsComponentes/NuevoChat';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MisChats({navigation}) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
//    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState(false);
    const route = useRoute();
    const { token } = route.params;
    const [buttonTransform, setButtonTransform] = useState(0);

    const chats = [
        {
          nombreUsuario: 'Usuario 1',
          ultimoMensaje: 'Hola, ¿cómo estás?',
          fotoUsuario: require('../Imagenes/usuario.png'),
          fechaUltMensaje: new Date(), // Fecha actual (ejemplo)
          mensajesNoLeidos: 4, // Agrega este atributo con el número de mensajes no leídos
        },
        {
          nombreUsuario: 'Usuario 2',
          ultimoMensaje: '¡Bien, gracias!',
          fotoUsuario:require('../Imagenes/usuario.png'),
          fechaUltMensaje: new Date('2023-09-14T18:35:00Z'),
          mensajesNoLeidos: 3, // Agrega este atributo con el número de mensajes no leídos
        },
        {
          nombreUsuario: 'Usuario 3',
          ultimoMensaje: 'Llamame cuando puedas',
          fotoUsuario: require('../Imagenes/usuario.png'),
          fechaUltMensaje: new Date('2023-01-05T14:15:00Z'),
          mensajesNoLeidos: 5, // Agrega este atributo con el número de mensajes no leídos
        },
        {
            nombreUsuario: 'Usuario 4',
            ultimoMensaje: '¿Es tu perro?',
            fotoUsuario: require('../Imagenes/usuario.png'),
            fechaUltMensaje: new Date('2023-03-05T14:15:00Z'),
            mensajesNoLeidos: 5, // Agrega este atributo con el número de mensajes no leídos
          },
        // Agrega más objetos para más chats...
      ];

      // Formatea las fechas en el arreglo de chats
        chats.forEach((chat) => {
            chat.fechaUltMensajeFormateada = formatFecha(chat.fechaUltMensaje);
        });

      function formatFecha(fecha) {
        if (isToday(fecha)) {
          return 'Hoy';
        }
        if (isYesterday(fecha)) {
          return 'Ayer';
        }
        if (isThisWeek(fecha)) {
          return 'Esta semana';
        }
        if (isThisMonth(fecha)) {
          return 'Este mes';
        }
        if (isThisYear(fecha)) {
          return 'Este año';
        }
        // Personaliza el formato para fechas más antiguas como quieras
        return format(fecha, 'dd/MM/yyyy'); // Ejemplo: 20/09/2023
      }

    return (
        <View style={styles.container}>
            <HeaderScreen token={token} />
            <View style={styles.principal}>
                <View style={styles.subPrincipal1}>
                    <View >
                        <Text style={styles.titulo}>Chats</Text>
                    </View>
                    <View style={styles.contador}>
                        <Text>1</Text>
                    </View>
                </View>
                <View style={styles.subPrincipal2}>
                    <TouchableOpacity
                      onPress = {()=> (
                        navigation.navigate('NuevoChat', {token})
                     )}
                    >
                        <Image
                            source={require('../Imagenes/mensaje.png')}
                            style={styles.imagenSMS}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.principal2}>
                <BarraBusqueda/>
            </View>
            <ScrollView style={styles.scroll}>
                {/* Mapear y renderizar la lista de chats */}
                {chats.map((chat, index) => (
                    <TouchableOpacity
                    key={index} // Asegúrate de tener una clave única para cada elemento
                    style={styles.chatItem}
                    >
                        <Image
                            source={chat.fotoUsuario} // Utiliza la propiedad fotoUsuario de cada objeto chat
                            style={styles.chatItemImage}
                        />
                        <View style={styles.chatItemContent}>
                            <Text style={styles.chatItemTitle}>{chat.nombreUsuario}</Text>
                            <Text style={styles.chatItemSubtitle}>{chat.ultimoMensaje}</Text>
                        </View>
                        <View style={styles.chatItemFooter}>
                            <Text style={styles.chatItemDate}>{chat.fechaUltMensajeFormateada}</Text>
                            {chat.mensajesNoLeidos > 0 && (
                                <Text style={styles.mensajesNoLeidos}>{chat.mensajesNoLeidos}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.botonFlotanteContainer}>
                <BotonSlide token={token} />
            </View>
        </View>
    );
}
           

const styles = StyleSheet.create({
    principal: {
        flexDirection: 'row', // Alinea los elementos en una fila
        marginTop: 30,
        marginHorizontal: 25,
        justifyContent: 'space-between', // Coloca espacio entre los elementos
        alignItems: 'center', // Centra verticalmente los elementos
        width: '90%',
    },
    subPrincipal1: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos
        paddingRight: 10, // Espacio a la derecha para separar los elementos
        borderRadius: 5, // Bordes redondeados si es necesario
    },
    subPrincipal2: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos
        paddingLeft: 10, // Espacio a la izquierda para separar los elementos
        borderRadius: 5, // Bordes redondeados si es necesario
    },
    titulo: {
        fontSize:40,
        paddingVertical: 1, // Espacio vertical dentro del contenedor
        paddingHorizontal: 10, // Espacio horizontal dentro del contenedor
    },
    contador: {
        paddingVertical: 1, // Espacio vertical dentro del contenedor
        paddingHorizontal: 1, // Espacio horizontal dentro del contenedor
        borderRadius: 90, // Un valor para lograr bordes redondeados
        justifyContent: 'center',
        alignItems: 'center', // Centra verticalmente los elementos
        fontSize:30,
        height:30,
        width:30,
        backgroundColor:'#FFB984',

    },
    imagenSMS:{
        height:30,
        width:30,
    },
    botonFlotanteContainer: {
        position: 'absolute',
        bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
        right: 20, // Puedes ajustar esta cantidad según tus preferencias
        transform: [{ translateY: 0 }], // Inicialmente no se desplaza
    },
    container: {
        flex: 1, // Esto hace que la vista principal ocupe toda la pantalla
        justifyContent: 'center',
    },

    principal2:{
        margin:10,

    },
    scroll:{
        marginTop:35,
    },

    //style para el contenedor de cada chat
    chatItem: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos
        paddingHorizontal: 15, // Espacio horizontal dentro del contenedor
        paddingVertical: 10, // Espacio vertical dentro del contenedor
        
      },
      
      chatItemImage: {
        width: 55, // Ancho de la imagen del usuario
        height: 55, // Alto de la imagen del usuario
        borderRadius: 25, // Bordes redondeados para la imagen
        marginRight: 10, // Espacio a la derecha de la imagen
       
      },
      
      chatItemContent: {
        flex: 1, // Esto hace que ocupe el espacio restante en la fila
        borderBottomWidth: 2, // Línea divisoria entre elementos
        paddingTop:10,
        paddingBottom:15,
        borderColor: '#ccc', // Color de la línea divisoria
      },
      
      chatItemTitle: {
        fontSize: 16, // Tamaño del título del chat
        fontWeight: 'bold', // Texto en negrita para el título
      },
      
      chatItemSubtitle: {
        fontSize: 14, // Tamaño del subtítulo (último mensaje)
      },
      
      chatItemDate: {
        fontSize: 12, // Tamaño de la fecha
        marginLeft: 10, // Espacio a la izquierda de la fecha
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center',
      },
      chatItemFooter: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        direction:'ltr',
        marginLeft:1,
        textAlign:'right',
        
      },
      
      mensajesNoLeidos: {
        fontSize: 14,
        flexDirection: 'row', // Alinea los elementos en una fila
        borderRadius: 90, // Un valor para lograr bordes redondeados
        textAlign: 'center',
        alignItems: 'center', // Centra verticalmente los elementos
        height:20,
        width:20,
        backgroundColor:'#FFB984',
        marginTop:2,
      },
       //fin style para el contenedor de cada chat
});