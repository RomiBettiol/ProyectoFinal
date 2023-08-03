import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FilterButtonsExample = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el modal de "cargando"
  const [numPublicaciones, setNumPublicaciones] = useState(5); // Estado para controlar la cantidad de publicaciones que se muestran

  const getPublicaciones = () => {
    setLoading(true); // Mostrar el modal de "cargando" antes de hacer la petición

    axios
      .get('http://10.0.2.2:4000/publication/publications?modelType=search', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta exitosa:', response.data.data);
        const infoPublicacion = response.data.data;
        console.log('1', infoPublicacion.data);
        if (infoPublicacion.data && Array.isArray(infoPublicacion.data)) {
          setPublicaciones(infoPublicacion.data);
          console.log('2', infoPublicacion.data);
        } else {
          setPublicaciones([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setPublicaciones([]);
      })
      .finally(() => {
        setLoading(false); // Ocultar el modal de "cargando" después de obtener la respuesta
      });
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(prevFilter => (prevFilter === filter ? '' : filter));
  };

  const formatLostDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const renderItem = ({ item }) => {
    // Verificar si el índice del item es menor que numPublicaciones
    if (publicaciones.indexOf(item) < numPublicaciones) {
      return (
        <View style={styles.itemContainer}>
          <View style={[{ flexDirection: 'row' }, styles.itemInformacion]}>
            <Image
              source={require('../Imagenes/imagenPublicaciones.jpg')}
              style={styles.imagenPublicacion}
            />
            <View style={styles.informacion}>
              <View style={[{ flexDirection: 'row'}, styles.tituloView]}>
                <Text style={styles.tituloPublicaciones}>{item.title}</Text>
                {/* Aquí utilizamos el operador ternario para aplicar el estilo según isFound */}
                <View style={item.isFound ? styles.encontradoStyle : styles.perdidoStyle}>
                  <Text style={styles.textoEstado}>{item.isFound ? 'Encontrado' : 'Perdido'}</Text>
                </View>
              </View>
              <Text style={styles.textoPublicaciones} numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
              <View style={[{ flexDirection: 'row' }, styles.filtros]}>
                <View style={[{ flexDirection: 'row' }, styles.miniFiltros]}>
                  <Image
                    source={require('../Imagenes/marcador-de-posicion.png')}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text>Maipú</Text>
                </View>
                <View style={[{ flexDirection: 'row' }, styles.miniFiltros]}>
                  <Image
                    source={require('../Imagenes/hueso.png')}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text>Caniche</Text>
                </View>
                <View style={[{ flexDirection: 'row' }, styles.miniFiltros]}>
                  <Image
                    source={require('../Imagenes/calendario.png')}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text>{formatLostDate(item.LostDate)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      // Si es mayor o igual a numPublicaciones, no mostrar nada (ocultar la publicación)
      return null;
    }
  };

  const handleLoadMore = () => {
    // Incrementar numPublicaciones en 10
    setNumPublicaciones((prevNum) => prevNum + 10);
  };

  // Llamar a getPublicaciones cuando el componente se monte
  useEffect(() => {
    getPublicaciones();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Perro' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Perro')}
        >
          <Image
            source={require('../Imagenes/perroFiltro.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Perro' && styles.selectedFilterButtonText]}>Perro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Gato' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Gato')}
        >
          <Image
            source={require('../Imagenes/gato.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Gato' && styles.selectedFilterButtonText]}>Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Conejo' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Conejo')}
        >
          <Image
            source={require('../Imagenes/conejo.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Conejo' && styles.selectedFilterButtonText]}>Conejo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'Otros' && styles.selectedFilterButton]}
          onPress={() => handleFilterPress('Otros')}
        >
          <Image
            source={require('../Imagenes/animales.png')}
            style={styles.imagenFiltro}
          />
          <Text style={[styles.filterButtonText, selectedFilter === 'Otros' && styles.selectedFilterButtonText]}>Otros</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={publicaciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.idPublicationSearch}
        />
        {/* Mostrar el botón "Mostrar más publicaciones" solo si hay más de 10 publicaciones */}
        {numPublicaciones < publicaciones.length && (
          <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Mostrar más publicaciones</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Modal de "Cargando" */}
      <Modal visible={loading} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 7,
  },
  selectedFilterButton: {
    backgroundColor: '#DDC4B8',
  },
  filterButtonText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  itemContainer: {
    padding: 1,
    paddingRight: 15,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 15,
    elevation: 4,
  },
  tituloPublicaciones: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginRight: 20,
  },
  imagenFiltro: {
    width: 60,
    height: 60,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  imagenPublicacion: {
    width: 100,
    height: 122,
    borderRadius: 15,
    marginRight: 10,
  },
  imagenFiltroPublicacion: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  filtros: {
    marginTop: 15,
  },
  miniFiltros: {
    marginRight: 10,
  },
  informacion: {
    marginRight: 3,
    flex: 1,
  },
  textoPublicaciones: {
    maxWidth: '100%',
  },
  botones: {
    width: 23,
    height: 23,
  },
  botonesPublicaciones: {
    marginTop: 15,
  },
  margenesBotones: {
    marginRight: 10,
  },
  // Estilos para el View "Encontrado"
  encontradoStyle: {
    backgroundColor: '#CBC2C2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    width: 100,
  },
  // Estilos para el View "Perdido"
  perdidoStyle: {
    backgroundColor: '#58DCD4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    width: 100,
  },
  textoEstado: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  tituloView: {
    marginTop: 15,
    justifyContent: 'space-around',
  },
  loadMoreButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButtonText: {
    fontSize: 16,
  },
});

export default FilterButtonsExample;