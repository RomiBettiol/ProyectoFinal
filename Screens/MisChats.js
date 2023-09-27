import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusquedaMascota from '../componentes/MiMascota/BarraBusquedaMascota';
import BotonSlide from '../componentes/BotonSlide';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MisChats({navigation}) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState(false);
    const route = useRoute();
    const { token } = route.params;
    const [buttonTransform, setButtonTransform] = useState(0);


   

    return (
        <View style={styles.container}>
            <HeaderScreen  token={token}/>
            <View style={[styles.principal, { flexDirection: 'row' }]}>
                <View>
                    <Text style={styles.titulo}>Chats</Text>
                    <View style={styles.contador}>
                        <Text>1</Text>
                    </View>
                </View>
                <TouchableOpacity >
                    <Image source={require('../Imagenes/mensaje.png')} style={styles.imagenSMS} />
                </TouchableOpacity>
            </View>
            <View>

            </View>
            <ScrollView style={styles.scroll}>
              
            </ScrollView>
            <View style={[styles.botonFlotanteContainer, { transform: [{ translateY: buttonTransform }] }]}>
                <BotonSlide token={token} />   
            </View>
        </View>
    );
}
           

const styles = StyleSheet.create({
    principal: {
        marginTop: 30,
        marginLeft: 25,
    },
    container: {
        flex: 1, // Esto hace que la vista principal ocupe toda la pantalla
    },
    titulo: {
        marginLeft: 15,
        fontSize: 25,
        marginTop: 10,
    },
    contador:{
        borderRadius:90,
        backgroundColor:'#EEE9E9',
    },
    imagenSMS:{
        height:5,
        width:5,
    },
    botonFlotanteContainer: {
        position: 'absolute',
        bottom: 20, // Puedes ajustar esta cantidad según tus preferencias
        right: 20, // Puedes ajustar esta cantidad según tus preferencias
        transform: [{ translateY: 0 }], // Inicialmente no se desplaza
      },

});