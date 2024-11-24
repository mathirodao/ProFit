import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

import FitNavigator from "./FitNavigator";
import RoutineWallNavigator from "./RoutineWallNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { colors } from "../global/colors";


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={FitNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="home" size={32} color={focused?colors.acentoAzul:colors.grisSuave} />)
                }}
            />
            <Tab.Screen 
                name="Rutina" 
                component={RoutineWallNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="fitness-center" size={32} color={focused?colors.acentoAzul:colors.grisSuave} />)
                }}
            />
            <Tab.Screen 
                name="Actividad"
                component={ProfileNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="list" size={32} color={focused?colors.acentoAzul:colors.grisSuave} />)
                }}
            />
            <Tab.Screen 
                name="Perfil"
                component={ProfileNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="person" size={32} color={focused?colors.acentoAzul:colors.grisSuave} />)
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar:{
        height: 100,
        backgroundColor: colors.grisOscuro
    }
})