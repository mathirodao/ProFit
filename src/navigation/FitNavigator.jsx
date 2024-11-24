import { createNativeStackNavigator } from "@react-navigation/native-stack"

// import { ServicesScreen, ExercisesScreen, RoutinesScreen } from "../screens"
import ServicesScreen from '../screens/ServicesScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import CreateRoutineScreen from '../screens/CreateRoutineScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineScreen from '../screens/RoutineScreen';
import Header from "../components/Header"


const Stack = createNativeStackNavigator()

const FitNavigator = () => {
  return (
        <Stack.Navigator
            screenOptions = {{
                header: ({route})=><Header subtitle={route.name}/>
            }}
        >
            <Stack.Screen name="Home" component={ServicesScreen} />
            <Stack.Screen name="Ejercicio" component={ExerciseScreen} />
            <Stack.Screen name="Ejercicios" component={ExercisesScreen} />
            <Stack.Screen name="Crea tu rutina" component={CreateRoutineScreen} />
            <Stack.Screen name="Rutina" component={RoutineScreen} />
            <Stack.Screen name="Rutinas" component={RoutinesScreen} />
        </Stack.Navigator>
  )
}

export default FitNavigator

