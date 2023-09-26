import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import InicioScreen from "../Screens/InicioScreen";
import PreScreen from "../Screens/PreScreen";
import Registro from "../componentes/Registro";
import HomeScreen from "../Screens/HomeScreen";
import BusquedaScreen from "../Screens/BusquedaScreen";
import PublicacionBusqueda from "../Screens/PublicacionBusqueda";
import PublicacionDetalle from "../componentes/Busqueda/PublicacionDetalle";

import PublicacionDetalleAdopcion from "../componentes/Adopcion/PublicacionDetalleAdopcion";
import ParametrizacionScreen from "../Screens/ParametrizacionScreen";
import AdoptarScreen from "../Screens/AdoptarScreen";
import PublicacionAdopcion from "../Screens/PublicacionAdopcion";
import MiPerfil from "../Screens/MiPerfil";
import InicioSesionScreen from "../Screens/InicioSesionScreen";
import RegistrarseScreen from "../Screens/RegistrarseScreen";

import { RegistrarseEmpresaScreen } from "../Screens/RegistrarseEmpresaScreen";
import ConfirmacionContrasenaScreen from "../Screens/ConfirmacionContrasenaScreen";
import { ConfirmacionRegistroScreen } from "../Screens/ConfirmacionRegistroScreen";
import ConfirmacionRegistroEmpresaScreen from "../Screens/ConfirmacionRegistroEmpresaScreen";
import RecuperarContrasenaScreen from "../Screens/RecuperarContrasenaScreen";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import Formulario1 from "../componentes/Formulario1";
import Formulario2 from "../componentes/Formulario2";
import Formulario3 from "../componentes/Formulario3";

import DocumentosRegistrarseEmpresaScreen from "../Screens/DocumentosRegistrarseEmpresaScreen";
import NuevaContrasenaScreen from "../Screens/NuevaContrasenaScreen";
import BotonImagenRegis from "../componentes/BotonImagenRegis";
import MiMascotaScreen from "../Screens/MiMascotaScreen";
import Mascotas from "../componentes/MiMascota/Mascotas";
import NuevaMascota from "../componentes/MiMascota/NuevaMascota";
import AgregarImagen from "../componentes/AgregarImagen";
import EditarMascota from "../componentes/MiMascota/EditarMascota";
import EliminarMascotaModal from "../componentes/MiMascota/EliminarMascotaModal";
import MisTurnos from "../Screens/MisTurnos";
import BotonTurnos from "../componentes/MiMascota/BotonTurnos";

import AltaTurno from "../componentes/MiMascota/AltaTurno";
import EditarTurno from "../componentes/MiMascota/EditarTurno";
import TurnoModal from "../componentes/MiMascota/TurnoModal";
import SuccessModal from "../componentes/MiMascota/SuccessModal";
import ErrorModal from "../componentes/MiMascota/ErrorModal";
import MisVacunas from "../Screens/MisVacunas";
import MiInfoImportante from "../Screens/MiInfoImportante";
import EditarInfo from "../componentes/MiMascota/EditarInfo";
import BotonInformacion from "../componentes/MiMascota/BotonInformacion";
import AltaInformacion from "../componentes/MiMascota/AltaInformacion";
import ReportesScreen from "../Screens/ReportesScreen";
import EditarPublicacionAdopcion from "../componentes/Perfil/EditarPublicacionAdopcion";
import EditarPublicacionBusqueda from "../componentes/Perfil/EditarPublicacionBusqueda";

import InfoModal from "../componentes/MiMascota/InfoModal";
import BarraBusquedaMascota from "../componentes/MiMascota/BarraBusquedaMascota";
import BotonVaccine from "../componentes/MiMascota/BotonVaccine";
import AltaVaccin from "../componentes/MiMascota/AltaVaccin";
import VaccinModal from "../componentes/MiMascota/VaccinModal";
import ListaValoresAñoMascota from "../componentes/MiMascota/ListaValoresAñoMascota";
import ListaValoresDiasMascota from "../componentes/MiMascota/ListaValoresDiasMascota";
import ListaValoresMesesMascota from "../componentes/MiMascota/ListaValoresMesesMascota";
import EditarVaccin from "../componentes/MiMascota/EditarVaccin";
=======
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from '../Screens/InicioScreen';
import PreScreen from "../Screens/PreScreen";
import Registro from "../componentes/Registro";
import HomeScreen from "../Screens/HomeScreen";
import BusquedaScreen from "../Screens/BusquedaScreen";
import PublicacionBusqueda from "../Screens/PublicacionBusqueda";
import PublicacionDetalle from "../componentes/Busqueda/PublicacionDetalle";
import PublicacionDetalleAdopcion from "../componentes/Adopcion/PublicacionDetalleAdopcion";
import ParametrizacionScreen from "../Screens/ParametrizacionScreen";
import AdoptarScreen from "../Screens/AdoptarScreen";
import PublicacionAdopcion from "../Screens/PublicacionAdopcion";
import MiPerfil from "../Screens/MiPerfil";
import InicioSesionScreen from "../Screens/InicioSesionScreen";
import RegistrarseScreen from "../Screens/RegistrarseScreen";
import { RegistrarseEmpresaScreen } from "../Screens/RegistrarseEmpresaScreen";
import ConfirmacionContrasenaScreen from "../Screens/ConfirmacionContrasenaScreen";
import { ConfirmacionRegistroScreen } from "../Screens/ConfirmacionRegistroScreen";
import ConfirmacionRegistroEmpresaScreen from "../Screens/ConfirmacionRegistroEmpresaScreen";
import RecuperarContrasenaScreen from "../Screens/RecuperarContrasenaScreen";
import FormularioRegistrarse from "../componentes/FormularioRegistrarse";
import Formulario1 from "../componentes/Formulario1";
import Formulario2 from "../componentes/Formulario2";
import Formulario3 from "../componentes/Formulario3";
import DocumentosRegistrarseEmpresaScreen from "../Screens/DocumentosRegistrarseEmpresaScreen";
import NuevaContrasenaScreen from "../Screens/NuevaContrasenaScreen";
import BotonImagenRegis from "../componentes/BotonImagenRegis";
import MiMascotaScreen from "../Screens/MiMascotaScreen";
import Mascotas from "../componentes/MiMascota/Mascotas";
import NuevaMascota from "../componentes/MiMascota/NuevaMascota";
import AgregarImagen from "../componentes/AgregarImagen";
import EditarMascota from "../componentes/MiMascota/EditarMascota";
import EliminarMascotaModal from "../componentes/MiMascota/EliminarMascotaModal";
import MisTurnos from "../Screens/MisTurnos";
import BotonTurnos from "../componentes/MiMascota/BotonTurnos";
import AltaTurno from "../componentes/MiMascota/AltaTurno";
import EditarTurno from "../componentes/MiMascota/EditarTurno";
import TurnoModal from "../componentes/MiMascota/TurnoModal";
import SuccessModal from "../componentes/MiMascota/SuccessModal";
import ErrorModal from "../componentes/MiMascota/ErrorModal";
import MisVacunas from "../Screens/MisVacunas";
import MiInfoImportante from "../Screens/MiInfoImportante";
import EditarInfo from "../componentes/MiMascota/EditarInfo";
import BotonInformacion from "../componentes/MiMascota/BotonInformacion";
import AltaInformacion from "../componentes/MiMascota/AltaInformacion";
import ReportesScreen from "../Screens/ReportesScreen";
import EditarPublicacionAdopcion from "../componentes/Perfil/EditarPublicacionAdopcion";
import EditarPublicacionBusqueda from "../componentes/Perfil/EditarPublicacionBusqueda";
import ModalTraza from '../componentes/Busqueda/ModalTraza';
import InfoModal from "../componentes/MiMascota/InfoModal";
import BarraBusquedaMascota from "../componentes/MiMascota/BarraBusquedaMascota";
import BotonVaccine from "../componentes/MiMascota/BotonVaccine";
import AltaVaccin from "../componentes/MiMascota/AltaVaccin";
import VaccinModal from "../componentes/MiMascota/VaccinModal";
import ListaValoresAñoMascota from "../componentes/MiMascota/ListaValoresAñoMascota";
import ListaValoresDiasMascota from "../componentes/MiMascota/ListaValoresDiasMascota";
import ListaValoresMesesMascota from "../componentes/MiMascota/ListaValoresMesesMascota";
import EditarVaccin from "../componentes/MiMascota/EditarVaccin";
import DenunciasModal from '../componentes/Denuncias/DenunciasModal';
import DenunciaScreen from '../Screens/DenunciaScreen';
import PreguntasFrecuentes from '../Screens/PreguntasFrecuentes';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PreScreen" component={PreScreen} />

            <Stack.Screen
                name='InfoModal'
                component={InfoModal}
            />
            <Stack.Screen
                name='BotonVaccine'
                component={BotonVaccine}
            />
            <Stack.Screen
                name='AltaVaccin'
                component={AltaVaccin}
            />
            <Stack.Screen
                name='VaccinModal'
                component={VaccinModal}
            />
            <Stack.Screen
                name='ListaValoresAñoMascota'
                component={ListaValoresAñoMascota}
            />
            <Stack.Screen
                name='ListaValoresDiasMascota'
                component={ListaValoresDiasMascota}
            />
            <Stack.Screen
                name='ListaValoresMesesMascota'
                component={ListaValoresMesesMascota}
            />
            <Stack.Screen
                name='EditarVaccin'
                component={EditarVaccin}
            />
            <Stack.Screen
                name='ModalTraza'
                component={ModalTraza}
            />
            <Stack.Screen
                name='DenunciasModal'
                component={DenunciasModal}
            />
            <Stack.Screen
                name='DenunciaScreen'
                component={DenunciaScreen}
            />
            <Stack.Screen
                name='PreguntasFrecuentes'
                component={PreguntasFrecuentes}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
