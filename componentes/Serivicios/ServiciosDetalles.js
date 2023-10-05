import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RatingModal from './RatingModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BotonMenu from '../BotonMenu';

export default function ServiciosDetalles({ route }) {
  const navigation = useNavigation();
  const { servicio, token, source } = route.params;
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonTransform, setButtonTransform] = useState(0);
  const servicioTitle = source === 'MiPerfil' ? servicio?.[0]?.serviceTitle : servicio?.serviceTitle;
  const servicioDescription = source === 'MiPerfil' ? servicio?.[0]?.serviceDescription : servicio?.serviceDescription;
  const servicioAddress = source === 'MiPerfil' ? servicio?.[0]?.address : servicio?.address;
  const servicioOpenTime = source === 'MiPerfil' ? servicio?.[0]?.openTime : servicio?.openTime;
  const servicioCloseTime = source === 'MiPerfil' ? servicio?.[0]?.closeTime : servicio?.closeTime;

  console.log('servicio: ', servicio);
  console.log('info: ', servicioTitle, servicioAddress, servicioDescription, servicioCloseTime, servicioOpenTime);

  const ratingsImages = {
    1: {
      source: require("../../Imagenes/1estrella.png"),
      style: { width: 40, height: 40, marginLeft: 38 }, // Estilos personalizados para 1 estrella
    },
    2: {
      source: require("../../Imagenes/2estrellas.png"),
      style: { width: 85, height: 40, marginLeft: 20, }, // Estilos personalizados para 2 estrellas
    },
    3: {
      source: require("../../Imagenes/3estrellas.png"),
      style: { width: 135, height: 30 }, // Estilos personalizados para 3 estrellas
    },
    4: {
      source: require("../../Imagenes/4estrellas.png"),
      style: { width: 135, height: 30 }, // Estilos personalizados para 4 estrellas
    },
    5: {
      source: require("../../Imagenes/5estrellas.png"),
      style: { width: 150, height: 30 }, // Estilos personalizados para 5 estrellas
    },
  };


  const handleOpenRatingModal = (serviceId) => {
    // Abre el modal de puntuación y utiliza serviceId según sea necesario
    setRatingModalVisible(true);
    setSelectedServiceId(serviceId); // Si necesitas almacenar el ID seleccionado en el estado
  };

  const handleCloseRatingModal = () => {
    setRatingModalVisible(false);
  };

  const handleRatingModalClose = () => {
    // Puedes cargar nueva información o realizar cualquier otra acción necesaria aquí
    console.log('El modal se ha cerrado, actualizando información...');
  };

  const handleRatingSubmit = (rating) => {
    // Aquí puedes enviar la puntuación al servidor o realizar otras acciones
    console.log('Puntuación enviada:', rating);
  };

  console.log('ServiciosDetalles: ', token);
  console.log('ID Servicio: ', servicio.idService);
  console.log('numberRating: ', servicio.avgRating);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Imagenes/imagenPublicaciones.jpg")}
        style={styles.imagenServicio}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titulo}>{servicioTitle}</Text>
        <TouchableOpacity onPress={() => handleOpenRatingModal(servicio.idService)}>
          <Image
            source={require("../../Imagenes/estrella.png")}
            style={styles.imagenCalificacion}
          />
        </TouchableOpacity>
        <RatingModal
          isVisible={isRatingModalVisible}
          onClose={() => {
            handleCloseRatingModal();
            handleRatingModalClose(); // Llama a la función de actualización
          }}
          onRatingSubmit={handleRatingSubmit}
          idService={servicio.idService}
          token={token}
        />
      </View>
      {servicio.avgRating !== null && ratingsImages[servicio.avgRating] ? (
          <View style={styles.ratingContainer}>
            <Image
              source={ratingsImages[servicio.avgRating].source}
              style={[styles.imagenCalificacionEstrellas, ratingsImages[servicio.avgRating].style]}
            />
          </View>
        ) : null}
      <View style={styles.informacionServicio}>
        <Text style={styles.descripcion}>{servicioDescription}</Text>
        <View style={[styles.informacionFiltros, {flexDirection: 'row'}]}>
            <Image
                source={require("../../Imagenes/posicion.png")}
                style={styles.imagenInformacionFiltros}
            />
            <Text style={styles.textoInformacionFiltros}>{servicioAddress}</Text>
        </View>
        <View style={[styles.informacionFiltros, {flexDirection: 'row'}]}>
            <Image
                source={require("../../Imagenes/reloj.png")}
                style={styles.imagenInformacionFiltros}
            />
            <Text style={styles.textoInformacionFiltros}>{servicioOpenTime} - {servicioCloseTime}</Text>
        </View>
      </View>
      <View
        style={[
          styles.botonFlotanteContainer,
          { transform: [{ translateY: buttonTransform }] },
        ]}
      >
        <BotonMenu token={token} style={styles.contenedorBoton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  imagenServicio: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 15,
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  imagenInformacionFiltros: {
    width: 25,
    height: 25,
  },
  textoInformacionFiltros:{
    marginTop: 5,
    marginLeft: 5,
  },
  informacionServicio: {
    backgroundColor: '#DDC4B8',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    elevation: 5,
    marginTop: 20,
  },
  informacionFiltros: {
    marginTop: 10,
  },
  imagenCalificacion: {
    width: 25,
    height: 25,
    marginTop: 4,
  },
  imagenCalificacionEstrellas: {
    width: 125,
    height: 30,
  },
  ratingContainer:{
    width: '100%',
    marginLeft: '70%',
  },
  botonFlotanteContainer: {
    position: "absolute",
    bottom: 80, // Puedes ajustar esta cantidad según tus preferencias
    right: 20, // Puedes ajustar esta cantidad según tus preferencias
    transform: [{ translateY: 0 }], // Inicialmente no se desplaza
  },
});