import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderScreen from "../componentes/HeaderScreen";
import { useRoute } from "@react-navigation/native";
import BotonMenu from "../componentes/BotonMenu";

export default function PreguntasFrecuentes() {
  const route = useRoute();
  const { token } = route.params;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const handleQuestionPress = (questionNumber) => {
    if (selectedQuestion === questionNumber) {
      // Si se hace clic en la misma pregunta, cierra el contenido
      setSelectedQuestion(null);
    } else {
      // Si se hace clic en una pregunta diferente, muestra el contenido de esa pregunta
      setSelectedQuestion(questionNumber);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen token={token} />
      <ScrollView>
        <Text style={styles.titulo}>Preguntas Frecuentes</Text>
        <TouchableOpacity
          style={styles.contenedorPreguntaIzquierda1}
          onPress={() => handleQuestionPress(1)}
        >
          <Text style={styles.textoPregunta}>
            ¿Cómo puedo reportar una mascota perdida en la aplicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 1 && (
          <View style={styles.contenedorRespuesta}>
            <Text style={styles.textoRespuesta}>
              En la página de inicio de la aplicación, encontrarás un botón que
              dirá Encuentra a tu mascota, al ingresar en esa sección en el
              extremo inferior aparecerá un botón para agregar una publicación.
              Completas todos los campos, haces click en publicar y listo!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaDerecha1}
          onPress={() => handleQuestionPress(2)}
        >
          <Text style={styles.textoPregunta}>
            ¿Que pasa si denuncio una publicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 2 && (
          <View style={styles.contenedorRespuestaDerecha}>
            <Text style={styles.textoRespuesta}>
              Si denuncias una publicación, esa denuncia le llegará al
              administrador de la aplicación para que revise los motivos de la
              misma, si el administrador piensa que esa denuncia es valida,
              entonces esa publicación se dará de bajo, de lo contrario, se
              desestimará la denuncia realizada.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaIzquierda2}
          onPress={() => handleQuestionPress(3)}
        >
          <Text style={styles.textoPregunta}>
            ¿Cómo puedo publicar un servicio?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 3 && (
          <View style={styles.contenedorRespuesta}>
            <Text style={styles.textoRespuesta}>
              Para publicar un servicio es importante haberse registrado como
              'Usuario establecimiento', para esto se necesita subir todos los
              documentos pedidos dentro del registro. Una vez registrado, el
              administrador validará la información y ya podrás ingresar a la
              aplicación como usuario establecimiento, allí lo único que queda
              hacer es ingresar al botón de 'Servicios para mi mascota' que se
              encuentra en el inicio de la aplicación y publicar tu servicio!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaDerecha2}
          onPress={() => handleQuestionPress(4)}
        >
          <Text style={styles.textoPregunta}>
            ¿Como hago para denunciar una publicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 4 && (
          <View style={styles.contenedorRespuestaDerecha}>
            <Text style={styles.textoRespuesta}>
              Para denunciar una publicación que posee información inadecuada,
              debes mantener pulsada la misma y aparecerá un modal en donde
              podrás ingresar el motivo de la denuncia, al hacer click en enviar
              se habrá realizado la denuncia.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaIzquierda3}
          onPress={() => handleQuestionPress(5)}
        >
          <Text style={styles.textoPregunta}>
            ¿Pueda dar de baja una publicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 5 && (
          <View style={styles.contenedorRespuesta}>
            <Text style={styles.textoRespuesta}>
              Claro! En tu perfil podrás visualizar todas las publicaciones que
              realizaste dentro de la aplicación, en el botón de opciones podrás
              elegit la opción 'Eliminar' y esa publicación se dará de baja
              automáticamente.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaDerecha3}
          onPress={() => handleQuestionPress(6)}
        >
          <Text style={styles.textoPregunta}>
            ¿Tengo un límite de publicaciones que pueda realizar?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 6 && (
          <View style={styles.contenedorRespuestaDerecha}>
            <Text style={styles.textoRespuesta}>
              No! Puedes realizar las publicaciones que necesites dentro de
              Buddy.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaIzquierda4}
          onPress={() => handleQuestionPress(7)}
        >
          <Text style={styles.textoPregunta}>
            ¿Que pasa si se agrega una traza incorrecta en mi publicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 7 && (
          <View style={styles.contenedorRespuesta}>
            <Text style={styles.textoRespuesta}>
              Con el botón 'Eliminar traza' podrás eliminar cualquier traza que
              no desees dentro de la publicación.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.contenedorPreguntaDerecha4}
          onPress={() => handleQuestionPress(8)}
        >
          <Text style={styles.textoPregunta}>
            ¿Cómo se cuando alguien agrega una traza a mi publicación?
          </Text>
        </TouchableOpacity>
        {selectedQuestion === 8 && (
          <View style={styles.contenedorRespuestaDerecha}>
            <Text style={styles.textoRespuesta}>
              Cuando alguien agregue una traza a tu publicación, te llegará una
              notificación avisandote!
            </Text>
          </View>
        )}
      </ScrollView>
      <BotonMenu token={token} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el ScrollView ocupe todo el espacio
  },
  titulo: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 5,
  },

  contenedorPreguntaIzquierda1: {
    backgroundColor: "#FFB984",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },

  contenedorPreguntaDerecha1: {
    backgroundColor: "#B8F7B7",
    marginLeft: "25%",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
  },

  contenedorPreguntaIzquierda2: {
    backgroundColor: "#D9D9D9",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },

  contenedorPreguntaDerecha2: {
    backgroundColor: "#DDC4B8",
    marginLeft: "25%",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
  },

  contenedorPreguntaIzquierda3: {
    backgroundColor: "#58DCD4",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },

  contenedorPreguntaDerecha3: {
    backgroundColor: "#AFAAAA",
    marginLeft: "25%",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
  },

  contenedorPreguntaIzquierda4: {
    backgroundColor: "#F36F6F",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },

  contenedorPreguntaDerecha4: {
    backgroundColor: "#7896FF",
    marginLeft: "25%",
    height: 50,
    width: "75%",
    marginTop: 35,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
  },

  textoPregunta: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 20,
    marginLeft: 10,
  },

  contenedorRespuesta: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    margin: 10,
    padding: 5,
  },

  contenedorRespuestaDerecha: {
    backgroundColor: "#EEE9E9",
    width: "90%",
    margin: 10,
    padding: 5,
    marginLeft: "10%",
  },
});
