import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
    const [showWarning, setShowWarning] = useState(true) // Caixa de aviso
    const [warningText, setWarningText] = useState("") // Texto da caixa de aviso
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleChange = (field, value) => {
        setInputValues({ ...inputValues, [field]: value })
    }

    const formatPhone = (text) => {
        // Remove todos os caracteres que não são números
        const cleaned = text.replace(/\D/g, '')

        // Limita a entrada a no máximo 11 dígitos
        if (cleaned.length > 11) {
            return inputValues.phone // Não permite mais de 11 dígitos
        }

        // Aplica a formatação (XX) XXXXX-XXXX
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{0,4})$/)
        if (match) {
            if (match[3]) {
                return `(${match[1]}) ${match[2]}-${match[3]}`
            } else {
                return `(${match[1]}) ${match[2]}`
            }
        }

        // Retorna o valor sem formatação se não atingir os 11 dígitos
        return cleaned
    }

    const handlePhoneChange = (text) => {
        const formattedPhone = formatPhone(text)
        setInputValues({ ...inputValues, phone: formattedPhone })
    }

    const handleConfirmDate = (date) => {
        setShowDatePicker(false)
        setSelectedDate(date)
        handleChange('birthDate', formatDate(date))
    }

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Meses começam do 0
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const closeWarning = () => {
        setShowWarning(true)
    }

    const verifyInputs = () => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ // Letras com acentos e espaços
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Verifica se há um @ e termina com .com
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ // Min 8 chars, 1 letra, 1 número, 1 símbolo

        if (inputValues.name === "" || inputValues.email === "" || inputValues.birthDate === "" || inputValues.phone === "" || inputValues.address === "" || inputValues.password === "" || inputValues.confirmPassword === "") {
            setWarningText("Por favor, preencha todos os campos para realizar o cadastro.")
            setShowWarning(false)
        } else if (!inputValues.name.match(nameRegex)) {
            setWarningText("Nome inválido. Use apenas letras e acentuações.")
            setShowWarning(false)
        } else if (!emailRegex.test(inputValues.email)) {
            setWarningText("Email inválido. O email deve conter um '@' e terminar com '.com'.")
            setShowWarning(false)
        } else if (inputValues.phone.replace(/\D/g, '').length !== 11) {
            setWarningText("O número de telefone deve conter 11 dígitos.")
            setShowWarning(false)
        } else if (!inputValues.password.match(passwordRegex)) {
            setWarningText("A senha deve ter pelo menos 8 caracteres, incluindo 1 número, 1 letra e 1 símbolo.")
            setShowWarning(false)
        } else if (inputValues.password !== inputValues.confirmPassword) {
            setWarningText("As senhas digitadas não coincidem! Por favor tente novamente.")
            setShowWarning(false)
        } else {
            setShowWarning(true)
            verifyPassword()
        }
    }

    const verifyPassword = () => {
        if (inputValues.password === inputValues.confirmPassword) {
            setShowWarning(true)
        } else {
            setWarningText("As senhas digitadas não coincidem! Por favor tente novamente.")
            setShowWarning(false)
        }
    }


    return (
        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']}
            style={styles.container}
        >

            <View style={styles.signUpBox}>
                {/* Box do input do nome */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo..."
                        value={inputValues.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <FontAwesome name="user" size={24} color="black" style={styles.icon} />
                </View>

                {/* Box do input do e-mail */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail..."
                        value={inputValues.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                    />
                    <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
                </View>

                {/* Box do input da data de nascimento */}
                <View style={styles.inputBox}>
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

                {/* Box do input do telefone */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone..."
                        value={inputValues.phone}
                        onChangeText={handlePhoneChange} // Agora o handlePhoneChange está correto
                        keyboardType="phone-pad"
                    />
                    <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
                </View>

                {/* Box do input do endereço */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço..."
                        value={inputValues.address}
                        onChangeText={(text) => handleChange('address', text)}
                    />
                    <FontAwesome name="home" size={24} color="black" style={styles.icon} />
                </View>

                {/* Box do input da senha */}
                <View style={styles.inputBox}>
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

                {/* Box do input de confirmar senha */}
                <View style={styles.inputBox}>
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

                {/* Botão de cadastro */}
                <TouchableOpacity style={styles.button} onPress={verifyInputs}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                {/* Caixa de aviso */}
                {showWarning || <View style={styles.warningBox}>
                    <Text style={styles.warningText}>{`${warningText}`}</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={closeWarning}>
                        <FontAwesome name="close" size={24} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>}
            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('100%'),
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },

    signUpBox: {
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('90%'),
        backgroundColor: "white",
        borderTopRightRadius: heightPercentageToDP('3%'),
        borderTopLeftRadius: heightPercentageToDP('3%'),
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: heightPercentageToDP('4%'),
        overflow: 'hidden',
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
        paddingVertical: heightPercentageToDP('0.5%'),
        paddingLeft: heightPercentageToDP('1%'),
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
    },

    buttonText: {
        color: 'white',
        fontSize: heightPercentageToDP('2%'),
        fontWeight: 'bold',
    },

    warningBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "red",
        position: "absolute",
        padding: heightPercentageToDP('1%'),
        top: heightPercentageToDP('82%'),
        borderRadius: heightPercentageToDP('0.3%'),
        gap: heightPercentageToDP('1.5%'),
    },

    warningText: {
        color: 'white',
        fontWeight: 'bold',
        maxWidth: widthPercentageToDP('70%'),
    },

    closeBtn: {
        borderLeftWidth: 1,
        borderLeftColor: "white",
    }
})