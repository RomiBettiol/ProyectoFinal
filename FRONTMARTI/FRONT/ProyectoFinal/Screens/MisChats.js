import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { format, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusquedaMascota from '../componentes/MiMascota/BarraBusquedaMascota';
import Archivo from '../componentes/ChatComponent/Archivados';
import BotonSlide from '../componentes/BotonSlide';
import Chats from '../componentes/ChatComponent/Chats';
import NuevoChat from '../componentes/ChatComponent/NuevoChat';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';
import { parseISO } from 'date-fns';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MisChats({ navigation }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(false);
  const route = useRoute();
  const { token } = route.params;
  console.log(token)
  const [buttonTransform, setButtonTransform] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [totalMensajesNoLeidos, setTotalMensajesNoLeidos] = useState('');
  const [idUser , setIdUser]=useState('');

  // UseEffect para obtener el idUser
useEffect(() => {
  axios
    .get(`https://8396-191-82-3-33.ngrok-free.app/security/user/`, {
      headers: {
        "auth-token": token,
      },
    })
    .then((response) => {
      // Declarar la constante idUser
      setIdUser(response.data[0].idUser);
      console.log('USUARIO ID!: ', idUser);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}, [token]);

// UseEffect para contar mensajes no leídos después de que idUser se haya establecido
useEffect(() => {
  if (idUser !== '') {
    const mensajesNoLeidosTotal = chats.reduce((total, chat) => {
      const mensajesNoLeidos = contarMensajesNoLeidos(chat);
      return total + mensajesNoLeidos;
    }, 0);
    setTotalMensajesNoLeidos(mensajesNoLeidosTotal.length);
  }
}, [idUser, chats]);

// Función para contar los mensajes no leídos en un chat específico
function contarMensajesNoLeidos(chat) {
  return chat.chat.messages.filter((mensaje) => !mensaje.read && mensaje.idUserEmitter !== idUser);
}

  const searchChats = () => {
    return chats.filter((chat) => {
      const searchTextLower = searchText.toLowerCase();
      const titleLower = chat.otherUser.userName?.toLowerCase();
  
      return searchText === "" || titleLower.includes(searchTextLower);
    });
  };
  
  console.log("searchText:", searchText);
  console.log("Filtered users:", searchChats());
  
  

  const fetchChats = async () => {
    axios
      .get('https://8396-191-82-3-33.ngrok-free.app/chats/chat/false', {
        headers: {
          'auth-token': token,
        },
      })
      .then((response) => {
        const chatsActualizados = response.data.map((chat) => {
          chat.chat.updatedAt = formatFecha(chat.chat.updatedAt);

            // Contar mensajes no leídos
            const mensajesNoLeidos = contarMensajesNoLeidos(chat);
            chat.mensajesNoLeidos = mensajesNoLeidos;

          // Obtener el último mensaje
          const ultimoMensaje = chat.chat.messages[chat.chat.messages.length - 1];
          chat.ultimoMensaje = ultimoMensaje;
          return chat;
        });
        setChats(chatsActualizados); // Actualiza el estado chats con los datos obtenidos
        console.log("Chats", chatsActualizados); // Registra los chats actualizados

      
      })
      searchChats(chats);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  


  // Formatea las fechas en el arreglo de chats
  

  function formatFecha(fechaString) {
    const fecha = parseISO(fechaString);
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
  //Trae info del usuario
  useEffect(() => {
    axios
      .get(`https://8396-191-82-3-33.ngrok-free.app/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Declarar la constante idUser
        setIdUser(response.data[0].idUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, idUser]);
  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <View style={styles.principal}>
        <View>
          <Text style={styles.titulo}>Chats</Text>
        </View>
        <View style={styles.contador}>
          <Text>{totalMensajesNoLeidos}</Text>
        </View>
        <TouchableOpacity 
            onPress = {()=> (
                navigation.navigate('NuevoChat', {token})
            )}>
            <Image
              source={require('../Imagenes/mensaje.png')} // Utiliza la propiedad fotoUsuario de cada objeto chat
              style={styles.newChatImage}
            />
        </TouchableOpacity>
        <TouchableOpacity 
            onPress = {()=> (
                navigation.navigate('Archivados', {token})
            )}>
            <Image
              source={require('../Imagenes/archivo.png')} // Utiliza la propiedad fotoUsuario de cada objeto chat
              style={styles.newChatImage}
            />
        </TouchableOpacity>
        
      </View>

      <View style={styles.principal2}>
      <BarraBusquedaMascota
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />
      </View>
      <ScrollView style={styles.scroll}>
        
        {/* Mapear y renderizar la lista de chats */}
        {searchChats().map((chat, index) => {
          // Limitar el mensaje a los primeros 25 caracteres
          const mensajeCortado = chat.ultimoMensaje?.content.slice(0, 25);

          return (
          <TouchableOpacity
            key={index}
            style={[
              styles.chatItem,
              selectedChat === index && isSelected && styles.selectedChatItem, // Aplicar estilo seleccionado
            ]}
            onPress={() => {
              setSelectedChat(index); // Guardar el chat seleccionado temporalmente
              setIsSelected(true); // Activar el estilo de selección
              setTimeout(() => {
                setIsSelected(false); // Desactivar el estilo de selección después de 1 segundo
                navigation.navigate("Chats", {
                  chatId: chat.chat.idChat,
                  token: token,
                  idUserRecep: chat.otherUser.idUser,
                  nombre: chat.otherUser.userName,
                  image: chat.otherUser.image,
                  idReference: chat.chat.idReference,
                  referenceType: chat.chat.referenceType,
                });
              }, 1000); // Retrasar la navegación durante 1 segundo
            }}
          >
            <Image
              source={{uri: chat.otherUser?.image}} // Utiliza la propiedad fotoUsuario de cada objeto chat
              style={styles.chatItemImage}
            />
            <View style={styles.chatItemContent}>
                <View style={styles.chatItemData}>
                     <Text style={styles.chatItemTitle}> {chat.otherUser?.userName || 'Sin nombre de usuario'} </Text>
                     {chat.ultimoMensaje && (
                        <Text style={styles.chatItemSubtitle}>
                          {mensajeCortado}
                          {chat.ultimoMensaje.content.length > 25 ? '...' : ''}
                        </Text>
                      )}
                </View>
              <View style={styles.chatItemFooter}>
              <Text style={styles.chatItemDate}> {chat.chat.updatedAt} </Text>
              {chat.mensajesNoLeidos > 0 && (
                <View style={styles.mensajesNoLeidosContainer}>
                  <Text style={styles.mensajesNoLeidosText}>
                    {chat.mensajesNoLeidos}
                  </Text>
                </View>
              )}
              </View>
            </View>
          </TouchableOpacity>
            );
          })}
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
    fontSize: 40,
    paddingVertical: 1, // Espacio vertical dentro del contenedor
    paddingLeft: 10, // Espacio horizontal dentro del contenedor
  },
  contador: {
    paddingVertical: 1, // Espacio vertical dentro del contenedor
    paddingHorizontal: 1, // Espacio horizontal dentro del contenedor
    borderRadius: 90, // Un valor para lograr bordes redondeados
    justifyContent: 'center',
    alignItems: 'center', // Centra verticalmente los elementos
    fontSize: 30,
    height: 30,
    width: 30,
    backgroundColor: '#FFB984',
    marginRight:95,
  },
  imagenSMS: {
    height: 30,
    width: 30,
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
  principal2: {
    margin: 10,
  },
  scroll: {
    marginTop: 35,
  },

  //style para el contenedor de cada chat
  chatItem: {
    flexDirection: 'row', // Alinea los elementos en una fila
    alignItems: 'center', // Centra verticalmente los elementos
    paddingHorizontal: 15, // Espacio horizontal dentro del contenedor
    paddingVertical: 10, // Espacio vertical dentro del contenedor
    borderBottomWidth: 2, // Línea divisoria entre elementos
    borderColor: '#ccc', // Color de la línea divisoria
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 35,
    marginLeft:15,
    paddingRight:10,
    height:90,
    marginTop:5,
  },

  chatItemImage: {
    width: 65, // Ancho de la imagen del usuario
    height: 65, // Alto de la imagen del usuario
    borderRadius: 40, // Bordes redondeados para la imagen
    marginRight: 10, // Espacio a la derecha de la imagen
    paddingVertical:2,
   
  },

  chatItemContent: {
    flex: 1, // Esto hace que ocupe el espacio restante en la fila
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
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
  },
  chatItemFooter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',

  },
  chatItemData: {
    flexDirection: 'column',
    width: '80%',
  },
  

  mensajesNoLeidosContainer: {
    backgroundColor: '#FFB984',
    borderRadius: 15, // Ajusta esto según tu preferencia
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5, // Espacio superior entre la fecha y el contador de mensajes no leídos
  },
  newChatImage:{
    height: 30,
    width:30,

  },

  chatItemSubtitle: {
    fontSize: 12, // Tamaño del subtítulo (último mensaje)
    marginLeft: 2,
  },

  mensajesNoLeidosText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedChatItem: {
    backgroundColor: '#DDC4B8', 
   
  },
  //fin style para el contenedor de cada chat
});