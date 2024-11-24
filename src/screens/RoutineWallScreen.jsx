import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  Switch,
  Animated,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors } from "../global/colors";
import FlatCard from "../components/FlatCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  useGetRoutinesQuery,
  useGetRoutinesByCreatedByQuery,
} from "../services/fitService";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoutine } from "../features/routine/routinesSlice";

const RoutineWallScreen = ({ navigation }) => {
  const [isMyRoutines, setIsMyRoutines] = useState(false); 
  const [switchPosition] = useState(new Animated.Value(0));
  const user = useSelector((state) => state.user); 

  const handleSwitchChange = (value) => {
    setIsMyRoutines(value);
    Animated.timing(switchPosition, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const {
    data: routines = {},
    isLoading,
    error,
  } = isMyRoutines
    ? useGetRoutinesByCreatedByQuery("user") 
    : useGetRoutinesQuery(); 

  const handleDelete = (id) => {
    dispatch(deleteRoutine(id));
  };

  const renderRoutinesItem = ({ item }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("Rutina", { routineId: item.id });
      }}
    >
      <FlatCard style={styles.routineContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.routineWallCardImage} 
          resizeMode="cover" 
        />
        <View style={styles.textContainer}>
          <Text style={styles.routineTitle}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.createdby}>{item.duration}</Text>
          <Text style={styles.createdby}>Created By: {item.createdBy}</Text>
        </View>
      </FlatCard>
    </Pressable>
  );

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.grisIntermedio} />
      ) : error ? (
        <Text>Error al cargar los ejercicios</Text>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Animated.View
                style={[
                  styles.switchBlock,
                  {
                    transform: [
                      {
                        translateX: switchPosition.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 150], 
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Pressable
                style={[
                  styles.switchText,
                  isMyRoutines ? styles.activeOption : styles.inactiveOption,
                ]}
                onPress={() => handleSwitchChange(true)}
              >
                <Text>Mis Rutinas</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.switchText,
                  !isMyRoutines ? styles.activeOption : styles.inactiveOption,
                ]}
                onPress={() => handleSwitchChange(false)}
              >
                <Text>Todas las Rutinas</Text>
              </Pressable>
            </View>

            {isLoading && <Text>Loading...</Text>}
            {error && console.log("error", error) && (
              <Text>Error loading routines</Text>
            )}
            <FlatList
              data={routines ? Object.values(routines) : []}
              keyExtractor={(item) => item.id}
              renderItem={renderRoutinesItem}
            />
          </View>
        </>
      )}
    </>
  );
};

export default RoutineWallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    width: 300,
    height: 50,
    borderRadius: 25,
    margin: 10,
    backgroundColor: colors.grisIntermedio,
    alignItems: "center",
    position: "relative",
    padding: 5,
  },
  switchBlock: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: colors.grisOscuro,
    borderRadius: 25,
    zIndex: -1,
  },
  switchText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    height: "100%",
    lineHeight: 40,
    zIndex: 1, 
  },
  activeOption: {
    color: colors.blanco,
    fontWeight: "bold",
    backgroundColor: colors.acentoAzul,
    borderRadius: 25,
  },
  inactiveOption: {
    color: colors.negro,
    backgroundColor: colors.grisClaro,
    borderRadius: 25,
  },
  routineContainer: {
    backgroundColor: colors.blanco,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden", 
  },
  routineWallCardImage: {
    width: "100%", 
    height: 150, 
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
  },
  routineTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: colors.grisOscuro,
  },
  createdby: {
    fontSize: 12,
    color: colors.acentoAzul,
  },
});
