import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.negro,
        textColor: colors.blanco,
        shadowColor: colors.grisSuave,
        borderRadius: 30,
        shadowOpacity:0.5,
        shadowRadius:2,
        shadowOffset: {width: 4,height:5},
        elevation:10,
    }
})