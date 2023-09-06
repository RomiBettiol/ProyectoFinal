import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal, ActivityIndicator} from 'react-native';
import SearchBarExample from './BarraBusqueda';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FiltrarModal from './FiltrarModal';

const FilterButtonsExample = () => {
  const buddyUrl = 'budy-app.loca.lt';
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [numPublicaciones, setNumPublicaciones] = useState(5);
  const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);

  const applyFilters = () => {
    setLoading(true);
  
    // Lógica para filtrar las publicaciones
    let filteredData = publicaciones;
  
    if (selectedColor) {
      filteredData = filteredData.filter(item => item.color.idPetColor === selectedColor);
    }
  
    if (selectedFilter) {
      filteredData = filteredData.filter(item => item.breed.type.petTypeName.toLowerCase() === selectedFilter.toLowerCase());
    }
  
    // Actualizar el estado de las publicaciones filtradas
    setFilteredPublicaciones(filteredData);
    setLoading(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchText) => {
      // Filtrar las publicaciones en base al texto de búsqueda
      const filteredData = publicaciones.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilteredPublicaciones(filteredData);
    };

    const getPublicaciones = () => {
      setLoading(true);
    
      axios
        .get('https://buddy-app1.loca.lt/publications/publication?modelType=search', {
          headers: {
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder':''
          },
        })
        .then((response) => {
          console.log('Respuesta exitosa:', response.data);
          const infoPublicacion = response.data;
          if (infoPublicacion && Array.isArray(infoPublicacion)) {
            setPublicaciones(infoPublicacion);
    
            // Filtrar las publicaciones por color si se ha seleccionado un color
            if (selectedColor) {
              const filteredByColor = infoPublicacion.filter((item) =>
                item.color.idPetColor === selectedColor
              );
              setFilteredPublicaciones(filteredByColor);
            }
            // Si no se ha seleccionado un color, proceder con el filtrado por tipo de animal
            else if (selectedFilter) {
              const filteredData = infoPublicacion.filter((item) =>
                item.breed.type.petTypeName.toLowerCase() === selectedFilter.toLowerCase()
              );
              setFilteredPublicaciones(filteredData);
            }
          } else {
            setPublicaciones([]);
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud GET:', error);
          setPublicaciones([]);
        })
        .finally(() => {
          setLoading(false);
        });
    };   

    const handleFilterPress = (filter) => {
      console.log("Selected Filter:", filter); // Verifica el valor de selectedFilter
      setSelectedAnimalType(null);
      setSelectedColor(null);
    
      if (selectedFilter === filter) {
        setSelectedFilter('');
        setFilteredPublicaciones([]);
      } else if (filter === 'Otros') {
        setSelectedFilter(filter);
        const filteredData = filterByOtherAnimals(publicaciones); // Filtrar publicaciones por "Otros"
        console.log("Filtered Data:", filteredData); // Verifica el contenido de filteredData
        setFilteredPublicaciones(filteredData);
      } else {
        setSelectedFilter(filter);
        const filteredData = publicaciones.filter((item) =>
          item.breed.type.petTypeName.toUpperCase() === filter.toUpperCase()
        );
        setFilteredPublicaciones(filteredData);
      }
    };    
    
    const filterByOtherAnimals = (data) => {
      console.log("filterByOtherAnimals function called");
      const animalTypesToExclude = ['PERRO', 'GATO', 'CONEJO'];
      return data.filter(item => !animalTypesToExclude.includes(item.breed.type.petTypeName.toUpperCase()));
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
        <TouchableOpacity style={styles.itemContainer}
          onPress = {()=> (
            navigation.navigate('PublicacionDetalle', { publicacion: item })
          )}
        >
          <View style={[{ flexDirection: 'row' }, styles.itemInformacion]}>
          {imageUri && <Image source={{ uri: imageUri }} />}
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
                  <Text style={styles.texto1}>{item.locality.localityName}</Text>
                </View>
                <View style={[{ flexDirection: 'row' }, styles.miniFiltros]}>
                  <Image
                    source={require('../Imagenes/hueso.png')}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text style={styles.texto1}>{item.breed.petBreedName}</Text>
                </View>
              </View>
                <View style={[{ flexDirection: 'row' }, styles.miniFiltrosFecha]}>
                  <Image
                    source={require('../Imagenes/calendario.png')}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text style={styles.texto1}>{formatLostDate(item.lostDate)}</Text>
                </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
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

  const clearFilters = () => {
    setSelectedFilter('');
    setSelectedAnimalType(null);
    setSelectedColor(null);
  };
  
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
      <View style={[styles.container3,{ flexDirection: 'row' }]}>
        <SearchBarExample data={publicaciones} onSearch={handleSearch} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
              source={require('../Imagenes/filtrar.png')}
              style={styles.imagenFiltrar}
            />
        </TouchableOpacity>
        <FiltrarModal modalVisible={modalVisible} closeModal={closeModal} />
      </View>
      <View>
      <FlatList
          data={filteredPublicaciones.length > 0 ? filteredPublicaciones : publicaciones}
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
      <FiltrarModal modalVisible={modalVisible} closeModal={closeModal} applyFilters={applyFilters} />
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
    height: 155,
    borderRadius: 15,
    marginRight: 10,
  },
  imagenFiltroPublicacion: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filtros: {
    marginTop: 15,
  },
  miniFiltros: {
    marginRight: 10,
  },
  miniFiltrosFecha:{
    marginTop: 10,
    marginBottom: 10,
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
  texto1: {
    fontSize:12,
  },
  imagenFiltrar: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});

export default FilterButtonsExample;