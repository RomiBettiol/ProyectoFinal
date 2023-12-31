import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../HeaderScreen';
import Carousel from 'react-native-snap-carousel';

const PublicacionDetalle = ({ route }) => {
  const navigation = useNavigation();
  const publicacion = route.params?.publicacion;

  const carouselImages = [
    require('../../Imagenes/imagenPublicaciones.jpg'),
    require('../../Imagenes/imagenPublicaciones2.jpg'),
  ];

  const formatLostDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return (
    <View>
        <Header />
        <View>
          <Carousel
            data={carouselImages}
            renderItem={({ item }) => (
              <Image source={item} style={styles.imagenPublicacion} />
            )}
            sliderWidth={500}
            itemWidth={500}
          />
        </View>
        <View style={styles.informacion}>
          <View style={[{flexDirection:'row'}, styles.containerIconos]}>
            <TouchableOpacity>
              <Image
                source={require('../../Imagenes/compartir.png')}
                style={styles.iconos}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../Imagenes/direction_gps_location_map_maps_navigation_pin_icon_123206.png')}
                style={styles.iconos}
              />
            </TouchableOpacity>
          </View>
          <View style={[{flexDirection:'row'}, styles.contenedorTitulo]}>
            <Text style={styles.tituloPublicacion}>{publicacion?.title}</Text>
            <TouchableOpacity style={styles.botonInformacion}>
              <Text>¡Tengo info!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerDescripcion}>
            <Text style={styles.descripcionPublicacion}>{publicacion?.description}</Text>
            <View style={[styles.informacionFiltros, {flexDirection:'row'}]}>
              <View style={styles.derecha}>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/marcador-de-posicion.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.locality.localityName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/hueso.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.breed.petBreedName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/dueno.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>Romina Bettiol</Text>
                </View>
              </View>
              <View style={styles.izquierda}>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/paleta-de-color.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.color.petColorName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/huella.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{publicacion?.breed.type.petTypeName}</Text>
                </View>
                <View style={[styles.itemInfoFiltro, {flexDirection:'row'}]}>
                  <Image
                      source={require('../../Imagenes/calendario.png')}
                      style={styles.iconos}
                  />
                  <Text style={styles.texto}>{formatLostDate(publicacion?.lostDate)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    imagenPublicacion: {
        width: '100%',
        height: 380,
    },
    informacion: {
      backgroundColor: '#ffffff',
      height: '100%',
      width: '100%',
      borderRadius: 55,
      position: 'absolute',
      marginTop: 450,
      padding: 30,
      paddingTop: 20,
    },
    tituloPublicacion: {
      fontSize: 22,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    descripcionPublicacion: {
      fontSize: 16,
    },
    iconos: {
      width: 25,
      height: 25,
      marginLeft: 10,
      marginRight: 10,
    },
    containerIconos: {
      marginLeft: '75%',
    },
    containerDescripcion: {
      justifyContent: 'space-between',
      height: 280,
    },
    izquierda: {
      marginLeft: 30,
    },
    itemInfoFiltro: {
      marginTop: 10,
    },
    texto: {
      marginTop: 3,
    },
    informacionFiltros: {
      marginBottom: 25,
    },
    botonInformacion: {
      backgroundColor: 'red',
      padding: 3,
      marginLeft: 10,
      height: 30,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      backgroundColor: '#DDC4B8',
    },
    contenedorTitulo: {
      marginTop: 15,
    }
  });

export default PublicacionDetalle;