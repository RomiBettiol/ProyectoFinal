import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

const ListaValoresRazaPerros = ({ selectedAnimal, setSelectedBreedId }) => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedOptions, setBreedOptions] = useState([]);

  const getRazas = () => {
    axios
      .get(
        `http://buddy-app2.loca.lt/parameters/petBreed/byType/${selectedAnimal}`
      )
      .then((response) => {
        console.log("Razas exitosas:", response.data);
        const petBreeds = response.data;
        if (petBreeds && Array.isArray(petBreeds)) {
          setBreedOptions(petBreeds);
        } else {
          setBreedOptions([]);
        }
      })
      .catch((error) => {
        console.log("Error en la solicitud GET:", error);
        setBreedOptions([]);
      });
  };

  useEffect(() => {
    getRazas();
    setSelectedBreed(null); // Reiniciar selectedBreed cuando cambie el animal seleccionado
  }, [selectedAnimal]);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={breedOptions}
      search
      maxHeight={300}
      labelField="petBreedName"
      valueField="petBreedName"
      placeholder="Raza"
      searchPlaceholder="Buscar"
      value={selectedBreed ? selectedBreed.petBreedName : null}
      onChange={(item) => {
        setSelectedBreed(item);
        setSelectedBreedId(item.idPetBreed);
      }}
    />
  );
};

export default ListaValoresRazaPerros;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: "#EEE9E9",
    padding: 25,
    borderRadius: 40,
    width: "93%",
    marginTop: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 16,
  },
});
