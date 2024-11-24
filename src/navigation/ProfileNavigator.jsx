import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/ProfileScreen"
import Header from "../components/Header"

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />
      }}
    >
      <Stack.Screen component={ProfileScreen} name="Perfil" />
    </Stack.Navigator>
  )
}

export default ProfileNavigator

