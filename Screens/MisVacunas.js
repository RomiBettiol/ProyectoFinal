import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../componentes/HeaderScreen';
import BarraBusqueda from '../componentes/BarraBusqueda';
//import BotonVaccin from '../componentes/MiMascota/BotonVaccin';
import BotonFlotante from '../componentes/BotonFlotante';
import { Popover, Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
//import AltaVaccin from '../componentes/MiMascota/AltaVaccin';
//import EditarVaccin from '../componentes/MiMascota/EditarVaccin';
//import VaccinModal from '../componentes/MiMascota/VaccinModal';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MisVacunas() {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedVaccinIndex, setSelectedVaccinIndex] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [searchText, setSearchText] = useState('');
    const [showAltaVaccinModal, setShowAltaVaccinModal] = useState(false);
    const [showEditarVaccinModal, setShowEditarVaccinModal] = useState(false);
    const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
    const [vaccines, setVaccines] = useState([]);
    const [vaccin, setvaccin] = useState(false);
    
    const route = useRoute();
    const mascotaId = route.params?.mascotaId; 

    useEffect(() => {
        
        async function fetchvaccines() {
            try {
                const response = await axios.get(`https://buddy-app.loca.lt/mypet/vaccine/${mascotaId}`);
                
                if (Array.isArray(response.data.vaccines)) {
                    setVaccines(response.data.vaccines);
                } else {
                    console.error('API response does not have a valid "vaccines" array:', response.data);
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchvaccines();
    }, []);

    const filterAndSearchVaccines = () => {
        return vaccines
            .filter(vaccin => {
                const vaccinYear = new Date(vaccin.vaccinDate).getFullYear();
                const searchTextLower = searchText.toLowerCase();
                const titleLower = vaccin.titleVaccine.toLowerCase();

                return (
                    (selectedYear === null || vaccinYear === selectedYear) &&
                    (searchText === '' || titleLower.includes(searchTextLower))
                );
            })
            .sort((a, b) => {
                const fechaA = new Date(a.vaccinDate);
                const fechaB = new Date(b.vaccinDate);

                return fechaA - fechaB;
            });
    };

    const filteredAndSortedVaccines = filterAndSearchVaccines();
    function groupVaccinesByMonth(vaccines) {
        const groupedVaccines = {};
    
        vaccines.forEach(vaccin => {
          //  const fecha = new Date(vaccin.vaccinDate);
            const mes = fecha.toLocaleString('default', { month: 'long' });
    
            if (!groupedVaccines[mes]) {
                groupedVaccines[mes] = [];
            }
    
            groupedVaccines[mes].push(vaccin);
        });
    
        return groupedVaccines;
    }
    
    const filteredVaccinesAgrupados = groupVaccinesByMonth(filteredAndSortedVaccines);

    const toggleEditarVaccinModal = () => {
        setShowEditarVaccinModal(!showEditarVaccinModal);
    };

    const toggleAltaVaccinModal = () => {
        setShowAltaVaccinModal(!showAltaVaccinModal);
    };
    // Dentro de la función que maneja la opción "Eliminar"
    const handleDeleteVaccin = async () => {
        console.log(vaccin.idVaccin )
        try {
            const response = await axios.delete(`https://buddy-app.loca.lt/mypet/vaccin/${mascotaId}/${vaccin.idaVaccin}`);
            console.log('Vaccin  eliminado:', response.data);
            } catch (error) {
                console.error('Error eliminando la vacuna:', error);
            }
        
        setOverlayVisible(false); // Cierra el overlay después de eliminar
    };

    return (
        <View style={styles.container}>
            <HeaderScreen />
            <ScrollView style={styles.scroll}>
                <View style={styles.contentContainer1}>
                    {/* ... (contenido del encabezado) */}
                </View>
                <View>
                    <View style={styles.containerBarra}>
                        <BarraBusqueda
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
                
                <View style={styles.contentContainer2}>
                    {Object.keys(filteredVaccinesAgrupados)
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
                                    {filteredVaccinesAgrupados[mes].map((vaccin, index) => (
                                        <View style={styles.contenedorVaccin} key={index}>
                                            
                                                <TouchableOpacity
                                                    style={styles.containerVaccin}
                                                    onPress={() => {
                                                        setSelectedVaccinIndex(index);
                                                        setOverlayVisible(true);
                                                    }}
                                                > 
                                                    <TouchableOpacity
                                                        style={styles.botonOpc}
                                                        onPress={() => {
                                                            setSelectedVaccinIndex(index);
                                                            setOverlayVisible(true);
                                                            setVaccin(vaccin);
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../Imagenes/opciones.png')}
                                                            style={styles.opciones}
                                                        />
                                                    </TouchableOpacity>
                                                                                                              
                                                    <View style={styles.dia}>
                                                        <Text style={styles.numero}>
                                                        {/* 
                                                            {new Date(vaccin.vaccinDate).getDate()}
                                                        */}
                                                        </Text>
                                                    </View>
                                                    <Text>
                                                    {/*
                                                        {new Date(vaccin.vaccinDate).toLocaleTimeString()}
                                                    */}
                                                    </Text>
                                                    <Text style={styles.detalle}>
                                                        {vaccin.titleVaccine}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        
                                ))}
                            </ScrollView>
                        </View>
                    ))}
            </View>
             
             {/* Overlay para opciones */}
             <Overlay
                    isVisible={overlayVisible}
                    onBackdropPress={() => {
                        setOverlayVisible(false);
                        setSelectedVaccinIndex(null);
                    }}
                    overlayStyle={styles.overlayContent}
                >
                    <TouchableOpacity
                        style={styles.overlayOption}
                        onPress={toggleEditarVaccinModal}
                    >
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    {/* Modal de edición de mascota */}
                    <Modal
                        visible={showEditarVaccinModal}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                           {/*     <EditarVaccin mascotaId={mascotaId} vaccin={vaccin} onClose={toggleEditarVaccinModal} />
                           */}
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity                                               
                        style={styles.overlayOption}
                        onPress={handleDeleteVaccin} // Llama a la función de eliminación
                        
                    >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </Overlay>
                 {/* Modal (tarjeta flotante) */}
                
            </ScrollView>
            <Modal
                visible={showAltaVaccinModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                       {/*
                        <AltaVaccin onClose={toggleAltaVaccinModal} />
                        */}
                    </View>
                </View>
            </Modal>
            
        </View>
    );
}
           

const styles = StyleSheet.create({
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
    contenedorVaccin: {
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
    containerVaccin:{
        alignSelf: 'center',
        alignItems:'center',
        
    },
      
});