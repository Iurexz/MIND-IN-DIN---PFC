import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SignUpScreen({ navigation }) {
  const [inputValues, setInputValues] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirmDate = (date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    setInputValues({ ...inputValues, birthDate: formatDate(date) });
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LinearGradient
        colors={['#124C3E', '#3D7E52', '#124C3E']}
        style={styles.gradient}
      >
        {/* Imagem de logo */}
        <Image source={require('../../assets/image/logo 2.png')} style={styles.image} />

        {/* Caixa branca de cadastro */}
        <View style={styles.signUpBox}>
          {/* Título */}
          <Text style={styles.title}>Crie sua Conta</Text>
          <Text style={styles.subtitle}>Faça sua conta Mind In Din e veja seu dindin render! 😉</Text>

          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Seu nome..."
              value={inputValues.name}
              onChangeText={text => setInputValues({ ...inputValues, name: text })}
            />
            <FontAwesome name="user" size={wp('6%')} color="black" />
          </View>

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail..."
              value={inputValues.email}
              onChangeText={text => setInputValues({ ...inputValues, email: text })}
              keyboardType="email-address"
            />
            <FontAwesome name="envelope" size={wp('6%')} color="black" />
          </View>

          {/* Campo Data de Nascimento */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{inputValues.birthDate || 'Sua data de nascimento...'}</Text>
            </TouchableOpacity>
            <FontAwesome name="calendar" size={wp('6%')} color="black" />
          </View>

          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={selectedDate}
            onConfirm={handleConfirmDate}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={new Date()} // Impede seleção de datas futuras
          />

          {/* Campo Telefone */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Seu Telefone..."
              value={inputValues.phone}
              onChangeText={text => setInputValues({ ...inputValues, phone: text })}
              keyboardType="phone-pad"
            />
            <FontAwesome name="phone" size={wp('6%')} color="black" />
          </View>

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Sua senha..."
              value={inputValues.password}
              onChangeText={text => setInputValues({ ...inputValues, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
            </TouchableOpacity>
          </View>

          {/* Campo Confirmar Senha */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha..."
              value={inputValues.confirmPassword}
              onChangeText={text => setInputValues({ ...inputValues, confirmPassword: text })}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
            </TouchableOpacity>
          </View>

          {/* Botão Continuar */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>

          {/* Termos de uso e política */}
          <Text style={styles.termsText}>
            Ao criar conta você concorda com nossos
            <Text style={styles.termsLink}> Termos de Uso </Text>e
            <Text style={styles.termsLink}> Políticas de Privacidade.</Text>
          </Text>

          {/* Botão Google */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/96/google-logo.png' }}
              style={styles.googleIcon}
            />
          </TouchableOpacity>

          {/* Link para login */}
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Fazer Login</Text>
          </Text>
        </View>
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
    width: wp('30%'), // Diminui a largura da logo
    height: hp('10%'), // Diminui a altura da logo
    marginBottom: hp('1%'), // Ajusta a margem inferior
    marginTop: hp('10%'), // Ajusta a margem superior
    alignSelf: 'center',
  },
  signUpBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: wp('8%'),
    width: wp('100%'), // Ajusta a largura da caixa branca
    height: hp('100%'), // Ajusta a altura da caixa branca
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp('1%'), // Ajusta a margem superior
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#3D7E52',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: hp('1%'),
    paddingVertical: hp('1%'),
    width: '90%',
  },
  input: {
    flex: 1,
    fontSize: wp('4%'),
  },
  continueButton: {
    backgroundColor: '#388E3C',
    padding: wp('3+%'),
    borderRadius: 10,
    marginTop: hp('1%'),
    width: '90%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: wp('3%'),
    color: '#777',
    marginVertical: hp('1%'),
  },
  termsLink: {
    color: '#3D7E52',
    textDecorationLine: 'underline',
  },
  googleButton: {
    marginTop: hp('1%'),
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
  loginText: {
    color: 'black',
    marginTop: hp('1%'),
  },
  loginLink: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
});

