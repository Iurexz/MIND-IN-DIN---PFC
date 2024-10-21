import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import * as Clipboard from 'expo-clipboard'

export default function ForgetPassScreen() {
    const [inputValues, setInputValues] = useState({
        newPassword: '',
        confirmNewPassword: '',
        token: '',
    })

    const [error, setError] = useState({
        token: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handleChange = (field, value) => {
        setInputValues({ ...inputValues, [field]: value })
        setError({ ...error, [field]: '' })
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const pasteFromClipboard = async () => {
        const clipboardContent = await Clipboard.getStringAsync()
        handleChange('token', clipboardContent)
    }

    const verifyInputs = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        let newError = { token: "", newPassword: "", confirmNewPassword: "" }

        if (inputValues.token === "") {
            newError.token = "O código de verificação é obrigatório."
        }

        if (inputValues.newPassword === "") {
            newError.newPassword = "A nova senha é obrigatória."
        } else if (!inputValues.newPassword.match(passwordRegex)) {
            newError.newPassword = "A senha deve ter pelo menos 8 caracteres, incluindo 1 número, 1 letra e 1 símbolo."
        }

        if (inputValues.confirmNewPassword === "") {
            newError.confirmNewPassword = "A confirmação da senha é obrigatória."
        } else if (inputValues.newPassword !== inputValues.confirmNewPassword) {
            newError.confirmNewPassword = "As senhas digitadas não coincidem!"
        }

        setError(newError)

        if (!newError.token && !newError.newPassword && !newError.confirmNewPassword) {
            // Processar a mudança de senha
        }
    }

    return (
        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']}
            style={styles.container}
        >
            <View style={styles.signUpBox}>

                <View style={styles.titleBox}>
                    <Text style={styles.title}>Recuperar</Text>
                    <Text style={styles.title}>senha</Text>
                </View>

                {/* Código de verificação */}
                <View style={[styles.inputBox, error.token ? styles.inputError : null]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Código de verificação..."
                        value={inputValues.token}
                        onChangeText={(text) => handleChange('token', text)}
                    />
                    <TouchableOpacity onPress={pasteFromClipboard}>
                        <FontAwesome name="paste" size={22} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.errorBox}>
                    {error.token ? <Text style={styles.errorText}>{error.token}</Text> : null}
                </View>

                {/* Box da senha */}
                <View style={[styles.inputBox, error.newPassword ? styles.inputError : null]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nova senha..."
                        value={inputValues.newPassword}
                        onChangeText={(text) => handleChange('newPassword', text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.errorBox}>
                    {error.newPassword ? <Text style={styles.errorText}>{error.newPassword}</Text> : null}
                </View>

                {/* Box da confirmação de senha */}
                <View style={[styles.inputBox, error.confirmNewPassword ? styles.inputError : null]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar nova senha..."
                        value={inputValues.confirmNewPassword}
                        onChangeText={(text) => handleChange('confirmNewPassword', text)}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.errorBox}>
                    {error.confirmNewPassword ? <Text style={styles.errorText}>{error.confirmNewPassword}</Text> : null}
                </View>

                <TouchableOpacity style={styles.button} onPress={verifyInputs}>
                    <Text style={styles.buttonText}>Mudar senha</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('100%'),
        flex: 0,
        alignItems: "center",
        justifyContent: "flex-end",
    },

    titleBox: {
        flex: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 40,
    },

    title: {
        fontWeight: "800",
        fontSize: heightPercentageToDP('3%'),
    },

    signUpBox: {
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('90%'),
        backgroundColor: "white",
        borderTopRightRadius: heightPercentageToDP('3%'),
        borderTopLeftRadius: heightPercentageToDP('3%'),
        flex: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: heightPercentageToDP('4%'),
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

    inputError: {
        borderBottomColor: 'red',
    },

    input: {
        flex: 1,
        fontSize: heightPercentageToDP('1.8%'),
        paddingVertical: heightPercentageToDP('0.5%'),
        paddingLeft: heightPercentageToDP('1%'),
    },

    icon: {
        marginLeft: heightPercentageToDP('1%'),
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#388E3C',
        width: widthPercentageToDP('85%'),
        height: heightPercentageToDP('6%'),
        borderRadius: heightPercentageToDP('1%'),
        marginTop: heightPercentageToDP('4%'),
    },

    buttonText: {
        color: 'white',
        fontSize: heightPercentageToDP('2%'),
        fontWeight: 'bold',
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