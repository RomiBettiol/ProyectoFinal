import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from "date-fns";
import HeaderScreen from "../HeaderScreen";
import BarraBusquedaMascota from "../MiMascota/BarraBusquedaMascota";
import BotonSlide from "../BotonSlide";
import Chats from "./Chats";
import { Popover, Overlay } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook
import axios from "axios";
import { BackgroundImage } from "react-native-elements/dist/config";
//import { request } from 'react-native-permissions';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function NuevoChat({ navigation }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(false);
  const route = useRoute();
  const { token } = route.params;
  const [buttonTransform, setButtonTransform] = useState(0);
  const [userAutor, setUserAutor] = useState("");
  const [idUserAutor, setIdUserAutor] = useState("");
  const searchUser = () => {
    return users.filter((user) => {
      const searchTextLower = searchText.toLowerCase();
      const titleLower = user.userName.toLowerCase();

      return searchText === "" || titleLower.includes(searchTextLower);
    });
  };

  console.log("searchText:", searchText);
  console.log("Filtered users:", searchUser());

  useEffect(() => {
    axios
      .get(`https://62ed-190-177-142-160.ngrok-free.app /security/user`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUserAutor(response.data);
        setIdUserAutor(response.data[0].idUser);

        // Luego puedes usar idUser como desees en tu componente.
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    searchUser(users);
  }, [token, idUserAutor]);

  console.log("idUser1: ", idUserAutor);

  const handleNewChat = async (selectedUser) => {
    const idSelectedUser = selectedUser.idUser;
    const idAutor = idUserAutor;
    console.log(
      "idUserautor: ",
      idAutor,
      "idUser seleccionado: ",
      idSelectedUser
    );
    try {
      // Realizar una solicitud POST al servidor para crear un nuevo chat
      const response = await axios.post(
        `https://62ed-190-177-142-160.ngrok-free.app /chats/chat/${idSelectedUser}`,
        null,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      // Verificar si la solicitud fue exitosa
      if (response.status === 201) {
        // Navegar a la pantalla de chat con la información necesaria
        console.log("response: ", response.data.idChat);
        const id = response.data.idChat;
        console.log("prueba id response: ", id);
        navigation.navigate("Chats", {
          chatId: id, // Reemplaza 'chatId' con la clave correcta para el ID del chat
          token: token, // Otras props que quieras pasar a la pantalla de chat
          idUserRecep: idSelectedUser,
          nombre: selectedUser.userName,
          image: selectedUser.image,
        });
      } else {
        // Manejar errores u mostrar un mensaje de error al usuario
        console.error("Error al crear el chat:", response.data);
      }
    } catch (error) {
      console.error("Error al crear el chat CATCH:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://62ed-190-177-142-160.ngrok-free.app /security/user/all",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setUsers(response.data); // Actualiza las publicaciones en el estado
      console.log("Usuarios actualizadas", response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
    console.log("estoy saliendo del try");
  };

  useEffect(() => {
    fetchUsers();

    console.log(users);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <HeaderScreen token={token} />
        <View style={styles.principal}>
          <View style={styles.subPrincipal1}>
            <View>
              <Text style={styles.titulo}>Nuevo mensaje</Text>
            </View>
          </View>
        </View>
        <View style={styles.subPrincipal2}>
          <Text>Para: </Text>
        </View>
        <BarraBusquedaMascota
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />
        {/* Mapear y renderizar la lista de users */}
        <View style={styles.contenedor}>
          {searchUser().map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.usuario}
              onPress={() => handleNewChat(user)} // Agregar lógica de manejo de clic aquí
            >
              <Image
                source={{ uri: user.image }}
                style={styles.userItemImage}
              />
              <View style={styles.userItemContent}>
                <Text style={styles.userItemTitle}>{user.userName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.botonFlotanteContainer}>
        <BotonSlide token={token} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principal: {
    flexDirection: "row", // Alinea los elementos en una fila
    marginTop: 30,
    marginHorizontal: 25,
    justifyContent: "space-between", // Coloca espacio entre los elementos
    alignItems: "center", // Centra verticalmente los elementos
    width: "90%",
  },
  subPrincipal1: {
    flexDirection: "row", // Alinea los elementos en una fila
    alignItems: "center", // Centra verticalmente los elementos
    borderRadius: 5, // Bordes redondeados si es necesario
    width: "90%",
    borderBottomWidth: 2, // Línea divisoria entre elementos
    borderColor: "#ccc", // Color de la línea divisoria
  },
  subPrincipal2: {
    flexDirection: "row", // Alinea los elementos en una fila
    alignItems: "center", // Centra verticalmente los elementos
    paddingLeft: 10, // Espacio a la izquierda para separar los elementos
    borderRadius: 5, // Bordes redondeados si es necesario
    marginTop: 15,
    marginBottom: 5,
  },
  titulo: {
    fontSize: 30,
    paddingVertical: 1, // Espacio vertical dentro del contenedor
    paddingHorizontal: 10, // Espacio horizontal dentro del contenedor
  },

  container: {
    flex: 1, // Esto hace que la vista principal ocupe toda la pantalla
    justifyContent: "center",
  },
  userItem: {
    width: "90%",
    height: 50,
    borderRadius: 10,
  },
  userItemImage: {
    height: 50,
    width: 50,
    flexDirection: "column", // Alinea los elementos en una fila
  },
  userItemTitle: {
    fontSize: 18,
    flexDirection: "column", // Alinea los elementos en una fila
  },
  usuario: {
    flexDirection: "row", // Alinea los elementos en una fila
    alignItems: "center", // Centra verticalmente los elementos
    height: 60,
    width: "90%", // Ancho del 95% para ocupar la mayoría del contenedor
    alignItems: "center", // Centra horizontalmente
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  userItemImage: {
    height: 45,
    width: 45,
    marginLeft: 15,
    borderRadius: 20,
  },
  userItemContent: {
    flexDirection: "row", // Alinea los elementos en una fila
    alignItems: "center", // Centra verticalmente los elementos
    marginLeft: 10, // Espacio entre la imagen y el título
    width: "70%", // Ancho del 70% para el título
  },
  contenedor: {
    width: "95%",
    alignItems: "center", // Centra horizontalmente
  },
});
