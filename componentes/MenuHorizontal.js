import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const MenuHorizontal = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtiene la prop route
  const { token } = route.params;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}
      >
        <TouchableOpacity style={styles.menuItem}
          onPress = {()=> (
            navigation.navigate('MiPerfil', {token})
        )}
        >
            <Image
                source={require('../Imagenes/usuario.png')}
                style={styles.menu}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Image
                source={require('../Imagenes/mensaje.png')}
                style={styles.menu}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Image
                source={require('../Imagenes/notificacion.png')}
                style={styles.menu}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Image
                source={require('../Imagenes/opciones.png')}
                style={styles.menu}
            />
        </TouchableOpacity>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 0,
      paddingBottom: 8,
      paddingTop: 8,
      width: '90%',
      height: '65%',
      marginTop: 10,
      marginBottom: 15,
      backgroundColor: '#DDC4B8',  
    },

    menuItem: {
      marginHorizontal: 30,
      height: 80,
      paddingTop: 20,
    },

    menu: {
        width: 40,
        height: 40,
    }
  });
  
  export default MenuHorizontal;