import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusquedaMascota from '../componentes/MiMascota/BarraBusquedaMascota';
import BotonTurnos from '../componentes/MiMascota/BotonTurnos';
import BotonFlotante from '../componentes/BotonFlotante';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AltaTurno from '../componentes/MiMascota/AltaTurno';
import EditarTurno from '../componentes/MiMascota/EditarTurno';
import TurnoModal from '../componentes/MiMascota/TurnoModal';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';
import SuccessModal from '../componentes/MiMascota/SuccessModal';
import ErrorModal from '../componentes/MiMascota/ErrorModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MisTurnos(token) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedTurnIndex, setSelectedTurnIndex] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [searchText, setSearchText] = useState('');
    const [showAltaTurnoModal, setShowAltaTurnoModal] = useState(false);
    const [showEditarTurnoModal, setShowEditarTurnoModal] = useState(false);
    const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
    const [turnos, setTurnos] = useState([]);
    const [turno, setTurno] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const[showTurnoModal, setShowTurnoModal] = useState(false);
    const route = useRoute();
    const mascotaId = route.params?.mascotaId;
    const [error404, setError404] = useState(false);

   
        async function fetchTurnos() {
            try {
                const response = await axios.get(`https://buddy-app1.loca.lt/mypet/turn/${mascotaId}`);
                if (response.data && Array.isArray(response.data.turns)) {
                setTurnos(response.data.turns);
                console.log(response.data.turns)
                }
                
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Si el error es 404, establece el estado error404 en true
                    setError404(true);
                }
            }
        };
        
        console.log(turnos)

    
    const filterAndSearchTurnos = () => {
        return turnos
            .filter(turno => {
                const dateParts = turno.turnDate.split('-');
                const day= parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
                const  year= parseInt(dateParts[2], 10);
                const turnDate = new Date(year, month, day); 
                const turnoYear = year;
                const searchTextLower = searchText.toLowerCase();
                const titleLower = turno.titleTurn.toLowerCase();
                return (
                    (selectedYear === null || turnoYear === selectedYear) &&
                    (searchText === '' || titleLower.includes(searchTextLower))
                );
            })
            .sort((a, b) => {
                const fechaA = new Date(a.turnDate);
                const fechaB = new Date(b.turnDate);

                return fechaA - fechaB;
            });
    };

    const filteredAndSortedTurnos = filterAndSearchTurnos();
    function groupTurnosByMonth(turnos) {
        const groupedTurnos = {};
    
        turnos.forEach(turno => {

                const dateParts = turno.turnDate.split('-');
                const  year= parseInt(dateParts[2], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
                const day= parseInt(dateParts[0], 10);
                const fecha = new Date(year, month, day);
                const mes = fecha.toLocaleString('default', { month: 'long' });              

            if (!groupedTurnos[mes]) {
                groupedTurnos[mes] = [];
            }
    
            groupedTurnos[mes].push(turno);
        });
    
        return groupedTurnos;
    }
    
    const filteredTurnosAgrupados = groupTurnosByMonth(filteredAndSortedTurnos);

    const toggleEditarTurnoModal = () => {
        setShowEditarTurnoModal(!showEditarTurnoModal);
        fetchTurnos();
        
    };

    const toggleAltaTurnoModal = () => {
        setShowAltaTurnoModal(!showAltaTurnoModal);
        fetchTurnos();
    };
    // Dentro de la función que maneja la opción "Eliminar"
    const handleDeleteTurno = async () => {
        console.log(turno.idTurn)
        try {
            const response = await axios.delete(`https://buddy-app1.loca.lt/mypet/turn/${mascotaId}/${turno.idTurn}`);
            console.log('Turno eliminado:', response.data);
            setShowSuccessModal(true);
            } catch (error) {
                console.error('Error eliminando la mascota:', error);
                setShowErrorModal(true);
            }
        
        setOverlayVisible(false); // Cierra el overlay después de eliminar
        fetchTurnos()
    };
    function dia (turno) {
        const dateParts = turno.turnDate.split('-');
        const  year= parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 porque los meses en JavaScript son 0-11
        const day= parseInt(dateParts[0], 10);
        return day;
    };
    const handleSuccessModalClose = () => {
        fetchTurnos();
        setShowSuccessModal(false);
        setShowTurnoModal(false);
        setOverlayVisible(false); // Cierra el modal NuevaMascota
      };

      useEffect(() => {
        fetchTurnos();

    }, []);
    return (
        <View style={styles.container}>
            <HeaderScreen />
            <ScrollView style={styles.scroll}>
                <View style={styles.contentContainer1}>
                    <View style={styles.container1}>
                        <Image
                            source={require('../Imagenes/perrito.jpeg')}
                            style={styles.imagMascota}
                        />
                        <View style={styles.containerTitulo}>
                            <Text style={styles.titulo}>
                                MIS TURNOS
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.containerBarra}>
                        <BarraBusquedaMascota
                            searchText={searchText}
                            onSearchTextChange={setSearchText}
                        />
                    </View>
                    
                    <View style={styles.yearPickerContainer}>
                        <Text>Seleccionar año: </Text>
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                            style={{ height: 50, width: 130 }}
                        >
                            {/* Generar las opciones de años dinámicamente */}
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <Picker.Item key={year} label={year.toString()} value={year} />
                            ))}
                        </Picker>
                    </View>
                </View>
                {error404 ? (
                        <View style={styles.contentContainer22}>
                            <Text style={styles.sinInfo}>NO HAY TURNOS CARGADOS</Text>
                        </View>
                    ) : (
                <View style={styles.contentContainer2}>
                    {Object.keys(filteredTurnosAgrupados)
                        .sort((a, b) => {
                            const mesesOrdenados = [
                                "enero", "febrero", "marzo", "abril",
                                "mayo", "junio", "julio", "agosto",
                                "septiembre", "octubre", "noviembre", "diciembre"
                            ];
                            return mesesOrdenados.indexOf(a) - mesesOrdenados.indexOf(b);
                        })
                        .map(mes => (
                            <View style={styles.contentContainer3} key={mes}>
                                <Text style={styles.subtitulo}>
                                    {mes}
                                </Text>
                                <ScrollView horizontal={true}>
                                    {filteredTurnosAgrupados[mes].map((turno, index) => (
                                        <View style={styles.contenedorTurno} key={index}>
                                            
                                                <TouchableOpacity
                                                    style={styles.containerTurno}
                                                    onPress={() => {
                                                        setTurno(turno);
                                                        setShowTurnoModal(true);
                                                    }}
                                                > 
                                                    <TouchableOpacity
                                                        style={styles.botonOpc}
                                                        onPress={() => {
                                                            setSelectedTurnIndex(index);
                                                            setOverlayVisible(true);
                                                            setTurno(turno);
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../Imagenes/opciones.png')}
                                                            style={styles.opciones}
                                                        />
                                                    </TouchableOpacity>
                                                                                                              
                                                    <View style={styles.dia}>
                                                        <Text style={styles.numero}>
                                                        {dia(turno)} 
                                                        </Text>
                                                    </View>
                                                    <Text>
                                                        {turno.turnHour}
                                                    </Text>
                                                    <Text style={styles.detalle}>
                                                       {turno.titleTurn}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        
                                ))}
                            </ScrollView>
                        </View>
                    ))}
            </View>
            )}
           <BotonTurnos onAddTurno={toggleAltaTurnoModal} token={token} />   
             {/* Overlay para opciones */}
             <Overlay
                    isVisible={overlayVisible}
                    onBackdropPress={() => {
                        setOverlayVisible(false);
                        setSelectedTurnIndex(null);
                    }}
                    overlayStyle={styles.overlayContent}
                >
                    <TouchableOpacity
                        style={styles.overlayOption}
                        onPress={toggleEditarTurnoModal}
                    >
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    {/* Modal de edición de mascota */}
                    <Modal
                        visible={showEditarTurnoModal}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <EditarTurno mascotaId={mascotaId} turno={turno} onClose={toggleEditarTurnoModal} />
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity                                               
                        style={styles.overlayOption}
                        onPress={handleDeleteTurno} // Llama a la función de eliminación                   
                    >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </Overlay>
                 {/* Modal (tarjeta flotante) */}
                <Modal
                visible={showAltaTurnoModal}
                animationType="slide"
                transparent={true}
               
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <AltaTurno onClose={toggleAltaTurnoModal} />
                    </View>
                </View>
            </Modal>
            <SuccessModal
                visible={showSuccessModal}
                onClose={() => {
                setShowSuccessModal(false);
                handleSuccessModalClose();
                }}
                message="Turno eliminado correctamente"
            />
            <ErrorModal
                visible={showErrorModal}
                errorMessage="Hubo un error al eliminar el turno."
                onClose={() => {
                    setShowErrorModal(false);
                    handleSuccessModalClose();
                    }}
            />
                <Modal
                    visible={showTurnoModal}
                    animationType="slide"
                    transparent={true}
                    onClose={() => {
                        setShowTurnoModal(false);
                        handleSuccessModalClose();
                    }}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>                 
                            <TurnoModal turno={turno} onClose={() => setShowTurnoModal(false)}  />
                        </View>
                    </View>
                </Modal>         
            </ScrollView>
            
            
        </View>
    );
}
           

const styles = StyleSheet.create({
    sinInfo:{
        fontSize: 14,
        color:'grey',
    },
    contentContainer22: {
       marginTop:200,        
        justifyContent: 'center', // Para centrar vertical
        alignItems:'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      elevation: 10,
      borderRadius: 25,
      padding: 20,
      width: windowWidth * 0.95,
      height:windowHeight * 0.65,
      textAlign: 'center',
      alignItems: 'center', // Para centrar horizont
  },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroll: {
        flex: 1,
    },
    titulo: {
        fontSize: 16,
    },
    contentContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20, // Añade espacios a los lados si es necesario
        marginTop: 20,
    },
    contentContainer2: {
        marginHorizontal: 15,
     
    },
    contentContainer3: {
       // marginTop: 10,
    },
    container1: {
        width: '100%',
        height: 70,
        backgroundColor: '#B8F7B7',
        borderRadius: 20,
        justifyContent: 'flex-start', // Para centrar vertical
        alignItems: 'center', // Para centrar horizontal
        flexDirection: 'row',
        elevation: 20,
    },
    containerTitulo: {
        alignItems: 'center', // Para centrar horizontal
        width: '80%',
    },
    subtitulo: {
        fontSize: 16,
        marginTop: 10,
    },
    imagMascota: {
        borderRadius: 50,
        height: 50,
        width: 50,
        marginHorizontal: 10,
        marginBottom: 2,
    },
    contenedorTurno: {
        backgroundColor: 'white',
        width: 100,
        height: 145,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 15,
        elevation: 3,
        alignItems: 'center', // Para centrar horizontal
        marginTop: 10,
        marginHorizontal: 10,
        paddingHorizontal:4,
    },
    botonOpc: {
        margin: 2,
    },
    opciones: {
        height: 15,
        width: 15,
        marginLeft: 60,
        marginTop: 5,
    },
    dia: {
        backgroundColor: '#47D3CB',
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center', // Para centrar vertical
        alignItems: 'center', // Para centrar horizontal
        marginBottom: 10,
    },
    numero: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    detalle: {
        fontSize: 12,
    },
    overlayContent: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 4,
    },
    overlayOption: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    yearPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        marginLeft:20,
    },
    containerBarra:{
        marginVertical:20,
        width:'90%',
        alignSelf: 'center',

    },
    containerTurno:{
        alignSelf: 'center',
        alignItems:'center',
        
    },
      
});