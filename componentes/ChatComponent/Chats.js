import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  parseISO,
} from "date-fns";
import HeaderScreen from "../HeaderScreen";
import BarraBusqueda from "../BarraBusqueda";
import BotonSlide from "../BotonSlide";
import { Popover, Overlay, Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native"; // Import the useRoute hook
import axios from "axios";
import { BackgroundImage } from "react-native-elements/dist/config";

//import { request } from 'react-native-permissions';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Chats({
  navigation,
  chatId,
  idUserRecep,
  nombre,
  image,
}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [idUserAutor, setIdUserAutor] = useState("");
  const [nuevoSMS, setNuevoSMS] = useState("");
  const [SMS, setSMS] = useState([]);
  const [chat, setChat] = useState(false);
  const route = useRoute();
  const [tipo, setTipo] = useState("");
  const [userAutor, setUserAutor] = useState("");
  const { token } = route.params;
  const [buttonTransform, setButtonTransform] = useState(0);
  const data = route.params;
  //console.log("data", data);
  const idChat = data.chatId;
  const idReference = useState(data.idReference || "");
  const referenceType = useState(data.referenceType || "");
  //console.log("type 1: ", data.referenceType);
  //console.log("type 2: ", referenceType[0]);

  const receptor = data.idUserRecep;
  const nombreRecep = data.nombre;
  const imageRecep = data.image;
  const [imageEmisor, setImageEmisor] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const scrollViewRef = useRef(null); // Ref para ScrollView
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  const [isConfirmedToDelete, setIsConfirmedToDelete] = useState(false);
  const [idAutor, setIdAutor] = useState("");
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [navigateToHome, setNavigateToHome] = useState(false);

  const [imagePublicacion, setImagePublicacion] = useState(
    data.imagenPublicacion || ""
  );
  console.log("A COMPARAR ID USER AUTOR: ", idAutor, "idUserAutor: ", userAutor)
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };
  const showCloseModal = () => {
    setIsCloseModalVisible(true);
  };
  const handleCloseConfirmed = () => {
    // Aquí la lógica para eliminar el chat
    {
      referenceType[0] === "SEARCH"
        ? fetchCerrarSearch()
        : fetchCerrarAdoption();
    }

    // Cierra el modal de eliminación y reinicia el estado de confirmación
    setIsCloseModalVisible(false);
  };
  const handleDeleteConfirmed = () => {
    // Aquí la lógica para eliminar el chat
    fetchArchivar();
    // Cierra el modal de eliminación y reinicia el estado de confirmación
    setIsDeleteModalVisible(false);
    setIsConfirmedToDelete(false);
  };
  const handleDeleteCancelled = () => {
    // Cierra el modal de eliminación y reinicia el estado de confirmación
    setIsDeleteModalVisible(false);
    setIsConfirmedToDelete(false);
    setIsCloseModalVisible(false);
  };

  const fetchArchivar = async () => {
    try {
      const response = await axios.post(
        `https://buddy-app2.loca.lt/chats/chat/archive/${idChat}/true`,
        null,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      // console.log("Chats archivado");
      setTimeout(() => {
        navigation.navigate("Archivados", { token });
      }, 1000);
    } catch (error) {
      console.error("Error al archivar:", error);
    }
    // console.log("Estoy saliendo del try");
  };
  const fetchCerrarSearch = async () => {
    const idPublicacion = idReference[0];

    // console.log(idPublicacion);
    try {
      const response = await axios.post(
        `https://buddy-app2.loca.lt/publications/publication/solve/${idPublicacion}?modelType=search`,
       null,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      // console.log("Publciacion cerrada");
      // Muestra el modal de felicitación
      setShowCongratulationsModal(true);

      // Configura un temporizador para navegar a "HomeScreen" después de 4 segundos
      setTimeout(() => {
        setNavigateToHome(true);
      }, 4000);
    } catch (error) {
      console.error("Error al cerrar publicacion:", error);
    }
    // console.log("Estoy saliendo del try");
  };
  const fetchCerrarAdoption = async () => {
    const idPublicacion = idReference[0];
    // console.log("idPublicacion dentro del try: ", idPublicacion);
    try {
      const response = await axios.post(
        `https://buddy-app2.loca.lt/publications/publication/solve/${idPublicacion}?modelType=Adoption`,
       
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      //  console.log("Publciacion cerrada");
      // Muestra el modal de felicitación
      setShowCongratulationsModal(true);

      // Configura un temporizador para navegar a "HomeScreen" después de 4 segundos
      setTimeout(() => {
        setNavigateToHome(true);
      }, 4000);
    } catch (error) {
      console.error("Error al cerrar publicacion:", error);
    }
  };

  useEffect(() => {
    if (navigateToHome) {
      navigation.navigate("HomeScreen", { token });
    }
  }, [navigateToHome]);

  useEffect(() => {
    axios
      .get(`https://buddy-app2.loca.lt/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        // Declarar la constante idUser
        setUserAutor(response.data[0].idUser);
        setImageEmisor(response.data[0].image);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const fetchSMS = async () => {
    try {
      const response = await axios.get(
        `https://buddy-app2.loca.lt/chats/message/${idChat}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setSMS(response.data); // Actualiza las publicaciones en el estado
      //  console.log("Mensajes:", response.data);
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    }
    //  console.log("Estoy saliendo del try");
  };

  const fetchEnviar = async () => {
    try {
      const response = await axios.post(
        `https://buddy-app2.loca.lt/chats/message/${idChat}`,
        {
          headers: {
            "auth-token": token,
          },
          content: nuevoSMS,
        }
      );
      // setSMS(response.data); // Actualiza las publicaciones en el estado
      console.log("mensajes: ", response.data);
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    }
    //   console.log("estoy saliendo del try");
  };

  const handleEnviarSMS = async () => {
    try {
      const response = await axios.post(
        `https://buddy-app2.loca.lt/chats/message/${idChat}`,
        {
          content: nuevoSMS,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setNuevoSMS(""); // Limpiar el campo de texto después de enviar el mensaje
      setSMS([...SMS, response.data]); // Agregar el nuevo mensaje al estado SMS
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const formatDate = (date) => {
    try {
      const parsedDate = parseISO(date);

      if (isNaN(parsedDate)) {
        return "";
      }

      if (isToday(parsedDate)) {
        return "Hoy";
      } else if (isYesterday(parsedDate)) {
        return "Ayer";
      } else if (isThisWeek(parsedDate)) {
        return format(parsedDate, "EEEE");
      } else {
        return format(parsedDate, "dd/MM/yyyy");
      }
    } catch (error) {
      console.error("Error al analizar la fecha:", error);
      return "";
    }
  };

  const fetchSMSPeriodically = () => {
    const interval = setInterval(async () => {
      await fetchSMS();
    }, 4000); // Puedes ajustar el intervalo de actualización según tus necesidades
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSMS();
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchSMS();
    // console.log(SMS);
  }, []);

  useEffect(() => {
    // Cuando cambie SMS, desplázate al final del ScrollView
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [SMS]);
  const idUserPublic = async () => {
   console.log("A VER:",idReference[0])
   const ref = idReference[0]
   console.log("type: ", referenceType[0])
   const type = referenceType[0]

    try {
      const response = await axios.get(
        `https://buddy-app2.loca.lt/publications/publication/${ref}?modelType=${type}`,
       
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log("id autor public: ", response.data.publication.user.idUser)
      setIdAutor(response.data.publication.user.idUser);
    } catch (error) {
      console.log("Respuesta del servidor:", error.message);
     
  }}
  

  useEffect(() => {
    console.log("USE EFFECT")
    idUserPublic();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <View style={styles.principal}>
        <View style={styles.subPrincipal1}>
          <View style={styles.conteinerChatImage}>
            <Image source={{ uri: imageRecep }} style={styles.userChatImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.titulo}>{nombreRecep}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={showDeleteModal}>
                <Image
                  source={require("../../Imagenes/basurin.png")}
                  style={styles.newChatImage}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isDeleteModalVisible}
                animationType="slide"
                onRequestClose={() => setIsDeleteModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      ¿Desea archivar el chat?
                    </Text>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleDeleteConfirmed}
                      >
                        <Text style={styles.buttonText}>Aceptar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleDeleteCancelled}
                      >
                        <Text style={styles.buttonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity onPress={showCloseModal}>
                <Image
                  source={require("../../Imagenes/opciones.png")}
                  style={styles.newChatImage}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isCloseModalVisible}
                animationType="slide"
                onRequestClose={() => setIsCloseModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {referenceType[0] === "SEARCH" && userAutor == idAutor ? ( // Comprueba si es SEARCH y el idUserAutor es diferente de idAutor
                      <View style={(alignItems = "center")}>
                        <Text style={styles.modalText}>
                          ¡Mascota encontrada!
                        </Text>
                        <View style={styles.modalButtons}>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCloseConfirmed}
                          >
                            <Text style={styles.buttonText}>Aceptar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleDeleteCancelled}
                          >
                            <Text style={styles.buttonText}>Cancelar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : referenceType[0] === "ADOPTION" && userAutor == idAutor ? ( // Comprueba si es ADOPTION y el idUserAutor es diferente de idAutor
                      <View>
                        <Text style={styles.modalText}>¡Mascota adoptada!</Text>
                        <View style={styles.modalButtons}>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCloseConfirmed}
                          >
                            <Text style={styles.buttonText}>Aceptar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleDeleteCancelled}
                          >
                            <Text style={styles.buttonText}>Cancelar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.modalText}>
                          No hay acciones disponibles
                        </Text>
                        <View style={styles.modalButtons}>
                          <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleDeleteCancelled}
                          >
                            <Text style={styles.buttonText}>Aceptar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        ref={scrollViewRef} // Establece la ref en ScrollView
      >
        <View style={styles.contenedor}>
          {SMS.map((mensaje, index) => (
            <View key={index}>
              {/* Mostrar el texto de fecha si cambia */}
              {index === 0 ||
              formatDate(SMS[index - 1].createdAt) !==
                formatDate(mensaje.createdAt) ? (
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {formatDate(mensaje.createdAt)}
                  </Text>
                </View>
              ) : null}

              {mensaje.idUserEmitter === receptor ? (
                <View>
                  <View style={styles.fila}>
                    <Image
                      source={{ uri: imageRecep }}
                      style={[
                        styles.userChatImage,
                        {
                          alignSelf: "flex-start",
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.userItemTitle,
                        styles.userItemContent,
                        {
                          alignSelf: "flex-start",
                          backgroundColor: "#EEE9E9",
                        },
                      ]}
                    >
                      {mensaje.content}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.userItemTime,
                      {
                        alignSelf: "flex-start",
                      },
                    ]}
                  >
                    {format(parseISO(mensaje.createdAt), "HH:mm")}
                  </Text>
                </View>
              ) : (
                <View>
                  <View
                    style={[
                      styles.fila,
                      {
                        alignSelf: "flex-end",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.userItemTitle,
                        styles.userItemContent,
                        {
                          backgroundColor: "#DDC4B8",
                        },
                      ]}
                    >
                      {mensaje.content}
                    </Text>
                    <Image
                      source={{ uri: imageEmisor }}
                      style={styles.userChatImage}
                    />
                  </View>

                  <Text
                    style={[
                      styles.userItemTime,
                      {
                        alignSelf: "flex-end",
                      },
                    ]}
                  >
                    {format(parseISO(mensaje.createdAt), "HH:mm")}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={showCongratulationsModal}
        animationType="slide"
        onRequestClose={() => setShowCongratulationsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, , { backgroundColor: "#FFB984" }]}>
            <Text style={styles.modalText}>
              ¡Felicitaciones! Nos alegra que esta busqueda haya tenido éxito.
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { padding: 1 }]}
          placeholder="Escribir mensaje"
          value={nuevoSMS}
          onChangeText={(value) => {
            setNuevoSMS(value);
          }}
          onFocus={() => setMostrarTexto(true)}
          onBlur={() => setMostrarTexto(false)}
        />
        <TouchableOpacity style={styles.botonEnv} onPress={handleEnviarSMS}>
          <Image
            source={require("../../Imagenes/enviar.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  scroll: {
    marginTop: 5,
    //marginHorizontal: 5,
    height: windowHeight * 0.65,
    width: "100%",
  },
  principal: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  subPrincipal1: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    width: "98%",
    borderBottomWidth: 2,
    borderColor: "#ccc",
    paddingHorizontal: 2, // Espacio horizontal dentro del contenedor
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    paddingLeft: 4,
    marginRight: 10,
    width: "60%",
  },
  newChatImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  userChatImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    margin: 2,
    flexDirection: "column",
  },
  contenedor: {
    width: "100%",
    justifyContent: "center",
    marginRight: 0,
  },
  userItemContent: {
    flexDirection: "row",
    // alignItems: 'center',
    // marginLeft: 10,
    width: "60%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userItemTitle: {
    fontSize: 18,
    flexDirection: "column",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center", // Distribuye los elementos en el espacio disponible
    elevation: 10,
    borderRadius: 10,
    width: "98%",
    paddingHorizontal: 10,
    marginHorizontal: "1%",
  },
  input: {
    flex: 1, // Expande el input para ocupar el espacio restante
    height: 50,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
    fontSize: 16,
    borderTopRightRadius: 0, // Elimina el redondeo en la esquina derecha del input
    borderBottomRightRadius: 0, // Elimina el redondeo en la esquina derecha del input
  },
  botonEnv: {
    height: 50,
    width: 50, // Asegura que el botón tenga un tamaño cuadrado
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10, // Espacio entre el input y el botón
  },
  logo: {
    width: 20,
    height: 20,
  },
  dateText: {
    textAlign: "center",
    color: "gray",
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    //alignItems: 'center',
    marginLeft: 0,
    width: "80%",
  },
  conteinerChatImage: {
    flexDirection: "row",
    //alignItems: 'center',
    marginRight: 0,
    marginLeft: 5,
    marginBottom: 5,
    width: "20%",
  },
  iconsContainer: {
    flexDirection: "row",
    marginRight: 2,
    justifyContent: "flex-end",
    width: "40%",
  },
  userItemTime: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
    marginBottom: 4,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  dateGroup: {
    backgroundColor: "red",
    width: "100%",
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
  buttonText: {
    color: "#fff", // Cambia el color del texto del botón de acuerdo a tus preferencias
    fontSize: 16,
  },
  messageReceiver: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5, // Alinea el mensaje del receptor a la izquierda
    backgroundColor: "#DDC4B8", // Color de fondo del mensaje del receptor
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  messageSender: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Alinea el mensaje del emisor a la derecha
    marginRight: 5,
    backgroundColor: "#EEE9E9", // Color de fondo del mensaje del emisor
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
  },
});
