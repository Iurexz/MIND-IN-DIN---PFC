import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

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

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleChange = (field, value) => {
        setInputValues({ ...inputValues, [field]: value })
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const formatPhone = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '')
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
        if (match) {
            return `${match[1]}${match[2] ? ' ' : ''}${match[2]}${match[3] ? '-' + match[3] : ''}`.trim()
        }
        return text
    }

    const handleConfirmDate = (date) => {
        setShowDatePicker(false)
        setSelectedDate(date)
        handleChange('birthDate', formatDate(date))
    }

    return (
        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Cadastre-se</Text>
                    <Text style={styles.title}>aqui!</Text>
                </View>

                <View style={styles.signUpBox}>
                    {/* Box do input do nome */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            value={inputValues.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />
                        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
                    </View>

                    {/* Box do input do e-mail */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={inputValues.email}
                            onChangeText={(text) => handleChange('email', text)}
                            keyboardType="email-address"
                        />
                        <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
                    </View>

                    {/* Box do input da data de nascimento */}
                    <View style={styles.inputBox}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                            <Text style={styles.dateText}>{inputValues.birthDate || 'Selecionar Data'}</Text>
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
                            placeholder="Telefone"
                            value={inputValues.phone}
                            onChangeText={(text) => handleChange('phone', formatPhone(text))}
                            keyboardType="phone-pad"
                        />
                        <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
                    </View>

                    {/* Box do input do endereço */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Endereço"
                            value={inputValues.address}
                            onChangeText={(text) => handleChange('address', text)}
                        />
                        <FontAwesome name="home" size={24} color="black" style={styles.icon} />
                    </View>


                    {/* Box do input da senha */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
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
                            placeholder="Confirmar Senha"
                            value={inputValues.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    {/* Botão de cadastro */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },

    titleBox: {
        flex: 0,
        marginTop: 70,
        marginBottom: 30,
        alignItems: "center"
    },

    title: {
        color: "white",
        fontWeight: "500",
        fontSize: 30,
    },

    signUpBox: {
        width: "100%",
        height: "90%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: 'hidden',
        padding: 40,
    },

    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingVertical: 10,
        width: '100%',
        position: 'relative',
    },

    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 5,
        paddingLeft: 10,
    },

    dateText: {
        color: "grey",
        fontSize: 16,
    },

    icon: {
        marginLeft: 10,
    },

    button: {
        backgroundColor: '#3D7E52',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 40,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
