import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Header from "../componentes/HeaderScreen";
import axios from "axios";
import ModalEditar from "../componentes/Parametrizacion/ModalEditar";
import ModalEditarColor from "../componentes/Parametrizacion/ModalEditarColor";
import ModalEditarTipoAnimal from "../componentes/Parametrizacion/ModalEditarTipoAnimal";
import ModalEditarRaza from "../componentes/Parametrizacion/ModalEditarRaza";
import ModalAgregarColor from "../componentes/Parametrizacion/ModalAgregarColor";
import ModalAgregarTipoAnimal from "../componentes/Parametrizacion/ModalAgregarTipoAnimal";
import ModalEditarProvincia from "../componentes/Parametrizacion/ModalEditarProvincia";
import ModalAgregarProvincia from "../componentes/Parametrizacion/ModalAgregarProvincia";
import ModalEditarRegion from "../componentes/Parametrizacion/ModalEditarRegion";
import ModalAgregarRegion from "../componentes/Parametrizacion/ModalAgregarRegion";
import ModalAgregarLocalidad from "../componentes/Parametrizacion/ModalAgregarLocalidad";
import ModalAgregarRaza from "../componentes/Parametrizacion/ModalAgregarRaza";
import { useRoute } from "@react-navigation/native";

export default function ParametrizacionScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
  const { permisos } = route.params;
  const [zoneOptions, setZoneOptions] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [petColors, setPetColors] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [petBreeds, setPetBreeds] = useState([]);
  const [isEditColorModalVisible, setEditColorModalVisible] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [isEditTypeModalVisible, setEditTypeModalVisible] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [isEditBreedModalVisible, setEditBreedModalVisible] = useState(false);
  const [editingBreed, setEditingBreed] = useState(null);
  const [isAddColorModalVisible, setAddColorModalVisible] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [isAddTipoAnimalModalVisible, setAddTipoAnimalModalVisible] =
    useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [isEditProvinceModalVisible, setEditProvinceModalVisible] =
    useState(false);
  const [editingProvince, setEditingProvince] = useState(null);
  const [newProvinceName, setNewProvinceName] = useState("");
  const [clima, setClima] = useState("");
  const [extension, setExtension] = useState("");
  const [densidad, setDensidad] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [legsNumber, setLegsNumber] = useState("");
  const [weather, setWeather] = useState("");
  const [coat, setCoat] = useState("");
  const [enviroment, setEnviroment] = useState("");
  const [diet, setDiet] = useState("");
  const [isAddProvinceModalVisible, setAddProvinceModalVisible] =
    useState(false);
  const [regions, setRegions] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [isEditRegionModalVisible, setEditRegionModalVisible] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [isAddRegionModalVisible, setAddRegionModalVisible] = useState(false);
  const [isAddLocalidadModalVisible, setAddLocalidadModalVisible] =
    useState(false);
  const [isAddBreedModalVisible, setAddBreedModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalUpdateVisible, setSuccessModalUpdateVisible] =
    useState(false);
  const [errorModalUpdateVisible, setErrorModalUpdateVisible] = useState(false);
  const [successModalDeleteVisible, setSuccessModalDeleteVisible] =
    useState(false);
  const [errorModalDeleteVisible, setErrorModalDeleteVisible] = useState(false);

  // Cuando la publicación sea exitosa
  const handleSuccessfulRegionPublication = () => {
    setSuccessModalVisible(true);

    // Ocultar el modal de éxito después de 1 segundo
    setTimeout(() => {
      setSuccessModalVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación exitosa aquí
    }, 1000);
  };

  // Cuando la publicación falle
  const handleFailedRegionPublication = () => {
    setErrorModalVisible(true);

    // Ocultar el modal de error después de 1 segundo
    setTimeout(() => {
      setErrorModalVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación fallida aquí
    }, 2000);
  };

  //ACTUALIZACIÓN DE FILTROS

  const handleSuccessfulUpdatePublication = () => {
    setSuccessModalUpdateVisible(true);

    // Ocultar el modal de éxito después de 1 segundo
    setTimeout(() => {
      setSuccessModalUpdateVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación exitosa aquí
    }, 1000);
  };

  const handleFailedUpdatePublication = () => {
    setErrorModalVisible(true);

    // Ocultar el modal de error después de 1 segundo
    setTimeout(() => {
      setErrorModalUpdateVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación fallida aquí
    }, 2000);
  };

  //ELIMINCACIÓN DE FILTROS

  const handleSuccessfulDeletePublication = () => {
    setSuccessModalDeleteVisible(true);

    // Ocultar el modal de éxito después de 1 segundo
    setTimeout(() => {
      setSuccessModalDeleteVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación exitosa aquí
    }, 1000);
  };

  const handleFailedDeleteublication = () => {
    setErrorModalDeleteVisible(true);

    // Ocultar el modal de error después de 1 segundo
    setTimeout(() => {
      setErrorModalDeleteVisible(false);
      // Puedes hacer otras acciones relacionadas con la publicación fallida aquí
    }, 2000);
  };

  const handleRegionAdd = (newRegion) => {
    const updatedRegions = [...regions, newRegion];
    setRegions(updatedRegions);
  };

  const toggleAddRegionModal = () => {
    setAddRegionModalVisible(!isAddRegionModalVisible);
  };

  const handleLocalidadAdd = (newLocalidad) => {
    const updatedLocalidades = [...localidades, newLocalidad];
    setLocalidades(updatedLocalidades);
    getZonas();
  };

  const toggleAddLocalidadModal = () => {
    setAddLocalidadModalVisible(!isAddLocalidadModalVisible);
  };

  const toggleAddBreedModal = () => {
    setAddBreedModalVisible(!isAddBreedModalVisible);
  };

  const handleAddBreed = (newBreed) => {
    const updatedBreeds = [...petBreeds, newBreed];
    setPetBreeds(updatedBreeds);
  };

  const handleAddProvince = (provinceData) => {
    const newProvince = {
      provinceName: provinceData.nombre,
      idCountry: "c4e7c89c-dcdb-4e27-90af-0123456789aa",
      weather: provinceData.clima,
      surface: provinceData.extension,
      populationDensity: provinceData.densidad,
      population: provinceData.poblacion
    };
  
    axios
      .post("https://romibettiol.loca.lt/parameters/province/", newProvince, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        setSuccessModalVisible(true); // Mostrar el modal de éxito
        getProvinces(); // Actualizar la lista de provincias después de agregar
        console.log(newProvince);
        // Ocultar el modal de éxito después de 1 segundo
        setTimeout(() => {
          setSuccessModalVisible(false);
        }, 1000);
      })
      .catch((error) => {
        setErrorModalVisible(true); // Mostrar el modal de error
        console.log(newProvince);
        // Ocultar el modal de error después de 2 segundos
        setTimeout(() => {
          setErrorModalVisible(false);
        }, 2000);
      });
  };

  const handleAddType = (tipoAnimalData) => {
    const newType = {
      petTypeName: tipoAnimalData.nombre,
      weather: tipoAnimalData.weather,
      legsNumber: tipoAnimalData.legsNumber,
      diet: tipoAnimalData.diet,
      enviroment: tipoAnimalData.enviroment,
      coat: tipoAnimalData.coat,
      weather: tipoAnimalData.weather,
    };

    axios
      .post("https://romibettiol.loca.lt/parameters/petType/", newType, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        //console.log('Tipo de animal agregado exitosamente:', response.data);
        setSuccessModalVisible(true); // Mostrar el modal de éxito
        getPetTypes(); // Actualizar la lista de tipos de animales después de agregar
        console.log(newType);
        // Ocultar el modal de éxito después de 1 segundo
        setTimeout(() => {
          setSuccessModalVisible(false);
        }, 1000);
      })
      .catch((error) => {
        //console.error('Error al agregar tipo de animal:', error);
        setErrorModalVisible(true); // Mostrar el modal de error
        console.log(newType)
        // Ocultar el modal de error después de 2 segundos
        setTimeout(() => {
          setErrorModalVisible(false);
        }, 2000);
      });
  };

  const handleAddColor = (newColorName) => {
    const newColor = {
      petColorName: newColorName,
    };

    axios
      .post("https://romibettiol.loca.lt/parameters/petColor/", newColor, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        getPetColors(); // Actualizar la lista de colores después de agregar
        setSuccessModalVisible(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          setSuccessModalVisible(false);
        }, 1000);
      })
      .catch((error) => {
        //console.error('Error al agregar color:', error);
        setErrorModalVisible(true); // Mostrar el modal de error
        setTimeout(() => {
          setErrorModalVisible(false);
        }, 2000); // Puedes ajustar el tiempo según tus preferencias
      });
  };

  const handleZoneDelete = (zoneId) => {
    axios
      .delete(`https://romibettiol.loca.lt/parameters/locality/${zoneId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getZonas();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE:", error);
        handleFailedDeleteublication();
      });
  };

  const handleBreedDelete = async (breedId) => {
    console.log("ID:", breedId);
    await axios
      .delete(`https://romibettiol.loca.lt/parameters/petBreed/${breedId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getPetBreeds();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE de raza:", error);
        handleFailedDeleteublication();
      });
  };

  const handleColorDelete = (colorId) => {
    axios
      .delete(`https://romibettiol.loca.lt/parameters/petColor/${colorId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getPetColors();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE de color:", error);
        handleFailedDeleteublication();
      });
  };

  const handleTypeDelete = (typeId) => {
    axios
      .delete(`https://romibettiol.loca.lt/parameters/petType/${typeId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getPetTypes();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE de tipo de animal:", error);
        handleFailedDeleteublication();
      });
  };

  const handleProvinceDelete = (provinceId) => {
    axios
      .delete(`https://romibettiol.loca.lt/parameters/province/${provinceId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getProvinces();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE de provincia:", error);
        handleFailedDeleteublication();
      });
  };

  const handleRegionDelete = (regionId) => {
    axios
      .delete(`https://romibettiol.loca.lt/parameters/region/${regionId}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        handleSuccessfulDeletePublication();
        getRegions();
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE de región:", error);
        handleFailedDeleteublication();
      });
  };

  const handleEditRegionPress = (region) => {
    setEditingRegion(region);
    setEditRegionModalVisible(true);
  };

  const handleEditProvincePress = (province) => {
    setEditingProvince(province);
    setEditProvinceModalVisible(true);
  };

  const handleEditPress = (zone) => {
    setEditingZone(zone);
    setModalVisible(true);
  };

  const handleColorEditPress = (color) => {
    setEditingColor(color);
    setEditColorModalVisible(true);
  };

  const handleTypeEditPress = (type) => {
    setEditingType(type);
    setEditTypeModalVisible(true);
  };

  const handleBreedEditPress = (breed) => {
    setEditingBreed(breed);
    setEditBreedModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleZoneEdit = (editedLocality) => {
    const updatedZones = zoneOptions.map((zone) =>
      zone.localityName === editingZone.localityName
        ? { ...zone, localityName: editedLocality }
        : zone
    );
    setZoneOptions(updatedZones); // Actualizar la lista con el valor editado
  };

  const handleColorEdit = (editedColorName) => {
    const updatedColors = petColors.map((color) =>
      color.idPetColor === editingColor.idPetColor
        ? { ...color, petColorName: editedColorName }
        : color
    );
    setPetColors(updatedColors);
  };

  const handleTypeEdit = (editedTypeName) => {
    const updatedTypes = petTypes.map((type) =>
      type.idPetType === editingType.idPetType
        ? { ...type, petTypeName: editedTypeName }
        : type
    );
    setPetTypes(updatedTypes);
  };

  const handleBreedEdit = (editedBreedName) => {
    const updatedBreeds = petBreeds.map((breed) =>
      breed.idPetBreed === editingBreed.idPetBreed
        ? { ...breed, petBreedName: editedBreedName }
        : breed
    );
    setPetBreeds(updatedBreeds);
  };

  const handleProvinceEdit = (editedProvinceName) => {
    const updatedProvinces = provinces.map((province) =>
      province.idProvince === editingProvince.idProvince
        ? { ...province, provinceName: editedProvinceName }
        : province
    );
    setProvinces(updatedProvinces);
  };

  const handleRegionEdit = (editedRegionName) => {
    const updatedRegions = regions.map((region) =>
      region.idRegion === editingRegion.idRegion
        ? { ...region, regionName: editedRegionName }
        : region
    );
    setRegions(updatedRegions);
  };

  const getZonas = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/locality/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response.data.localities);
        const localities = response.data.localities;
        if (localities && Array.isArray(localities)) {
          setZoneOptions(localities);
        } else {
          setZoneOptions([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET:", error);
        setZoneOptions([]);
      });
  };

  const getPetColors = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/petColor/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        const colors = response.data.petColors;
        if (colors && Array.isArray(colors)) {
          setPetColors(colors);
        } else {
          setPetColors([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET de colores:", error);
        setPetColors([]);
      });
  };

  const getPetTypes = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/petType/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        const types = response.data.petTypes;
        if (types && Array.isArray(types)) {
          setPetTypes(types);
        } else {
          setPetTypes([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET de tipos de animales:", error);
        setPetTypes([]);
      });
  };

  const getPetBreeds = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/petBreed/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        const breeds = response.data.petBreeds;
        if (breeds && Array.isArray(breeds)) {
          setPetBreeds(breeds);
        } else {
          setPetBreeds([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET de razas de animales:", error);
        setPetBreeds([]);
      });
  };

  const getProvinces = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/province/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        const fetchedProvinces = response.data.provinces;
        if (fetchedProvinces && Array.isArray(fetchedProvinces)) {
          setProvinces(fetchedProvinces);
        } else {
          setProvinces([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET de provincias:", error);
        setProvinces([]);
      });
  };

  const getRegions = () => {
    axios
      .get("https://romibettiol.loca.lt/parameters/region/", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        const fetchedRegions = response.data.regions;
        if (fetchedRegions && Array.isArray(fetchedRegions)) {
          setRegions(fetchedRegions);
        } else {
          setRegions([]);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud GET de regiones:", error);
        setRegions([]);
      });
  };

  useEffect(() => {
    getZonas();
    getPetColors();
    getPetTypes();
    getPetBreeds();
    getProvinces();
    getRegions();
  }, [permisos]);

  return (
    <ScrollView>
      <Header />
      <Text style={styles.titulo}>Parametrización de filtros</Text>
      <ScrollView style={styles.scrollView}>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/perroFiltro.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Razas</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity onPress={toggleAddBreedModal}>
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {petBreeds.map((breed, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{breed.petBreedName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      onPress={() => handleBreedEditPress(breed)}
                    >
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleBreedDelete(breed.idPetBreed)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/paleta-de-color.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Colores</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity onPress={() => setAddColorModalVisible(true)}>
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {petColors.map((color, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{color.petColorName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      onPress={() => handleColorEditPress(color)}
                    >
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleColorDelete(color.idPetColor)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/huella.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Tipo animal</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity
              onPress={() => setAddTipoAnimalModalVisible(true)}
            >
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {petTypes.map((type, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{type.petTypeName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity onPress={() => handleTypeEditPress(type)}>
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleTypeDelete(type.idPetType)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/marcador-de-posicion.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Provincias</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity onPress={() => setAddProvinceModalVisible(true)}>
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {provinces.map((province, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{province.provinceName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      onPress={() => handleEditProvincePress(province)}
                    >
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleProvinceDelete(province.idProvince)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/marcador-de-posicion.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Zona</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity onPress={toggleAddLocalidadModal}>
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {zoneOptions.map((zone, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{zone.localityName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity onPress={() => handleEditPress(zone)}>
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleZoneDelete(zone.idLocality)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: "row" }, styles.filtrosZona]}>
          <Image
            source={require("../Imagenes/marcador-de-posicion.png")}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Departamentos</Text>
          {permisos.includes("WRITE_PARAMETROS") && (
            <TouchableOpacity onPress={toggleAddRegionModal}>
              <Image
                source={require("../Imagenes/agregar.png")}
                style={styles.imagenAgregar}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerItem}>
          {regions.map((region, index) => (
            <View key={index} style={styles.containerTexto}>
              <View style={[{ justifyContent: "center", marginLeft: 10 }]}>
                <Text style={styles.zoneItem}>{region.regionName}</Text>
              </View>
              <View
                style={[
                  { alignItems: "flex-end", flex: 1, justifyContent: "center" },
                ]}
              >
                {permisos.includes("WRITE_PARAMETROS") && (
                  <View style={[styles.botones, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      onPress={() => handleEditRegionPress(region)}
                    >
                      <Image
                        source={require("../Imagenes/editar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRegionDelete(region.idRegion)}
                    >
                      <Image
                        source={require("../Imagenes/eliminar.png")}
                        style={styles.imagenbotones}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ModalEditar
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onEdit={handleZoneEdit}
        editingZone={editingZone}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalEditarColor
        isVisible={isEditColorModalVisible}
        onClose={() => setEditColorModalVisible(false)}
        onEdit={handleColorEdit}
        editingColor={editingColor}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalEditarTipoAnimal
        isVisible={isEditTypeModalVisible}
        onClose={() => setEditTypeModalVisible(false)}
        onEdit={handleTypeEdit}
        editingType={editingType}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalEditarRaza
        isVisible={isEditBreedModalVisible}
        onClose={() => setEditBreedModalVisible(false)}
        onEdit={handleBreedEdit}
        editingBreed={editingBreed}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalAgregarColor
        isVisible={isAddColorModalVisible}
        onClose={() => setAddColorModalVisible(false)}
        onAdd={handleAddColor}
        newColorName={newColorName}
        setNewColorName={setNewColorName}
        token={token}
      />
      <ModalAgregarTipoAnimal
        isVisible={isAddTipoAnimalModalVisible}
        onClose={() => setAddTipoAnimalModalVisible(false)}
        onAdd={handleAddType}
        newTypeName={newTypeName}
        setNewTypeName={setNewTypeName}
        legsNumber={legsNumber}
        setLegsNumber={setLegsNumber}
        diet={diet}
        setDiet={setDiet}
        enviroment={enviroment}
        setEnviroment={setEnviroment}
        coat={coat}
        setCoat={setCoat}
        weather={weather}
        setWeather={setWeather}
        token={token}
      />
      <ModalEditarProvincia
        isVisible={isEditProvinceModalVisible}
        onClose={() => setEditProvinceModalVisible(false)}
        onEdit={handleProvinceEdit}
        editingProvince={editingProvince}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalAgregarProvincia
        isVisible={isAddProvinceModalVisible}
        onClose={() => setAddProvinceModalVisible(false)}
        onAdd={handleAddProvince}
        newProvinceName={newProvinceName}
        setNewProvinceName={setNewProvinceName}
        clima={clima} // Asegúrate de pasar el estado clima
        setClima={setClima} // Asegúrate de pasar la función para actualizar el estado clima
        extension={extension} // Asegúrate de pasar el estado extension
        setExtension={setExtension} // Asegúrate de pasar la función para actualizar el estado extension
        densidad={densidad} // Asegúrate de pasar el estado densidad
        setDensidad={setDensidad} // Asegúrate de pasar la función para actualizar el estado densidad
        poblacion={poblacion} // Asegúrate de pasar el estado densidad
        setPoblacion={setPoblacion}
        token={token}
      />
      <ModalEditarRegion
        isVisible={isEditRegionModalVisible}
        onClose={() => setEditRegionModalVisible(false)}
        onEdit={handleRegionEdit}
        editingRegion={editingRegion}
        onSuccessUpdate={handleSuccessfulUpdatePublication}
        onErrorUpdate={handleFailedUpdatePublication}
        token={token}
      />
      <ModalAgregarRegion
        isVisible={isAddRegionModalVisible}
        onClose={toggleAddRegionModal}
        onAdd={handleRegionAdd}
        provinces={provinces}
        onSuccess={handleSuccessfulRegionPublication}
        onError={handleFailedRegionPublication}
        token={token}
      />
      <ModalAgregarLocalidad
        isVisible={isAddLocalidadModalVisible}
        onClose={toggleAddLocalidadModal}
        onAdd={handleLocalidadAdd}
        regions={regions}
        onSuccess={handleSuccessfulRegionPublication}
        onError={handleFailedRegionPublication}
        token={token}
      />
      <ModalAgregarRaza
        isVisible={isAddBreedModalVisible}
        onClose={toggleAddBreedModal}
        onAdd={handleAddBreed}
        petTypes={petTypes}
        onSuccess={handleSuccessfulRegionPublication}
        onError={handleFailedRegionPublication}
        token={token}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModal}>
          <Text style={styles.modalText}>¡Agregado con éxito!</Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.errorModal}>
          <Text style={styles.modalText}>
            No se ha agregado, intente de nuevo.
          </Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalUpdateVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModal}>
          <Text style={styles.modalText}>¡Actualizado con éxito!</Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalUpdateVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.errorModal}>
          <Text style={styles.modalText}>
            No se ha actualizado, intente de nuevo.
          </Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalDeleteVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModal}>
          <Text style={styles.modalText}>¡Eliminado con éxito!</Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalDeleteVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.errorModal}>
          <Text style={styles.modalText}>
            No se ha eliminado, intente de nuevo.
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 6,
  },
  imagenTitulo: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 5,
  },
  nombreFiltros: {
    fontSize: 20,
    marginTop: 15,
    marginRight: 30,
  },
  filtrosZona: {
    marginTop: 25,
    marginLeft: 25,
  },
  imagenAgregar: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
  zoneItem: {
    fontSize: 16,
  },
  imagenbotones: {
    // flex: 1,
    // alignSelf: "flex-end",
    width: 20,
    height: 20,
    marginRight: 8,
  },
  botones: {
    marginLeft: 30,
    marginTop: 2,
  },
  containerTexto: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DDC4B8",
    width: "90%",
    height: 30,
    marginTop: 10,
  },
  containerItem: {
    flex: 1,
    alignItems: "center",
  },
  successModal: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  errorModal: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  modalText: {
    color: "white",
    textAlign: "center",
  },
});
