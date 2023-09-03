import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../componentes/HeaderScreen'
import BotonMenu from '../componentes/BotonMenu';

export default function ReportesScreen() {
  return (
    <View>
      <Header />
      <Text style={styles.titulo}>Reportes</Text>
      <View style={styles.Container}>
        <View style={[styles.informeUsuariosActivos,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Usuarios activos</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
        <View style={[styles.informeMascotasPerdidas,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Mascotas perdidas</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
        <View style={[styles.informeMascotasAdopcion,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Mascotas en adopción</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
        <View style={[styles.informeEstablecimientosActivos,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Establecimientos activos</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
        <View style={[styles.informeMascotasEncontradas,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Mascotas encontradas</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
        <View style={[styles.informeMascotasAdoptadas,{flexDirection:'row'}]}>
            <Text style={styles.textoInforme}>Mascotas adoptadas</Text>
            <Text style={styles.textoInforme}>20</Text>
        </View>
      </View>
      <BotonMenu />
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        marginTop: 10,
    },
    titulo:{
        fontSize: 30,
        marginTop: 20,
        marginLeft: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 5,
    },
    informeUsuariosActivos:{
        backgroundColor: '#8ADC58',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    textoInforme:{
        fontSize: 18,
    },
    informeMascotasPerdidas:{
        backgroundColor: '#FFB984',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    informeMascotasAdopcion:{
        backgroundColor: '#58DCD4',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    informeEstablecimientosActivos:{
        backgroundColor: '#B6A7A7',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    informeMascotasEncontradas:{
        backgroundColor: '#5B58DC',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
    informeMascotasAdoptadas:{
        backgroundColor: '#FFEA2D',
        marginTop: 30,
        width: '80%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
    },
});