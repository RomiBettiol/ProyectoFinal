import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const FiltrarModal = ({ modalVisible, closeModal}) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);
  const [animalBreeds, setAnimalBreeds] = useState([]); // Nueva lista de razas
  const [selectedAnimalBreed, setSelectedAnimalBreed] = useState(null); // Raza seleccionada
  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const [animalTypeDropdownVisible, setAnimalTypeDropdownVisible] = useState(false);
  const [breedDropdownVisible, setBreedDropdownVisible] = useState(false);
  const [localities, setLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [localityDropdownVisible, setLocalityDropdownVisible] = useState(false);

  const fetchLocalities = async () => {
    try {
      const response = await axios.get('http://buddy-app1.loca.lt/parameters/locality/');
      const data = response.data.localities;
      setLocalities(data);
    } catch (error) {
      console.error('Error fetching localities:', error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get('http://buddy-app1.loca.lt/parameters/petColor/');
      const data = response.data.petColors;
      setColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const fetchAnimalTypes = async () => {
    try {
      const response = await axios.get('http://buddy-app1.loca.lt/parameters/petType/');
      const data = response.data.petTypes;
      setAnimalTypes(data);
    } catch (error) {
      console.error('Error fetching animal types:', error);
    }
  };

  useEffect(() => {
    fetchColors();
    fetchAnimalTypes();
    fetchLocalities();
  }, []);

  useEffect(() => {
    if (selectedAnimalType) {
      fetchAnimalBreeds(selectedAnimalType); // Cargar las razas al seleccionar un tipo de animal
    }
  }, [selectedAnimalType]);

  const fetchAnimalBreeds = async (animalType) => {
    try {
      const response = await axios.get(`http://buddy-app1.loca.lt/parameters/petBreed/byType/${animalType}`);
      const data = response.data;
      console.log('Mostrar:' + data);
      setAnimalBreeds(data);
    } catch (error) {
      console.error('Error fetching animal breeds:', error);
    }
  };

  const handleColorPress = (colorId) => {
    setSelectedColor(colorId);
    setColorDropdownVisible(false);
  };
  
  const handleAnimalTypePress = (animalTypeId) => {
    setSelectedAnimalType(animalTypeId);
    setAnimalTypeDropdownVisible(false);
  }; 

  const handleAnimalBreedPress = (breedId) => {
    setSelectedAnimalBreed(breedId);
    setBreedDropdownVisible(false);
  };

  const handleLocalityPress = (localityId) => {
    setSelectedLocality(localityId);
    setLocalityDropdownVisible(false);
  };
 
  const clearFilters = () => {
    setSelectedColor(null);
    setSelectedAnimalType(null);
    setSelectedLocality(null);
  };

  const getSelectedColorName = () => {
    const selectedColorData = colors.find(color => color.idPetColor === selectedColor);
    return selectedColorData ? selectedColorData.petColorName : 'Seleccione un color';
  };

  const getSelectedAnimalTypeName = () => {
    const selectedAnimalTypeData = animalTypes.find(type => type.idPetType === selectedAnimalType);
    return selectedAnimalTypeData ? selectedAnimalTypeData.petTypeName : 'Seleccione un tipo de animal';
  };

  const getSelectedAnimalBreedName = () => {
    const selectedBreedData = animalBreeds.find(breed => breed.idPetBreed === selectedAnimalBreed);
    return selectedBreedData ? selectedBreedData.petBreedName : 'Seleccione una raza';
  };

  const getSelectedLocalityName = () => {
    const selectedLocalityData = localities.find(loc => loc.idLocality === selectedLocality);
    return selectedLocalityData ? selectedLocalityData.localityName : 'Seleccione una zona';
  };

  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.listaValores} onPress={() => setColorDropdownVisible(!colorDropdownVisible)}>
            <Text>{getSelectedColorName()}</Text>
          </TouchableOpacity>

          {colorDropdownVisible && colors && colors.length > 0 && (
            <View style={styles.dropdown}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color.idPetColor}
                  style={[
                    styles.dropdownItem,
                    selectedColor === color.idPetColor && styles.selectedItem,
                  ]}
                  onPress={() => handleColorPress(color.idPetColor)}
                >
                  <Text>{color.petColorName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.listaValores}  onPress={() => setAnimalTypeDropdownVisible(!animalTypeDropdownVisible)}>
            <Text>{getSelectedAnimalTypeName()}</Text>
          </TouchableOpacity>

          {animalTypeDropdownVisible && animalTypes && animalTypes.length > 0 && (
            <View style={styles.dropdown}>
              {animalTypes.map(animalType => (
                <TouchableOpacity
                  key={animalType.idPetType}
                  style={[
                    styles.dropdownItem,
                    selectedAnimalType === animalType.idPetType && styles.selectedItem,
                  ]}
                  onPress={() => handleAnimalTypePress(animalType.idPetType)}
                >
                  <Text>{animalType.petTypeName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <TouchableOpacity style={styles.listaValores}  onPress={() => setBreedDropdownVisible(!breedDropdownVisible)}>
            <Text>{getSelectedAnimalBreedName()}</Text>
          </TouchableOpacity>
          {breedDropdownVisible && animalBreeds && animalBreeds.length > 0 && (
            <View style={styles.dropdown}>
              {animalBreeds.map(breed => (
                <TouchableOpacity
                  key={breed.idPetBreed}
                  style={[
                    styles.dropdownItem,
                    selectedAnimalBreed === breed.idPetBreed && styles.selectedItem,
                  ]}
                  onPress={() => handleAnimalBreedPress(breed.idPetBreed)}
                >
                  <Text>{breed.petBreedName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.listaValores} onPress={() => setLocalityDropdownVisible(!localityDropdownVisible)}>
            <Text>{getSelectedLocalityName()}</Text>
          </TouchableOpacity>
          {localityDropdownVisible && localities && localities.length > 0 && (
            <View style={styles.dropdown}>
              {localities.map(locality => (
                <TouchableOpacity
                  key={locality.idLocality}
                  style={[
                    styles.dropdownItem,
                    selectedLocality === locality.idLocality && styles.selectedItem,
                  ]}
                  onPress={() => handleLocalityPress(locality.idLocality)}
                >
                  <Text>{locality.localityName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.botonEditar}>
              <Text>Aplicar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonEditar} onPress={clearFilters}>
              <Text>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.botonEditar}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
  dropdown: {
    marginTop: 10,
  },
  dropdownItem: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#DDC4B8',    
  },
  selectedItem: {
    backgroundColor: '#DDC4B8',
  },
  botonEditar: {
    width: '25%',
    backgroundColor: 'red',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: '#FFB984',
    padding: 6,
  },
  listaValores: {
    backgroundColor: '#DDC4B8',
    marginTop: 15,
    height: 30,
    padding: 6,
    borderRadius: 5,
    width: 230,
  },
};

export default FiltrarModal;