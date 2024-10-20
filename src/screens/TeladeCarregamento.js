import { CommonActions, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }, 1000); // Tempo em milissegundos (3 segundos aqui)

    return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#124C3E', '#3D7E52', '#124C3E']}
      style={styles.container}
    >
      <Image 
        source={require('../../assets/image/logo 1.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <ActivityIndicator animating={true} color={MD2Colors.white} size="large" />
    </LinearGradient>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.9,
    maxWidth: 250,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
});
