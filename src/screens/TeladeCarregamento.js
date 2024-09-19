
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const { width } = Dimensions.get('window');

const LoadingScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Login'); // Navega para a tela de login após 3 segundos
        }, 3000);
      }, [navigation]);


  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/image/mind in din.png')} 
        style={styles.logo} 
        resizeMode="contain" // Ajusta a logo para caber na tela
      />
      <ActivityIndicator animating={true} color={MD2Colors.red800} size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.8, // 80% da largura da tela
    maxWidth: 300, // Largura máxima em pixels
    height: undefined, // Mantém a proporção
    aspectRatio: 1, // Ajusta a proporção para a imagem manter o formato
    marginBottom: 20, // Espaço entre a logo e o indicador de carregamento
  },
});
