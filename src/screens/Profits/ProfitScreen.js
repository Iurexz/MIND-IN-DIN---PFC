import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FontAwesome } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'

export default function ProfitScreen() {
    const [error, setError] = useState({
        nameError: '',
        recentNameError: '',
        recentValueError: '',
    })

    const [inputValues, setInputValues] = useState({
        name: '',
        icon: '',
        value: 0,
    })

    const [recentInputValues, setRecentInputValues] = useState({
        name: '',
        value: '',
    })

    const [categories, setCategories] = useState([{
        name: '',
        icon: '',
        value: 0,
    }])

    const [recentProfit, setRecentProfit] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    const [profitModal, setProfitModal] = useState(false)
    const [selectedIcon, setselectedIcon] = useState("image")

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
        setInputValues({ name: '', icon: '', value: 0 })
        setError({ nameError: '' })
    }

    const openProfitModal = () => {
        setProfitModal(true)
    }

    const closeProfitModal = () => {
        setProfitModal(false)
        setRecentInputValues({ name: '', value: '' })
        setError({ recentNameError: '', recentValueError: '' })
    }

    const handleChange = (field, value) => {
        setInputValues({ ...inputValues, [field]: value })

        if (field === "name" && value.trim() !== "") {
            setError({ ...error, nameError: "" })
        }
    }

    const handleRecentChange = (field, value) => {
        // Substitui vírgula por ponto
        if (field === "value") {
            value = value.replace(',', '.');
        }

        setRecentInputValues({ ...recentInputValues, [field]: value });

        if (field === "name" && value.trim() !== "") {
            setError({ ...error, recentNameError: "" });
        }

        if (field === "value") {
            // Verifica se é um número válido após a substituição
            if (value.trim() !== "" && !isNaN(value)) {
                setError({ ...error, recentValueError: "" });
            } else {
                setError({ ...error, recentValueError: "Informe um valor válido!" });
            }
        }
    }

    const formatCurrency = (value) => {
        return R$`${value.toFixed(2).replace('.', ',')}` // Formato: R$ NNNN,NN
    }

    const handleIconName = (name) => {
        setselectedIcon(name)
    }

    const createCategory = () => {
        const newCategory = { name: inputValues.name, icon: selectedIcon, value: inputValues.value }
        setCategories([...categories, newCategory])
        closeModal()
    }

    const verifyInputs = () => {
        if (inputValues.name.trim() === "") {
            setError({ nameError: "Informe o nome da categoria!" })
            return
        }

        createCategory()
    }

    const saveRecentProfit = () => {
        const { name, value } = recentInputValues

        if (name.trim() === "") {
            setError({ ...error, recentNameError: "Informe o nome do lucro!" })
            return
        }

        if (value.trim() === "" || isNaN(value)) {
            setError({ ...error, recentValueError: "Informe um valor válido!" })
            return
        }

        // Formatar a data no padrão DD/MM/AAAA
        const currentDate = new Date()
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')
            }/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`

        const newProfit = {
            name,
            icon: selectedIcon,
            value: parseFloat(value),
            date: formattedDate, // Use o formato brasileiro aqui
        }

        setRecentProfit([...recentProfit, newProfit])
        closeProfitModal()
    }




    return (
        <LinearGradient
            colors={['#124C3E', '#3D7E52', '#124C3E']}
            style={styles.container}
        >

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 15 }}>Adicionar Categoria</Text>

                        <TextInput
                            style={[styles.input, error.nameError ? styles.inputError : null]}
                            placeholder="Nome da categoria..."
                            value={inputValues.name}
                            onChangeText={(text) => handleChange("name", text)}
                            onKeyPress={(text) => handleChange("name", text)}
                        />

                        {error.nameError ? <View>
                            <Text style={{ color: "red", textAlign: 'left' }}>{error.nameError}</Text>
                        </View> : null}


                        <View style={styles.iconContainer}>
                            {[
                                { name: "briefcase" },
                                { name: "laptop" },
                                { name: "line-chart" },
                                { name: "home" },
                                { name: "shopping-cart" },
                                { name: "money" },
                                { name: "gift" },
                                { name: "building" },
                                { name: "trophy" },
                                { name: "wallet-outline", component: Icon }
                            ].map((icon, index) => (
                                <TouchableOpacity key={index} onPress={() => handleIconName(icon.name)} style={[styles.iconBox, selectedIcon === icon.name ? styles.iconBoxPressed : null]}>
                                    {icon.component ? (
                                        <icon.component name={icon.name} size={32} color="#1C5D1F" />
                                    ) : (
                                        <FontAwesome name={icon.name} size={32} color="#1C5D1F" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>


                        <View style={styles.btnBox}>

                            <TouchableOpacity onPress={closeModal}>
                                <Text style={{ fontWeight: 500 }}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalBtn} onPress={verifyInputs}>
                                <Text style={{ color: "white", fontWeight: 500 }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={profitModal}
                onRequestClose={closeProfitModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 15 }}>Adicionar Lucro Recente</Text>

                        <TextInput
                            style={[styles.input, error.recentNameError ? styles.inputError : null]}
                            placeholder="Nome do lucro..."
                            value={recentInputValues.name}
                            onChangeText={(text) => handleRecentChange("name", text)}
                        />
                        {error.recentNameError ? (
                            <Text style={{ color: "red", textAlign: 'left', top: -9 }}>{error.recentNameError}</Text>
                        ) : null}

                        <TextInput
                            style={[styles.input, error.recentValueError ? styles.inputError : null]}
                            placeholder="Valor do lucro..."
                            value={recentInputValues.value}
                            onChangeText={(text) => handleRecentChange("value", text)}
                            keyboardType="numeric"
                        />
                        {error.recentValueError ? (
                            <Text style={{ color: "red", textAlign: 'left' }}>{error.recentValueError}</Text>
                        ) : null}

                        <View style={styles.iconContainer}>
                            {[
                                { name: "briefcase" },
                                { name: "laptop" },
                                { name: "line-chart" },
                                { name: "home" },
                                { name: "shopping-cart" },
                                { name: "money" },
                                { name: "gift" },
                                { name: "building" },
                                { name: "trophy" },
                                { name: "wallet-outline", component: Icon }
                            ].map((icon, index) => (
                                <TouchableOpacity key={index} onPress={() => handleIconName(icon.name)} style={[styles.iconBox, selectedIcon === icon.name ? styles.iconBoxPressed : null]}>
                                    {icon.component ? (
                                        <icon.component name={icon.name} size={32} color="#1C5D1F" />
                                    ) : (
                                        <FontAwesome name={icon.name} size={32} color="#1C5D1F" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.btnBox}>
                            <TouchableOpacity onPress={closeProfitModal}>
                                <Text style={{ fontWeight: 500 }}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalBtn} onPress={saveRecentProfit}>
                                <Text style={{ color: "white", fontWeight: 500 }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.profitBox}>
                <Text style={{ fontSize: 16, color: "white" }}>Meus lucros totais:</Text>
                <Text style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>R$ 1500,00</Text>
            </View>

            <View>
                <Text style={{ fontSize: 16, color: "white" }}>Jan</Text>
            </View>

            <View style={styles.optionsBox}>
                <Text style={{ fontSize: 14, fontWeight: 700 }}>Suas categorias:</Text>

                <View style={styles.categoriesBox}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesField}
                    >
                        {categories.map((category, index) => (
                            category.name && (
                                <View style={styles.category} key={index}>
                                    <Text style={{ fontSize: 14 }}>{category.name}</Text>
                                    <FontAwesome name={category.icon} size={32} color="#1C5D1F" />
                                    <Text style={{ fontSize: 14 }}>{R$`${category.value}`}</Text>
                                </View>
                            )
                        ))}

                        <TouchableOpacity style={styles.addCategorieBtn} onPress={openModal}>
                            <FontAwesome name="plus" size={32} color="#1C5D1F" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.recentProfitsBox}>
                    <Text style={{ fontSize: 14, fontWeight: 700 }}>Seus lucros recentes:</Text>

                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {recentProfit.map((recentProfit, index) => (
                            recentProfit.name && (
                                <View style={styles.recentProfit} key={index}>
                                    <FontAwesome name={recentProfit.icon} size={32} color="#1C5D1F" />

                                    <View>
                                        <Text style={{ fontSize: 14 }}>{recentProfit.name}</Text>
                                        <Text style={{ fontSize: 14 }}>{recentProfit.date}</Text>
                                    </View>

                                    <Text style={{ fontSize: 14 }}>{formatCurrency(recentProfit.value)}</Text>

                                    <TouchableOpacity>
                                        <FontAwesome name="bars" size={22} color="#646464" />
                                    </TouchableOpacity>
                                </View>
                            )
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.addRecentBtn} onPress={openProfitModal}>
                    <FontAwesome name="plus" size={32} color="white" />
                </TouchableOpacity>

            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    profitBox: {
        marginTop: hp("8%"),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("3%"),
    },

    optionsBox: {
        marginTop: hp("3%"),
        flex: 1,
        width: wp("100%"),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical: wp("10%"),
        paddingHorizontal: wp("5%"),
    },

    addCategorieBtn: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EFEFEF",
        width: wp("30%"),
        height: hp("17%"),
        borderRadius: 10,
        marginVertical: hp("1%"),
    },

    categoriesBox: {
        flex: 0,
        alignItems: 'center',
        width: wp("90%"),
    },

    category: {
        flex: 0,
        padding: wp("3.2%"),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#EFEFEF",
        width: wp("30%"),
        height: hp("17%"),
        borderRadius: 10,
        marginVertical: hp("1%"),
        marginRight: wp("2%"),
    },

    recentProfit: {
        flex: 0,
        padding: wp("5%"),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EFEFEF",
        width: wp("90%"),
        height: hp("10%"),
        borderRadius: 10,
        marginVertical: hp("1%"),
        marginRight: wp("2%"),
    },

    categoriesField: {
        justifyContent: 'center',
        paddingHorizontal: wp("2%"),
        paddingVertical: wp("2%"),
        gap: wp("1.5%"),
    },

    openModalButton: {
        backgroundColor: "#1C5D1F",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        width: wp("80%"),
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    input: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#EFEFEF",
    },

    inputError: {
        borderColor: 'red',
        borderWidth: 1.5,
    },

    btnBox: {
        width: wp("70%"),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp("2%")
    },

    modalBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#388E3C',
        padding: wp("2%"),
        borderRadius: wp("1%"),
        width: wp("20%"),
    },

    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: wp("100%"),
        gap: wp("2.5%"),
        marginVertical: hp("3%"),
    },

    iconBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp("12%"),
        height: hp("5%"),
        borderRadius: wp("1%"),
    },

    iconBoxPressed: {
        backgroundColor: "#EFEFEF",
    },

    addRecentBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp("11%"),
        height: hp("5%"),
        backgroundColor: "#1C5D1F",
        position: 'absolute',
        top: hp("65%"),
        left: hp("21%"),
        borderRadius: 100
    },

    scrollView: {
        width: '100%',
        maxHeight: hp("40%"), // Define uma altura máxima para o ScrollView
    },

    scrollContent: {
        paddingBottom: hp("2%"), // Espaçamento inferior para o conteúdo
    },

})