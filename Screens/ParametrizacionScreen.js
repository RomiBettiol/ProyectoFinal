import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Header from '../componentes/HeaderScreen';
import axios from 'axios';
import ModalEditar from '../componentes/Parametrizacion/ModalEditar';
import ModalEditarColor from '../componentes/Parametrizacion/ModalEditarColor';
import ModalEditarTipoAnimal from '../componentes/Parametrizacion/ModalEditarTipoAnimal';
import ModalEditarRaza from '../componentes/Parametrizacion/ModalEditarRaza';
import ModalAgregarColor from '../componentes/Parametrizacion/ModalAgregarColor';
import ModalAgregarTipoAnimal from '../componentes/Parametrizacion/ModalAgregarTipoAnimal';
import ModalEditarProvincia from '../componentes/Parametrizacion/ModalEditarProvincia';
import ModalAgregarProvincia from '../componentes/Parametrizacion/ModalAgregarProvincia';
import ModalEditarRegion from '../componentes/Parametrizacion/ModalEditarRegion';
import ModalAgregarRegion from '../componentes/Parametrizacion/ModalAgregarRegion';
import ModalAgregarLocalidad from '../componentes/Parametrizacion/ModalAgregarLocalidad';
import ModalAgregarRaza from '../componentes/Parametrizacion/ModalAgregarRaza';

export default function ParametrizacionScreen({ navigation }) {
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
  const [isAddTipoAnimalModalVisible, setAddTipoAnimalModalVisible] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [isEditProvinceModalVisible, setEditProvinceModalVisible] = useState(false);
  const [editingProvince, setEditingProvince] = useState(null);
  const [newProvinceName, setNewProvinceName] = useState("");
  const [isAddProvinceModalVisible, setAddProvinceModalVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [isEditRegionModalVisible, setEditRegionModalVisible] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [isAddRegionModalVisible, setAddRegionModalVisible] = useState(false);
  const [isAddLocalidadModalVisible, setAddLocalidadModalVisible] = useState(false);
  const [isAddBreedModalVisible, setAddBreedModalVisible] = useState(false);
  const [newBreedName, setNewBreedName] = useState("");
  const [selectedPetTypeId, setSelectedPetTypeId] = useState("");

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
  
  const handleAddProvince = (newProvinceName) => {
    const newProvince = {
      provinceName: newProvinceName,
      idCountry: "c4e7c89c-dcdb-4e27-90af-0123456789aa"
    };
  
    axios
      .post('http://buddy-app.loca.lt/parameters/province/', newProvince)
      .then((response) => {
        console.log('Provincia agregada exitosamente:', response.data);
        getProvinces(); // Actualizar la lista de provincias después de agregar
      })
      .catch((error) => {
        console.error('Error al agregar provincia:', error);
      });
  };  

  const handleAddType = (newTypeName) => {
    const newType = {
      petTypeName: newTypeName,
    };
  
    axios
      .post('http://buddy-app.loca.lt/parameters/petType/', newType)
      .then((response) => {
        console.log('Tipo de animal agregado exitosamente:', response.data);
        getPetTypes(); // Actualizar la lista de tipos de animales después de agregar
      })
      .catch((error) => {
        console.error('Error al agregar tipo de animal:', error);
      });
  };
  
  const handleAddColor = (newColorName) => {
    const newColor = {
      petColorName: newColorName,
    };
  
    axios
      .post('http://buddy-app.loca.lt/parameters/petColor/', newColor)
      .then((response) => {
        console.log('Color agregado exitosamente:', response.data);
        getPetColors(); // Actualizar la lista de colores después de agregar
      })
      .catch((error) => {
        console.error('Error al agregar color:', error);
      });
  };
   
  const handleZoneDelete = (zoneId) => {
    axios
      .delete(`http://buddy-app.loca.lt/parameters/locality/${zoneId}`)
      .then((response) => {
        console.log('Eliminación exitosa:', response.data);
        // Realizar aquí la actualización de los datos locales después de la eliminación
        // Por ejemplo, volver a cargar las zonas después de eliminar.
        getZonas();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE:', error);
        // Mostrar mensaje de error al usuario si es necesario
      });
  };

  const handleBreedDelete = (breedId) => {
    console.log('ID:', breedId)
    axios
      .delete(`http://buddy-app.loca.lt/parameters/petBreed/${breedId}`)
      .then((response) => {
        console.log('Raza eliminada exitosamente:', response.data);
        // Update the list of pet breeds after deletion
        getPetBreeds();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE de raza:', error);
        // Show an error message to the user if necessary
      });
  };

  const handleColorDelete = (colorId) => {
    axios
      .delete(`http://buddy-app.loca.lt/parameters/petColor/${colorId}`)
      .then((response) => {
        console.log('Color eliminado exitosamente:', response.data);
        // Actualizar la lista de colores después de la eliminación
        getPetColors();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE de color:', error);
        // Mostrar mensaje de error al usuario si es necesario
      });
  };

  const handleTypeDelete = (typeId) => {
    axios
      .delete(`http://buddy-app.loca.lt/parameters/petType/${typeId}`)
      .then((response) => {
        console.log('Tipo de animal eliminado exitosamente:', response.data);
        // Actualizar la lista de tipos de animales después de la eliminación
        getPetTypes();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE de tipo de animal:', error);
        // Mostrar mensaje de error al usuario si es necesario
      });
  }; 

  const handleProvinceDelete = (provinceId) => {
    axios
      .delete(`http://buddy-app.loca.lt/parameters/province/${provinceId}`)
      .then((response) => {
        console.log('Provincia eliminada exitosamente:', response.data);
        // Actualizar la lista de provincias después de la eliminación
        getProvinces();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE de provincia:', error);
        // Mostrar mensaje de error al usuario si es necesario
      });
  }; 

  const handleRegionDelete = (regionId) => {
    axios
      .delete(`http://buddy-app.loca.lt/parameters/region/${regionId}`)
      .then((response) => {
        console.log('Región eliminada exitosamente:', response.data);
        // Actualizar la lista de regiones después de la eliminación
        getRegions();
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE de región:', error);
        // Mostrar mensaje de error al usuario si es necesario
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
      .get('https://buddy-app.loca.lt/parameters/locality/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Zonas exitosas:', response.data.localities);
        const localities = response.data.localities;
        if (localities && Array.isArray(localities)) {
          setZoneOptions(localities);
        } else {
          setZoneOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        setZoneOptions([]);
      });
  };  

  const getPetColors = () => {
    axios
      .get('https://buddy-app.loca.lt/parameters/petColor/')
      .then((response) => {
        console.log('Colores exitosos:', response.data);
        const colors = response.data.petColors;
        if (colors && Array.isArray(colors)) {
          setPetColors(colors);
        } else {
          setPetColors([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de colores:', error);
        setPetColors([]);
      });
  };

  const getPetTypes = () => {
    axios
      .get('https://buddy-app.loca.lt/parameters/petType/')
      .then((response) => {
        console.log('Tipos de animales exitosos:', response.data);
        const types = response.data.petTypes;
        if (types && Array.isArray(types)) {
          setPetTypes(types);
        } else {
          setPetTypes([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de tipos de animales:', error);
        setPetTypes([]);
      });
  };

  const getPetBreeds = () => {
    axios
      .get('https://buddy-app.loca.lt/parameters/petBreed/')
      .then((response) => {
        console.log('Razas exitosas:', response.data);
        const breeds = response.data.petBreeds;
        if (breeds && Array.isArray(breeds)) {
          setPetBreeds(breeds);
        } else {
          setPetBreeds([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de razas de animales:', error);
        setPetBreeds([]);
      });
  }; 

  const getProvinces = () => {
    axios
      .get('https://buddy-app.loca.lt/parameters/province/')
      .then((response) => {
        console.log('Provincias exitosas:', response.data.provinces);
        const fetchedProvinces = response.data.provinces;
        if (fetchedProvinces && Array.isArray(fetchedProvinces)) {
          setProvinces(fetchedProvinces);
        } else {
          setProvinces([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de provincias:', error);
        setProvinces([]);
      });
  }; 
  
  const getRegions = () => {
    axios
      .get('https://buddy-app.loca.lt/parameters/region/')
      .then((response) => {
        console.log('Regiones exitosas:', response.data.regions);
        const fetchedRegions = response.data.regions;
        if (fetchedRegions && Array.isArray(fetchedRegions)) {
          setRegions(fetchedRegions);
        } else {
          setRegions([]);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET de regiones:', error);
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
  }, []); 

  return (
    <ScrollView>
      <Header />
      <Text style={styles.titulo}>Parametrización de filtros</Text>
      <ScrollView style={styles.scrollView}>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/marcador-de-posicion.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Zona</Text>
          <TouchableOpacity onPress={toggleAddLocalidadModal}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {zoneOptions.map((zone, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center'},styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {zone.localityName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditPress(zone)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleZoneDelete(zone.idLocality)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/perroFiltro.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Razas</Text>
          <TouchableOpacity onPress={toggleAddBreedModal}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petBreeds.map((breed, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {breed.petBreedName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleBreedEditPress(breed)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleBreedDelete(breed.idPetBreed)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/paleta-de-color.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Colores</Text>
          <TouchableOpacity onPress={() => setAddColorModalVisible(true)}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petColors.map((color, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {color.petColorName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleColorEditPress(color)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleColorDelete(color.idPetColor)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/huella.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Tipo animal</Text>
          <TouchableOpacity onPress={() => setAddTipoAnimalModalVisible(true)}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {petTypes.map((type, index) => (
            <View key={index} style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}>
              <Text style={styles.zoneItem}>
                {type.petTypeName}
              </Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleTypeEditPress(type)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTypeDelete(type.idPetType)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/marcador-de-posicion.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Departamentos</Text>
          <TouchableOpacity onPress={toggleAddRegionModal}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {regions.map((region, index) => (
            <View
              key={index}
              style={[
                { flexDirection: 'row', alignItems: 'center' },
                styles.containerTexto,
              ]}
            >
              <Text style={styles.zoneItem}>{region.regionName}</Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() =>  handleEditRegionPress(region)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRegionDelete(region.idRegion)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={[{ flexDirection: 'row' }, styles.filtrosZona]}>
          <Image
            source={require('../Imagenes/marcador-de-posicion.png')}
            style={styles.imagenTitulo}
          />
          <Text style={styles.nombreFiltros}>Filtros Provincias</Text>
          <TouchableOpacity onPress={() => setAddProvinceModalVisible(true)}>
            <Image
              source={require('../Imagenes/agregar.png')}
              style={styles.imagenAgregar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {provinces.map((province, index) => (
            <View
              key={index}
              style={[{ flexDirection: 'row', alignItems: 'center' }, styles.containerTexto]}
            >
              <Text style={styles.zoneItem}>{province.provinceName}</Text>
              <View style={[styles.botones,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => handleEditProvincePress(province)}>
                  <Image
                    source={require('../Imagenes/editar.png')}
                    style={styles.imagenbotones}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleProvinceDelete(province.idProvince)}>
                  <Image
                    source={require('../Imagenes/eliminar.png')}
                    style={styles.imagenbotones}
                  /> 
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ModalEditar isVisible={isModalVisible} onClose={handleCloseModal} onEdit={handleZoneEdit} editingZone={editingZone} />
      <ModalEditarColor isVisible={isEditColorModalVisible} onClose={() => setEditColorModalVisible(false)} onEdit={handleColorEdit} editingColor={editingColor} />
      <ModalEditarTipoAnimal isVisible={isEditTypeModalVisible} onClose={() => setEditTypeModalVisible(false)} onEdit={handleTypeEdit} editingType={editingType} />
      <ModalEditarRaza isVisible={isEditBreedModalVisible} onClose={() => setEditBreedModalVisible(false)} onEdit={handleBreedEdit} editingBreed={editingBreed} />
      <ModalAgregarColor isVisible={isAddColorModalVisible} onClose={() => setAddColorModalVisible(false)} onAdd={handleAddColor} newColorName={newColorName} setNewColorName={setNewColorName} />
      <ModalAgregarTipoAnimal isVisible={isAddTipoAnimalModalVisible} onClose={() => setAddTipoAnimalModalVisible(false)} onAdd={handleAddType} newTypeName={newTypeName} setNewTypeName={setNewTypeName} />
      <ModalEditarProvincia isVisible={isEditProvinceModalVisible} onClose={() => setEditProvinceModalVisible(false)} onEdit={handleProvinceEdit} editingProvince={editingProvince} />
      <ModalAgregarProvincia isVisible={isAddProvinceModalVisible} onClose={() => setAddProvinceModalVisible(false)} onAdd={handleAddProvince} newProvinceName={newProvinceName} setNewProvinceName={setNewProvinceName} />
      <ModalEditarRegion isVisible={isEditRegionModalVisible} onClose={() => setEditRegionModalVisible(false)} onEdit={handleRegionEdit} editingRegion={editingRegion} />
      <ModalAgregarRegion isVisible={isAddRegionModalVisible} onClose={toggleAddRegionModal} onAdd={handleRegionAdd} provinces={provinces} />
      <ModalAgregarLocalidad isVisible={isAddLocalidadModalVisible} onClose={toggleAddLocalidadModal} onAdd={handleLocalidadAdd} regions={regions}/>
      <ModalAgregarRaza isVisible={isAddBreedModalVisible} onClose={toggleAddBreedModal} onAdd={handleAddBreed}  petTypes={petTypes} />
    </ScrollView>
  );
};  

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
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
    width: 20,
    height: 20,
    marginRight: 8,
  },
  botones: {
    marginLeft: 30,
    marginTop: 2,
  },
  containerTexto: {
    backgroundColor: '#DDC4B8',
    width: '50%',
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 83,
    marginTop: 10,
    paddingLeft: 10,
  },
});