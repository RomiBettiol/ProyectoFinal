import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../HeaderScreen";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

const PublicacionDetalle = ({route}) => {
  const navigation = useNavigation();
  const publicacion = route.params?.publicacion;
<<<<<<< HEAD
  const { token } = route.params;
  
  const carouselImages = publicacion.images ;
  console.log("carrousel setteado: ",carouselImages);
=======
  const idSearch = publicacion.idPublicationSearch;
  const { token } = route.params;
  const [idUserAutor, setIdUserAutor] = useState("");
  const [userAutor, setUserAutor] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);

  const carouselImages = publicacion.images;
  console.log("carrousel setteado: ", carouselImages);
>>>>>>> entrega-demo-marti
  const formatLostDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axios
      .get(`https://buddy-app2.loca.lt/security/user`, {
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
  }, [token, idUserAutor]);

  const handleNewChat = async (selectedUser) => {
    const idSelectedUser = selectedUser.idUser;
    const idAutor = idUserAutor;
    const idAdopcion = publicacion.idPublicationSearch;
    console.log(
      "idUserautor: ",
      idAutor,
      "idUser seleccionado: ",
      idSelectedUser,
      "idPublicacion: ",
      idAdopcion
    );
    try {
      // Realizar una solicitud POST al servidor para crear un nuevo chat
      const response = await axios.post(
        `https://buddy-app2.loca.lt/chats/chat/${idSelectedUser}?idReference=${idAdopcion}&referenceType=Search`,
        null,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      // Verificar si la solicitud fue exitosa
      if (response.status === 201) {
        const id = response.data.idChat;
        navigation.navigate("Chats", {
          chatId: id,
          token: token,
          idUserRecep: idSelectedUser,
          nombre: selectedUser.userName,
          image: selectedUser.image,
          idReference: idSearch,
          referenceType: "SEARCH",
          imagenPublicacion: carouselImages[0],
        });
      } else if (response.status === 200) {
        setMensaje(
          response.data.message + ". Lo redirigiremos al chat existente..."
        );
        setShowCongratulationsModal(true);
        if (response.data.chat && response.data.chat.idChat) {
          const id = response.data.chat.idChat;
          setTimeout(() => {
            navigation.navigate("Chats", {
              chatId: id,
              token: token,
              idUserRecep: idSelectedUser,
              nombre: selectedUser.userName,
              image: selectedUser.image,
              idReference: idSearch,
              referenceType: "SEARCH",
              imagenPublicacion: carouselImages[0],
            });
          }, 4000);
        } else {
          console.log(
            "No se pudo encontrar el ID del chat en la respuesta:",
            response.data
          );
        }
      } else {
        console.error("Error al crear el chat:", response.data);
        console.log("mensaje: ", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const id = error.response.data.chat.idChat;
        console.log("error 400 mensaje: ", error.response.data.message);
        setMensaje(
          error.response.data.message +
            ". Lo redirigiremos al chat existente..."
        );
        setShowCongratulationsModal(true);
        setTimeout(() => {
          navigation.navigate("Chats", {
            chatId: id, // Reemplaza 'chatId' con la clave correcta para el ID del chat
            token: token, // Otras props que quieras pasar a la pantalla de chat
            idUserRecep: idSelectedUser,
            nombre: selectedUser.userName,
            image: selectedUser.image,
            idReference: idSearch,
            referenceType: "SEARCH",
            imagenPublicacion: carouselImages[0],
          });
        }, 8000);
      } else {
        console.error("Error al crear el chat CATCH:", error);
      }
    }
  };
  return (
    <View>
<<<<<<< HEAD
        <Header />
        <View>
          <Carousel
            data={carouselImages}
            renderItem={({ item }) => (
              <Image source={{uri: item}} style={styles.imagenPublicacion} />
            )}
            sliderWidth={500}
            itemWidth={500}
          />
        </View>
        <View style={styles.informacion}>
          <View style={[{flexDirection:'row'}, styles.containerIconos]}>
            <TouchableOpacity>
              <Image
                source={require('../../Imagenes/compartir.png')}
                style={styles.iconos}
              />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ModalTraza', {
                    idPublicationSearch: publicacion.idPublicationSearch,
                    token,
                    userNamePublicacion: publicacion.user.userName,
                  });
                }}
            >
              <Image
                source={require('../../Imagenes/direction_gps_location_map_maps_navigation_pin_icon_123206.png')}
                style={styles.iconos}
              />
            </TouchableOpacity>
          </View>
          <View style={[{flexDirection:'row'}, styles.contenedorTitulo]}>
            <Text style={styles.tituloPublicacion}>{publicacion?.title}</Text>
            <TouchableOpacity style={styles.botonInformacion}>
              <Text>¡Tengo info!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerDescripcion}>
            <Text style={styles.descripcionPublicacion}>{publicacion?.description}</Text>
            <View style={[styles.informacionFiltros, {flexDirection:'row'}]}>
              <View style={styles.derecha}>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/marcador-de-posicion.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.locality.localityName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/hueso.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.petBreed.petBreedName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/dueno.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.user.userName}</Text>
                </View>
=======
      <Header />
      <View>
        <Carousel
          data={carouselImages}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imagenPublicacion} />
          )}
          sliderWidth={500}
          itemWidth={500}
        />
      </View>
      <View style={styles.informacion}>
        <View style={[{ flexDirection: "row" }, styles.containerIconos]}>
          <TouchableOpacity>
            <Image
              source={require("../../Imagenes/compartir.png")}
              style={styles.iconos}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ModalTraza", {
                idPublicationSearch: publicacion.idPublicationSearch,
                token,
                userNamePublicacion: publicacion.user.userName,
              });
            }}
          >
            <Image
              source={require("../../Imagenes/direction_gps_location_map_maps_navigation_pin_icon_123206.png")}
              style={styles.iconos}
            />
          </TouchableOpacity>
        </View>
        <View style={[{ flexDirection: "row" }, styles.contenedorTitulo]}>
          <Text style={styles.tituloPublicacion}>{publicacion?.title}</Text>
          <TouchableOpacity
            style={styles.botonInformacion}
            onPress={() => handleNewChat(publicacion?.user)} // Agregar lógica de manejo de clic aquí
          >
            <Text>¡Tengo info!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerDescripcion}>
          <Text style={styles.descripcionPublicacion}>
            {publicacion?.description}
          </Text>
          <View style={[styles.informacionFiltros, { flexDirection: "row" }]}>
            <View style={styles.derecha}>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/marcador-de-posicion.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>
                  {publicacion?.locality.localityName}
                </Text>
>>>>>>> entrega-demo-marti
              </View>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/hueso.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>
                  {publicacion?.petBreed.petBreedName}
                </Text>
              </View>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/dueno.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>{publicacion?.user.userName}</Text>
              </View>
            </View>
            <View style={styles.izquierda}>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/paleta-de-color.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>
                  {publicacion?.petcolor.petColorName}
                </Text>
              </View>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/huella.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>
                  {publicacion?.petBreed.petType.petTypeName}
                </Text>
              </View>
              <View style={[styles.itemInfoFiltro, { flexDirection: "row" }]}>
                <Image
                  source={require("../../Imagenes/calendario.png")}
                  style={styles.iconos}
                />
                <Text style={styles.texto}>
                  {formatLostDate(publicacion?.lostDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={showCongratulationsModal}
        animationType="slide"
        onRequestClose={() => setShowCongratulationsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, , { backgroundColor: "#FFB984" }]}>
            <Text style={styles.modalText}>{mensaje}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imagenPublicacion: {
    width: "100%",
    height: 380,
  },
  informacion: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    borderRadius: 55,
    position: "absolute",
    marginTop: 450,
    padding: 30,
    paddingTop: 20,
  },
  tituloPublicacion: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  descripcionPublicacion: {
    fontSize: 16,
  },
  iconos: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  containerIconos: {
    marginLeft: "75%",
  },
  containerDescripcion: {
    justifyContent: "space-between",
    height: 280,
  },
  izquierda: {
    marginLeft: 30,
  },
  itemInfoFiltro: {
    marginTop: 10,
  },
  texto: {
    marginTop: 3,
  },
  informacionFiltros: {
    marginBottom: 25,
  },
  botonInformacion: {
    backgroundColor: "red",
    padding: 3,
    marginLeft: 10,
    height: 30,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    backgroundColor: "#DDC4B8",
  },
  contenedorTitulo: {
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: "#FFB984", // Cambia el color de fondo del botón de acuerdo a tus preferencias
    borderRadius: 5,
  },
});

export default PublicacionDetalle;
