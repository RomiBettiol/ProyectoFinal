import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from '../Screens/InicioScreen';
import InicioSesionScreen from '../Screens/InicioSesionScreen';
import RegistrarseScreen from '../Screens/RegistrarseScreen';
import  {RegistrarseEmpresaScreen} from '../Screens/RegistrarseEmpresaScreen';
import ConfirmacionContrasenaScreen from '../Screens/ConfirmacionContrasenaScreen';
import { ConfirmacionRegistroScreen } from '../Screens/ConfirmacionRegistroScreen';
import Registro from '../componentes/Registro';
import ConfirmacionRegistroEmpresaScreen from '../Screens/ConfirmacionRegistroEmpresaScreen';
import RecuperarContrasenaScreen from '../Screens/RecuperarContrasenaScreen';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import Formulario1 from '../componentes/Formulario1';
import Formulario2 from '../componentes/Formulario2';
import Formulario3 from '../componentes/Formulario3';
import DocumentosRegistrarseEmpresaScreen from '../Screens/DocumentosRegistrarseEmpresaScreen';
import NuevaContrasenaScreen from '../Screens/NuevaContrasenaScreen';
import HomeScreen from '../Screens/HomeScreen';
import BusquedaScreen from '../Screens/BusquedaScreen';
import PublicacionBusqueda from '../Screens/PublicacionBusqueda';

const Stack = createNativeStackNavigator()

export default function MainStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions = {{
              headerShown: false,
            }}
        >
            <Stack.Screen
                name='InicioScreen'
                component={InicioScreen}
            />
            <Stack.Screen
                name='InicioSesionScreen'
                component={InicioSesionScreen}
            />
            <Stack.Screen
                name='Registro'
                component={Registro}
            />
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
            />
            <Stack.Screen
                name='BusquedaScreen'
                component={BusquedaScreen}
            />  
            <Stack.Screen
                name='PublicacionBusqueda'
                component={PublicacionBusqueda}
            /> 
            <Stack.Screen
                name='RegistrarseScreen'
                component={RegistrarseScreen}
            />  
            <Stack.Screen
                name='FormularioRegistrarse'
                component={FormularioRegistrarse}
            /> 
            
            <Stack.Screen
                name='ConfirmacionRegistroScreen'
                component={ConfirmacionRegistroScreen}
            /> 
            <Stack.Screen
                name='RecuperarContrasenaScreen'
                component={RecuperarContrasenaScreen}
            /> 
            <Stack.Screen
                name='ConfirmacionContrasenaScreen'
                component={ConfirmacionContrasenaScreen}
            /> 
            <Stack.Screen
                name='RegistrarseEmpresaScreen'
                component={RegistrarseEmpresaScreen}
            /> 
            <Stack.Screen
                name='DocumentosRegistrarseEmpresaScreen'
                component={DocumentosRegistrarseEmpresaScreen}
            /> 
            <Stack.Screen
                name='Formulario1'
                component={Formulario1}
            /> 
            <Stack.Screen
                name='Formulario2'
                component={Formulario2}
            /> 
            <Stack.Screen
                name='Formulario3'
                component={Formulario3}
            /> 
            <Stack.Screen
                name='ConfirmacionRegistroEmpresaScreen'
                component={ConfirmacionRegistroEmpresaScreen}
            /> 
            <Stack.Screen
                name='NuevaContrasenaScreen'
                component={NuevaContrasenaScreen}
            />                 
        </Stack.Navigator>
    </NavigationContainer>
  )
}