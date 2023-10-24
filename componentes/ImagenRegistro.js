import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const BotonImagenRegis = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(null);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages([...selectedImages, result.uri]);
    }
  };

  const removeImage = (index) => {
    console.log(index);
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <View>
      {selectedImages.length > 0 ? ( // Verifica si hay imágenes seleccionadas
        <TouchableOpacity
          style={styles.botonGaleria}
          onPress={() => removeImage(0)} // Usar el índice de la imagen principal
        >
          <Text>Presione para quitar la foto</Text>
          <View style={styles.selectedImagesContainer}>
            {selectedImages.map((uri, index) => (
              <Image
                key={index} // Añade una clave única al componente Image
                source={{ uri }}
                style={[styles.selectedImage]}
              />
            ))}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.botonGaleria} onPress={openGallery}>
          <Text>Presione para añadir una foto</Text>
          <Image
            source={require("../Imagenes/fotos.png")}
            style={styles.foto}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BotonImagenRegis;

const styles = StyleSheet.create({
  botonGaleria: {
    backgroundColor: "#ffffff",
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    elevation: 10,
  },
  foto: {
    width: 30,
    height: 30,
  },
  botonFoto: {
    fontSize: 14,
    marginTop: 10,
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  selectedImage: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
