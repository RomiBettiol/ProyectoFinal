import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { format, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import HeaderScreen from '../HeaderScreen';
import BarraBusqueda from '../BarraBusqueda';
import BotonSlide from '../BotonSlide';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function NuevoChat({navigation}) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState(false);
    const route = useRoute();
    const { token } = route.params;
    const [buttonTransform, setButtonTransform] = useState(0);

    

    const fetchUsers = async () => {
    
        try {
          console.log("estoy adentro del try, token:", token);                             
          const response = await axios.get('http://buddy-app1.loca.lt/security/user/all',{
            headers: {
                'auth-token': token
              }
          });
          setUsers(response.data); // Actualiza las publicaciones en el estado
          console.log('Usuarios actualizadas', response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
        console.log("estoy saliendo del try")                                
      };
      
      
    
      useEffect(() => {
        fetchUsers();
        console.log(users);
      }, []);

    return (
        <View style={styles.container}>
            <HeaderScreen token={token} />
            <View style={styles.principal}>
                <View style={styles.subPrincipal1}>
                    <View >
                        <Text style={styles.titulo}>Nuevo mensaje</Text>
                    </View>
                </View>
            </View>
            <View style={styles.subPrincipal2}>
                <View style={styles.contSubTitulo}>
                    <Text style={styles.subTitulo}>Para: </Text>
                </View>
                <View style={styles.BarraBusqueda}>
                    <BarraBusqueda/>
                </View>
            </View>
            
            <ScrollView style={styles.scroll}>
                {/* Mapear y renderizar la lista de users */}
                {users.map((user, index) => (
                    <TouchableOpacity
                    key={index} // Asegúrate de tener una clave única para cada elemento
                    style={styles.userItem}
                    >
                        <Image 
                            source={require('../../Imagenes/usuario.png')}  
                            style={styles.userItemImage}
                            />
                        <View style={styles.userItemContent}>
                            <Text style={styles.userItemTitle}>{user.userName}</Text>    
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.botonFlotanteContainer}>
                <BotonSlide token={token} />
            </View>
        </View>
    );
}
           

const styles = StyleSheet.create({
    principal: {
        flexDirection: 'row', // Alinea los elementos en una fila
        marginTop: 30,
        marginHorizontal: 25,
        justifyContent: 'space-between', // Coloca espacio entre los elementos
        alignItems: 'center', // Centra verticalmente los elementos
        width: '90%',
    },
    subPrincipal1: {
        flexDirection: 'row', // Alinea los elementos en una columna
        alignItems: 'center', // Centra verticalmente los elementos
        borderRadius: 5, // Bordes redondeados si es necesario
        width:'90%',
        borderBottomWidth: 2, // Línea divisoria entre elementos
        borderColor: '#ccc', // Color de la línea divisoria
        
    },
    contSubTitulo:{
        alignItems:'flex-start',
        flexDirection: 'row',
        marginVertical:5,
        marginLeft:2,
        width:'90%',

    },
    subTitulo:{
        fontSize:20,
    },
    BarraBusqueda:{
        flexDirection: 'row',
    },
    scroll:{
      marginTop:15,
      marginLeft:20,
    },
    subPrincipal2: {
        flexDirection:'column', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos
        justifyContent:'flex-start',
        paddingLeft: 10, // Espacio a la izquierda para separar los elementos
        borderRadius: 5, // Bordes redondeados si es necesario
        marginTop:15,
        marginBottom:5,
    },
    titulo: {
        fontSize:30,
        paddingVertical: 1, // Espacio vertical dentro del contenedor
        paddingHorizontal: 10, // Espacio horizontal dentro del contenedor
      
    },
   
    container: {
        flex: 1, // Esto hace que la vista principal ocupe toda la pantalla
        justifyContent: 'center',
       
        
    },
    userItem:{
        width:'90%',
        height:45,
        borderRadius:10,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#ffffff',
        elevation: 8,
        marginHorizontal:10,
        marginVertical:10,
        alignItems:'center',
    },
    userItemImage:{
        height:35,
        width:35,
        flexDirection: 'column',
        margin:5,

    },
    userItemTitle:{
        fontSize:18,
        flexDirection: 'column',
        marginLeft:10,
    },
    

    
});