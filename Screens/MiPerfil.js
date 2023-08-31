import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import Header from '../componentes/HeaderScreen';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function MiPerfil({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [editPasswordModalVisible, setEditPasswordModalVisible] = useState(false);
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(true);
  const [showFieldsEmptyMessage, setShowFieldsEmptyMessage] = useState(false);
  const [userName, setUserName] = useState('');
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  console.log("perfil: ", token);

  useEffect(() => {
    const idUser = '7ea0ab93-d534-4d6e-9da3-c46db875bda3';

    axios.get(`https://buddy-app.loca.lt/security/user/${idUser}`, {
    headers: {
      Authorization: `Bearer ${token}` // Agrega el token en el encabezado
    }
  })
  .then(response => {
    const user = response.data.username; // Ajusta esto según la estructura de tu respuesta
    setUserName(user);
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });
}, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openEditPasswordModal = () => {
    // Resetear los valores de los campos al abrir el modal
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
    
    setEditPasswordModalVisible(true);
    closeModal();
  };

  const closeEditPasswordModal = () => {
    setEditPasswordModalVisible(false);
    setAreFieldsEmpty(true);
    setShowFieldsEmptyMessage(false);
  };

  const handleUpdatePassword = () => {
    if (currentPassword === '' || newPassword === '' || repeatPassword === '') {
      setShowFieldsEmptyMessage(true);
    } else {
      setShowFieldsEmptyMessage(false);
      closeEditPasswordModal();
      // Ejecutar la acción de actualización de contraseña aquí
    }
  };  

  const handleUpdateUser = () => {
    setEditUserModalVisible(false);
  };

  const openEditUserModal = () => {
    // Cerrar el modal de opciones si está abierto
    setModalVisible(false);
  
    // Resetear los valores de los campos al abrir el modal
    setNewName('');
    setNewEmail('');
  
    // Abrir el modal de editar usuario
    setEditUserModalVisible(true);
  };
  
  

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <View>
        <Header />
        <View style={[styles.principal, { flexDirection: 'row' }]}>
          <Image source={require('../Imagenes/usuario.png')} style={styles.imagenUsuario} />
          <View>
            <Text style={styles.titulo}>MI PERFIL</Text>
            <Text style={styles.textoUsuario}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={openModal}>
            <Image source={require('../Imagenes/opciones.png')} style={styles.imagenOpciones} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textoPublicaciones}>Publicaciones activas</Text>

        {/* Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.opcionesModal} onPress={openEditPasswordModal}>
                <Text>Editar Contraseña</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.opcionesModal} onPress={openEditUserModal}>
                <Text>Editar Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.opcionesModal}>
                <Text>Cerrar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelarModal} onPress={closeModal}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Editar Contraseña Modal */}
        <Modal animationType="slide" transparent={true} visible={editPasswordModalVisible} onRequestClose={closeEditPasswordModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentEditarContraseña}>
              <Text style={styles.tituloModal}>Actualizar contraseña</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Contraseña actual</Text>
                <TextInput style={styles.passwordInput} secureTextEntry={true} value={currentPassword} onChangeText={setCurrentPassword} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Nueva contraseña</Text>
                <TextInput style={styles.passwordInput} secureTextEntry={true}  value={newPassword} onChangeText={setNewPassword} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Repetir contraseña</Text>
                <TextInput style={styles.passwordInput} secureTextEntry={true}  value={repeatPassword} onChangeText={setRepeatPassword}/>
              </View>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.botonEditarContraseña, areFieldsEmpty && styles.disabledButton]}
                onPress={handleUpdatePassword}
              >
                <Text>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonEditarContraseña} onPress={closeEditPasswordModal}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
            {areFieldsEmpty && showFieldsEmptyMessage && (
              <Text style={styles.fieldsEmptyMessage}>Por favor, completar todos los campos</Text>
            )}
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={editUserModalVisible} onRequestClose={() => setEditUserModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentEditarUsuario}>
            <Text style={styles.tituloModal}>Editar Usuario</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Nombre</Text>
                <TextInput style={styles.passwordInput} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Usuario</Text>
                <TextInput style={styles.passwordInput} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>E-mail</Text>
                <TextInput style={styles.passwordInput} />
            </View>
            <View>
                <TextInput placeholder='Ingrese contraseña para confirmar' style={styles.contraseñaConfirmar} secureTextEntry={true} />
            </View>
            <View style={[styles.contenedorBotones, {flexDirection:'row'}]}>
              <TouchableOpacity style={styles.botonEditarContraseña} onPress={handleUpdateUser}>
                <Text>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonEditarContraseña} onPress={() => setEditUserModalVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    marginLeft: '55%',
  },
  textoUsuario: {
    marginLeft: 15,
  },
  textoPublicaciones: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  opcionesModal: {
    borderBottomColor: '#EEE9E9',
    borderBottomWidth: 1,
    width: 160,
    height: 30,
    padding: 5,
    marginTop:10,
  },
  cancelarModal:{
    marginTop: 15,
    backgroundColor: '#FFB984',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  passwordInput: {
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    width: 150,
    height: 25,
    borderRadius: 30,
  },
  contraseñaActual:{
    marginTop: 2,
  },
  modalContentEditarContraseña: {
    backgroundColor: '#FFB984',
    padding: 10,
    borderRadius: 10,
  },
  botonEditarContraseña: {
    backgroundColor: '#FFFFFF',
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
    marginLeft: 10,
  },
  tituloModal: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldsEmptyMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  modalContentEditarUsuario: {
    backgroundColor: '#FFB984',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  contraseñaConfirmar: {
    width: 225,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
});