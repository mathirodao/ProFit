import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, SignUpScreen } from "../screens/auth"

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />    
        </Stack.Navigator>
    )
}

export default AuthNavigator