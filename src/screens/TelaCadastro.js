import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importa o LinearGradient

export default function SignUpScreen() {
    return (
        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']} // Gradiente de fundo
            style={styles.container}
        >

            <View style={styles.container}>

                <View style={styles.titleBox}>
                    <Text style={styles.title}>Cadastre-se </Text>
                    <Text style={styles.title}>aqui! </Text>
                    {/* Os espaços são para o texto aparecer completo no celular */}
                </View>

                <View style={styles.signUpBox}>
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
        fontWeight: "500px",
        fontSize: 30,

    },

    signUpBox: {
        width: "100%",
        height: "90%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    }

})