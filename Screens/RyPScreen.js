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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
    fetchData();
    getPermisos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isPageRefreshing) {
        fetchData();
        getPermisos();
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

      setTimeout(() => {
        setConfirming(false);
        setConfirmationModalVisible(false);
        setId(null);
        setState(null);
      }, 2000);
      return;
    } catch (error) {
      console.error(
        `Error al cambiar de estado al ${
          type === "role" ? "rol" : "permiso"
        }: `,
        error
      );
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
          }: `
        );
      } else {
        setResponseMessage(response.data.message);
      }

      setTimeout(() => {
        setConfirming(false);
        setAddModalVisible(false);
        setNewName("");
        setNewDescription("");
        setNewTokenClaim("");
      }, 2000);
      return;
    } catch (error) {
      console.error(
        `Error al crear un nuevo ${type === "role" ? "rol" : "permiso"}`,
        error
      );
      setTimeout(() => {
        setConfirming(false);
        setAddModalVisible(false);
        setNewName("");
        setNewDescription("");
        setNewTokenClaim("");
      }, 2000);
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setEditModalVisible(true);
  };

  const renderRoles = ({ item }) => {
    return (
      <View style={styles.ItemContainer}>
        <View style={styles.Item}>
          <View style={styles.ItemInfo}>
            <Text style={styles.Name}>{item.roleName}</Text>
            <Text style={styles.ItemText}>
              Estado: {item.active ? "ACTIVO" : "INACTIVO"}
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setNewName(item.roleName);
                setNewDescription(item.roleDescription);
                setType("role");
                setModifyModalVisible(true);
              }}
            >
              <Text style={styles.optionButtonText}>Editar rol</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
              <Text style={styles.optionButtonText}>Modificar permisos</Text>
            </TouchableOpacity>
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
    );
  };

  const renderPermisos = ({ item }) => {
    return (
      <View style={styles.ItemContainer}>
        <View style={styles.Item}>
          <View style={styles.ItemInfo}>
            <Text style={styles.ItemName}>{item.permissionName}</Text>
            <Text style={styles.ItemText}>{item.tokenClaim}</Text>
            <Text style={styles.ItemText}>
              Estado: {item.active ? "ACTIVO" : "INACTIVO"}
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setNewName(item.permissionName),
                  setNewDescription(item.roleDescription);
                setNewTokenClaim(item.tokenClaim);
                setType("permission");
                setModifyModalVisible(true);
              }}
            >
              <Text style={styles.optionButtonText}>Editar permiso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
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
    );
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderScreen />
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
        <FlatList
          data={roles}
          keyExtractor={(item) => item.idRole.toString()}
          renderItem={renderRoles}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.titulo}>Permisos</Text>
        {permissions.includes("WRITE_ROLES") && (
          <TouchableOpacity
            onPress={() => {
              setType("permission");
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
        <FlatList
          data={permisos}
          keyExtractor={(item) => item.idPermission.toString()}
          renderItem={renderPermisos}
          scrollEnabled={false}
        />
      </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModifyModalVisible}
        onRequestClose={() => {
          setModifyModalVisible(false);
          setNewName("");
          setNewTokenClaim("");
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
              style={styles.input} // Agrega estilos de error si es necesario
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
              }}
            />
            {type === "permission" && (
              <>
                <Text style={styles.modalText}>Token claim del permiso</Text>
                <TextInput
                  placeholder="Ingrese el token claim"
                  style={styles.input}
                  value={newTokenClaim}
                  onChangeText={(text) => {
                    setNewTokenClaim(text);
                  }}
                />
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setModifyModalVisible(false);
                  setNewName("");
                  setNewTokenClaim("");
                }}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAdd();
                }}
              >
                <Text style={styles.confirmButton}>Guardar cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  Name: {
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
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
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
});
