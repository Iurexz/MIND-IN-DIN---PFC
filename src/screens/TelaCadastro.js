import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function SignUpScreen() {
    const [inputValues, setInputValues] = useState({
        name: '',
        birthDate: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    })

    const [error, setError] = useState({
        name: '',
        birthDate: '',
        address: '',
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
                return `(${match[1]}) ${match[2]}-${match[3]}`
            } else {
                return `(${match[1]}) ${match[2]}`
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

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const verifyInputs = () => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ // Letras com acentos e espaços
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Verifica se há um @ e termina com .com
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ // Min 8 chars, 1 letra, 1 número, 1 símbolo

        let newError = {}

        if (inputValues.name === "") {
            newError = { ...newError, name: "O nome é um campo obrigatório." }
        } else if (!inputValues.name.match(nameRegex)) {
            newError = { ...newError, name: "Nome inválido. Use apenas letras e acentuações." }
        }

        if (inputValues.email === "") {
            newError = { ...newError, email: "O email é um campo obrigatório." }
        } else if (!emailRegex.test(inputValues.email)) {
            newError = { ...newError, email: "Email inválido." }
        }

        if (inputValues.birthDate === "") {
            newError = { ...newError, birthDate: "A data de nascimento é um campo obrigatório." }
        }

        if (inputValues.phone === "") {
            newError = { ...newError, phone: "O número de telefone é um campo obrigatório." }
        } else if (inputValues.phone.replace(/\D/g, '').length !== 11) {
            newError = { ...newError, phone: "O número de telefone deve conter 11 dígitos." }
        }

        if (inputValues.address === "") {
            newError = { ...newError, address: "O endereço é um campo obrigatório." }
        }

        if (inputValues.password === "") {
            newError = { ...newError, password: "A senha é um campo obrigatório." }
        } else if (!inputValues.password.match(passwordRegex)) {
            newError = { ...newError, password: "A senha deve ter pelo menos 8 caracteres, incluindo 1 número, 1 letra e 1 símbolo." }
        }

        if (inputValues.confirmPassword === "") {
            newError = { ...newError, confirmPassword: "A senha é um campo obrigatório." }
        } else if (inputValues.confirmPassword === inputValues.password) {
            setError({})
        } else {
            newError = { ...newError, confirmPassword: "As senhas digitadas não coincidem! Por favor tente novamente." }
        }

        setError(newError)
    }

    return (


        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']}
            style={styles.container}
        >

            <View style={styles.signUpBox}>

                <View style={styles.titleBox}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>Cadastre-se</Text>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>aqui!</Text>
                </View>

                <KeyboardAvoidingView style={styles.formBox}>
                    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} >


                        {/* Box do input do nome */}
                        < View style={[styles.inputBox, error.name ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome completo..."
                                value={inputValues.name}
                                onChangeText={(text) => handleChange('name', text)}
                            />
                            <FontAwesome name="user" size={24} color="black" style={styles.icon} />
                        </View>

                        <View style={styles.errorBox}>
                            {error.name && <Text style={styles.errorText}>{error.name}</Text>}
                        </View>

                        {/* Box do input do e-mail */}
                        <View style={[styles.inputBox, error.email ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail..."
                                value={inputValues.email}
                                onChangeText={(text) => handleChange('email', text)}
                                keyboardType="email-address"
                            />
                            <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
                        </View>

                        <View style={styles.errorBox}>
                            {error.email && <Text style={styles.errorText}>{error.email}</Text>}
                        </View>

                        {/* Box do input da data de nascimento */}
                        <View style={[styles.inputBox, error.birthDate ? styles.inputError : null]}>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                                <Text>{inputValues.birthDate || <Text style={styles.dateText}>Selecione sua data de nascimento...</Text>}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="calendar" size={24} color="black" style={styles.icon} />
                        </View>

                        <DateTimePickerModal
                            isVisible={showDatePicker}
                            mode="date"
                            date={selectedDate}
                            onConfirm={handleConfirmDate}
                            onCancel={() => setShowDatePicker(false)}
                            maximumDate={new Date()} // Impede seleção de datas futuras
                        />

                        <View style={styles.errorBox}>
                            {error.birthDate && <Text style={styles.errorText}>{error.birthDate}</Text>}
                        </View>

                        {/* Box do input do telefone */}
                        <View style={[styles.inputBox, error.phone ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Telefone..."
                                value={inputValues.phone}
                                onChangeText={handlePhoneChange}
                                keyboardType="phone-pad"
                            />
                            <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
                        </View>

                        <View style={styles.errorBox}>
                            {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}
                        </View>

                        {/* Box do input do endereço */}
                        <View style={[styles.inputBox, error.address ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Endereço..."
                                value={inputValues.address}
                                onChangeText={(text) => handleChange('address', text)}
                            />
                            <FontAwesome name="home" size={24} color="black" style={styles.icon} />
                        </View>

                        <View style={styles.errorBox}>
                            {error.address && <Text style={styles.errorText}>{error.address}</Text>}
                        </View>

                        {/* Box do input da senha */}
                        <View style={[styles.inputBox, error.password ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Senha..."
                                value={inputValues.password}
                                onChangeText={(text) => handleChange('password', text)}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.errorBox}>
                            {error.password && <Text style={styles.errorText}>{error.password}</Text>}
                        </View>

                        {/* Box do input da confirmação da senha */}
                        <View style={[styles.inputBox, error.confirmPassword ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar senha..."
                                value={inputValues.confirmPassword}
                                onChangeText={(text) => handleChange('confirmPassword', text)}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.errorBox}>
                            {error.confirmPassword && <Text style={styles.errorText}>{error.confirmPassword}</Text>}
                        </View>

                        <TouchableOpacity onPress={verifyInputs} style={styles.button}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>

                        <View style={styles.errorBox}>
                            {error.form && <Text style={styles.errorText}>{error.form}</Text>}
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView >

            </View>

        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },

    signUpBox: {
        flex: 1,
        backgroundColor: "white",
        height: heightPercentageToDP("100%"),
        width: widthPercentageToDP("100%"),
        padding: widthPercentageToDP("4%"),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        gap: heightPercentageToDP("3%")
    },

    titleBox: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPercentageToDP("5%")
    },

    formBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: heightPercentageToDP('1%'),
        paddingVertical: heightPercentageToDP('1%'),
        width: '100%',
        position: 'relative',
    },

    input: {
        flex: 1,
        fontSize: widthPercentageToDP('4'),
        paddingVertical: heightPercentageToDP('0.9%'),
        paddingLeft: heightPercentageToDP('1%'),
    },

    inputError: {
        borderBottomColor: 'red',
    },

    dateText: {
        color: "grey",
        fontSize: heightPercentageToDP('1.8%'),
    },

    icon: {
        marginLeft: heightPercentageToDP('1%'),
    },

    button: {
        backgroundColor: '#388E3C',
        paddingVertical: heightPercentageToDP('1.5%'),
        paddingHorizontal: widthPercentageToDP('31%'),
        borderRadius: heightPercentageToDP('1%'),
        marginTop: heightPercentageToDP('4%'),
        marginBottom: heightPercentageToDP('1%'),
    },

    buttonText: {
        color: 'white',
        fontSize: heightPercentageToDP('2%'),
        fontWeight: 'bold',
    },

    closeBtn: {
        borderLeftWidth: 1,
        borderLeftColor: "white",
    },

    errorBox: {
        width: widthPercentageToDP("83%"),
        maxHeight: heightPercentageToDP("5%"),
        paddingHorizontal: 3,
    },

    errorText: {
        color: "red",
    }
})