import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native'
import HeaderScreen from '../componentes/HeaderScreen'
import { useRoute } from '@react-navigation/native';
import BotonMenu from '../componentes/BotonMenu';
import axios from 'axios';

export default function DenunciaScreen({navigation}) {
  const route = useRoute();
  const { token } = route.params;
  const [denuncias, setDenuncias] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [denunciaToReject, setDenunciaToReject] = useState(null);

  useEffect(() => {
    loadDenuncias();
  }, []);

  function loadDenuncias() {
    // Realiza una solicitud GET al servidor para obtener las denuncias
    axios
      .get('https://buddy-app2.loca.lt/security/complaint/')
      .then((response) => {
        setDenuncias(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener denuncias:', error);
      });
  }

  function handleOpenConfirmModal(idComplaint) {
    setDenunciaToReject(idComplaint);
    setConfirmModalVisible(true);
  }

  function handleCloseConfirmModal() {
    setDenunciaToReject(null);
    setConfirmModalVisible(false);
  }

  function handleRechazar() {
    if (denunciaToReject) {
      // Realizar una solicitud DELETE al servidor para eliminar la denuncia
      axios
        .delete(`https://buddy-app2.loca.lt/security/complaint/${denunciaToReject}`)
        .then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Denuncia rechazada con éxito');
          // Puedes actualizar la lista de denuncias si es necesario
          // por ejemplo, eliminando la denuncia de la lista denuncias
          // setDenuncias((prevDenuncias) =>
          //   prevDenuncias.filter((denuncia) => denuncia.idComplaint !== denunciaToReject)
          // );
          loadDenuncias();
          handleCloseConfirmModal();
        })
        .catch((error) => {
          console.error('Error al rechazar la denuncia:', error);
          handleCloseConfirmModal();
        });
    }
  }

  function handleBloquear(idComplaint) {
    // Aquí puedes implementar la lógica para bloquear la denuncia
    // Por ejemplo, puedes hacer una solicitud POST al servidor
    // con el idComplaint para marcar la denuncia como bloqueada.
    axios
      .post(`http://localhost:4000/security/complaint/${idComplaint}/block`)
      .then((response) => {
        // Manejar la respuesta del servidor si es necesario
      })
      .catch((error) => {
        console.error('Error al bloquear la denuncia:', error);
      });
  }

  console.log('Denuncias: ', token);

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <ScrollView>
        <Text style={styles.titulo}>Denuncias Pendientes</Text>
        {denuncias.map((denuncia) => (
          <View key={denuncia.idComplaint} style={styles.denuncia}>
            <Text style={styles.tituloDenuncia}>Publicación Denunciada:</Text>
            <Text style={styles.motivoTexto}>Motivo de la denuncia:</Text>
            <Text style={styles.textoDenuncia}>{denuncia.complaintDescription}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.botonRechazar}
                onPress={() => handleOpenConfirmModal(denuncia.idComplaint)}
              >
                <Text>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonBloquear}
                onPress={() => handleBloquear(denuncia.idComplaint)}
              >
                <Text>Bloquear</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Modal
          visible={confirmModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseConfirmModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseConfirmModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.tituloModal}>¿Seguro que quieres rechazar la denuncia?</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.botonModal} onPress={handleRechazar}>
                <Text>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonModal} onPress={handleCloseConfirmModal}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <BotonMenu token = {token}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 5,
  },

  denuncia: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#EEE9E9',
    elevation: 5,
  },

  tituloDenuncia: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 5,
  },

  motivoTexto: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },

  textoDenuncia: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
  },

  botonRechazar: {
    backgroundColor: '#FF584E',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 2,
    marginLeft: 50,
  },

  botonBloquear: {
    backgroundColor: '#8ADC58',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 2,
    marginLeft: 50,
  },

  botonModal: {
    backgroundColor: '#EEE9E9',
    width: '40%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 2,
    marginLeft: 15,
    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#DDC4B8', // Fondo blanco
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', // Centra el contenido horizontalmente
    width: '65%', // Ancho del modal, puedes ajustarlo según tus necesidades
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.32}, { translateY: -Dimensions.get('window').height * 0.05 }],
  },

  tituloModal: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
})