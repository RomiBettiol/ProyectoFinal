import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView} from 'react-native'
import MenuHorizontal from '../componentes/MenuHorizontal'
import MiMascotaScreen from './MiMascotaScreen'
import { useRoute } from '@react-navigation/native'; // Importa useRoute
import axios from 'axios';
 
export default function HomeScreen({navigation}) {
    const route = useRoute(); // Obtiene la prop route
    const [quantity, setQuantity] = useState('');
    const [adoptionQuantity, setAdoptionQuantity] = useState('');
    const [lostPetsQuantity, setLostPetsQuantity] = useState('');

    useEffect(() => {
        // Realizar la solicitud GET utilizando Axios
        axios.get('http://buddy-app.loca.lt/reports/count/founds-success')
          .then((response) => {
            // Extraer el valor quantity de la respuesta
            const { quantity } = response.data;
            setQuantity(quantity); // Actualizar el estado con el valor quantity
          })
          .catch((error) => {
            console.error('Error al obtener el contador:', error);
          });

        // Mascotas perdidas
        axios.get('http://buddy-app.loca.lt/reports/count/losts-actives')
        .then((response) => {
          // Extraer el valor quantity de la respuesta
          const { quantity } = response.data;
          setLostPetsQuantity(quantity); // Actualizar el estado con el valor quantity
        })
        .catch((error) => {
          console.error('Error al obtener el contador:', error);
        });

        // Mascotas adoptadas
        axios.get('http://buddy-app.loca.lt/reports/count/adoptions-success')
        .then((response) => {
          // Extraer el valor quantity de la respuesta
          const { quantity } = response.data;
          setAdoptionQuantity(quantity); // Actualizar el estado con el valor quantity
        })
        .catch((error) => {
          console.error('Error al obtener el contador:', error);
        });
      }, []);

    // Accede al parámetro token
    const { token } = route.params;
    console.log("ESTOY EN el home: "+ token);
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.home}>
                <Image
                    source={require('../Imagenes/logo2.png')}
                    style={styles.logo}
                />
                <MenuHorizontal />
                <View style={[{flexDirection: 'row'}, styles.primeraFila]}>
                    <TouchableOpacity style={styles.boton1}
                        onPress = {()=> (
                            navigation.navigate('BusquedaScreen', {token})
                        )}
                    >
                        <Image
                            source={require('../Imagenes/lupa.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Encontrar mi mascota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boton1}
                        onPress = {()=> (
                            navigation.navigate('AdoptarScreen', {token})
                        )}
                    >
                        <Image
                            source={require('../Imagenes/mascota.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Adoptar una mascota</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{flexDirection: 'row'}, styles.segundaFila]}>
                    <TouchableOpacity style={styles.boton1}>
                        <Image
                            source={require('../Imagenes/perro.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Servicios para mi mascota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boton1}
                    onPress = {()=> (
                        navigation.navigate('MiMascotaScreen', { token })
                    )}
                    
                    >
                        <Image
                            source={require('../Imagenes/huella.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Mi mascota</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{flexDirection: 'row'}, styles.segundaFila]}>
                    <TouchableOpacity style={styles.boton1}
                        onPress = {()=> (
                            navigation.navigate('ParametrizacionScreen', {token})
                        )}
                    >
                        <Image
                            source={require('../Imagenes/configuracion.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Parametrización</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boton1}
                        onPress = {()=> (
                            navigation.navigate('ReportesScreen', {token})
                        )}
                    >
                        <Image
                            source={require('../Imagenes/analitica.png')}
                            style={styles.imagen1}
                        />
                        <Text style={styles.texto}>Reportes</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.informe1,{flexDirection:'row'}]}>
                    <Text style={styles.textoInforme}>Mascotas encontradas</Text>
                    <Text style={styles.textoInforme}>{quantity}</Text>
                </View>
                <View style={[styles.informe2, {flexDirection: 'row'}]}>
                    <Text style={styles.textoInforme}>{adoptionQuantity}</Text>
                    <Text style={styles.textoInforme}>Mascotas adoptadas</Text>
                </View>
                <View style={[styles.informe3,{flexDirection:'row'}]}>
                    <Text style={styles.textoInforme}>Mascotas perdidas</Text>
                    <Text style={styles.textoInforme}>{lostPetsQuantity}</Text>
                </View>
            </View>
        </ScrollView>
      ) 
    }
    
    const styles = StyleSheet.create({
        home: {
            backgroundColor: '#DDC4B8',
            alignItems: 'center',
        },
    
        imagen1: {
            width: 60,
            height: 60,
        },
    
        boton1: {
            width: '35%',
            height: 180,
            backgroundColor: '#ffffff',
            elevation: 10,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
        },
    
        logo: {
            marginTop: 70,
            width: '50%',
            height: '20%',
        },
    
        primeraFila: {
            marginTop: 30,
            marginBottom: 20,
        },
    
        texto: {
            textAlign: 'center',
            fontSize: 16,
            marginTop: 16,
        },
    
        segundaFila: {
            marginBottom: 20,
        },
    
        informe1: {
            backgroundColor: '#8ADC58',
            marginTop: 20,
            marginBottom: 10,
            width: '70%',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
        },
    
        informe2: {
            backgroundColor: '#58DCD4',
            marginTop: 3,
            marginBottom: 10,
            width: '70%',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
        },
    
        informe3: {
            backgroundColor: '#9258DC',
            marginTop: 3,
            marginBottom: 250,
            width: '70%',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
        },
    
        textoInforme: {
            fontSize: 20,
            marginRight: 15,
        },
    
        scroll: {
            height: '100%',
        }
    
    })