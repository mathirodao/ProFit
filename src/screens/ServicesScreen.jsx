import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'
import { colors } from '../global/colors'
import { useGetOptionCardsQuery } from '../services/fitService'

const ServicesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)
    
    const { data: optionCards, error, isLoading } = useGetOptionCardsQuery()

    useEffect(() => {
        setIsPortrait(width < height)
    }, [width, height])


    const renderServicesItem = ({ item, index }) => (
        <Pressable onPress={() => {
            navigation.navigate(item.screen, { 
                image: item.image,
                description: item.description 
              })
        }}>
            <FlatCard style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="center" />
                <View style={styles.textContainer}>
                    <Text style={styles.servicesTitle}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </FlatCard>
        </Pressable>
    )

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.grisIntermedio} />
            ) : error ? (
                <Text>Error al cargar las Servicios</Text>
            ) : (
                optionCards.map((item, index) =>(
                    <View key={index}>{renderServicesItem({ item })}</View>
                ))
            )}
        </>
    )
}

export default ServicesScreen

const styles = StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    servicesTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: colors.grisOscuro,
    },
    image: {
        width: 150,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        margin: 10,
        backgroundColor: colors.blanco,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    rowReverse: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        backgroundColor: colors.blanco,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
})
