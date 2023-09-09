import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from '../Screens/InicioScreen';
import Registro from '../componentes/Registro';
import HomeScreen from '../Screens/HomeScreen';
import BusquedaScreen from '../Screens/BusquedaScreen';
import PublicacionBusqueda from '../Screens/PublicacionBusqueda';
import PublicacionDetalle from '../componentes/Busqueda/PublicacionDetalle';
import PublicacionDetalleAdopcion from '../componentes/Adopcion/PublicacionDetalleAdopcion';
import ParametrizacionScreen from '../Screens/ParametrizacionScreen';
import AdoptarScreen from '../Screens/AdoptarScreen';
import PublicacionAdopcion from '../Screens/PublicacionAdopcion';
import MiPerfil from '../Screens/MiPerfil';
import InicioSesionScreen from '../Screens/InicioSesionScreen';
import RegistrarseScreen from '../Screens/RegistrarseScreen';
import  {RegistrarseEmpresaScreen} from '../Screens/RegistrarseEmpresaScreen';
import ConfirmacionContrasenaScreen from '../Screens/ConfirmacionContrasenaScreen';
import { ConfirmacionRegistroScreen } from '../Screens/ConfirmacionRegistroScreen';
import ConfirmacionRegistroEmpresaScreen from '../Screens/ConfirmacionRegistroEmpresaScreen';
import RecuperarContrasenaScreen from '../Screens/RecuperarContrasenaScreen';
import FormularioRegistrarse from '../componentes/FormularioRegistrarse';
import Formulario1 from '../componentes/Formulario1';
import Formulario2 from '../componentes/Formulario2';
import Formulario3 from '../componentes/Formulario3';
import DocumentosRegistrarseEmpresaScreen from '../Screens/DocumentosRegistrarseEmpresaScreen';
import NuevaContrasenaScreen from '../Screens/NuevaContrasenaScreen';
import BotonImagenRegis from '../componentes/BotonImagenRegis';
import MiMascotaScreen from '../Screens/MiMascotaScreen';
import Mascotas from '../componentes/MiMascota/Mascotas';
import NuevaMascota from '../componentes/MiMascota/NuevaMascota';
import AgregarImagen from '../componentes/AgregarImagen';
import EditarMascota from '../componentes/MiMascota/EditarMascota';
import EliminarMascotaModal from '../componentes/MiMascota/EliminarMascotaModal';
import  MisTurnos from '../Screens/MisTurnos';
import BotonTurnos from '../componentes/MiMascota/BotonTurnos';
import AltaTurno from '../componentes/MiMascota/AltaTurno';
import EditarTurno from '../componentes/MiMascota/EditarTurno';
import TurnoModal from '../componentes/MiMascota/TurnoModal';
import SuccessModal from '../componentes/MiMascota/SuccessModal';
import ErrorModal from '../componentes/MiMascota/ErrorModal';
import MisVacunas from '../Screens/MisVacunas';
import MiInfoImportante from '../Screens/MiInfoImportante';
import EditarInfo from '../componentes/MiMascota/EditarInfo';
import BotonInformacion from '../componentes/MiMascota/BotonInformacion';
import AltaInformacion from '../componentes/MiMascota/AltaInformacion';
import ReportesScreen from '../Screens/ReportesScreen';
import EditarPublicacionAdopcion from '../componentes/Perfil/EditarPublicacionAdopcion';
import EditarPublicacionBusqueda from '../componentes/Perfil/EditarPublicacionBusqueda';

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
                name='PublicacionDetalle'
                component={PublicacionDetalle}
            /> 
            <Stack.Screen
                name='ParametrizacionScreen'
                component={ParametrizacionScreen}
            /> 
            <Stack.Screen
                name='AdoptarScreen'
                component={AdoptarScreen}
            /> 
            <Stack.Screen
                name='PublicacionDetalleAdopcion'
                component={PublicacionDetalleAdopcion}
            /> 
            <Stack.Screen
                name='PublicacionAdopcion'
                component={PublicacionAdopcion}
            />
            <Stack.Screen
                name='MiPerfil'
                component={MiPerfil}
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
            <Stack.Screen
                name='BotonImagenRegis'
                component={BotonImagenRegis}
            />    
            <Stack.Screen
                name='MiMascotaScreen'
                component={MiMascotaScreen}
            />
            <Stack.Screen
                name='Mascotas'
                component={Mascotas}
            />
            <Stack.Screen
                name='NuevaMascota'
                component={NuevaMascota}
            />
            <Stack.Screen
                name='AgregarImagen'
                component={AgregarImagen}
            />
            
            <Stack.Screen
                name='EditarMascota'
                component={EditarMascota}
            />
            <Stack.Screen
                name='EliminarMascotaModal'
                component={EliminarMascotaModal}
            />
            <Stack.Screen
                name='MisTurnos'
                component={MisTurnos}
            />
            <Stack.Screen
                name='BotonTurnos'
                component={BotonTurnos}
            />
            <Stack.Screen
                name='AltaTurno'
                component={AltaTurno}
            />
            <Stack.Screen
                name='EditarTurno'
                component={EditarTurno}
            />
            
            <Stack.Screen
                name='TurnoModal'
                component={TurnoModal}
            />
            <Stack.Screen
                name='SuccessModal'
                component={SuccessModal}
            />
            <Stack.Screen
                name='ErrorModal'
                component={ErrorModal}
            />
             <Stack.Screen
                name='MisVacunas'
                component={MisVacunas}
            />
            <Stack.Screen
                name='MiInfoImportante'
                component={MiInfoImportante}
            />
            <Stack.Screen
                name='EditarInfo'
                component={EditarInfo}
            />
            <Stack.Screen
                name='BotonInformacion'
                component={BotonInformacion}
            />
            <Stack.Screen
                name='AltaInformacion'
                component={AltaInformacion}
            />
            <Stack.Screen
                name='ReportesScreen'
                component={ReportesScreen}
            />
             <Stack.Screen
                name='EditarPublicacionBusqueda'
                component={EditarPublicacionBusqueda}
            />
            <Stack.Screen
                name='EditarPublicacionAdopcion'
                component={EditarPublicacionAdopcion}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}