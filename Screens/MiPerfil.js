import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../componentes/HeaderScreen";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import BotonFlotante from "../componentes/BotonFlotante";

export default function MiPerfil({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [editPasswordModalVisible, setEditPasswordModalVisible] =
    useState(false);
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(true);
  const [showFieldsEmptyMessage, setShowFieldsEmptyMessage] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [user, setUser] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [requisitosContrasena, setRequisitosContrasena] = useState(false);
  const [contrasenaIgual, setContrasenaIgual] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userUpdated, setUserUpdated] = useState(false);
  const [contrasenaVacia, setContrasenaVacia] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [userPublications, setUserPublications] = useState([]);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFailure, setDeleteFailure] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [buttonTransform, setButtonTransform] = useState(0);
  const [confirmLogoutModalVisible, setConfirmLogoutModalVisible] =
    useState(false);
  const [logoutError, setLogoutError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  console.log("perfil: ", token);

  //Trae info del usuario
  useEffect(() => {
    axios
      .get(`  https://buddy-app2.loca.lt/security/user/`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setNewName(response.data[0].name);
        setNewUserName(response.data[0].userName);

        // Declarar la constante idUser
        setIdUser(response.data[0].idUser);

        // Luego puedes usar idUser como desees en tu componente.
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, idUser]);

  console.log("idUser1: ", idUser);

  useEffect(() => {
    axios
      .get(`http://romibettiol.loca.lt/publications/publication/ByUser`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        setUserPublications(response.data); // Almacena las publicaciones en el estado
        console.log("Publicaciones", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user publications:", error);
      });
  }, []);

  console.log("idUser: ", idUser);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openEditPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRepeatPassword("");
    setCurrentPasswordError(false);

    setEditPasswordModalVisible(true);
    closeModal();
  };

  const closeEditPasswordModal = () => {
    setEditPasswordModalVisible(false);
    setAreFieldsEmpty(true);
    setShowFieldsEmptyMessage(false);
    setRequisitosContrasena(false);
    setPasswordMismatchError(false);
    setCurrentPasswordError(false);
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password); // Comprueba si hay al menos un número
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password); // Comprueba si hay al menos un carácter especial
    const isLengthValid = password.length >= 8; // Comprueba si la longitud es al menos 8 caracteres

    return hasNumber && hasSpecialChar && isLengthValid;
  };

  const handleUpdatePassword = async () => {
    if (currentPassword === "" || newPassword === "" || repeatPassword === "") {
      setShowFieldsEmptyMessage(true);
      setPasswordMismatchError(false);
      setRequisitosContrasena(false);
      setContrasenaIgual(false);
    } else if (newPassword === currentPassword) {
      setShowFieldsEmptyMessage(false);
      setPasswordMismatchError(false);
      setRequisitosContrasena(false);
      setContrasenaIgual(true);
    } else if (newPassword !== repeatPassword) {
      setShowFieldsEmptyMessage(false);
      setPasswordMismatchError(true);
      setRequisitosContrasena(false);
      setContrasenaIgual(false);
    } else if (!validatePassword(newPassword)) {
      setShowFieldsEmptyMessage(false);
      setPasswordMismatchError(false);
      setRequisitosContrasena(true);
      setContrasenaIgual(false);
    } else {
      setShowFieldsEmptyMessage(false);
      setPasswordMismatchError(false);
      setRequisitosContrasena(false);
      setContrasenaIgual(false);

      const updatedUserData = {
        username: user[0].userName,
        name: user[0].name,
        lastName: user[0].lastName,
        password: newPassword,
        currentPassword: currentPassword,
      };

      // Realiza la solicitud PUT a la URL con los datos actualizados
      axios
        .put(
          `  https://buddy-app2.loca.lt/security/user/${idUser}`,
          updatedUserData,
          {
            headers: {
              "auth-token": token,
            },
          }
        )
        .then((response) => {
          console.log("Contraseña actualizada con éxito:", response.data);
          closeEditPasswordModal();
          setPasswordUpdated(true);
          setTimeout(() => {
            setPasswordUpdated(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error al actualizar la contraseña:", error);
          setCurrentPasswordError(true);
        });
    }
  };

  const handleUpdateUser = async () => {
    if (confirmPassword === "") {
      setContrasenaVacia(true);
      return;
    }
    setContrasenaVacia(false);

    const updatedUserData = {
      name: newName,
      userName: newUserName,
      currentPassword: confirmPassword,
    };

    // Realiza la solicitud PUT para actualizar la información del usuario
    axios
      .put(
        `  https://buddy-app2.loca.lt/security/user/${idUser}`,
        updatedUserData,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((response) => {
        console.log("Datos de usuario actualizados con éxito:", response.data);
        setEditUserModalVisible(false); // Cierra el modal después de actualizar
        setUserUpdated(true); // Activa el estado para mostrar el mensaje de confirmación
        setTimeout(() => {
          setUserUpdated(false); // Desactiva el mensaje de confirmación después de 2 segundos
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al actualizar los datos de usuario:", error);
        setCurrentPasswordError(true);
      });
  };

  const openEditUserModal = () => {
    // Cerrar el modal de opciones si está abierto
    setModalVisible(false);
    setConfirmPassword("");
    // Abrir el modal de editar usuario
    setEditUserModalVisible(true);
  };

  const openOptionsModal = (publication) => {
    setSelectedPublication(publication);
    setOptionsModalVisible(true);
  };
  useEffect(() => {
    console.log("selectedPublication (after update): ", selectedPublication);
  }, [selectedPublication]);

  const closeOptionsModal = () => {
    setSelectedPublication(null);
    setOptionsModalVisible(false);
  };

  const openConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const showSuccessModal = () => {
    setDeleteSuccess(true);
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 1000); // 1000 milisegundos = 1 segundo
  };

  // Función para mostrar el modal de falla durante 1 segundo
  const showFailureModal = () => {
    setDeleteFailure(true);
    setTimeout(() => {
      setDeleteFailure(false);
    }, 1000); // 1000 milisegundos = 1 segundo
  };

  const editPublication = (publicationToEdit) => {
    console.log("Mostrar edicion", selectedPublication);
    const idPublicationToEdit =
      publicationToEdit.idPublicationAdoption ||
      publicationToEdit.idPublicationSearch;
    const modalType = publicationToEdit.idPublicationAdoption
      ? "adoption"
      : "search";
    console.log("modalType:", modalType);
    console.log("idPublicationToEdit:", idPublicationToEdit);

    if (modalType === "adoption") {
      navigation.navigate("EditarPublicacionAdopcion", {
        publicationToEdit: selectedPublication,
        token,
      });
    } else if (modalType === "search") {
      navigation.navigate("EditarPublicacionBusqueda", {
        publicationToEdit: selectedPublication,
        token,
      });
      console.log("Mostrar desde mi perfil el id: ", selectedPublication);
    }
  };

  const handleDeletePublication = (publicationToDelete) => {
    console.log("Mostrar en el handle: ", selectedPublication);
    if (publicationToDelete) {
      const idPublicationToDelete =
        publicationToDelete.idPublicationAdoption ||
        publicationToDelete.idPublicationSearch;
      const modalType = publicationToDelete.idPublicationAdoption
        ? "adoption"
        : "search";
      console.log("modalType:", modalType);
      console.log("idPublicacion: ", idPublicationToDelete);
      axios
        .delete(
          `  https://buddy-app2.loca.lt/publications/publication/${idPublicationToDelete}?modelType=${modalType}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        )
        .then((response) => {
          console.log("Publicación eliminada con éxito:", response.data);
          showSuccessModal();
          closeConfirmationModal();
        })
        .catch((error) => {
          console.error("Error al eliminar la publicación:", error);
          showFailureModal();
          closeConfirmationModal();
        });
    } else {
      console.error("La publicación a eliminar es nula");
    }
  };

  useEffect(() => {
    if (deleteSuccess || deleteFailure) {
      // Realiza la solicitud GET para cargar las publicaciones actualizadas
      axios
        .get(`http://romibettiol.loca.lt/publications/publication/ByUser`, {
          headers: {
            "auth-token": token,
          },
        })
        .then((response) => {
          setUserPublications(response.data); // Actualiza las publicaciones en el estado
          console.log("Publicaciones actualizadas", response.data);
        })
        .catch((error) => {
          console.error(
            "Error al cargar las publicaciones actualizadas:",
            error
          );
        });
    }
  }, [deleteSuccess, deleteFailure]);

  const formatLostDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "  https://buddy-app2.loca.lt/security/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        // Cierre de sesión exitoso, navega a InicioScreen.js
        navigation.navigate("InicioScreen");
      } else {
        // Mostrar un modal de error en caso de que la llamada no sea exitosa
        setLogoutError("Hubo un error al cerrar sesión.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLogoutError("Hubo un error al cerrar sesión.");
    }
  };

  const handleConfirmLogout = () => {
    setConfirmLogoutModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={[styles.principal, { flexDirection: "row" }]}>
          <Image
            source={require("../Imagenes/usuario.png")}
            style={styles.imagenUsuario}
          />
          <View>
            <Text style={styles.titulo}>MI PERFIL</Text>
            {user ? (
              <Text style={styles.textoUsuario}>{user[0].userName}</Text>
            ) : (
              <Text style={styles.textoUsuario}>Cargando...</Text>
            )}
          </View>
          <TouchableOpacity onPress={openModal}>
            <Image
              source={require("../Imagenes/opciones.png")}
              style={styles.imagenOpciones}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textoPublicaciones}>Publicaciones activas</Text>
        {userPublications.adoptions &&
          userPublications.adoptions.length > 0 &&
          userPublications.adoptions.map((adoption, index) => (
            <View
              style={[styles.publicationContainer, { flexDirection: "row" }]}
            >
              <Image
                source={require("../Imagenes/imagenPublicaciones.jpg")}
                style={styles.imagenPublicaciones}
              />
              <View>
                <View
                  style={[
                    styles.informacionPublicacion,
                    { flexDirection: "row" },
                  ]}
                >
                  <TouchableOpacity style={styles.botonInformacion}>
                    <Text>En adopción</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openOptionsModal(adoption)}>
                    <Image
                      source={require("../Imagenes/opciones.png")}
                      style={styles.imagenOpcionesPublicaciones}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.publicationTitle}>{adoption.title}</Text>
                <View
                  style={[styles.containerfiltros, { flexDirection: "row" }]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../Imagenes/marcador-de-posicion.png")}
                      style={styles.imagenFiltros}
                    />
                    <Text>{adoption.locality.localityName}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../Imagenes/hueso.png")}
                      style={styles.imagenFiltros}
                    />
                    <Text>{adoption.petBreed.petBreedName}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        {userPublications.searchs &&
          userPublications.searchs.length > 0 &&
          userPublications.searchs.map((search, index) => (
            <View
              style={[styles.publicationContainer, { flexDirection: "row" }]}
            >
              <Image
                source={require("../Imagenes/imagenPublicaciones.jpg")}
                style={styles.imagenPublicaciones}
              />
              <View>
                <View
                  style={[
                    styles.informacionPublicacion,
                    { flexDirection: "row" },
                  ]}
                >
                  <TouchableOpacity style={styles.botonInformacion}>
                    <Text>En búsqueda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openOptionsModal(search)}>
                    <Image
                      source={require("../Imagenes/opciones.png")}
                      style={styles.imagenOpcionesPublicaciones}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.publicationTitle}>{search.title}</Text>
                <View
                  style={[styles.containerfiltros, { flexDirection: "row" }]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../Imagenes/marcador-de-posicion.png")}
                      style={styles.imagenFiltros}
                    />
                    <Text>{search.locality.localityName}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../Imagenes/hueso.png")}
                      style={styles.imagenFiltros}
                    />
                    <Text>{search.petBreed.petBreedName}</Text>
                  </View>
                </View>
                <View style={[{ flexDirection: "row" }, styles.containerFecha]}>
                  <Image
                    source={require("../Imagenes/calendario.png")}
                    style={styles.imagenFiltros}
                  />
                  <Text>{formatLostDate(search.lostDate)}</Text>
                  <Text
                    style={
                      search.isFound
                        ? styles.textoInformacionBusquedaEncontrada // Usar el estilo para "Encontrada"
                        : styles.textoInformacionBusquedaPerdida // Usar el estilo para "Perdida"
                    }
                  >
                    {search.isFound ? "Encontrada" : "Perdida"}
                  </Text>
                </View>
              </View>
            </View>
          ))}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={openEditPasswordModal}
              >
                <Text>Editar Contraseña</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={openEditUserModal}
              >
                <Text>Editar Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={handleConfirmLogout}
              >
                <Text>Cerrar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarModal}
                onPress={closeModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Editar Contraseña Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editPasswordModalVisible}
          onRequestClose={closeEditPasswordModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContentEditarContraseña}>
              <Text style={styles.tituloModal}>Actualizar contraseña</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contraseñaActual}>Contraseña actual</Text>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contraseñaActual}>Nueva contraseña</Text>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contraseñaActual}>Repetir contraseña</Text>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[
                    styles.botonEditarContraseña,
                    areFieldsEmpty && styles.disabledButton,
                  ]}
                  onPress={handleUpdatePassword}
                >
                  <Text>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEditarContraseña}
                  onPress={closeEditPasswordModal}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
              {currentPasswordError && (
                <Text style={styles.fieldsEmptyMessage}>
                  La contraseña actual es incorrecta
                </Text>
              )}
              {areFieldsEmpty && showFieldsEmptyMessage && (
                <Text style={styles.fieldsEmptyMessage}>
                  Por favor, completar todos los campos
                </Text>
              )}
              {passwordMismatchError && (
                <Text style={styles.fieldsEmptyMessage}>
                  Las contraseñas no coinciden.
                </Text>
              )}
              {requisitosContrasena && (
                <Text style={styles.fieldsEmptyMessage}>
                  La contraseña debe tener:
                </Text>
              )}
              {requisitosContrasena && (
                <Text style={styles.fieldsEmptyMessage}>
                  8 caracteres como mínimo.
                </Text>
              )}
              {requisitosContrasena && (
                <Text style={styles.fieldsEmptyMessage}>
                  Un número como mínimo.
                </Text>
              )}
              {requisitosContrasena && (
                <Text style={styles.fieldsEmptyMessage}>
                  Un caracter especial.
                </Text>
              )}
              {contrasenaIgual && (
                <Text style={styles.fieldsEmptyMessage}>
                  La contraseña debe ser diferente a la actual
                </Text>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editUserModalVisible}
          onRequestClose={() => setEditUserModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContentEditarUsuario}>
              <Text style={styles.tituloModal}>Editar Usuario</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contraseñaActual}>Nombre</Text>
                <TextInput
                  style={styles.passwordInput}
                  value={newName}
                  onChangeText={setNewName}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contraseñaActual}>Usuario</Text>
                <TextInput
                  style={styles.passwordInput}
                  value={newUserName}
                  onChangeText={setNewUserName}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Ingrese contraseña para confirmar"
                  style={styles.contraseñaConfirmar}
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <View
                style={[styles.contenedorBotones, { flexDirection: "row" }]}
              >
                <TouchableOpacity
                  style={styles.botonEditarContraseña}
                  onPress={handleUpdateUser}
                >
                  <Text>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEditarContraseña}
                  onPress={() => setEditUserModalVisible(false)}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
              {contrasenaVacia && (
                <Text style={styles.fieldsEmptyMessage}>
                  Por favor, ingrese la contraseña para confirmar.
                </Text>
              )}
              {currentPasswordError && (
                <Text style={styles.fieldsEmptyMessage}>
                  La contraseña actual es incorrecta
                </Text>
              )}
            </View>
          </View>
        </Modal>

        {/* Modal editar o eliminar*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={optionsModalVisible}
          onRequestClose={closeOptionsModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={() => {
                  editPublication(selectedPublication);
                  closeOptionsModal();
                }}
              >
                <Text>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={() => {
                  setOptionsModalVisible(false); // Cierra el modal de opciones
                  setConfirmationModalVisible(true); // Abre el modal de confirmación
                }}
              >
                <Text>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
                onPress={() => {
                  const modelType = selectedPublication.idPublicationAdoption
                    ? "adoption"
                    : "search";
                  console.log("Model Type:", modelType);
                  console.log("selectedPublication: ", selectedPublication);
                  if (modelType === "adoption") {
                    navigation.navigate("PublicacionDetalleAdopcion", {
                      publicacion: selectedPublication,
                      token,
                    });
                  } else {
                    navigation.navigate("PublicacionDetalle", {
                      publicacion: selectedPublication,
                      token,
                    });
                  }
                  closeOptionsModal();
                }}
              >
                <Text>Ver publicación</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarModal}
                onPress={closeOptionsModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/*Modal eliminacion*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmationModalVisible}
          onRequestClose={closeConfirmationModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.tituloModal}>¿Estás seguro?</Text>
              <TouchableOpacity
                style={styles.cancelarModal}
                onPress={() => {
                  handleDeletePublication(selectedPublication);
                }}
              >
                <Text>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarModal}
                onPress={closeConfirmationModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteSuccess}
        onRequestClose={() => {
          setDeleteSuccess(false);
        }}
      >
        <View style={[styles.modalContainer, { justifyContent: "flex-end" }]}>
          <View style={styles.successModal}>
            <Text style={styles.confirmationText}>¡Publicación eliminada!</Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteFailure}
        onRequestClose={() => {
          setDeleteFailure(false);
        }}
      >
        <View style={[styles.modalContainer, { justifyContent: "flex-end" }]}>
          <View style={styles.failureModal}>
            <Text style={styles.confirmationText}>¡Eliminación fallida!</Text>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonFlotante token={token} />
      </View>
      {logoutError && (
        <View style={styles.errorContainer1}>
          <Text>{logoutError}</Text>
          <TouchableOpacity onPress={() => setLogoutError(null)}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={confirmLogoutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <Text>¿Desea cerrar sesión?</Text>
            <View style={styles.confirmButtons1}>
              <TouchableOpacity
                onPress={() => {
                  setConfirmLogoutModalVisible(false);
                  handleLogout(); // Esta función aún no está definida, la agregaremos a continuación.
                }}
                style={[styles.confirmButton1, styles.confirmButtonAccept1]}
              >
                <Text style={styles.confirmButtonText1}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setConfirmLogoutModalVisible(false)}
                style={[styles.confirmButton1, styles.confirmButtonCancel1]}
              >
                <Text style={styles.confirmButtonText1}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {userUpdated && (
        <View style={styles.confirmationMessage}>
          <Text style={styles.confirmationText}>¡Usuario actualizado!</Text>
        </View>
      )}
      {passwordUpdated && (
        <View style={styles.confirmationMessage}>
          <Text style={styles.confirmationText}>
            ¡Contraseña actualizada correctamente!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  principal: {
    marginTop: 30,
    marginLeft: 25,
  },
  imagenUsuario: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  titulo: {
    marginLeft: 15,
    fontSize: 25,
    marginTop: 10,
  },
  imagenOpciones: {
    width: 20,
    height: 30,
    marginTop: 25,
    marginLeft: "55%",
  },
  textoUsuario: {
    marginLeft: 15,
    fontSize: 20,
  },
  textoPublicaciones: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  opcionesModal: {
    borderBottomColor: "#EEE9E9",
    borderBottomWidth: 1,
    width: 160,
    height: 30,
    padding: 5,
    marginTop: 10,
  },
  cancelarModal: {
    marginTop: 15,
    backgroundColor: "#FFB984",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  passwordInput: {
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 25,
    borderRadius: 30,
  },
  contraseñaActual: {
    marginTop: 2,
  },
  modalContentEditarContraseña: {
    backgroundColor: "#FFB984",
    padding: 10,
    borderRadius: 10,
  },
  botonEditarContraseña: {
    backgroundColor: "#FFFFFF",
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
    width: 120,
    alignItems: "center",
    marginLeft: 10,
  },
  tituloModal: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldsEmptyMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  modalContentEditarUsuario: {
    backgroundColor: "#FFB984",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  contraseñaConfirmar: {
    width: 225,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 2,
    marginBottom: 10,
    textAlign: "center",
  },
  confirmationMessage: {
    backgroundColor: "green",
    padding: 10,
    marginTop: "145%",
  },
  confirmationText: {
    color: "white",
    textAlign: "center",
  },
  publicationContainer: {
    padding: 1,
    paddingRight: 15,
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 15,
    elevation: 4,
    width: "90%",
    marginLeft: 25,
    marginTop: 15,
    alignItems: "center",
  },
  imagenOpcionesPublicaciones: {
    width: 20,
    height: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  botonInformacion: {
    backgroundColor: "#f0f0f0",
    elevation: 5,
    height: 30,
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 20,
  },
  informacionPublicacion: {
    justifyContent: "space-between",
  },
  imagenFiltros: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 10,
  },
  containerfiltros: {
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 15,
  },
  containerFecha: {
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  publicationTitle: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 15,
  },
  imagenPublicaciones: {
    width: "30%",
    height: 100,
    borderRadius: 15,
  },
  textoInformacionBusquedaEncontrada: {
    marginLeft: 15,
    backgroundColor: "#CBC2C2",
    padding: 5,
  },

  textoInformacionBusquedaPerdida: {
    marginLeft: 15,
    backgroundColor: "#58DCD4",
    padding: 5,
  },

  successModal: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20, // Ajusta el margen inferior según tus preferencias
  },

  // Estilos para el modal de confirmación fallida
  failureModal: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20, // Ajusta el margen inferior según tus preferencias
  },
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
  container: {
    flex: 1, // Esto hace que la vista principal ocupe toda la pantalla
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  confirmButtons1: {
    flexDirection: "row",
    marginTop: 10,
  },
  confirmButton1: {
    flex: 1,
    backgroundColor: "#FFB984",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonAccept1: {
    marginRight: 5,
  },
  confirmButtonCancel1: {
    marginLeft: 5,
  },
  confirmButtonText1: {
    fontSize: 16,
  },
});
