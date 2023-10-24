import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BotonPublicar({ onPress, disabled, onDisabled }) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Escucha cambios en la prop 'onDisabled' y actualiza el estado interno 'isDisabled' en consecuencia
    setIsDisabled(onDisabled);
  }, [onDisabled]);

  const handlePress = () => {
    if (!isDisabled && !disabled) {
      setIsDisabled(true); // Deshabilitar el botón

      // Llamar a la función onPress
      onPress();

      // Habilitar el botón nuevamente después de 3 segundos
      setTimeout(() => {
        setIsDisabled(false);
      }, 4000); // 4000 milisegundos = 4 segundos (para que coincida con el tiempo que mencionaste anteriormente)
    }
  };

  return (
    <TouchableOpacity
      style={[styles.botonPublicar, (disabled || isDisabled) && styles.botonPublicarDisabled]}
      onPress={handlePress}
      disabled={disabled || isDisabled} // Habilita o deshabilita el TouchableOpacity
    >
      <Text style={styles.textoTouch}>Publicar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botonPublicar: {
    backgroundColor: '#FFB984',
    marginTop: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonPublicarDisabled: {
    opacity: 0.5, // Estilos para el botón cuando está deshabilitado (puedes personalizarlo)
  },
  textoTouch: {
    fontSize: 18,
  },
});
