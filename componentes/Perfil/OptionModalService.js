import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const OptionModalService = ({ visible, onClose, route }) => {
  const { idService, token } = route.params;
  const navigation = useNavigation();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [servicio, setServicio] = useState(false);

  console.log('token desde option: ', token);
  console.log('idService desde option: ', idService);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://romibettiol.loca.lt/services/service/${idService}`, {
          headers: {
            'auth-token': token // Agrega el token en el encabezado
          }
        });
        
        // Handle the response data here
        setServicio(response.data)
        console.log('Data from GET request:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token, idService]); // Agrega el token y idUser como dependencias para el efecto
  
  console.log('mostrar información: ', servicio);

  const handleModificarClick = () => {
    // Navegar al componente EditarPublicacionServicio pasando el idService como parámetro
    navigation.navigate('EditarPublicacionServicio', { idService, token });
  };

  const handleDeleteClick = () => {
    // Mostrar el modal de confirmación de eliminación
    setShowDeleteConfirmation(true);
  
    // Pasa el idService y el token al segundo modal
    console.log('idService y token en el segundo modal:', idService, token);
  };

  const handleConfirmDelete = () => {
    // Realiza la solicitud DELETE utilizando Axios con el token de autorización
    axios.delete(`https://romibettiol.loca.lt/services/service/${idService}`, {
      headers: {
        'auth-token': token, // Incluye el token en el encabezado de autorización
      },
    })
      .then(response => {
        if (response.status === 200) {
          setShowDeleteConfirmation(false);
  
          console.log('Serivicio eliminado');
          setIsModalVisible(true);

        if (response.status === 200) {
          setIsSuccessful(true);
          setModalMessage("Publicación eliminada con éxito");
        } else {
          setIsSuccessful(false);
          setModalMessage("Hubo un error al eliminar la publicación");
        }

        setTimeout(() => {
          setIsModalVisible(false); // Cierra el modal después de 1 segundo
          navigation.navigate("HomeScreen", { token }); // Redirige al perfil
        }, 1000);
        } else {
          // Maneja cualquier otro código de estado si es necesario
          console.error('Error al eliminar el servicio');
        }
      })
      .catch(error => {
        // Maneja los errores de la solicitud
        console.error('Error al eliminar el servicio', error);
      });
  };
  

  const handleCancelDelete = () => {
    // Cerrar el modal de confirmación de eliminación sin eliminar el servicio
    setShowDeleteConfirmation(false);
  
    // Navegar a la pantalla "MiPerfil"
    navigation.navigate('MiPerfil', {token});
  };
  
  return (
    <Modal visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.opcionesModal} onPress={handleModificarClick}>
            <Text>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opcionesModal} onPress={handleDeleteClick}>
            <Text>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opcionesModal} onPress={() => {
              console.log('mostrar servicio: ', servicio);
              navigation.navigate('ServiciosDetalle', {servicio, token, source: 'MiPerfil' });
            }}
          >
            <Text>Ver servicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelarModal} onPress={handleCancelDelete}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de confirmación de eliminación */}
      <Modal visible={showDeleteConfirmation} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Estás seguro que deseas eliminar el servicio?</Text>
            <View style={[styles.confirmButtons1, {flexDirection: 'row'}]}>
              <TouchableOpacity
                style={[styles.confirmButton1, styles.confirmButtonAccept1]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.confirmButtonText1}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton1, styles.confirmButtonCancel1]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.confirmButtonText1}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View
            style={[
              styles.modalContainer1,
              isSuccessful
                ? styles.successModalBackground
                : styles.errorModalBackground,
            ]}
          >
            <View style={[styles.modalContent1, styles.bottomModalContent1]}>
              <Text
                style={[
                  styles.modalMessage,
                  isSuccessful
                    ? styles.successModalText
                    : styles.errorModalText,
                ]}
              >
                {modalMessage}
              </Text>
            </View>
          </View>
        </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  confirmButtonText1: {
    marginTop: 15,
    backgroundColor: "#FFB984",
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 50,
    paddingLeft: 8,
    padding: 5,
  },
  cancelarModal: {
    marginTop: 15,
    backgroundColor: "#FFB984",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo borroso semi-transparente
    justifyContent: "flex-end", // Alinear en la parte inferior
  },
  modalContent1: {
    backgroundColor: "#8ADC58",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  
});

export default OptionModalService;