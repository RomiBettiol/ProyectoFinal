import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../HeaderScreen";
import axios from "axios";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

const PublicacionDetalle = ({ route }) => {
  const navigation = useNavigation();
  const publicacion = route.params?.publicacion;
  const idSearch = publicacion.idPublicationSearch;
  const { token } = route.params;
  const [idUserAutor, setIdUserAutor] = useState("");
  const [userAutor, setUserAutor] = useState("");
  const [isProccessing, setIsProcessing] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const carrouselImages = publicacion.images;
  const formatLostDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const viewShotRef = useRef();

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
    console.log(userAutor);
  }, [token, idUserAutor]);

  const handleNewChat = async (selectedUser) => {
    const idSelectedUser = selectedUser.idUser;
    const idAutor = idUserAutor;
    const idAdopcion = publicacion.idPublicationSearch;
    const image = publicacion.user.image;
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
          idAutor: selectedUser.idUser,
          idReference: idSearch,
          referenceType: "SEARCH",
          imagenPublicacion: carrouselImages[0],
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
              imagenPublicacion: carrouselImages[0],
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
            imagenPublicacion: carrouselImages[0],
          });
        }, 8000);
      } else {
        console.error("Error al crear el chat CATCH:", error);
      }
    }
  };

  const handleCaptureScreen = async () => {
    try {
      setisDownloading(true);
      const result = await viewShotRef.current.capture();
      const capturedImageUri = result;

      if (capturedImageUri) {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(capturedImageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const mimetype = capturedImageUri.endsWith(".jpg")
            ? "image/jpeg"
            : "image/png";

          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            `Captura_${publicacion.title}`,
            mimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        }
      } else {
        console.log("URI de la imagen capturada no válida");
      }
    } catch (error) {
      console.log("Error al capturar la pantalla:", error);
    } finally {
      setisDownloading(false);
      setIsProcessing(false);
    }
  };

  return (
    <View>
      <Header token={token} />
      {!isProccessing ? (
        <View>
          <ScrollView horizontal={true}>
            {carrouselImages.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={styles.imagenPublicacion}
              />
            ))}
          </ScrollView>
          <View style={styles.informacion}>
            <View style={[{ flexDirection: "row" }, styles.contenedorTitulo]}>
              <Text style={styles.tituloPublicacion}>{publicacion?.title}</Text>
              <TouchableOpacity
                style={styles.botonInformacion}
                onPress={() => handleNewChat(publicacion?.user)} // Agregar lógica de manejo de clic aquí
              >
                <Text>¡Tengo info!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contendorIconos}
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
            <View style={styles.containerDescripcion}>
              <Text style={styles.descripcionPublicacion}>
                {publicacion?.description}
              </Text>
              <View
                style={[styles.informacionFiltros, { flexDirection: "row" }]}
              >
                <View style={styles.derecha}>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/marcador-de-posicion.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {publicacion?.locality.localityName}
                    </Text>
                  </View>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/hueso.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {publicacion?.petBreed.petBreedName}
                    </Text>
                  </View>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/dueno.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {publicacion?.user.userName}
                    </Text>
                  </View>
                  {userAutor[0] && (
                    <View
                      style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                    >
                      <Image
                        source={require("../../Imagenes/telefono.png")}
                        style={styles.iconos}
                      />
                      <Text style={styles.texto}>
                        {userAutor[0].phoneNumber}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.izquierda}>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/paleta-de-color.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {publicacion?.petcolor.petColorName}
                    </Text>
                  </View>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/huella.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {publicacion?.petBreed.petType.petTypeName}
                    </Text>
                  </View>
                  <View
                    style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                  >
                    <Image
                      source={require("../../Imagenes/calendario.png")}
                      style={styles.iconos}
                    />
                    <Text style={styles.texto}>
                      {formatLostDate(publicacion?.lostDate)}
                    </Text>
                  </View>
                  {userAutor[0] && (
                    <View
                      style={[styles.itemInfoFiltro, { flexDirection: "row" }]}
                    >
                      <Image
                        source={require("../../Imagenes/email.png")}
                        style={styles.iconos}
                      />
                      <Text style={styles.texto}>{userAutor[0].mail}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.botonDescarga}
              onPress={() => {
                // handleCaptureScreen();
                setIsProcessing(true);
              }}
            >
              <Text>¡Descarga un folleto para compartilo!</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Vista previa de la captura</Text>
            {!isDownloading && (
              <TouchableOpacity
                style={[
                  {
                    marginTop: 3,
                    padding: 5,
                    marginLeft: "15%",
                    backgroundColor: "#DDC4B8",
                  },
                ]}
                onPress={() => {
                  handleCaptureScreen();
                }}
              >
                <Text>¡Descarga la captura!</Text>
              </TouchableOpacity>
            )}
          </View>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "jpg", quality: 0.9 }}
            style={styles.container}
          >
            <View style={{ backgroundColor: "white" }}>
              {carrouselImages.length === 1 && (
                <Image
                  source={{ uri: carrouselImages[0] }}
                  style={{
                    alignSelf: "center",
                    width: "95%",
                    height: "55%",
                    // aspectRatio: 1,
                  }}
                />
              )}
              {carrouselImages.length === 2 &&
                carrouselImages.map((item, index) => (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={{
                      width: "60%",
                      height: "28%",
                      margin: 5,
                      alignSelf: "center",
                    }}
                  />
                ))}
              {carrouselImages.length === 3 && (
                <>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      source={{ uri: carrouselImages[0] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                    <Image
                      source={{ uri: carrouselImages[1] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                  </View>
                  <Image
                    source={{ uri: carrouselImages[2] }}
                    style={{
                      width: "45%",
                      aspectRatio: 1,
                      // margin: 5,
                      alignSelf: "center",
                    }}
                  />
                </>
              )}
              {carrouselImages.length === 4 && (
                <>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      source={{ uri: carrouselImages[0] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                    <Image
                      source={{ uri: carrouselImages[1] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      source={{ uri: carrouselImages[2] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                    <Image
                      source={{ uri: carrouselImages[3] }}
                      style={{
                        width: "45%",
                        aspectRatio: 1,
                        margin: 5,
                      }}
                    />
                  </View>
                </>
              )}
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: "center",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {publicacion.title}
              </Text>
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10 }}>
                {publicacion.description}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  margin: 10,
                  fontWeight: "bold",
                }}
              >
                Información adcional:
              </Text>
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10 }}>
                Se trata de un {publicacion.petBreed.petType.petTypeName} de
                raza {publicacion?.petBreed.petBreedName} de color{" "}
                {publicacion.petcolor.petColorName}. La ultima vez que se lo vió
                fue en la fecha {formatLostDate(publicacion.lostDate)} en la
                localidad {publicacion?.locality.localityName}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  margin: 10,
                  fontWeight: "bold",
                }}
              >
                Contacto:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 20,
                }}
              >
                En caso de tener alguna información comuniquese con{" "}
                {userAutor[0]?.name} a mi telefono: {userAutor[0]?.phoneNumber}{" "}
                o a mi mail: {userAutor[0]?.mail}
              </Text>
              <Image
                source={require("../../Imagenes/logo2.png")}
                style={{
                  width: 300,
                  height: 300,
                  bottom: 0,
                  position: "absolute",
                  alignSelf: "center",
                  opacity: 0.2,
                }}
              />
            </View>
          </ViewShot>
        </View>
      )}
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
  container: { height: "85%", width: "100%", alignContent: "center" },

  imagenPublicacion: {
    width: 440,
    height: 400,
  },
  informacion: {
    backgroundColor: "#ffffff",
    height: 500,
    width: "100%",
    borderRadius: 20,
    position: "absolute",
    marginTop: 380,
    padding: 30,
    paddingTop: 20,
  },
  tituloPublicacion: {
    fontSize: 22,
    fontWeight: "bold",
  },
  descripcionPublicacion: {
    fontSize: 16,
  },
  contendorIconos: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  iconos: {
    width: 30,
    height: 30,
  },
  containerDescripcion: {
    justifyContent: "space-between",
    height: 280,
  },
  izquierda: {
    marginLeft: 50,
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
    padding: 3,
    marginLeft: 10,
    marginRight: 80,
    height: 30,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDC4B8",
  },
  contenedorTitulo: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
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
  botonDescarga: {
    marginRight: 80,
    height: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDC4B8",
  },
});

export default PublicacionDetalle;
