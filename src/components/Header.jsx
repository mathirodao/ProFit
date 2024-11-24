import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import MontserratText from './MontserratText'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Header = ({subtitle}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>ProFit <MaterialIcons name="fitness-center" size={20} color="white" /></Text>
      <MontserratText style={styles.subtitle}>{subtitle}</MontserratText>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height: 150,
        justifyContent:"center",
        alignItems:"left",
        backgroundColor:colors.acentoAzul
    },
    title:{
        fontSize:24,
        marginLeft:"2%",
        color:colors.blanco,
        fontFamily:'TiltWarp',
        marginTop:"15%"
    },
    subtitle:{
      fontSize:18,
      fontWeight:700,
      color:colors.blanco,
      marginLeft:"2%",
      
    }
})