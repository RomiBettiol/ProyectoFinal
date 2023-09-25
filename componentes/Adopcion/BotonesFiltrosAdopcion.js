import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import SearchBarExample from "../BarraBusqueda";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const BotonesFiltrosAdopcion = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPublicaciones, setNumPublicaciones] = useState(5);
  const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [localities, setLocalities] = useState([]);
  const [petColors, setPetColors] = useState([]);
  const [colorsModalVisible, setColorsModalVisible] = useState([]);
  const [breedModalVisible, setBreedModalVisible] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [filtrosExtraVisible, setFiltrosExtraVisible] = useState(false);

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
    filterByBreed(breed);
    setBreedModalVisible(false);
  };

  const filterByBreed = (breed) => {
    setLoading(true);

    // Filtra las publicaciones en base a la raza
    const filteredData = publicaciones.filter(
      (item) => item.petBreed.petBreedName === breed
    );

    setFilteredPublicaciones(filteredData);
    setLoading(false);
  };

  const handleColorChange = (color) => {
    if (color === "Todos los colores") {
      setSelectedColor(null);
      setFilteredPublicaciones(publicaciones);
    } else {
      setSelectedColor(color);
      filterByColor(color);
    }
    setColorsModalVisible(false);
  };

  const handleLocalityChange = (locality) => {
    setSelectedLocality(locality);
    filterByLocality(locality); // Llama a una función para filtrar las publicaciones por la localidad seleccionada
    setModalVisible(false); // Cierra el modal después de seleccionar una localidad
  };

  const filterByLocality = (locality) => {
    setLoading(true);

    // Filtra las publicaciones en base a la localidad
    const filteredData = publicaciones.filter(
      (item) => item.locality.localityName === locality
    );

    // Actualiza el estado de las publicaciones filtradas
    setFilteredPublicaciones(filteredData);
    setLoading(false);
  };

  const filterByColor = (selectedColor) => {
    setLoading(true);

    const filteredData = publicaciones.filter((item) => {
      if (item.petcolor && item.petcolor.petColorName) {
        return (
          item.petcolor.petColorName.toUpperCase() ===
          selectedColor.toUpperCase()
        );
      }
      return false;
    });

    setFilteredPublicaciones(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    getPublicaciones();
  }, [selectedColor]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener las zonas desde el backend
    axios
      .get(` https://e860-181-91-230-36.ngrok-free.app/parameters/locality/`)
      .then((response) => {
        if (response.data && response.data.localities) {
          setLocalities(response.data.localities);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las zonas desde el backend:", error);
      });
  }, [URL]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los colores desde el backend
    axios
      .get(` https://e860-181-91-230-36.ngrok-free.app/parameters/petColor/`)
      .then((response) => {
        if (response.data && response.data.petColors) {
          setPetColors(response.data.petColors);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los colores desde el backend:", error);
      });
  }, [URL]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener las razas desde el backend
    axios
      .get(` https://e860-181-91-230-36.ngrok-free.app/parameters/petBreed/`)
      .then((response) => {
        if (response.data && response.data.petBreeds) {
          setAvailableBreeds(
            response.data.petBreeds.map((breed) => breed.petBreedName)
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener las razas desde el backend:", error);
      });
  }, [URL]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchText) => {
    // Filtrar las publicaciones en base al texto de búsqueda
    const filteredData = publicaciones.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Actualizar el estado con las publicaciones filtradas
    setFilteredPublicaciones(filteredData);
  };

  const getPublicaciones = () => {
    setLoading(true);

    axios
      .get(
        ` https://e860-181-91-230-36.ngrok-free.app/publications/publication?modelType=adoption`,
        {
          headers: {
            "Content-Type": "application/json",
            "Bypass-Tunnel-Reminder": "",
          },
        }
      )
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setPublicaciones(response.data);
          if (selectedColor) {
            filterByColor(selectedColor);
          }
        } else {
          setPublicaciones([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET:", error);
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
      setSelectedFilter("");
      setFilteredPublicaciones([]);
    } else if (filter === "Otros") {
      setSelectedFilter(filter);
      const filteredData = filterByOtherAnimals(publicaciones); // Filtrar publicaciones por "Otros"
      console.log("Filtered Data:", filteredData); // Verifica el contenido de filteredData
      setFilteredPublicaciones(filteredData);
    } else {
      setSelectedFilter(filter);
      const filteredData = publicaciones.filter(
        (item) =>
          item.petBreed.petType.petTypeName.toUpperCase() ===
          filter.toUpperCase()
      );
      setFilteredPublicaciones(filteredData);
    }
  };

  const filterByOtherAnimals = (data) => {
    console.log("filterByOtherAnimals function called");
    const animalTypesToExclude = ["PERRO", "GATO", "CONEJO"];
    return data.filter(
      (item) =>
        !animalTypesToExclude.includes(
          item.petBreed.petType.petTypeName.toUpperCase()
        )
    );
  };

  const renderItem = ({ item }) => {
    // Verificar si el índice del item es menor que numPublicaciones
    if (publicaciones.indexOf(item) < numPublicaciones) {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate("PublicacionDetalleAdopcion", {
              publicacion: item,
            })
          }
        >
          <View style={[{ flexDirection: "row" }, styles.itemInformacion]}>
            {imageUri && <Image source={{ uri: imageUri }} />}
            <Image
              source={require("../../Imagenes/imagenPublicaciones.jpg")}
              style={styles.imagenPublicacion}
            />
            <View style={styles.informacion}>
              <View style={[{ flexDirection: "row" }, styles.tituloView]}>
                <Text style={styles.tituloPublicaciones}>{item.title}</Text>
              </View>
              <Text
                style={styles.textoPublicaciones}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
              <View style={[{ flexDirection: "row" }, styles.filtros]}>
                <View style={[{ flexDirection: "row" }, styles.miniFiltros]}>
                  <Image
                    source={require("../../Imagenes/marcador-de-posicion.png")}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text style={styles.texto1}>
                    {item.locality.localityName}
                  </Text>
                </View>
                <View style={[{ flexDirection: "row" }, styles.miniFiltros]}>
                  <Image
                    source={require("../../Imagenes/hueso.png")}
                    style={styles.imagenFiltroPublicacion}
                  />
                  <Text style={styles.texto1}>
                    {item.petBreed.petBreedName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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

  const clearFilters = () => {
    setSelectedFilter("");
    setSelectedAnimalType(null);
    setSelectedColor(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Perro" && styles.selectedFilterButton,
          ]}
          onPress={() => handleFilterPress("Perro")}
        >
          <Image
            source={require("../../Imagenes/perroFiltro.png")}
            style={styles.imagenFiltro}
          />
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Perro" && styles.selectedFilterButtonText,
            ]}
          >
            Perro
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Gato" && styles.selectedFilterButton,
          ]}
          onPress={() => handleFilterPress("Gato")}
        >
          <Image
            source={require("../../Imagenes/gato.png")}
            style={styles.imagenFiltro}
          />
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Gato" && styles.selectedFilterButtonText,
            ]}
          >
            Gato
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Conejo" && styles.selectedFilterButton,
          ]}
          onPress={() => handleFilterPress("Conejo")}
        >
          <Image
            source={require("../../Imagenes/conejo.png")}
            style={styles.imagenFiltro}
          />
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Conejo" && styles.selectedFilterButtonText,
            ]}
          >
            Conejo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Otros" && styles.selectedFilterButton,
          ]}
          onPress={() => handleFilterPress("Otros")}
        >
          <Image
            source={require("../../Imagenes/animales.png")}
            style={styles.imagenFiltro}
          />
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Otros" && styles.selectedFilterButtonText,
            ]}
          >
            Otros
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        {filtrosExtraVisible && (
          <View style={[{ flexDirection: "row" }, styles.filtrosExtra]}>
            <Image
              source={require("../../Imagenes/filtrar.png")}
              style={styles.iconoFiltro}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Zona</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Modal para seleccionar la localidad */}
        <Modal visible={modalVisible} transparent>
          <View style={styles.modalContainerFiltro}>
            <View style={styles.modalContentFiltro}>
              <Text style={styles.modalTitle}>Selecciona una localidad:</Text>
              <FlatList
                data={[
                  "Todas las localidades",
                  ...localities.map((item) => item.localityName),
                ]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleLocalityChange(item)}>
                    <Text style={styles.localityOption}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {filtrosExtraVisible && (
          <View style={[{ flexDirection: "row" }, styles.filtrosExtra]}>
            <Image
              source={require("../../Imagenes/filtrar.png")}
              style={styles.iconoFiltro}
            />
            <TouchableOpacity onPress={() => setColorsModalVisible(true)}>
              <Text>Colores</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal para seleccionar colores */}
        <Modal visible={colorsModalVisible} transparent>
          <View style={styles.modalContainerFiltro}>
            <View style={styles.modalContentFiltro}>
              <Text style={styles.modalTitle}>Selecciona un color:</Text>
              <FlatList
                data={[
                  "Todos los colores",
                  ...petColors.map((color) => color.petColorName),
                ]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleColorChange(item)}>
                    <Text style={styles.colorOption}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity onPress={() => setColorsModalVisible(false)}>
                <Text style={styles.closeModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {filtrosExtraVisible && (
          <View style={[{ flexDirection: "row" }, styles.filtrosExtra]}>
            <Image
              source={require("../../Imagenes/filtrar.png")}
              style={styles.iconoFiltro}
            />
            <TouchableOpacity onPress={() => setBreedModalVisible(true)}>
              <Text>Razas</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal visible={breedModalVisible} transparent>
          <View style={styles.modalContainerFiltro}>
            <View style={styles.modalContentFiltro}>
              <Text style={styles.modalTitle}>Selecciona una raza:</Text>
              <FlatList
                data={["Todas las razas", ...availableBreeds]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleBreedChange(item)}>
                    <Text style={styles.breedOption}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity onPress={() => setBreedModalVisible(false)}>
                <Text style={styles.closeModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={[styles.container3, { flexDirection: "row" }]}>
        <SearchBarExample data={publicaciones} onSearch={handleSearch} />
        <TouchableOpacity
          onPress={() => setFiltrosExtraVisible(!filtrosExtraVisible)}
        >
          <Image
            source={require("../../Imagenes/filtros.png")}
            style={styles.imagenFiltrar}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={
            filteredPublicaciones.length > 0
              ? filteredPublicaciones
              : publicaciones
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.idPublicationSearch}
        />
        {/* Mostrar el botón "Mostrar más publicaciones" solo si hay más de 10 publicaciones */}
        {numPublicaciones < publicaciones.length && (
          <TouchableOpacity
            onPress={handleLoadMore}
            style={styles.loadMoreButton}
          >
            <Text style={styles.loadMoreButtonText}>
              Mostrar más publicaciones
            </Text>
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    elevation: 7,
  },
  selectedFilterButton: {
    backgroundColor: "#DDC4B8",
  },
  filterButtonText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  itemContainer: {
    padding: 1,
    paddingRight: 15,
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 15,
    elevation: 4,
  },
  tituloPublicaciones: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imagenFiltro: {
    width: 60,
    height: 60,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  imagenPublicacion: {
    width: 100,
    height: 110,
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
  miniFiltrosFecha: {
    marginTop: 10,
    marginBottom: 10,
  },
  informacion: {
    marginRight: 3,
    flex: 1,
  },
  textoPublicaciones: {
    maxWidth: "100%",
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
    backgroundColor: "#CBC2C2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    width: 100,
  },
  // Estilos para el View "Perdido"
  perdidoStyle: {
    backgroundColor: "#58DCD4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    width: 100,
  },
  textoEstado: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  tituloView: {
    marginTop: 15,
    justifyContent: "flex-start",
  },
  loadMoreButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadMoreButtonText: {
    fontSize: 16,
  },
  texto1: {
    fontSize: 12,
  },
  imagenFiltrar: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  iconoFiltro: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  filtrosExtra: {
    backgroundColor: "#DDC4B8",
    marginLeft: 22,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 25,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 5,
  },
  modalContainerFiltro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentFiltro: {
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
    // Cambia la altura máxima del modal a un valor máximo (puedes ajustar esto según tus necesidades)
    maxHeight: "30%",
    // Agrega flex para que el contenido del modal ajuste su altura automáticamente
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  localityOption: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  colorOption: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  breedOption: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  closeModalText: {
    backgroundColor: "#DDC4B8",
    width: "50%",
    height: 20,
    borderRadius: 10,
    textAlign: "center",
    marginLeft: 40,
  },
});

export default BotonesFiltrosAdopcion;
