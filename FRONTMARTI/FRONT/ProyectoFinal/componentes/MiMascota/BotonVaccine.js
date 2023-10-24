import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AltaVaccin from './AltaVaccin';
import SlideModal from '../SlideModal';
const BotonVaccine = ({ onAddVaccin, token }) => {
    const [showAltaVaccinModal, setShowAltaVaccinModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleAltaVaccinModal = () => {
        setShowAltaVaccinModal(!showAltaVaccinModal);
    };

    const handleCloseModal = () => {
        setShowAltaVaccinModal(false);
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
      };
    console.log("console logg en boton informacion")
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botonMenu} onPress={handleOpenModal}>
                <View style={styles.fab}>
                    <Image
                        source={require('../../Imagenes/menu.png')}
                        style={styles.imagenBoton}
                    />
                </View>
            </TouchableOpacity>

            <SlideModal visible={modalVisible} onClose={handleCloseModal} token={token}/>

            <TouchableOpacity style={styles.botonCrear} onPress={onAddVaccin}>
                <View style={styles.fab2}>
                    <Image
                        source={require('../../Imagenes/agregar.png')}
                        style={styles.imagenBoton}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    botonMenu: {
        marginBottom: 10,
        marginRight: 10,
    },
    botonCrear: {
        marginBottom: 10,
        marginRight: 10,
    },
    fab: {
        backgroundColor: '#DDC4B8',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fab2: {
        backgroundColor: '#FFB984',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    imagenBoton: {
        width: 40,
        height: 40,
    },
});

export default BotonVaccine;