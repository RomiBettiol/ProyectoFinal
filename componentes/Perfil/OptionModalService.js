import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionModalService = ({ visible, onClose, onEdit, onDelete, route }) => {
  const { idService, token } = route.params;
  const navigation = useNavigation();

  console.log('IdServicio: ', idService);
  console.log('token desde modal optionService: ', token)

  const handleModificarClick = () => {
    // Navegar al componente EditarPublicacionServicio pasando el idService como parámetro
    navigation.navigate('EditarPublicacionServicio', { idService, token });
  };
  
  return (
    <Modal>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.opcionesModal}
              onPress={handleModificarClick} // Llama a la función al hacer clic en "Modificar"
            >
                <Text>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
              >
                <Text>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opcionesModal}
              >
                <Text>Ver servicio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  );
};

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

export default OptionModalService;
