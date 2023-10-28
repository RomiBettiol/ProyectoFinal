import React, {useState} from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'

export default function TerminosCondiciones({ onClose, visible }) {
    const [aceptoTerminos, setAceptoTerminos] = useState(0);

    const handleAceptarClick = () => {
        console.log("aceptado ok")
        onClose(true);
    };

    const handleCerrarClick = () => {
        onClose(false);
    };

  return (
    <Modal visible={visible} transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulos}>Terminos y condiciones</Text>
            <Text style={styles.titulos}>Aceptación de los Términos y Condiciones </Text>
            <Text style={styles.texto}>
            Al crear una cuenta y utilizar la aplicación, aceptas cumplir con estos términos y condiciones, 
            así como con todas las leyes y regulaciones aplicables. Si no estás de acuerdo con estos términos y condiciones, te solicitamos que no utilices la aplicación. 
            </Text>
            <Text style={styles.titulos}>Uso autorizado</Text>
            <Text style={styles.texto}>
            La aplicación se proporciona para uso personal y comercial. Está permitido acceder, navegar y utilizar los servicios y funcionalidades
            de la aplicación de acuerdo con estos términos y condiciones. 
            </Text>
            <Text style={styles.titulos}>Derechos de Propiedad Intelectual</Text>
            <Text style={styles.texto}>
            Todos los derechos de propiedad intelectual de la aplicación y su contenido (incluyendo, pero no limitado a, texto, gráficos, logotipos, imágenes, videos, audios, software, y demás materiales) pertenecen a los propietarios de la aplicación. Queda prohibida cualquier reproducción, distribución, 
            modificación o uso no autorizado de dicho contenido sin el consentimiento previo y por escrito de los propietarios.
            </Text>
            <Text style={styles.titulos}>Privacidad y Protección de Datos </Text>
            <Text style={styles.texto}>
            La aplicación recopila y procesa información personal de los usuarios de acuerdo con nuestra Política de Privacidad. 
            Al utilizar la aplicación, aceptas la recopilación, uso y divulgación de tus datos personales de acuerdo con nuestra Política de Privacidad. 
            </Text>
            <Text style={styles.titulos}>Responsabilidad del Usuario</Text>
            <Text style={styles.texto}>
            Eres responsable de cualquier contenido que publiques, compartas o transmitas a través de la aplicación. Te comprometes a utilizar la aplicación de manera adecuada y legal, 
            sin infringir los derechos de terceros ni violar las leyes aplicables. 
            </Text>
            <Text style={styles.titulos}>Limitación de Responsabilidad </Text>
            <Text style={styles.texto}>
            La aplicación se proporciona "tal cual" y no se ofrece ninguna garantía en cuanto a su disponibilidad, precisión, fiabilidad o adecuación para un propósito particular. 
            No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente derivado del uso de la aplicación. 
            </Text>
            <Text style={styles.titulos}>Modificaciones de los Términos y Condiciones</Text>
            <Text style={styles.texto}>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier modificación será efectiva al publicar la versión actualizada en la aplicación. 
            Te recomendamos revisar regularmente los términos y condiciones para estar al tanto de cualquier cambio. 
            </Text>
            <Text style={styles.titulos}>Ley Aplicable y Jurisdicción</Text>
            <Text style={styles.texto}>
            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de la República Argentina. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la 
            jurisdicción exclusiva de los tribunales competentes de Argentina. 
            </Text>
         </View>
         <View style={{flexDirection: 'row'}}>
            <TouchableOpacity  style={styles.botonModal} onPress={handleAceptarClick}>
                <Text style={styles.titulos}>Acepto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonModal} onPress={handleCerrarClick}>
                <Text style={styles.titulos}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    titulos: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      texto: {
        fontSize: 12,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
      },
      botonModal: {
        marginRight: 40,
        marginLeft: 40,
      }
})