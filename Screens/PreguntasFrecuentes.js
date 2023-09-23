import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import HeaderScreen from '../componentes/HeaderScreen'
import { useRoute } from '@react-navigation/native';
import BotonMenu from '../componentes/BotonMenu'

export default function PreguntasFrecuentes() {
    const route = useRoute();
    const { token } = route.params;
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    console.log('Preguntas Frecuentes', token)
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
        <HeaderScreen />
        <ScrollView>
            <Text style={styles.titulo}>Preguntas Frecuentes</Text>
            <TouchableOpacity
                style={styles.contenedorPreguntaIzquierda1}
                onPress={() => handleQuestionPress(1)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 1?</Text>
            </TouchableOpacity>
            {selectedQuestion === 1 && (
                <View style={styles.contenedorRespuesta}>
                <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaDerecha1}
                onPress={() => handleQuestionPress(2)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 2?</Text>
            </TouchableOpacity>
            {selectedQuestion === 2 && (
                <View style={styles.contenedorRespuestaDerecha}>
                    <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
            </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaIzquierda2}
                onPress={() => handleQuestionPress(3)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 3?</Text>
            </TouchableOpacity>
            {selectedQuestion === 3 && (
                <View style={styles.contenedorRespuesta}>
                <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaDerecha2}
                onPress={() => handleQuestionPress(4)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 4?</Text>
            </TouchableOpacity>
            {selectedQuestion === 4 && (
                <View style={styles.contenedorRespuestaDerecha}>
                    <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
            </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaIzquierda3}
                onPress={() => handleQuestionPress(5)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 5?</Text>
            </TouchableOpacity>
            {selectedQuestion === 5 && (
                <View style={styles.contenedorRespuesta}>
                <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaDerecha3}
                onPress={() => handleQuestionPress(6)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 6?</Text>
            </TouchableOpacity>
            {selectedQuestion === 6 && (
                <View style={styles.contenedorRespuestaDerecha}>
                    <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
            </View>
            )}

            <TouchableOpacity
                style={styles.contenedorPreguntaIzquierda4}
                onPress={() => handleQuestionPress(7)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 7?</Text>
            </TouchableOpacity>
            {selectedQuestion === 7 && (
                <View style={styles.contenedorRespuesta}>
                <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
                </View>
            )}
            
            <TouchableOpacity
                style={styles.contenedorPreguntaDerecha4}
                onPress={() => handleQuestionPress(8)}
            >
                <Text style={styles.textoPregunta}>¿Pregunta frecuente 8?</Text>
            </TouchableOpacity>
            {selectedQuestion === 8 && (
                <View style={styles.contenedorRespuestaDerecha}>
                    <Text style={styles.textoRespuesta}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
                    (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró 
                    hacer un libro de textos especimen.</Text>
            </View>
            )}
        </ScrollView>
        <BotonMenu token = {token}/>
    </View>
  )
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
        borderBottomColor: 'gray',
        padding: 5,
    },

    contenedorPreguntaIzquierda1:{
        backgroundColor: '#FFB984',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5,
    },  

    contenedorPreguntaDerecha1:{
        backgroundColor: '#B8F7B7',
        marginLeft: '25%',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },

    contenedorPreguntaIzquierda2:{
        backgroundColor: '#D9D9D9',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5,
    },  

    contenedorPreguntaDerecha2:{
        backgroundColor: '#DDC4B8',
        marginLeft: '25%',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },  

    contenedorPreguntaIzquierda3:{
        backgroundColor: '#58DCD4',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5,
    },  

    contenedorPreguntaDerecha3:{
        backgroundColor: '#AFAAAA',
        marginLeft: '25%',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },  

    contenedorPreguntaIzquierda4:{
        backgroundColor: '#F36F6F',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5,
    },  

    contenedorPreguntaDerecha4:{
        backgroundColor: '#7896FF',
        marginLeft: '25%',
        height: 50,
        width: '75%',
        marginTop: 35,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },  

    textoPregunta: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 20,
        marginLeft: 10,
    },    

    contenedorRespuesta:{
        backgroundColor: '#EEE9E9',
        width: '90%',
        margin: 10,
        padding: 5,
    },

    contenedorRespuestaDerecha:{
        backgroundColor: '#EEE9E9',
        width: '90%',
        margin: 10,
        padding: 5,
        marginLeft: '10%',
    },
})