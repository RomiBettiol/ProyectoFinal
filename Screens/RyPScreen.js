import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function InicioScreen() {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const route = useRoute();
  const { token } = route.params;
  const [permissions, setPermissions] = useState("");
  const [state, setState] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isPageRefreshing, setPageRefreshing] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTokenClaim, setNewTokenClaim] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isModifyModalVisible, setModifyModalVisible] = useState(false);
  const [isEditPermissionModalVisible, setEditPermissionModalVisible] =
    useState(false);
  const [permissionRole, setPermissionRole] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const rolesResponse = await axios.get(
        "https://buddy-app2.loca.lt/security/role/every",
        config
      );

      const permisosResponse = await axios.get(
        "https://buddy-app2.loca.lt/security/permission/",
        config
      );

      setRoles(rolesResponse.data);
      setPermisos(permisosResponse.data);
    } catch (error) {
      console.error("Error fetching roles data:", error);
    }
  };

  const getPermisos = async () => {
    try {
      const permissions = await AsyncStorage.getItem("permisos");
      setPermissions(permissions);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setisLoading(true);
        await fetchData();
        await getPermisos();
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isPageRefreshing) {
        const getData = async () => {
          try {
            setisLoading(true);
            await fetchData();
            await getPermisos();
          } catch (error) {
            console.log(error);
          } finally {
            setisLoading(false);
          }
        };
        getData();
        setPageRefreshing(false); // Restablece el estado después de la recarga
      }
    }, [isPageRefreshing])
  );

  const handlePageRefresh = () => {
    setPageRefreshing(true);
  };

  const handleConfirmation = async () => {
    if (!id || !state || isConfirming) {
      return;
    }
    setConfirming(true);

    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      let response;
      if (state === "ACTIVO") {
        response = await axios.delete(
          `https://buddy-app2.loca.lt/security/${type}/${id}`,
          config
        );
      } else {
        response = await axios.post(
          `https://buddy-app2.loca.lt/security/${type}/active/${id}`,
          {},
          config
        );
      }

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.error(
        `Error al cambiar de estado al ${
          type === "role" ? "rol" : "permiso"
        }: `,
        error
      );
    } finally {
      setTimeout(() => {
        setConfirming(false);
        setConfirmationModalVisible(false);
        setId(null);
        setState(null);
      }, 2000);
    }
  };

  const handleAdd = async () => {
    if (!newName || !newDescription || isConfirming) {
      setInputError(true);
      return;
    }
    setConfirming(true);

    let response;

    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      if (type === "role") {
        const data = {
          roleName: newName.trim(),
          roleDescription: newDescription.trim(),
          adminRole: false,
        };

        response = await axios.post(
          `https://buddy-app2.loca.lt/security/${type}/`,
          data,
          config
        );
      } else {
        if (!newTokenClaim) {
          setInputError(true);
          return;
        } else {
          const data = {
            permissionName: newName.trim(),
            permissionDescription: newDescription.trim(),
            tokenClaim: newTokenClaim.trim(),
          };

          response = await axios.post(
            `https://buddy-app2.loca.lt/security/${type}/`,
            data,
            config
          );
        }
      }

      if (response.status === 201) {
        setResponseMessage(
          `Se ha creado correctamente el nuevo ${
            type === "role" ? "rol" : "permiso"
          }`
        );
      } else {
        setResponseMessage("Ya existe un rol con ese nombre");
      }
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 400") {
        setResponseMessage("Ya existe un rol con ese nombre");
      } else {
        setResponseMessage(
          `Error al crear un nuevo ${type === "role" ? "rol" : "permiso"}`
        );
      }
    } finally {
      setTimeout(() => {
        setConfirming(false);
        setAddModalVisible(false);
        setNewName("");
        setNewDescription("");
        setNewTokenClaim("");
      }, 2000);
    }
  };

  const handleModify = async () => {
    if (!newName || isConfirming) {
      setInputError(true);
      return;
    }
    setConfirming(true);

    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      let response;

      if (type === "role") {
        const data = {
          roleName: newName.trim(),
        };

        response = await axios.put(
          `https://buddy-app2.loca.lt/security/${type}/${id}`,
          data,
          config
        );
      } else {
        if (!newTokenClaim) {
          setInputError(true);
          return;
        } else {
          const data = {
            permissionName: newName.trim(),
            tokenClaim: newTokenClaim.trim(),
          };

          response = await axios.put(
            `https://buddy-app2.loca.lt/security/${type}/${id}`,
            data,
            config
          );
        }
      }

      if (response.status === 200) {
        setResponseMessage(
          `Se ha modifcado correctamente el ${
            type === "role" ? "rol" : "permiso"
          }`
        );
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 400") {
        setResponseMessage("Ya existe un rol con ese nombre");
      } else {
        setResponseMessage(
          `Error al modificar el ${type === "role" ? "rol" : "permiso"}`
        );
      }
    } finally {
      setTimeout(() => {
        setConfirming(false);
        setModifyModalVisible(false);
        setNewName("");
        setNewDescription("");
        setNewTokenClaim("");
        setId("");
      }, 2000);
    }
  };

  const managePermission = async (idPermission, tokenClaim) => {
    setConfirming(true);

    try {
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      const data = {
        idPermission,
      };

      let response;

      if (permissionRole.includes(tokenClaim)) {
        response = await axios.delete(
          `https://buddy-app2.loca.lt/security/role/take/${id}/${idPermission}`,
          config
        );
      } else {
        response = await axios.post(
          `https://buddy-app2.loca.lt/security/role/add/${id}`,
          data,
          config
        );
      }

      if (response.status === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.error(
        `Error al ${
          permissionRole.includes(newTokenClaim) ? "quitar" : "agregar"
        } el permiso`,
        error
      );
    } finally {
      setTimeout(() => {
        setConfirming(false);
        setEditPermissionModalVisible(false);
        setNewName("");
        setId("");
        setPermissionRole("");
      }, 2000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderScreen token={token} />
      <View style={styles.rowContainer}>
        <Text style={styles.titulo}>Roles</Text>
        {permissions.includes("WRITE_ROLES") && (
          <TouchableOpacity
            onPress={() => {
              setType("role");
              setAddModalVisible(true);
            }}
          >
            <Image
              source={require("../Imagenes/agregar.png")}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        {roles.map((item) => (
          <View key={item.idRole} style={styles.ItemContainer}>
            <View style={styles.Item}>
              <View style={styles.ItemInfo}>
                <Text style={styles.ItemName}>{item.roleName}</Text>
                <Text style={styles.ItemText}>
                  Estado: {item.active ? "ACTIVO" : "INACTIVO"}
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {item.active == true && (
                  <>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => {
                        setId(item.idRole);
                        setNewName(item.roleName);
                        setType("role");
                        setModifyModalVisible(true);
                      }}
                    >
                      <Text style={styles.optionButtonText}>Editar rol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => {
                        setId(item.idRole);
                        setEditPermissionModalVisible(true);
                        setPermissionRole(
                          item.permissions ? item.permissions : "-"
                        );
                        setNewName(item.roleName);
                      }}
                    >
                      <Text style={styles.optionButtonText}>
                        Gestionar permisos
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {
                    setState(item.active ? "ACTIVO" : "INACTIVO");
                    setId(item.idRole);
                    setType("role");
                    setConfirmationModalVisible(true);
                  }}
                >
                  <Text style={styles.optionButtonText}>
                    {item.active ? "Dar de Baja" : "Activar rol"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titulo}>Permisos</Text>
      </View>
      <View>
        {permisos.map((item) => (
          <View key={item.idPermission} style={styles.ItemContainer}>
            <View style={styles.Item}>
              <View style={styles.ItemInfo}>
                <Text style={styles.ItemName}>{item.permissionName}</Text>
                <Text style={styles.ItemText}>{item.tokenClaim}</Text>
                <Text style={styles.ItemText}>
                  Estado: {item.active ? "ACTIVO" : "INACTIVO"}
                </Text>
              </View>
              <View style={styles.optionsContainer}>
                {item.active == true && (
                  <>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => {
                        setId(item.idPermission);
                        setNewName(item.permissionName);
                        setNewTokenClaim(item.tokenClaim);
                        setType("permission");
                        setModifyModalVisible(true);
                      }}
                    >
                      <Text style={styles.optionButtonText}>
                        Editar permiso
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {}}
                >
                  <Text
                    style={styles.optionButtonText}
                    onPress={() => {
                      setState(item.active ? "ACTIVO" : "INACTIVO");
                      setId(item.idPermission);
                      setType("permission");
                      setConfirmationModalVisible(true);
                    }}
                  >
                    {item.active ? "Dar de Baja" : "Activar permiso"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* Modal para dar de Baja */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={() => {
          setConfirmationModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {state === "ACTIVO"
                ? `¿Estás seguro de que quieres dar de baja este ${
                    type === "role" ? "rol" : "permiso"
                  }?`
                : `¿Estás seguro de que quieres activar este ${
                    type === "role" ? "rol" : "permiso"
                  }?`}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setConfirmationModalVisible(false)}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmation}
                disabled={isConfirming}
              >
                <Text
                  style={[
                    styles.confirmButton,
                    isConfirming && styles.disabledButton,
                  ]}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal de mensaje */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={responseMessage !== ""}
        onRequestClose={() => {
          setResponseMessage("");
          handlePageRefresh();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{responseMessage}</Text>
            <TouchableOpacity
              onPress={() => {
                setResponseMessage("");
                handlePageRefresh();
              }}
            >
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal para crear */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false);
          setNewName("");
          setNewDescription("");
          setNewTokenClaim("");
          setInputError("false");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Crear nuevo {type === "role" ? "rol" : "permiso"}
            </Text>
            <Text style={styles.modalText}>
              Nombre del {type === "role" ? "rol" : "permiso"}
            </Text>
            <TextInput
              placeholder="Ingrese el nombre"
              style={[styles.input, inputError && styles.inputError]}
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
                setInputError(false);
              }}
            />
            <Text style={styles.modalText}>
              Descripción del {type === "role" ? "rol" : "permiso"}
            </Text>
            <TextInput
              placeholder="Ingrese la descripción"
              style={[styles.input, inputError && styles.inputError]}
              value={newDescription}
              onChangeText={(text) => {
                setNewDescription(text);
                setInputError(false);
              }}
            />
            {inputError && (
              <Text style={styles.textError}>Complete todos los campos</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setAddModalVisible(false);
                  setNewName("");
                  setNewDescription("");
                  setNewTokenClaim("");
                  setInputError(false);
                }}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAdd();
                }}
              >
                <Text style={styles.confirmButton}>
                  Crear {type === "role" ? "rol" : "permiso"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal para editar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModifyModalVisible}
        onRequestClose={() => {
          setModifyModalVisible(false);
          setNewName("");
          setNewTokenClaim("");
          setInputError(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Modificar {type === "role" ? "rol" : "permiso"}
            </Text>
            <Text style={styles.modalText}>
              Nombre del {type === "role" ? "rol" : "permiso"}
            </Text>
            <TextInput
              placeholder="Ingrese el nombre"
              style={[styles.input, inputError && styles.inputError]}
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
                setInputError(false);
              }}
            />
            {type === "permission" && (
              <>
                <Text style={styles.modalText}>Token claim del permiso</Text>
                <TextInput
                  placeholder="Ingrese el token claim"
                  style={[styles.input, inputError && styles.inputError]}
                  value={newTokenClaim}
                  onChangeText={(text) => {
                    setNewTokenClaim(text);
                    setInputError(false);
                  }}
                />
              </>
            )}
            {inputError && (
              <Text style={styles.textError}>Complete todos los campos</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setModifyModalVisible(false);
                  setNewName("");
                  setNewTokenClaim("");
                  setInputError(false);
                }}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleModify();
                }}
              >
                <Text style={styles.confirmButton}>Guardar cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditPermissionModalVisible}
        onRequestClose={() => {
          setEditPermissionModalVisible(false);
          setId("");
          setPermissionRole("");
          setNewName("");
        }}
      >
        <ScrollView>
          <View style={styles.editModalContainer}>
            <View style={styles.editModalContent}>
              <Text style={styles.editModalTitle}>
                Gestionar permisos del rol: {newName}
              </Text>
              {permisos.map((item) => (
                <View key={item.idPermission} style={styles.editItemContainer}>
                  <View style={styles.editItem}>
                    <View style={styles.editItemInfo}>
                      <Text style={styles.editItemText}>{item.tokenClaim}</Text>
                    </View>
                    <View style={styles.editOptionsContainer}>
                      <TouchableOpacity
                        style={styles.editOptionButton}
                        onPress={() => {
                          managePermission(item.idPermission, item.tokenClaim);
                        }}
                      >
                        <Text style={styles.editOptionButtonText}>
                          {permissionRole.includes(item.tokenClaim)
                            ? "Quitar"
                            : "Agregar"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              <View style={styles.editModalButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setEditPermissionModalVisible(false);
                    setId("");
                    setPermissionRole("");
                    setNewName("");
                  }}
                >
                  <Text style={styles.editCancelButton}>Salir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Modal visible={isLoading} transparent>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  imagenAgregar: {
    width: 24,
    height: 24,
  },
  ItemContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  Item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  ItemInfo: {
    flex: 2,
  },
  ItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ItemText: {
    fontSize: 14,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#FFB988",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonText: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 20,
  },
  confirmButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  disabledButton: {
    color: "#D3D3D3",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  textError: {
    color: "red",
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  editModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  editModalContent: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  editItemContainer: {
    marginBottom: 10,
  },
  editItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
  },
  editItemInfo: {
    flex: 1,
  },
  editItemText: {
    fontSize: 16,
  },
  editOptionsContainer: {
    marginLeft: 10,
  },
  editOptionButton: {
    backgroundColor: "#FFB988",
    padding: 5,
    borderRadius: 5,
  },
  editOptionButtonText: {
    color: "white",
  },
  editModalButtons: {
    marginTop: 20,
    alignItems: "center",
  },
  editCancelButton: {
    color: "red",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
