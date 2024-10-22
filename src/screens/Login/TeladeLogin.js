import { KeyboardAvoidingView, ScrollView } from 'react-native'; // Adicione o ScrollView
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LinearGradient
        colors={['#124C3E', '#3D7E52', '#124C3E']}
        style={styles.gradient}
      >
        {/* Imagem de login */}
        <Image source={require('../../../assets/image/logo 2.png')} style={styles.image} />

        {/* ScrollView para permitir rolagem */}
        <ScrollView
          style={styles.scrollView}
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Caixa branca com bordas arredondadas */}
          <View style={styles.loginBox}>
            {/* Título */}
            <Text style={styles.title}>Login</Text>

            {/* Campo de e-mail */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail..."
                value={email}
                onChangeText={setEmail}
              />
              <FontAwesome name="envelope" size={wp('6%')} color="black" />
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
                <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
              </TouchableOpacity>
            </View>

            {/* Link para cadastro */}
            <Text style={styles.registerText}>
              Ainda não é cadastrado?{' '}
              <Text style={styles.registerLink} onPress={() => navigation.navigate('SignUp')}>
                Cadastre-se aqui.
              </Text>
            </Text>
            <Text style={styles.registerLink} onPress={() => navigation.navigate('ForgetPass')}>
              Esqueci minha senha
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
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: wp('0%'),
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: wp('60%'),
    height: hp('20%'),
    marginBottom: hp('5%'),
    marginTop: hp('12%'),
    alignSelf: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: hp('5%'), // Adiciona espaço na parte inferior
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: wp('10%'),
    width: wp('100%'),
    height: hp('80%'),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp('2%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: hp('2%'),
    paddingVertical: hp('1%'),
    width: '90%',
  },
  input: {
    flex: 1,
    fontSize: wp('4%'),
  },
  registerText: {
    color: 'black',
    marginTop: hp('2%'),
  },
  registerLink: {
    color: '#388E3C',
    fontWeight: 'bold',
    marginTop: hp('1.2%'),
  },
  loginButton: {
    backgroundColor: '#388E3C',
    padding: wp('4%'),
    borderRadius: 10,
    marginTop: hp('2%'),
    width: '90%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  googleButton: {
    marginTop: hp('3%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    backgroundColor: 'white',
  },
  googleIcon: {
    width: wp('8%'),
    height: wp('8%'),
  },
});
