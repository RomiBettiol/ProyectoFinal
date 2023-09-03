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
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [user, setUser] = useState ('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [requisitosContrasena, setRequisitosContrasena] = useState(false);
  const[contrasenaIgual, setContrasenaIgual] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userUpdated, setUserUpdated] = useState(false);
  const [contrasenaVacia, setContrasenaVacia] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  console.log("perfil: ", token);

  const idUser = '7ea0ab93-d534-4d6e-9da3-c46db875bda3';

  //Trae info del usuario
  useEffect(() => {
    axios.get(`https://buddy-app.loca.lt/security/user/${idUser}`, {
      headers: {
        'auth-token': token
      }
  })
  .then(response => {
    setUser(response.data);
    setUser(response.data);
    setNewName(response.data[0].name);
    setNewUserName(response.data[0].userName);
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
     setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
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

  const handleUpdatePassword = () => {
    if (currentPassword === '' || newPassword === '' || repeatPassword === '') {
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
        .put(`https://buddy-app.loca.lt/security/user/${idUser}`, updatedUserData, {
          headers: {
            'auth-token': token,
          },
        })
        .then(response => {
          console.log('Contraseña actualizada con éxito:', response.data);
          closeEditPasswordModal();
          setPasswordUpdated(true);
          setTimeout(() => {
            setPasswordUpdated(false);
          }, 2000);
        })
        .catch(error => {
          console.error('Error al actualizar la contraseña:', error);
          setCurrentPasswordError(true);
        });
    }
  };      

  const handleUpdateUser = () => {
    if (confirmPassword === '') {
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
      .put(`https://buddy-app.loca.lt/security/user/${idUser}`, updatedUserData, {
        headers: {
          'auth-token': token,
        },
      })
      .then(response => {
        console.log('Datos de usuario actualizados con éxito:', response.data);
        setEditUserModalVisible(false); // Cierra el modal después de actualizar
        setUserUpdated(true); // Activa el estado para mostrar el mensaje de confirmación
        setTimeout(() => {
          setUserUpdated(false); // Desactiva el mensaje de confirmación después de 2 segundos
        }, 2000);
      })
      .catch(error => {
        console.error('Error al actualizar los datos de usuario:', error);
        setCurrentPasswordError(true);
      });
  };  
  
  const openEditUserModal = () => {
    // Cerrar el modal de opciones si está abierto
    setModalVisible(false);
    setConfirmPassword('');
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
            {user ? (
              <Text style={styles.textoUsuario}>{user[0].userName}</Text>
            ) : (
              <Text style={styles.textoUsuario}>Cargando...</Text>
            )}
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
            {currentPasswordError && (
              <Text style={styles.fieldsEmptyMessage}>La contraseña actual es incorrecta</Text>
            )}
            {areFieldsEmpty && showFieldsEmptyMessage && (
              <Text style={styles.fieldsEmptyMessage}>Por favor, completar todos los campos</Text>
            )}
            {passwordMismatchError && (
              <Text style={styles.fieldsEmptyMessage}>Las contraseñas no coinciden.</Text>
            )}
            {requisitosContrasena && (
              <Text style={styles.fieldsEmptyMessage}>La contraseña debe tener:</Text>
            )}
            {requisitosContrasena && (
              <Text style={styles.fieldsEmptyMessage}>8 caracteres como mínimo.</Text>
            )}
            {requisitosContrasena && (
              <Text style={styles.fieldsEmptyMessage}>Un número como mínimo.</Text>
            )}
            {requisitosContrasena && (
              <Text style={styles.fieldsEmptyMessage}>Un caracter especial.</Text>
            )}
            {contrasenaIgual && (
              <Text style={styles.fieldsEmptyMessage}>La contraseña debe ser diferente a la actual</Text>
            )}
          </View>
        </View>
      </Modal>
      {passwordUpdated && (
        <View style={styles.confirmationMessage}>
          <Text style={styles.confirmationText}>¡Contraseña actualizada correctamente!</Text>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={editUserModalVisible} onRequestClose={() => setEditUserModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentEditarUsuario}>
            <Text style={styles.tituloModal}>Editar Usuario</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Nombre</Text>
                <TextInput
                  style={styles.passwordInput}
                  value={newName}
                  onChangeText={setNewName}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.contraseñaActual}>Usuario</Text>
                <TextInput
                  style={styles.passwordInput}
                  value={newUserName}
                  onChangeText={setNewUserName}
                />
            </View>
            <View>
            <TextInput
              placeholder='Ingrese contraseña para confirmar'
              style={styles.contraseñaConfirmar}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            </View>
            <View style={[styles.contenedorBotones, {flexDirection:'row'}]}>
              <TouchableOpacity style={styles.botonEditarContraseña} onPress={handleUpdateUser}>
                <Text>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonEditarContraseña} onPress={() => setEditUserModalVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
            {contrasenaVacia && (
              <Text style={styles.fieldsEmptyMessage}>Por favor, ingrese la contraseña para confirmar.</Text>
            )}
            {currentPasswordError && (
              <Text style={styles.fieldsEmptyMessage}>La contraseña actual es incorrecta</Text>
            )}
          </View>
        </View>
      </Modal>
      {userUpdated && (
        <View style={styles.confirmationMessage}>
          <Text style={styles.confirmationText}>¡Usuario actualizado!</Text>
        </View>
      )}
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
    fontSize: 20,
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
  confirmationMessage: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: '145%',
  },
  confirmationText: {
    color: 'white',
    textAlign: 'center',
  },
});