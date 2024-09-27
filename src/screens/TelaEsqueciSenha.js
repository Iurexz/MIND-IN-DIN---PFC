import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function ForgetPassScreen() {
    const [inputValues, setInputValues] = useState({
        newPassword: '',
        confirmNewPassword: '',
        token: '',
    })

    const handleChange = (field, value) => {
        setInputValues({ ...inputValues, [field]: value })
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Código de verificação..."

                    />
                </View>

                {/* Box da senha */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha..."
                        value={inputValues.password}
                        onChangeText={(text) => handleChange('newPassword', text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {/* Box da confirmação de senha */}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha..."
                        value={inputValues.password}
                        onChangeText={(text) => handleChange('confirmNewPassword', text)}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
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
        fontSize: heightPercentageToDP('4%'),
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
})