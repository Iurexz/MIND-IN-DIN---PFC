import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { api } from '../../services/api';

export default function SignUpScreen({ navigation }) {
  const [inputValues, setInputValues] = useState({
    name: '',
    birthDate: '',
    cep: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const [error, setError] = useState({
    name: '',
    birthDate: '',
    cep: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    passNotEqual: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setInputValues({ ...inputValues, [field]: value })
    setError({ ...error, [field]: '' })
  }

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '')
    if (cleaned.length > 11) {
      return inputValues.phone // Não permite mais de 11 dígitos
    }
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{0,4})$/)
    if (match) {
      if (match[3]) {
        return `(${match[1]}) ${match[2]} -${match[3]}`
      } else {
        return ` (${match[1]}) ${match[2]}`
      }
    }
    return cleaned
  }

  const handlePhoneChange = (text) => {
    const formattedPhone = formatPhone(text)
    setInputValues({ ...inputValues, phone: formattedPhone })
    setError({ ...error, phone: '' })
  }

  const handleConfirmDate = (date) => {
    setShowDatePicker(false)
    setSelectedDate(date)
    handleChange('birthDate', formatDate(date))
  }

  const handleCepChange = (text) => {
    const cleaned = text.replace(/\D/g, '')

    const formattedCep = cleaned.slice(0, 8)

    setInputValues({ ...inputValues, cep: formattedCep })
    setError({ ...error, cep: '' })
  }


  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const verifyInputs = () => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ // Letras com acentos e espaços
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Verifica se há um @ e termina com .com
    const passwordRegex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/ // Min 8 chars, 1 letra, 1 número, 1 símbolo

    let newError = {}

    if (inputValues.name === null || inputValues.name.trim() === "") {
      newError = { ...newError, name: "O nome é um campo obrigatório." }
    } else if (!inputValues.name.match(nameRegex)) {
      newError = { ...newError, name: "Nome inválido. Use apenas letras e acentuações." }
    }

    if (inputValues.email.trim() === "") {
      newError = { ...newError, email: "O email é um campo obrigatório." }
    } else if (!emailRegex.test(inputValues.email)) {
      newError = { ...newError, email: "Email inválido." }
    }

    if (inputValues.birthDate.trim() === "") {
      newError = { ...newError, birthDate: "A data de nascimento é um campo obrigatório." }
    }

    if (inputValues.phone.trim() === "") {
      newError = { ...newError, phone: "O número de telefone é um campo obrigatório." }
    } else if (inputValues.phone.replace(/\D/g, '').length !== 11) {
      newError = { ...newError, phone: "O número de telefone deve conter 11 dígitos." }
    }

    if (inputValues.cep.trim() === "") {
      newError = { ...newError, cep: "O CEP é um campo obrigatório." }
    } else if (inputValues.cep.length !== 8) {
      newError = { ...newError, cep: "O CEP deve possuir 8 dígitos." }
    } else {
      searchCep(inputValues.cep)
    }

    if (inputValues.password.trim() === "") {
      newError = { ...newError, password: "A senha é um campo obrigatório." }
    } else if (!inputValues.password.match(passwordRegex)) {
      newError = { ...newError, password: "A senha deve ter pelo menos 8 caracteres, incluindo 1 número, 1 letra e 1 símbolo." }
    }

    if (inputValues.confirmPassword.trim() === "" && inputValues.password !== "") {
      newError = { ...newError, confirmPassword: "É necessário confirmar a senha para prosseguir." }
    } else if (inputValues.confirmPassword === inputValues.password) {
      setError({})
    } else {
      newError = { ...newError, confirmPassword: "As senhas digitadas não coincidem! Por favor, tente novamente." }
    }

    setError(newError)
  }

  async function searchCep(cep) {
    setLoading(true)

    try {
      const res = await api.get(`/${cep}/json /`)

      if (res.data.erro === "true") {
        setError({ ...error, cep: "CEP não encontrado." })
      }

    } catch (e) {
      setError({ ...error, cep: "Ocorreu um erro ao verificar o CEP, por favor tente novamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={['#124C3E', '#3D7E52', '#124C3E']}
      style={styles.container}
    >
      {/* Imagem de logo */}
      <Image source={require('../../../assets/image/logo 2.png')} style={styles.image} />

      {/* Caixa branca de cadastro */}
      <View style={styles.signUpBox}>
        {/* Título */}
        <Text style={styles.title}>Crie sua Conta</Text>
        <Text style={styles.subtitle}>Faça sua conta Mind In Din e veja seu dindin render! 😉</Text>

        <KeyboardAvoidingView style={styles.formBox}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollBox}>

            {/* Campo Nome */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Seu nome..."
                value={inputValues.name}
                onChangeText={text => handleChange('name', text)}
              />
              <FontAwesome name="user" size={wp('6%')} color="black" />
            </View>

            {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail..."
                value={inputValues.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
              />
              <FontAwesome name="envelope" size={wp('6%')} color="black" />
            </View>

            {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

            {/* Campo Data de Nascimento */}
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{inputValues.birthDate || <Text style={{ color: '#898989', fontSize: wp('4%') }}>Selecione sua data de nascimento...</Text>}</Text>
              </TouchableOpacity>
              <FontAwesome name="calendar" size={wp('6%')} color="black" />
            </View>

            {error.birthDate ? <Text style={styles.errorText}>{error.birthDate}</Text> : null}

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
                onChangeText={text => handlePhoneChange(text)}
                keyboardType="phone-pad"
              />
              <FontAwesome name="phone" size={wp('6%')} color="black" />
            </View>

            {error.phone ? <Text style={styles.errorText}>{error.phone}</Text> : null}

            {/* Campo CEP */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Seu CEP..."
                value={inputValues.cep}
                onChangeText={text => handleCepChange(text)}
                keyboardType="numeric"
              />
              {loading ? <ActivityIndicator size="small" color="#0000ff" /> : <FontAwesome name="map-marker" size={wp('6%')} color="black" />}
            </View>

            {error.cep ? <Text style={styles.errorText}>{error.cep}</Text> : null}

            {/* Campo Senha */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Sua senha..."
                value={inputValues.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
              </TouchableOpacity>
            </View>

            {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

            {/* Campo Confirmar Senha */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha..."
                value={inputValues.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={wp('6%')} color="black" />
              </TouchableOpacity>
            </View>

            {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}

            {/* Botão Continuar */}
            <TouchableOpacity style={styles.continueButton} onPress={verifyInputs}>
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

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: wp('0%'),
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
  formBox: {
    flex: 0,
    width: wp("100%"),
    height: hp("70%"),
  },
  scrollBox: {
    flexGrow: 1,
    alignItems: 'center',
    height: hp("120%"),
    padding: wp("5%")
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
  errorText: {
    color: 'red',
    marginBottom: hp("1%")
  }
});

