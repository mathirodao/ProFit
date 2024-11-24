import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RoutineWallScreen from "../screens/RoutineWallScreen"
import Header from "../components/Header"

const RoutineWallStack = createNativeStackNavigator()

const RoutineWall = () => {
  return (
    <RoutineWallStack.Navigator
        screenOptions = {{
            header: ({route})=><Header subtitle={route.name}/>
        }}
    >
        <RoutineWallStack.Screen component={RoutineWallScreen} name="Muro de rutinas " />
    </RoutineWallStack.Navigator>
  )
}

export default RoutineWall

