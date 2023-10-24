import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const RatingModal = ({ isVisible, onClose, onRatingSubmit, idService }) => {
  const route = useRoute();
  const { token } = route.params;
  const [rating, setRating] = useState(0); // Valor inicial de la puntuación
  const [title, setTitle] = useState(""); // Estado para el título
  const [description, setDescription] = useState(""); // Estado para la descripción
  const navigation = useNavigation();

  console.log("RatingModal: ", token);

  const resetValues = () => {
    setTitle("");
    setDescription("");
    setRating(0);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Crear un objeto con los datos para la solicitud POST
    const requestData = {
      idService: idService, // Usar el idService proporcionado
      titleRating: title, // Usar el título del estado
      descriptionRating: description, // Usar la descripción del estado
      numberRating: rating, // Usar la puntuación seleccionada
    };

    console.log("Información enviada: ", requestData);

    const config = {
      headers: {
        "auth-token": token, // Agregar el token al encabezado
      },
    };

    // Realizar la solicitud POST con el encabezado de autenticación
    axios
      .post("https://8396-191-82-3-33.ngrok-free.app/services/rating/", requestData, config)
      .then((response) => {
        // Aquí puedes manejar la respuesta exitosa si es necesario
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud POST
        console.error("Error en la solicitud POST:", error);
      });

    // Cerrar el modal después de enviar la calificación
    onClose();
    navigation.navigate("HomeScreen", { token });
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Califícanos</Text>
          <Text style={styles.modalDescription}>
            Por favor, califica nuestro servicio
          </Text>

          {/* Campo de entrada de texto para el título */}
          <TextInput
            style={styles.inputField}
            placeholder="Título"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          {/* Campo de entrada de texto para la descripción */}
          <TextInput
            style={[styles.inputField, { height: 100 }]}
            placeholder="Descripción"
            multiline
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.ratingButton,
                  rating === value && styles.ratingButtonSelected,
                ]}
                onPress={() => handleRating(value)}
              >
                <Text style={styles.ratingButtonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                onClose();
                resetValues();
              }}
            >
              <Text style={styles.submitButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                handleSubmit();
                resetValues();
              }}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F7C4B7",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    height: 40,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  ratingButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 80,
    marginRight: 10,
    elevation: 2,
  },
  ratingButtonSelected: {
    backgroundColor: "gold",
    borderColor: "gold",
  },
  ratingButtonText: {
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginRight: 25,
  },
  submitButtonText: {
    color: "black",
  },
});

export default RatingModal;
