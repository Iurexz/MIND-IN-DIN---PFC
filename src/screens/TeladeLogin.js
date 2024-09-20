import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importa o LinearGradient

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={['#124C3E', '#3D7E52', '#124C3E']} // Gradiente de fundo
      style={styles.container}
    >
      {/* Imagem de login */}
      <Image source={require('../../assets/image/Crypto banking and cryptocurrency wallet.png')} style={styles.image} />

      {/* Caixa branca com bordas arredondadas */}
      <View style={styles.loginBox}>
        {/* Título */}
        <Text style={styles.title}>Login</Text>

        {/* Campo de e-mails */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail..."
            value={email}
            onChangeText={setEmail}
          />
          <FontAwesome name="envelope" size={24} color="black" />
        </View>

        {/* Campo de senha */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sua senha..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Link para cadastro */}
        <Text style={styles.registerText}>
          Ainda não é cadastrado?{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            Cadastre-se aqui
          </Text>
        </Text>

        {/* Botão de login */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Google */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/96/google-logo.png' }}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 100, // Ajuste a distância da imagem para o topo
    alignSelf:'center',
  
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 30, // Bordas arredondadas
    padding: 50,
     width: '110%', // Corrigido para não ultrapassar a largura da tela
     height: '60%',
    alignItems: 'center',
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: '30%', // Coloca a caixa na parte de baixo da tela
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Apenas uma linha embaixo
    borderBottomColor: '#ccc', // Cor da linha
    marginBottom: 10,
    paddingVertical: 10, // Ajuste o espaçamento vertical
    width: '90%',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  registerText: {
    color: 'black',
    marginTop: 10,
  },
  registerLink: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
});
